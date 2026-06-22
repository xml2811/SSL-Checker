export type Language = "en" | "es" | "pt";

export type Translation = {
  appName: string;
  subtitle: string;
  language: string;
  domainLabel: string;
  domainPlaceholder: string;
  inputHelp: string;
  check: string;
  checking: string;
  copy: string;
  copied: string;
  copyFingerprint: string;
  fingerprintCopied: string;
  exportTxt: string;
  exported: string;
  cancelled: string;
  exportError: string;
  clear: string;
  basicErrors: string;
  warning: string;
  result: string;
  noResult: string;
  valid: string;
  invalid: string;
  expiringSoon: string;
  expired: string;
  validDescription: string;
  invalidDescription: string;
  expiringSoonDescription: string;
  domain: string;
  protocol: string;
  port: string;
  status: string;
  issuer: string;
  subject: string;
  notBefore: string;
  expiresAt: string;
  daysRemaining: string;
  recommendation: string;
  recommendationValid: string;
  recommendationExpiringSoon: string;
  recommendationExpired: string;
  recommendationInvalid: string;
  error: string;
  errorKind: string;
  technicalSummary: string;
  quickCheck: string;
  fingerprintSha256: string;
  serialNumber: string;
  certSize: string;
  signatureAlgorithm: string;
  subjectAltNames: string;
  sanCount: string;
  wildcardSanCount: string;
  domainCovered: string;
  healthScore: string;
  responseTime: string;
  checkedAt: string;
  noSans: string;
  professionalSummary: string;
  yes: string;
  no: string;
  footer: string;
};

