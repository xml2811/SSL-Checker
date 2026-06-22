# MPTech SSL Checker

Portable Windows desktop tool for checking HTTPS/TLS certificates, certificate health and hostname coverage.

## Download

Download the latest portable executable from GitHub Releases:

- Repository: https://github.com/xml2811/SSL-Checker
- Latest release: https://github.com/xml2811/SSL-Checker/releases/latest

Recommended file:

MPTech-SSL-Checker-v1.0.0-portable.exe

The portable version does not require installation.

## What it does

MPTech SSL Checker is a small technical desktop utility for quickly checking HTTPS certificates from Windows.

It is designed for technicians, sysadmins, developers, IT students and advanced users who need a quick way to inspect certificate status without opening several different tools.

## Features

- HTTPS/TLS certificate validation.
- Domain normalization from plain domains or full HTTPS URLs.
- Quick TCP connectivity check before TLS validation.
- Expiration date and days remaining.
- SSL health score.
- Hostname coverage check.
- SAN and wildcard SAN detection.
- Certificate issuer and subject.
- SHA256 fingerprint.
- Certificate serial number.
- Signature algorithm.
- Certificate size.
- Response time.
- Error type detection: DNS, TCP, TLS, certificate or unknown.
- Copy full result to clipboard.
- Copy certificate fingerprint.
- Export TXT report with save dialog.
- Clean UI with collapsible technical sections.
- Multilanguage interface: English, Spanish and Portuguese.
- No login, no backend, no database and no secrets stored.

## Screenshots

### Main view

![Main view](docs/screenshots/ssl-checker-main.png)

### Result view

![Result view](docs/screenshots/ssl-checker-result.png)

### SSL details

![SSL details](docs/screenshots/ssl-checker-details.png)

### Export TXT

![Export TXT](docs/screenshots/ssl-checker-export.png)

## Example checks

You can test domains such as:

- google.com
- github.com
- expired.badssl.com
- self-signed.badssl.com
- wrong.host.badssl.com

## Privacy

MPTech SSL Checker only connects to the HTTPS endpoint entered by the user and reads the public TLS certificate.

It does not store credentials, passwords, private keys, cookies, accounts or secrets.

## Notes

Windows SmartScreen may show a warning because the executable is not code-signed yet.

## Tech stack

- Tauri 2
- React
- TypeScript
- Rust
- Vite
- Native TLS
- X509 certificate parsing

## Distribution

Final executable files are distributed through GitHub Releases.

The .exe file is not stored in the repository tree.

## License

This project is source-available for personal, educational and non-commercial use only.

You may view, study, download and modify the code for your own personal or internal non-commercial use.

You may not sell, resell, sublicense, commercially redistribute, include it in paid products/services, or publish modified commercial versions without prior written permission.

See [LICENSE](LICENSE).## Author

Created by Xavier Madrid Lerga under MPTech Tools.

GitHub: https://github.com/xml2811