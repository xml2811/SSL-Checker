import { useMemo, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { invoke } from "@tauri-apps/api/core";
import { translations, type Language } from "./i18n";

type SslResult = {
  input: string;
  normalized_domain: string;
  port: number;
  protocol: string;
  issuer: string;
  subject: string;
  not_before: string;
  not_after: string;
  days_remaining: number;
  is_valid: boolean;
  is_expired: boolean;
  is_expiring_soon: boolean;
  error: string | null;
  error_kind: string;
  fingerprint_sha256: string;
  serial_number: string;
  certificate_size_bytes: number;
  signature_algorithm: string;
  subject_alt_names: string[];
  san_count: number;
  wildcard_san_count: number;
  domain_covered: boolean;
  health_score: number;
  response_time_ms: number;
  checked_at: string;
};

const defaultDomain = "github.com";

function getStatus(result: SslResult, language: Language): string {
  const t = translations[language];

  if (result.error) return t.invalid;
  if (result.is_expired) return t.expired;
  if (result.is_expiring_soon) return t.expiringSoon;
  if (result.is_valid) return t.valid;
  return t.invalid;
}

function getRecommendation(result: SslResult, language: Language): string {
  const t = translations[language];

  if (result.error || !result.domain_covered) return t.recommendationInvalid;
  if (result.is_expired) return t.recommendationExpired;
  if (result.is_expiring_soon) return t.recommendationExpiringSoon;
  if (result.is_valid) return t.recommendationValid;
  return t.recommendationInvalid;
}

function getStatusClass(result: SslResult): string {
  if (result.error || result.is_expired || !result.is_valid || !result.domain_covered) return "bad";
  if (result.is_expiring_soon || result.health_score < 80) return "warn";
  return "ok";
}

function formatResult(result: SslResult, language: Language): string {
  const t = translations[language];
  const status = getStatus(result, language);
  const recommendation = getRecommendation(result, language);
  const sans = result.subject_alt_names.length ? result.subject_alt_names.join(", ") : t.noSans;

  const lines = [
    t.result + ": " + t.appName,
    t.domain + ": " + result.normalized_domain,
    t.protocol + ": " + result.protocol,
    t.port + ": " + String(result.port),
    t.status + ": " + status,
    t.healthScore + ": " + String(result.health_score) + "/100",
    t.domainCovered + ": " + (result.domain_covered ? t.yes : t.no),
    t.issuer + ": " + result.issuer,
    t.subject + ": " + result.subject,
    t.notBefore + ": " + result.not_before,
    t.expiresAt + ": " + result.not_after,
    t.daysRemaining + ": " + String(result.days_remaining),
    t.serialNumber + ": " + result.serial_number,
    t.fingerprintSha256 + ": " + result.fingerprint_sha256,
    t.signatureAlgorithm + ": " + result.signature_algorithm,
    t.certSize + ": " + String(result.certificate_size_bytes) + " bytes",
    t.sanCount + ": " + String(result.san_count),
    t.wildcardSanCount + ": " + String(result.wildcard_san_count),
    t.responseTime + ": " + String(result.response_time_ms) + " ms",
    t.checkedAt + ": " + result.checked_at,
    t.subjectAltNames + ": " + sans,
    t.recommendation + ": " + recommendation
  ];

  if (result.error) {
    lines.push(t.errorKind + ": " + result.error_kind);
    lines.push(t.error + ": " + result.error);
  }

  return lines.join("\n");
}

function Field({ label, value, mono = false }: { label: string; value: string | number; mono?: boolean }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className={mono ? "mono" : ""}>{value}</dd>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [domain, setDomain] = useState<string>(defaultDomain);
  const [result, setResult] = useState<SslResult | null>(null);
  const [busy, setBusy] = useState<boolean>(false);
  const [copyState, setCopyState] = useState<string>("");
  const [fingerprintState, setFingerprintState] = useState<string>("");
  const [exportState, setExportState] = useState<string>("");

  const t = translations[language];

  const formattedResult = useMemo<string>(() => {
    if (!result) return "";
    return formatResult(result, language);
  }, [result, language]);

  async function runCheck(): Promise<void> {
    setBusy(true);
    setCopyState("");
    setFingerprintState("");
    setExportState("");

    try {
      const response = await invoke<SslResult>("check_ssl_certificate", {
        input: domain
      });
      setResult(response);
    } catch (error) {
      setResult({
        input: domain,
        normalized_domain: domain,
        port: 443,
        protocol: "HTTPS",
        issuer: "-",
        subject: "-",
        not_before: "-",
        not_after: "-",
        days_remaining: 0,
        is_valid: false,
        is_expired: false,
        is_expiring_soon: false,
        error: String(error),
        error_kind: "UNKNOWN",
        fingerprint_sha256: "-",
        serial_number: "-",
        certificate_size_bytes: 0,
        signature_algorithm: "-",
        subject_alt_names: [],
        san_count: 0,
        wildcard_san_count: 0,
        domain_covered: false,
        health_score: 0,
        response_time_ms: 0,
        checked_at: "-"
      });
    } finally {
      setBusy(false);
    }
  }

  async function copyResult(): Promise<void> {
    if (!formattedResult) return;
    await navigator.clipboard.writeText(formattedResult);
    setCopyState(t.copied);
    window.setTimeout(() => setCopyState(""), 1800);
  }

  async function copyFingerprint(): Promise<void> {
    if (!result || !result.fingerprint_sha256 || result.fingerprint_sha256 === "-") return;
    await navigator.clipboard.writeText(result.fingerprint_sha256);
    setFingerprintState(t.fingerprintCopied);
    window.setTimeout(() => setFingerprintState(""), 1800);
  }

  async function exportTxt(): Promise<void> {
    if (!formattedResult) return;

    try {
      const savedPath = await invoke<string>("export_txt_file", {
        content: formattedResult
      });

      if (savedPath === "CANCELLED") {
        setExportState(t.cancelled);
      } else {
        setExportState(t.exported + ": " + savedPath);
      }
    } catch (error) {
      setExportState(t.exportError + ": " + String(error));
    }
  }

  function clearResult(): void {
    setResult(null);
    setCopyState("");
    setFingerprintState("");
    setExportState("");
  }

  function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>): void {
    setLanguage(event.target.value as Language);
  }

  function handleDomainKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      void runCheck();
    }
  }

  const statusClass = result ? getStatusClass(result) : "";
  const statusText = result ? getStatus(result, language) : "";
  const recommendation = result ? getRecommendation(result, language) : "";

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">MPTech Tools</p>
          <h1>{t.appName}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <div className="language-box">
          <label htmlFor="language">{t.language}</label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">{"Espa\u00f1ol"}</option>
            <option value="pt">{"Portugu\u00eas"}</option>
          </select>
        </div>
      </section>

      <section className="grid">
        <div className="panel input-panel">
          <div className="panel-header">
            <h2>{t.domainLabel}</h2>
          </div>

          <label className="input-label" htmlFor="domain">{t.domainLabel}</label>

          <input
            id="domain"
            value={domain}
            placeholder={t.domainPlaceholder}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setDomain(event.target.value)}
            onKeyDown={handleDomainKeyDown}
          />

          <p className="help">{t.inputHelp}</p>

          <div className="actions">
            <button className="primary" disabled={busy || !domain.trim()} onClick={() => void runCheck()}>
              {busy ? t.checking : t.check}
            </button>

            <button disabled={!result} onClick={() => void copyResult()}>
              {copyState || t.copy}
            </button>

            <button disabled={!result} onClick={() => void exportTxt()}>
              {t.exportTxt}
            </button>

            <button disabled={!result} onClick={() => void copyFingerprint()}>
              {fingerprintState || t.copyFingerprint}
            </button>

            <button disabled={!result && domain === defaultDomain} onClick={clearResult}>
              {t.clear}
            </button>
          </div>

          {exportState && <p className="help">{exportState}</p>}

          {result && (
            <div className="left-details">
              <details className="details-block">
                <summary>{t.subjectAltNames} ({result.san_count})</summary>
                <dl className="compact-dl">
                  <Field label={t.sanCount} value={result.san_count} />
                  <Field label={t.wildcardSanCount} value={result.wildcard_san_count} />
                  <Field label={t.domainCovered} value={result.domain_covered ? t.yes : t.no} />
                </dl>
                <div className="san-list">
                  {result.subject_alt_names.length
                    ? result.subject_alt_names.map((name) => <span key={name}>{name}</span>)
                    : <span>{t.noSans}</span>}
                </div>
              </details>

              <details className="details-block">
                <summary>{t.fingerprintSha256} / {t.serialNumber}</summary>
                <dl className="compact-dl">
                  <Field label={t.fingerprintSha256} value={result.fingerprint_sha256} mono />
                  <Field label={t.serialNumber} value={result.serial_number} mono />
                  <Field label={t.checkedAt} value={result.checked_at} />
                </dl>
              </details>

              <details className="details-block">
                <summary>{t.technicalSummary}</summary>
                <pre>{formattedResult}</pre>
              </details>
            </div>
          )}
        </div>

        <div className="panel result-panel">
          <div className="panel-header">
            <h2>{t.result}</h2>
            {result && <span className={"badge " + statusClass}>{statusText}</span>}
          </div>

          {!result && <div className="empty">{t.noResult}</div>}

          {result && (
            <div className="result-content clean-result">
              <div className={"status-card " + statusClass + "-card"}>
                <strong>{statusText}</strong>
                <p>
                  {result.error
                    ? t.invalidDescription
                    : result.is_expiring_soon
                      ? t.expiringSoonDescription
                      : result.is_valid
                        ? t.validDescription
                        : t.invalidDescription}
                </p>
              </div>

              <div className="summary-grid">
                <div className="metric-card">
                  <span>{t.healthScore}</span>
                  <strong>{result.health_score}/100</strong>
                </div>
                <div className="metric-card">
                  <span>{t.daysRemaining}</span>
                  <strong>{result.days_remaining}</strong>
                </div>
                <div className="metric-card">
                  <span>{t.domainCovered}</span>
                  <strong>{result.domain_covered ? t.yes : t.no}</strong>
                </div>
                <div className="metric-card">
                  <span>{t.responseTime}</span>
                  <strong>{result.response_time_ms} ms</strong>
                </div>
              </div>

              <div className="notice">
                <strong>{t.professionalSummary}</strong>
                <p>{recommendation}</p>
              </div>

              <details open className="details-block">
                <summary>{t.status} / {t.quickCheck}</summary>
                <dl className="compact-dl">
                  <Field label={t.domain} value={result.normalized_domain} />
                  <Field label={t.status} value={statusText} />
                  <Field label={t.protocol} value={result.protocol} />
                  <Field label={t.port} value={result.port} />
                  <Field label={t.quickCheck} value={result.error ? t.invalid : t.valid} />
                  {result.error && <Field label={t.errorKind} value={result.error_kind} />}
                  {result.error && <Field label={t.error} value={result.error} />}
                </dl>
              </details>

              <details className="details-block">
                <summary>{t.issuer} / {t.subject}</summary>
                <dl className="compact-dl">
                  <Field label={t.issuer} value={result.issuer} />
                  <Field label={t.subject} value={result.subject} />
                  <Field label={t.notBefore} value={result.not_before} />
                  <Field label={t.expiresAt} value={result.not_after} />
                  <Field label={t.signatureAlgorithm} value={result.signature_algorithm} />
                  <Field label={t.certSize} value={result.certificate_size_bytes + " bytes"} />
                </dl>
              </details>
            </div>
          )}
        </div>
      </section>

      <footer>{t.footer}</footer>
    </main>
  );
}

export default App;