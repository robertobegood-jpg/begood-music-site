# Begood Music — site dos apps de música

Site no Vercel para apresentar e baixar os apps Android de música do Roberto fora da Play Store:
Begood Music Player (`D:\Projetos iA\Begood Music`) e Begood Studio (`D:\Projetos iA\Apps Android\Begood-Studio-app-Android`),
e outros do gênero que vierem. Objetivo principal: ser encontrado no Google. Detalhes: `README.md`.
Repositório: github.com/robertobegood-jpg/begood-music-site (público). Endereço previsto: begoodmusic.vercel.app (`SITE_URL` em `scripts/gerar.mjs`).

## Como trabalhar comigo
- Responda e escreva tudo em **português do Brasil**, linguagem simples.
- **Antes de começar, rode `git pull`** (quando estiver no GitHub).
- Os textos ficam em `scripts/gerar.mjs`: edite ali e rode `node scripts/gerar.mjs`. Não edite os `.html` gerados à mão.
- **Teste antes de entregar:** sirva a pasta (`python -m http.server 8765`) e confira no desktop e **no celular** (~375px),
  sem rolagem lateral e sem erros no console.
- Push na `main` publica no Vercel: peça confirmação antes de `git push`.

## Regras importantes
- Visual âmbar (#E0A030) sobre fundo escuro (#14161C), igual aos apps. Efeitos sutis; respeitar `prefers-reduced-motion`.
- Links de download apontam para as Releases do GitHub de cada app (`/releases/latest`). Nunca hospedar APK aqui.
- Ao lançar versão nova de um app, conferir se textos e prints do site continuam batendo com o app.
- SEO: cada app tem título, descrição, dados estruturados (MobileApplication + FAQPage) e entra no `sitemap.xml`.
- Prints: tirados no emulador com o modo demonstração (relógio 12:00). Não usar capas de discos nem letras de músicas reais.
