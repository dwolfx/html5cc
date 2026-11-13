# 🎨 HTML5 Creative Creator (`html5cc`)

Plataforma e biblioteca de **templates interativos de banners HTML5**, construtor customizado (`custom.html`), catálogo de inventário de mídia e gerador de pacotes prontos para veiculação publicitária (Google Ad Manager / DFP / IAB).

---

## 🚀 Principais Recursos

* **Catálogo de Templates Prontos (`template-01` a `template-08`):**
  * Variações de formatos IAB (300x250, 300x600, 728x90, 970x250, etc.), incluindo versões com 3 etapas/frames (`template-01-3.html`, `template-03-3.html`, `template-04-3.html`, `template-07-3.html`).
* **Construtor Customizado (`custom.html`):**
  * Interface visual para personalização de textos, cores, imagens, CTAs, animações e exportação do criativo HTML5.
* **Catálogo de Inventário & Especificações (`inventario.html`):**
  * Guia visual dos formatos de mídia disponíveis, dimensões, pesos máximos e áreas seguras.
* **Documentação Integrada para Designers & Mídia:**
  * `dicas-criacao.html`: Boas práticas de design, tipografia, contraste e performance em banners HTML5.
  * `perguntas-frequentes.html`: FAQ técnico sobre clickTags, limites de peso, fontes e submissão de peças.
* **Servidor Local Zero-Dependency (`server.js`):**
  * Servidor HTTP nativo em Node.js na porta `3000` com suporte completo a MIME types (`.html`, `.css`, `.js`, `.svg`, `.woff2`, `.zip`).

---

## 📁 Estrutura de Pastas

```text
html5cc/
├── index.html                  # Página inicial e vitrine da plataforma
├── custom.html                 # Construtor interativo de criativos customizados
├── inventario.html             # Catálogo de formatos e especificações de mídia
├── dicas-criacao.html          # Guia de boas práticas de criação
├── perguntas-frequentes.html   # FAQ técnico de produção e veiculação
├── template-01.html .. 08.html # Páginas de configuração e preview de cada template
├── efeitos-resumo.js           # Motor e catálogo de efeitos visuais/animações
├── templates/                  # Código-fonte base dos templates HTML5 exportáveis
├── modelos-banners/            # Exemplos e modelos de banners prontos
├── dist/                       # Pacotes e builds gerados
├── css/ & bootstrap/           # Folhas de estilo da interface e componentes
├── js/ & vendor/               # Scripts da aplicação, zip builders e bibliotecas
├── images/ & fonts/            # Ativos gráficos e fontes da plataforma
├── server.js                   # Servidor HTTP Node.js (porta 3000)
└── iniciar.bat                 # Atalho rápido para iniciar no Windows
```

---

## 🛠️ Como Executar Localmente

### Via Node.js / NPM
```bash
npm start
```

### No Windows (Um Clique)
Basta executar o arquivo **`iniciar.bat`**, que sobe o servidor local e abre automaticamente:
```text
http://localhost:3000
```

Para mais detalhes sobre os templates e o funcionamento do gerador de pacotes, consulte [TEMPLATES_E_ARQUITETURA.md](./TEMPLATES_E_ARQUITETURA.md).