export const translations: Record<Language, Translation> = {
  en: {
    appName: "MPTech SSL Checker",
    subtitle: "Portable HTTPS certificate checker for technicians, developers and system administrators.",
    language: "Language",
    domainLabel: "Domain",
    domainPlaceholder: "example.com or https://example.com",
    inputHelp: "Enter a domain or a full HTTPS URL. A quick connectivity check runs before TLS validation.",
    check: "Check certificate",
    checking: "Checking...",
    copy: "Copy result",
    copied: "Copied",
    copyFingerprint: "Copy fingerprint",
    fingerprintCopied: "Fingerprint copied",
    exportTxt: "Export TXT",
    exported: "TXT exported",
    cancelled: "Export cancelled",
    exportError: "Export failed",
    clear: "Clear",
    basicErrors: "Basic error detection",
    warning: "This tool performs a quick TCP check and then reads the public HTTPS certificate. It does not store secrets.",
    result: "Result",
    noResult: "Run a check to see certificate details here.",
    valid: "Valid",
    invalid: "Invalid",
    expiringSoon: "Expiring soon",
    expired: "Expired",
    validDescription: "The certificate is valid and has enough remaining time.",
    invalidDescription: "The certificate is invalid, unreachable or failed TLS validation.",
    expiringSoonDescription: "The certificate is valid but should be renewed soon.",
    domain: "Domain",
    protocol: "Protocol",
    port: "Port",
    status: "Status",
    issuer: "Issuer",
    subject: "Subject",
    notBefore: "Valid from",
    expiresAt: "Expires at",
    daysRemaining: "Days remaining",
    recommendation: "Recommendation",
    recommendationValid: "Certificate is valid, the hostname is covered, and the SSL health score is good.",
    recommendationExpiringSoon: "Certificate is valid but expires soon. Renew it before the 30-day window ends.",
    recommendationExpired: "Certificate is expired. Renew it immediately.",
    recommendationInvalid: "The check failed or the certificate is not suitable. Review DNS, connectivity, TLS validation, hostname coverage and certificate chain.",
    error: "Error",
    errorKind: "Error type",
    technicalSummary: "Technical summary",
    quickCheck: "Quick TCP check",
    fingerprintSha256: "SHA256 fingerprint",
    serialNumber: "Serial number",
    certSize: "Certificate size",
    signatureAlgorithm: "Signature algorithm",
    subjectAltNames: "Subject Alternative Names",
    sanCount: "SAN count",
    wildcardSanCount: "Wildcard SAN count",
    domainCovered: "Domain covered by certificate",
    healthScore: "SSL health score",
    responseTime: "Response time",
    checkedAt: "Checked at",
    noSans: "No SAN entries detected",
    professionalSummary: "Professional summary",
    yes: "Yes",
    no: "No",
    footer: "MPTech Tools Â· SSL Checker Â· v1.0.0"
  },
  es: {
    appName: "MPTech SSL Checker",
    subtitle: "Comprobador portable de certificados HTTPS para t\u00e9cnicos, desarrolladores y administradores de sistemas.",
    language: "Idioma",
    domainLabel: "Dominio",
    domainPlaceholder: "ejemplo.com o https://ejemplo.com",
    inputHelp: "Introduce un dominio o una URL HTTPS completa. Antes de validar TLS se hace una comprobaci\u00f3n r\u00e1pida de conectividad.",
    check: "Comprobar certificado",
    checking: "Comprobando...",
    copy: "Copiar resultado",
    copied: "Copiado",
    copyFingerprint: "Copiar huella",
    fingerprintCopied: "Huella copiada",
    exportTxt: "Exportar TXT",
    exported: "TXT exportado",
    cancelled: "Exportaci\u00f3n cancelada",
    exportError: "Error al exportar",
    clear: "Limpiar",
    basicErrors: "Detecci\u00f3n b\u00e1sica de errores",
    warning: "Esta herramienta hace una comprobaci\u00f3n TCP r\u00e1pida y despu\u00e9s lee el certificado HTTPS p\u00fablico. No guarda secretos.",
    result: "Resultado",
    noResult: "Ejecuta una comprobaci\u00f3n para ver aqu\u00ed los detalles del certificado.",
    valid: "V\u00e1lido",
    invalid: "Inv\u00e1lido",
    expiringSoon: "Caduca pronto",
    expired: "Caducado",
    validDescription: "El certificado es v\u00e1lido y tiene margen suficiente.",
    invalidDescription: "El certificado es inv\u00e1lido, no accesible o fall\u00f3 la validaci\u00f3n TLS.",
    expiringSoonDescription: "El certificado es v\u00e1lido, pero conviene renovarlo pronto.",
    domain: "Dominio",
    protocol: "Protocolo",
    port: "Puerto",
    status: "Estado",
    issuer: "Emisor",
    subject: "Sujeto",
    notBefore: "V\u00e1lido desde",
    expiresAt: "Caduca el",
    daysRemaining: "D\u00edas restantes",
    recommendation: "Recomendaci\u00f3n",
    recommendationValid: "El certificado es v\u00e1lido, cubre el dominio y el estado SSL general es bueno.",
    recommendationExpiringSoon: "El certificado es v\u00e1lido, pero caduca pronto. Conviene renovarlo antes de los \u00faltimos 30 d\u00edas.",
    recommendationExpired: "El certificado est\u00e1 caducado. Hay que renovarlo inmediatamente.",
    recommendationInvalid: "La comprobaci\u00f3n fall\u00f3 o el certificado no es adecuado. Revisa DNS, conectividad, validaci\u00f3n TLS, cobertura del dominio y cadena del certificado.",
    error: "Error",
    errorKind: "Tipo de error",
    technicalSummary: "Resumen t\u00e9cnico",
    quickCheck: "Comprobaci\u00f3n TCP r\u00e1pida",
    fingerprintSha256: "Huella SHA256",
    serialNumber: "N\u00famero de serie",
    certSize: "Tama\u00f1o del certificado",
    signatureAlgorithm: "Algoritmo de firma",
    subjectAltNames: "Nombres alternativos SAN",
    sanCount: "Cantidad de SAN",
    wildcardSanCount: "Cantidad de SAN wildcard",
    domainCovered: "Dominio cubierto por el certificado",
    healthScore: "Puntuaci\u00f3n SSL",
    responseTime: "Tiempo de respuesta",
    checkedAt: "Comprobado el",
    noSans: "No se detectaron entradas SAN",
    professionalSummary: "Resumen profesional",
    yes: "S\u00ed",
    no: "No",
    footer: "MPTech Tools Â· SSL Checker Â· v1.0.0"
  },
  pt: {
    appName: "MPTech SSL Checker",
    subtitle: "Verificador port\u00e1til de certificados HTTPS para t\u00e9cnicos, programadores e administradores de sistemas.",
    language: "Idioma",
    domainLabel: "Dom\u00ednio",
    domainPlaceholder: "exemplo.com ou https://exemplo.com",
    inputHelp: "Introduz um dom\u00ednio ou uma URL HTTPS completa. Antes da valida\u00e7\u00e3o TLS \u00e9 feita uma verifica\u00e7\u00e3o r\u00e1pida de conectividade.",
    check: "Verificar certificado",
    checking: "A verificar...",
    copy: "Copiar resultado",
    copied: "Copiado",
    copyFingerprint: "Copiar impress\u00e3o",
    fingerprintCopied: "Impress\u00e3o copiada",
    exportTxt: "Exportar TXT",
    exported: "TXT exportado",
    cancelled: "Exporta\u00e7\u00e3o cancelada",
    exportError: "Erro ao exportar",
    clear: "Limpar",
    basicErrors: "Dete\u00e7\u00e3o b\u00e1sica de erros",
    warning: "Esta ferramenta faz uma verifica\u00e7\u00e3o TCP r\u00e1pida e depois l\u00ea o certificado HTTPS p\u00fablico. N\u00e3o guarda segredos.",
    result: "Resultado",
    noResult: "Executa uma verifica\u00e7\u00e3o para ver aqui os detalhes do certificado.",
    valid: "V\u00e1lido",
    invalid: "Inv\u00e1lido",
    expiringSoon: "Expira em breve",
    expired: "Expirado",
    validDescription: "O certificado \u00e9 v\u00e1lido e tem margem suficiente.",
    invalidDescription: "O certificado \u00e9 inv\u00e1lido, inacess\u00edvel ou falhou a valida\u00e7\u00e3o TLS.",
    expiringSoonDescription: "O certificado \u00e9 v\u00e1lido, mas deve ser renovado em breve.",
    domain: "Dom\u00ednio",
    protocol: "Protocolo",
    port: "Porta",
    status: "Estado",
    issuer: "Emissor",
    subject: "Sujeito",
    notBefore: "V\u00e1lido desde",
    expiresAt: "Expira em",
    daysRemaining: "Dias restantes",
    recommendation: "Recomenda\u00e7\u00e3o",
    recommendationValid: "O certificado \u00e9 v\u00e1lido, cobre o dom\u00ednio e o estado SSL geral \u00e9 bom.",
    recommendationExpiringSoon: "O certificado \u00e9 v\u00e1lido, mas expira em breve. Conv\u00e9m renov\u00e1-lo antes dos \u00faltimos 30 dias.",
    recommendationExpired: "O certificado expirou. Deve ser renovado imediatamente.",
    recommendationInvalid: "A verifica\u00e7\u00e3o falhou ou o certificado n\u00e3o \u00e9 adequado. Rev\u00ea DNS, conectividade, valida\u00e7\u00e3o TLS, cobertura do dom\u00ednio e cadeia do certificado.",
    error: "Erro",
    errorKind: "Tipo de erro",
    technicalSummary: "Resumo t\u00e9cnico",
    quickCheck: "Verifica\u00e7\u00e3o TCP r\u00e1pida",
    fingerprintSha256: "Impress\u00e3o SHA256",
    serialNumber: "N\u00famero de s\u00e9rie",
    certSize: "Tamanho do certificado",
    signatureAlgorithm: "Algoritmo de assinatura",
    subjectAltNames: "Nomes alternativos SAN",
    sanCount: "Quantidade de SAN",
    wildcardSanCount: "Quantidade de SAN wildcard",
    domainCovered: "Dom\u00ednio coberto pelo certificado",
    healthScore: "Pontua\u00e7\u00e3o SSL",
    responseTime: "Tempo de resposta",
    checkedAt: "Verificado em",
    noSans: "N\u00e3o foram detetadas entradas SAN",
    professionalSummary: "Resumo profissional",
    yes: "Sim",
    no: "N\u00e3o",
    footer: "MPTech Tools Â· SSL Checker Â· v1.0.0"
  }
};