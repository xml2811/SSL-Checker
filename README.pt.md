# MPTech SSL Checker

Ferramenta portÃ¡til para Windows que permite verificar certificados HTTPS/TLS, estado SSL e cobertura do domÃ­nio.

![MPTech SSL Checker](docs/screenshots/ssl-checker-main.png)

## Download

Descarrega o executÃ¡vel portÃ¡til a partir do GitHub Releases:

- RepositÃ³rio: https://github.com/xml2811/SSL-Checker
- Ãšltima release: https://github.com/xml2811/SSL-Checker/releases/latest

Ficheiro recomendado:

**MPTech-SSL-Checker-v1.0.0-portable.exe**

A versÃ£o portÃ¡til nÃ£o requer instalaÃ§Ã£o.

## O que faz

MPTech SSL Checker Ã© uma pequena ferramenta tÃ©cnica de ambiente de trabalho para verificar certificados HTTPS rapidamente no Windows.

Foi pensada para tÃ©cnicos, administradores de sistemas, programadores, estudantes de IT e utilizadores avanÃ§ados que precisam de verificar o estado de um certificado sem abrir vÃ¡rias ferramentas diferentes.

## Funcionalidades

- ValidaÃ§Ã£o de certificados HTTPS/TLS.
- NormalizaÃ§Ã£o de domÃ­nios a partir de domÃ­nio simples ou URL HTTPS completa.
- VerificaÃ§Ã£o TCP rÃ¡pida antes da validaÃ§Ã£o TLS.
- Data de expiraÃ§Ã£o e dias restantes.
- PontuaÃ§Ã£o de saÃºde SSL.
- VerificaÃ§Ã£o de cobertura do domÃ­nio pelo certificado.
- DeteÃ§Ã£o de SANs e SANs wildcard.
- Emissor e sujeito do certificado.
- ImpressÃ£o SHA256.
- NÃºmero de sÃ©rie do certificado.
- Algoritmo de assinatura.
- Tamanho do certificado.
- Tempo de resposta.
- DeteÃ§Ã£o do tipo de erro: DNS, TCP, TLS, certificado ou desconhecido.
- Copiar resultado completo para a Ã¡rea de transferÃªncia.
- Copiar impressÃ£o do certificado.
- Exportar relatÃ³rio TXT escolhendo onde guardar.
- Interface limpa com secÃ§Ãµes tÃ©cnicas expansÃ­veis.
- Interface multilingue: inglÃªs, espanhol e portuguÃªs.
- Sem login, sem backend, sem base de dados e sem guardar segredos.

## Capturas

### Vista principal

![Vista principal](docs/screenshots/ssl-checker-main.png)

### Resultado

![Resultado](docs/screenshots/ssl-checker-result.png)

### Detalhes SSL

![Detalhes SSL](docs/screenshots/ssl-checker-details.png)

### Exportar TXT

![Exportar TXT](docs/screenshots/ssl-checker-export.png)

## Exemplos de teste

Podes testar domÃ­nios como:

- google.com
- github.com
- expired.badssl.com
- self-signed.badssl.com
- wrong.host.badssl.com

## Privacidade

MPTech SSL Checker apenas se liga ao endpoint HTTPS introduzido pelo utilizador e lÃª o certificado TLS pÃºblico.

NÃ£o guarda credenciais, palavras-passe, chaves privadas, cookies, contas ou segredos.

## Notas

O Windows SmartScreen pode mostrar um aviso porque o executÃ¡vel ainda nÃ£o estÃ¡ assinado com certificado de cÃ³digo.

## Stack tÃ©cnico

- Tauri 2
- React
- TypeScript
- Rust
- Vite
- Native TLS
- AnÃ¡lise de certificados X509

## DistribuiÃ§Ã£o

Os executÃ¡veis finais sÃ£o distribuÃ­dos atravÃ©s do GitHub Releases.

O ficheiro .exe nÃ£o Ã© guardado dentro da Ã¡rvore do repositÃ³rio.

## LicenÃ§a

Este projeto tem cÃ³digo visÃ­vel para uso pessoal, educativo e nÃ£o comercial.

NÃ£o Ã© permitida a revenda, redistribuiÃ§Ã£o comercial ou utilizaÃ§Ã£o dentro de produtos/serviÃ§os pagos sem autorizaÃ§Ã£o prÃ©via por escrito.

Consulta [LICENSE](LICENSE).

## Autor

Criado por Xavier Madrid Lerga sob MPTech Tools.

GitHub: https://github.com/xml2811