# Arquitetura e Catálogo de Templates — HTML5 Creative Creator

Este documento descreve o funcionamento interno do **HTML5 Creative Creator (`html5cc`)**, seus templates e o fluxo de geração de criativos publicitários.

---

## 1. Fluxo de Funcionamento

1. **Escolha do Formato / Template (`index.html` / `inventario.html`):**
   - O usuário seleciona entre os templates pré-estruturados (`template-01` a `template-08`) ou abre o construtor livre (`custom.html`).
2. **Parametrização Visual:**
   - A interface permite editar títulos, subtítulos, botão de CTA, cores de fundo, logotipo, imagens de produto e escolher o estilo de transição/efeito mapeado em `efeitos-resumo.js`.
3. **Preview em Tempo Real:**
   - O criativo é renderizado em tempo real dentro de iframes nas dimensões exatas de mídia (ex.: `300x250`, `728x90`, `300x600`, `970x90`).
4. **Empacotamento e Exportação (`dist/` & `templates/`):**
   - O sistema injeta os parâmetros no esqueleto HTML/CSS/JS correspondente da pasta `templates/` e gera o arquivo `.zip` pronto para upload no AdServer com a variável padrão `clickTag`.

---

## 2. Catálogo de Páginas e Templates

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Hub principal com acesso aos templates, construtor e documentação |
| `custom.html` | Editor avançado para criação de peças customizadas |
| `template-01.html` / `template-01-3.html` | Template 01 (versão padrão e versão multi-frame de 3 passos) |
| `template-02.html` | Template 02 focado em destaque de oferta/produto |
| `template-03.html` / `template-03-3.html` | Template 03 (versão padrão e versão de 3 passos) |
| `template-04.html` / `template-04-3.html` | Template 04 (versão padrão e versão de 3 passos) |
| `template-05.html` | Template 05 para campanhas institucionais/varejo |
| `template-06.html` | Template 06 com transições dinâmicas |
| `template-07.html` / `template-07-3.html` | Template 07 (versão padrão e versão de 3 passos) |
| `template-08.html` | Template 08 para formatos especiais |
| `inventario.html` | Especificações técnicas do inventário publicitário |
| `dicas-criacao.html` | Guia de direção de arte e performance |
| `perguntas-frequentes.html` | Dúvidas técnicas sobre homologação de banners |

---

## 3. Servidor Local (`server.js`)

O arquivo `server.js` utiliza apenas os módulos nativos `http`, `fs` e `path` do Node.js (sem precisar instalar pacotes pesados via `npm install`) para servir toda a aplicação em `http://localhost:3000`, evitando bloqueios de CORS ao carregar os templates via `fetch`/`XMLHttpRequest` durante a geração do pacote `.zip`.
