# MPTech SSL Checker

Herramienta portable para Windows que permite comprobar certificados HTTPS/TLS, estado SSL y cobertura del dominio.

## Descargar

Descarga el ejecutable portable desde GitHub Releases:

- Repositorio: https://github.com/xml2811/SSL-Checker
- Última release: https://github.com/xml2811/SSL-Checker/releases/latest

Archivo recomendado:

MPTech-SSL-Checker-v1.0.0-portable.exe

La versión portable no necesita instalación.

## Qué hace

MPTech SSL Checker es una pequeña herramienta técnica de escritorio para comprobar certificados HTTPS rápidamente desde Windows.

Está pensada para técnicos, administradores de sistemas, desarrolladores, estudiantes de IT y usuarios avanzados que necesitan revisar el estado de un certificado sin abrir varias herramientas distintas.

## Funciones

- Validación de certificados HTTPS/TLS.
- Normalización de dominios desde dominio simple o URL HTTPS completa.
- Comprobación TCP rápida antes de validar TLS.
- Fecha de caducidad y días restantes.
- Puntuación de salud SSL.
- Comprobación de si el certificado cubre el dominio indicado.
- Detección de SANs y SANs wildcard.
- Emisor y sujeto del certificado.
- Huella SHA256.
- Número de serie del certificado.
- Algoritmo de firma.
- Tamaño del certificado.
- Tiempo de respuesta.
- Detección de tipo de error: DNS, TCP, TLS, certificado o desconocido.
- Copiar resultado completo al portapapeles.
- Copiar huella del certificado.
- Exportar informe TXT eligiendo dónde guardar.
- Interfaz limpia con secciones técnicas desplegables.
- Interfaz multidioma: inglés, español y portugués.
- Sin login, sin backend, sin base de datos y sin guardar secretos.

## Capturas

### Vista principal

![Vista principal](docs/screenshots/ssl-checker-main.png)

### Resultado

![Resultado](docs/screenshots/ssl-checker-result.png)

### Detalles SSL

![Detalles SSL](docs/screenshots/ssl-checker-details.png)

### Exportar TXT

![Exportar TXT](docs/screenshots/ssl-checker-export.png)

## Ejemplos de prueba

Puedes probar dominios como:

- google.com
- github.com
- expired.badssl.com
- self-signed.badssl.com
- wrong.host.badssl.com

## Privacidad

MPTech SSL Checker solo conecta al endpoint HTTPS introducido por el usuario y lee el certificado TLS público.

No guarda credenciales, contraseñas, claves privadas, cookies, cuentas ni secretos.

## Notas

Windows SmartScreen puede mostrar un aviso porque el ejecutable todavía no está firmado con certificado de código.

## Stack técnico

- Tauri 2
- React
- TypeScript
- Rust
- Vite
- Native TLS
- Análisis de certificados X509

## Distribución

Los ejecutables finales se distribuyen mediante GitHub Releases.

El archivo .exe no se guarda dentro del árbol del repositorio.

## Licencia

Este proyecto tiene código visible para uso personal, educativo y no comercial.

No está permitida la reventa, redistribución comercial ni uso dentro de productos/servicios de pago sin permiso previo por escrito.

Consulta LICENSE.

## Autor

Creado por Xavier Madrid Lerga bajo MPTech Tools.

GitHub: https://github.com/xml2811