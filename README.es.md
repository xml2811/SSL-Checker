# MPTech SSL Checker

Herramienta portable para Windows que permite comprobar certificados HTTPS/TLS, estado SSL y cobertura del dominio.

![MPTech SSL Checker](docs/screenshots/ssl-checker-main.png)

## Descargar

Descarga el ejecutable portable desde GitHub Releases:

- Repositorio: https://github.com/xml2811/SSL-Checker
- Ãšltima release: https://github.com/xml2811/SSL-Checker/releases/latest

Archivo recomendado:

**MPTech-SSL-Checker-v1.0.0-portable.exe**

La versiÃ³n portable no necesita instalaciÃ³n.

## QuÃ© hace

MPTech SSL Checker es una pequeÃ±a herramienta tÃ©cnica de escritorio para comprobar certificados HTTPS rÃ¡pidamente desde Windows.

EstÃ¡ pensada para tÃ©cnicos, administradores de sistemas, desarrolladores, estudiantes de IT y usuarios avanzados que necesitan revisar el estado de un certificado sin abrir varias herramientas distintas.

## Funciones

- ValidaciÃ³n de certificados HTTPS/TLS.
- NormalizaciÃ³n de dominios desde dominio simple o URL HTTPS completa.
- ComprobaciÃ³n TCP rÃ¡pida antes de validar TLS.
- Fecha de caducidad y dÃ­as restantes.
- PuntuaciÃ³n de salud SSL.
- ComprobaciÃ³n de si el certificado cubre el dominio indicado.
- DetecciÃ³n de SANs y SANs wildcard.
- Emisor y sujeto del certificado.
- Huella SHA256.
- NÃºmero de serie del certificado.
- Algoritmo de firma.
- TamaÃ±o del certificado.
- Tiempo de respuesta.
- DetecciÃ³n de tipo de error: DNS, TCP, TLS, certificado o desconocido.
- Copiar resultado completo al portapapeles.
- Copiar huella del certificado.
- Exportar informe TXT eligiendo dÃ³nde guardar.
- Interfaz limpia con secciones tÃ©cnicas desplegables.
- Interfaz multidioma: inglÃ©s, espaÃ±ol y portuguÃ©s.
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

MPTech SSL Checker solo conecta al endpoint HTTPS introducido por el usuario y lee el certificado TLS pÃºblico.

No guarda credenciales, contraseÃ±as, claves privadas, cookies, cuentas ni secretos.

## Notas

Windows SmartScreen puede mostrar un aviso porque el ejecutable todavÃ­a no estÃ¡ firmado con certificado de cÃ³digo.

## Stack tÃ©cnico

- Tauri 2
- React
- TypeScript
- Rust
- Vite
- Native TLS
- AnÃ¡lisis de certificados X509

## DistribuciÃ³n

Los ejecutables finales se distribuyen mediante GitHub Releases.

El archivo .exe no se guarda dentro del Ã¡rbol del repositorio.

## Licencia

Este proyecto tiene cÃ³digo visible para uso personal, educativo y no comercial.

No estÃ¡ permitida la reventa, redistribuciÃ³n comercial ni uso dentro de productos/servicios de pago sin permiso previo por escrito.

Consulta [LICENSE](LICENSE).

## Autor

Creado por Xavier Madrid Lerga bajo MPTech Tools.

GitHub: https://github.com/xml2811