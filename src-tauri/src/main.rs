#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use native_tls::TlsConnector;
use rfd::FileDialog;
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::fs;
use std::net::{TcpStream, ToSocketAddrs};
use std::time::{Duration, Instant};
use x509_parser::prelude::parse_x509_certificate;

#[derive(Debug, Serialize)]
struct SslCheckResult {
    input: String,
    normalized_domain: String,
    port: u16,
    protocol: String,
    issuer: String,
    subject: String,
    not_before: String,
    not_after: String,
    days_remaining: i64,
    is_valid: bool,
    is_expired: bool,
    is_expiring_soon: bool,
    error: Option<String>,
    error_kind: String,
    fingerprint_sha256: String,
    serial_number: String,
    certificate_size_bytes: usize,
    signature_algorithm: String,
    subject_alt_names: Vec<String>,
    san_count: usize,
    wildcard_san_count: usize,
    domain_covered: bool,
    health_score: u8,
    response_time_ms: u128,
    checked_at: String,
}

#[tauri::command]
fn check_ssl_certificate(input: String) -> SslCheckResult {
    match check_ssl_certificate_inner(&input) {
        Ok(result) => result,
        Err(error) => {
            let fallback_domain = normalize_domain(&input)
                .map(|(domain, _port)| domain)
                .unwrap_or_else(|_| input.trim().to_string());

            let error_kind = classify_error(&error);

            SslCheckResult {
                input,
                normalized_domain: fallback_domain,
                port: 443,
                protocol: "HTTPS".to_string(),
                issuer: "-".to_string(),
                subject: "-".to_string(),
                not_before: "-".to_string(),
                not_after: "-".to_string(),
                days_remaining: 0,
                is_valid: false,
                is_expired: false,
                is_expiring_soon: false,
                error: Some(error),
                error_kind,
                fingerprint_sha256: "-".to_string(),
                serial_number: "-".to_string(),
                certificate_size_bytes: 0,
                signature_algorithm: "-".to_string(),
                subject_alt_names: Vec::new(),
                san_count: 0,
                wildcard_san_count: 0,
                domain_covered: false,
                health_score: 0,
                response_time_ms: 0,
                checked_at: ::time::OffsetDateTime::now_utc().to_string(),
            }
        }
    }
}

#[tauri::command]
fn export_txt_file(content: String) -> Result<String, String> {
    if content.trim().is_empty() {
        return Err("EMPTY_CONTENT".to_string());
    }

    let selected_path = FileDialog::new()
        .set_title("Export SSL check result")
        .set_file_name("MPTech-SSL-Checker-result.txt")
        .add_filter("Text file", &["txt"])
        .save_file();

    let mut path = match selected_path {
        Some(path) => path,
        None => return Ok("CANCELLED".to_string()),
    };

    if path.extension().is_none() {
        path.set_extension("txt");
    }

    fs::write(&path, content)
        .map_err(|error| format!("WRITE_FAILED: {}", error))?;

    Ok(path.to_string_lossy().to_string())
}

fn classify_error(error: &str) -> String {
    if error.contains("DNS_LOOKUP_FAILED") {
        return "DNS".to_string();
    }

    if error.contains("TCP_CONNECT_TIMEOUT_OR_REFUSED") {
        return "TCP".to_string();
    }

    if error.contains("TLS_VALIDATION_FAILED") {
        return "TLS".to_string();
    }

    if error.contains("CERT_") || error.contains("X509_") || error.contains("NO_CERTIFICATE") {
        return "CERTIFICATE".to_string();
    }

    "UNKNOWN".to_string()
}

fn normalize_domain(input: &str) -> Result<(String, u16), String> {
    let mut value = input.trim().to_string();

    if value.is_empty() {
        return Err("EMPTY_DOMAIN".to_string());
    }

    value = value
        .trim_start_matches("https://")
        .trim_start_matches("http://")
        .to_string();

    if let Some(index) = value.find('/') {
        value = value[..index].to_string();
    }

    if let Some(index) = value.find('?') {
        value = value[..index].to_string();
    }

    if let Some(index) = value.find('#') {
        value = value[..index].to_string();
    }

    value = value.trim().trim_end_matches('.').to_string();

    if value.is_empty() {
        return Err("EMPTY_DOMAIN".to_string());
    }

    let mut domain = value.clone();
    let mut port: u16 = 443;

    if value.matches(':').count() == 1 {
        let parts: Vec<&str> = value.split(':').collect();
        if parts.len() == 2 && !parts[0].is_empty() && !parts[1].is_empty() {
            domain = parts[0].to_string();
            port = parts[1]
                .parse::<u16>()
                .map_err(|_| "INVALID_PORT".to_string())?;
        }
    }

    Ok((domain.to_lowercase(), port))
}

fn quick_tcp_connect(domain: &str, port: u16) -> Result<TcpStream, String> {
    let address = format!("{}:{}", domain, port);

    let socket_addresses = address
        .to_socket_addrs()
        .map_err(|error| format!("DNS_LOOKUP_FAILED: {}", error))?;

    let mut last_error = String::from("NO_ADDRESS");

    for socket_address in socket_addresses {
        match TcpStream::connect_timeout(&socket_address, Duration::from_secs(3)) {
            Ok(stream) => {
                stream
                    .set_read_timeout(Some(Duration::from_secs(8)))
                    .map_err(|error| format!("READ_TIMEOUT_FAILED: {}", error))?;

                stream
                    .set_write_timeout(Some(Duration::from_secs(8)))
                    .map_err(|error| format!("WRITE_TIMEOUT_FAILED: {}", error))?;

                return Ok(stream);
            }
            Err(error) => {
                last_error = error.to_string();
            }
        }
    }

    Err(format!("TCP_CONNECT_TIMEOUT_OR_REFUSED: {}", last_error))
}

