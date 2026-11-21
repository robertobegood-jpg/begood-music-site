# Begood Music — site dos apps de música

Site de apresentação e download dos apps Android de música do Roberto, fora da Play Store:
**Begood Music Player** (player offline com letras e equalizador) e **Begood Studio** (afinador, metrônomo e player de estudo), e o programa para Windows **Begood Split** (separador de instrumentos).
Feito para aparecer no Google: uma página por app, textos com as palavras que as pessoas buscam, perguntas frequentes
e dados estruturados (schema.org) de app gratuito.

- HTML, CSS e JS puros, sem dependências e sem etapa de build. Base copiada do site Kit do Motorista (`Sites/apps-site`).
- A versão, a data, o tamanho e as novidades vêm da **última Release do GitHub** de cada app, direto no navegador.
  O botão "Baixar APK" aponta para o arquivo `.apk` dessa Release.
- Fundo em WebGL que lembra um equalizador; pausa fora da tela e respeita "reduzir movimento". Sem WebGL, vira uma grade em CSS.
- Visual âmbar sobre fundo escuro, igual aos apps.

## Publicar no Vercel

1. Crie o repositório no GitHub (ex.: `begood-music-site`) e envie este projeto.
2. Em vercel.com, **Add New › Project** e importe o repositório.
3. **Project Name:** `begoodmusic` (o endereço fica begoodmusic.vercel.app). Framework Preset: **Other**.
   Build Command: vazio. Output Directory: `.` (raiz). **Deploy.**
4. Se o endereço final for outro (ou um domínio próprio), troque `SITE_URL` em `scripts/gerar.mjs` e rode o gerador.

A cada push na `main`, o Vercel publica de novo. Lançar uma versão nova de um app **não exige mexer no site**.

## Cadastrar no Google

1. No [Google Search Console](https://search.google.com/search-console), adicione a propriedade com o endereço do site.
2. Escolha a verificação por **Tag HTML**, copie só o código do `content="..."` e cole em `GOOGLE_VERIFICACAO`
   em `scripts/gerar.mjs`. Rode o gerador, faça o commit e o push. Depois clique em **Verificar**.
3. Em **Sitemaps**, envie `sitemap.xml`.
4. Opcional: o Bing Webmaster Tools importa tudo do Search Console com um clique.

## Editar textos

Os textos de cada app ficam em `scripts/gerar.mjs` (lista `APPS`; as perguntas da home em `FAQ_GERAL`). Depois de editar:

```
node scripts/gerar.mjs
```

e faça o commit dos `.html` gerados. Para abrir sem servidor: `node scripts/gerar.mjs --previa` (gera a pasta `../begood-music-site-previa`).

**Novo app de música:** acrescente um item em `APPS` (slug, repositório, textos, ícone em `assets/img/<icone>.svg` e `.png`,
QR Code de download) e rode o gerador. O card "Novos apps" da página inicial só aparece com menos de três apps.
Programa de PC: marque `pc: true` (instalador .exe em vez de APK, sem Obtainium/QR, com `requisitos` e `creditos`).

## Estrutura

```
index.html                 início (apps, como instalar, atualizações, perguntas, cafezinho)
music-player/ studio/ split/  página de cada app (telas, funções, instalar, novidades, perguntas, privacidade)
404.html
assets/css/site.css        cores e componentes
assets/js/site.js          versão ao vivo, link do APK, novidades, copiar Pix
assets/js/campo.js         efeito WebGL (equalizador)
assets/fonts/              Archivo, Instrument Serif, Inter e Geist Mono (SIL OFL 1.1)
assets/img/                ícones, prints dos apps, QR Codes e imagem de compartilhamento (og.png)
scripts/gerar.mjs          gerador das páginas, sitemap.xml e robots.txt
```

Desenvolvido por Roberto Santos da Silva.