fn clean_san_name(raw: &str) -> Option<String> {
    let value = raw.trim();

    if value.is_empty() {
        return None;
    }

    if value.contains("DNSName") || value.contains("DNS") {
        let mut cleaned = value
            .replace("DNSName", "")
            .replace("DNS", "")
            .replace("(", "")
            .replace(")", "")
            .replace("\"", "")
            .replace(":", "")
            .trim()
            .to_lowercase();

        if cleaned.starts_with('.') {
            cleaned = cleaned.trim_start_matches('.').to_string();
        }

        if cleaned.is_empty() {
            return None;
        }

        return Some(cleaned);
    }

    None
}

fn domain_matches_pattern(domain: &str, pattern: &str) -> bool {
    let domain = domain.trim().trim_end_matches('.').to_lowercase();
    let pattern = pattern.trim().trim_end_matches('.').to_lowercase();

    if domain == pattern {
        return true;
    }

    if pattern.starts_with("*.") {
        let suffix = pattern.trim_start_matches("*.");
        if domain.ends_with(&format!(".{}", suffix)) {
            let left = domain.trim_end_matches(&format!(".{}", suffix));
            return !left.is_empty() && !left.contains('.');
        }
    }

    false
}

fn compute_health_score(
    is_valid: bool,
    is_expired: bool,
    is_expiring_soon: bool,
    domain_covered: bool,
    san_count: usize,
    days_remaining: i64,
) -> u8 {
    if !is_valid || is_expired {
        return 0;
    }

    let mut score: i32 = 100;

    if is_expiring_soon {
        score -= 25;
    }

    if !domain_covered {
        score -= 35;
    }

    if san_count == 0 {
        score -= 10;
    }

    if days_remaining < 60 {
        score -= 10;
    }

    if score < 0 {
        return 0;
    }

    if score > 100 {
        return 100;
    }

    score as u8
}

fn check_ssl_certificate_inner(input: &str) -> Result<SslCheckResult, String> {
    let started = Instant::now();

    let (domain, port) = normalize_domain(input)?;
    let tcp_stream = quick_tcp_connect(&domain, port)?;

    let connector = TlsConnector::builder()
        .build()
        .map_err(|error| format!("TLS_CONNECTOR_FAILED: {}", error))?;

    let tls_stream = connector
        .connect(&domain, tcp_stream)
        .map_err(|error| format!("TLS_VALIDATION_FAILED: {}", error))?;

    let certificate = tls_stream
        .peer_certificate()
        .map_err(|error| format!("CERT_READ_FAILED: {}", error))?
        .ok_or_else(|| "NO_CERTIFICATE_PROVIDED".to_string())?;

    let der = certificate
        .to_der()
        .map_err(|error| format!("CERT_DER_CONVERT_FAILED: {}", error))?;

    let (_remaining, parsed_certificate) = parse_x509_certificate(&der)
        .map_err(|error| format!("X509_PARSE_FAILED: {}", error))?;

    let issuer = parsed_certificate.issuer().to_string();
    let subject = parsed_certificate.subject().to_string();

    let not_before_datetime = parsed_certificate.validity().not_before.to_datetime();
    let not_after_datetime = parsed_certificate.validity().not_after.to_datetime();

    let now = ::time::OffsetDateTime::now_utc();
    let days_remaining = (not_after_datetime - now).whole_days();

    let is_expired = days_remaining < 0;
    let is_expiring_soon = days_remaining >= 0 && days_remaining <= 30;
    let is_valid = !is_expired;

    let mut hasher = Sha256::new();
    hasher.update(&der);
    let fingerprint_sha256 = hex::encode_upper(hasher.finalize());

    let serial_number = parsed_certificate
        .tbs_certificate
        .raw_serial_as_string();

    let signature_algorithm = parsed_certificate
        .signature_algorithm
        .algorithm
        .to_id_string();

    let mut subject_alt_names: Vec<String> = Vec::new();

    if let Ok(Some(san_extension)) = parsed_certificate.subject_alternative_name() {
        for name in san_extension.value.general_names.iter() {
            let raw = name.to_string();
            if let Some(cleaned) = clean_san_name(&raw) {
                subject_alt_names.push(cleaned);
            } else {
                subject_alt_names.push(raw);
            }
        }
    }

    subject_alt_names.sort();
    subject_alt_names.dedup();

    let san_count = subject_alt_names.len();
    let wildcard_san_count = subject_alt_names.iter().filter(|name| name.starts_with("*.")).count();

    let domain_covered = subject_alt_names
        .iter()
        .any(|pattern| domain_matches_pattern(&domain, pattern));

    let health_score = compute_health_score(
        is_valid,
        is_expired,
        is_expiring_soon,
        domain_covered,
        san_count,
        days_remaining,
    );

    Ok(SslCheckResult {
        input: input.to_string(),
        normalized_domain: domain,
        port,
        protocol: "HTTPS".to_string(),
        issuer,
        subject,
        not_before: not_before_datetime.to_string(),
        not_after: not_after_datetime.to_string(),
        days_remaining,
        is_valid,
        is_expired,
        is_expiring_soon,
        error: None,
        error_kind: "NONE".to_string(),
        fingerprint_sha256,
        serial_number,
        certificate_size_bytes: der.len(),
        signature_algorithm,
        subject_alt_names,
        san_count,
        wildcard_san_count,
        domain_covered,
        health_score,
        response_time_ms: started.elapsed().as_millis(),
        checked_at: now.to_string(),
    })
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            check_ssl_certificate,
            export_txt_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running MPTech SSL Checker");
}