// Gera as páginas do site Begood Music a partir dos dados abaixo.
// Uso: node scripts/gerar.mjs            → páginas com URLs limpas (para o Vercel)
//      node scripts/gerar.mjs --previa   → links com index.html (para abrir sem servidor)
// Para mudar um texto, edite aqui e rode de novo. Os .html gerados vão para o repositório.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PREVIA = process.argv.includes("--previa");
const SAIDA = PREVIA ? path.join(RAIZ, "..", "begood-music-site-previa") : RAIZ;
const SITE_URL = "https://begoodmusic.vercel.app"; // troque se o endereço no Vercel (ou o domínio) for outro
const SITE = "Begood Music";
const GH = "robertobegood-jpg";
const AUTOR = "Roberto Santos da Silva";
// Código de verificação do Google Search Console (Tag HTML). Deixe vazio até cadastrar o site.
const GOOGLE_VERIFICACAO = "";

const PIX = "00020126630014br.gov.bcb.pix0128robertobegood+itau@gmail.com0209Cafezinho5204000053039865802BR5923Roberto Santos da Silva6009Sao Paulo62070503***63047463";

const APPS = [
  {
    slug: "music-player",
    classe: "app-bmp",
    nome: "Begood Music Player",
    curto: "B.M.P",
    repo: `${GH}/Begood-Music-Player-app-Android`,
    icone: "bmp-icone",
    qr: "qr-bmp.svg",
    categoria: "Player de música",
    titulo: "Suas músicas, do jeito <em>certo</em>.",
    seo: "Begood Music Player: player de música offline para Android, grátis e sem anúncios",
    resumo: "Player gratuito e sem anúncios para as músicas guardadas no celular: letras sincronizadas, equalizador paramétrico que funciona no Bluetooth, editor de tags com capas, playlists Genius e Android Auto.",
    card: "Para quem guarda a própria coleção: letra sincronizada, equalizador de verdade, tags e capas, playlists Genius e carro.",
    tags: ["MP3 e FLAC", "Letras", "Android Auto"],
    maquete: "letra",
    destaques: [
      {
        img: "bmp-equalizador.jpg",
        alt: "Tela do equalizador paramétrico do Begood Music Player com o preset Rock",
        titulo: "Equalizador <em>paramétrico</em> que vale no Bluetooth.",
        texto: [
          "A maioria dos players usa o equalizador do próprio celular, que muitas vezes não funciona no fone Bluetooth nem no carro. O B.M.P faz a equalização dentro do app, então ela vale em <strong>qualquer saída</strong>.",
          "São até <strong>10 bandas</strong> com frequência, ganho e largura livres, filtros de pico, graves e agudos, pré-amplificação automática para não distorcer e presets prontos ou criados por você."
        ]
      }
    ],
    funcoes: [
      ["Biblioteca", ["Você escolhe as <strong>pastas</strong> que entram; sem escolher, usa a pasta Music do celular e do cartão SD.", "Abas de Álbuns, Artistas, Músicas, Gêneros, Playlists e Buscar.", "Artistas separados por <strong>artista do álbum</strong> e <strong>artista da faixa</strong>: participações (feat.) aparecem nos dois.", "MP3, FLAC, M4A, OGG, WAV e outros formatos."]],
      ["Letras", ["Procura nas tags, em arquivo <strong>.lrc</strong> ou .txt com o mesmo nome e no <strong>LRCLIB</strong>, com letra sincronizada.", "Também dá para pesquisar no Google, colar a letra e <strong>gravar na música</strong>.", "Gravar as letras de toda a biblioteca de uma vez."]],
      ["Editor de tags", ["Uma música, o álbum inteiro ou várias de uma vez.", "Artista, álbum, ano, gênero, número da faixa, letra e <strong>capa</strong>.", "<strong>Atualizar pela internet</strong>: dados e capa em alta resolução do iTunes e do Deezer."]],
      ["Playlists", ["Playlists suas e automáticas: <strong>Favoritas</strong>, Mais tocadas, Recentes e Adicionadas.", "Importar e exportar <strong>.m3u</strong>, inclusive playlists feitas no PC.", "<strong>Genius</strong>: escolha uma música e o app monta uma playlist que combina com ela, como no iPod, e funciona sem internet."]],
      ["Modo estudo", ["<strong>Velocidade</strong> sem mudar o tom e <strong>tom</strong> acima ou abaixo.", "<strong>Repetir trecho A/B</strong> para tirar uma parte da música."]],
      ["Bluetooth e carro", ["Controles do fone e do carro, título e capa no visor.", "Navegue por álbuns, artistas e playlists no <strong>Android Auto</strong>.", "O play do carro <strong>retoma a última fila</strong> mesmo com o app fechado."]]
    ],
    privacidade: [
      "<strong>Sem cadastro, sem anúncios e sem servidor próprio.</strong> Músicas, playlists e estatísticas ficam só no seu celular.",
      "A internet é usada só para buscar letras (LRCLIB), dados e capas de álbuns (iTunes e Deezer) e músicas parecidas (Last.fm), com o nome do artista, do álbum ou da música.",
      "Nenhum arquivo de música é enviado para lugar nenhum.",
      "A chave opcional da Last.fm fica guardada no próprio celular."
    ],
    permissoes: [
      ["Músicas e áudio", "Ler as músicas do celular e gravar tags e letras quando você pedir"],
      ["Notificações", "Mostrar a música tocando, com os controles"],
      ["Internet", "Letras, capas, dados de álbuns e Genius"],
      ["Tocar em segundo plano", "Continuar tocando com a tela apagada e no carro"]
    ],
    instalar: [
      ["Baixe o APK", "Pelo celular, toque em “Baixar APK” nesta página."],
      ["Permita a instalação", "Abra o arquivo e permita “instalar apps desconhecidos” quando o Android pedir."],
      ["Permita o acesso", "Ao abrir o app, toque em Permitir para ele ler suas músicas e mostrar os controles."],
      ["Escolha as pastas", "Em Configurações, adicione as pastas das suas músicas ou deixe a pasta Music."]
    ],
    atualizar: "Baixe o APK da versão nova e instale por cima. As playlists, favoritas e ajustes continuam.",
    dica: "Se a música parar com a tela apagada: Configurações do Android › Apps › B.M.P › Bateria → Sem restrições.",
    faq: [
      ["O Begood Music Player toca música sem internet?", "Sim. Ele toca as músicas que já estão no celular, sem internet. A internet só é usada, se você quiser, para buscar letras, capas e dados de álbuns."],
      ["Funciona com Spotify, YouTube Music ou Deezer?", "Não. O B.M.P é para os seus arquivos de música (MP3, FLAC, M4A, OGG...) guardados no celular ou no cartão de memória."],
      ["O equalizador funciona no fone Bluetooth e no carro?", "Funciona. A equalização é feita dentro do app, então vale para alto-falante, fone com fio, fone Bluetooth e som do carro."],
      ["Como colocar a letra nas músicas?", "Abra a letra em Tocando agora. O app procura nas tags, em arquivos .lrc e no LRCLIB. Depois toque em Gravar na música para ela ficar salva no próprio arquivo."]
    ]
  },
  {
    slug: "studio",
    classe: "app-studio",
    nome: "Begood Studio",
    curto: "Studio",
    repo: `${GH}/Begood-Studio-app-Android`,
    icone: "studio-icone",
    qr: "qr-studio.svg",
    categoria: "Afinador, metrônomo e estudo",
    titulo: "Afine, marque o tempo e <em>tire</em> o solo.",
    seo: "Begood Studio: afinador, metrônomo e player para estudar música, grátis para Android",
    resumo: "Afinador cromático de alta precisão, metrônomo com treino de velocidade e player que deixa a música mais lenta sem mudar o tom, com repetição A/B. Grátis, sem anúncios e sem internet.",
    card: "Afinador com precisão de centésimos de cent, metrônomo com treino de velocidade e player para tirar solos devagar.",
    tags: ["Afinador", "Metrônomo", "Velocidade e tom"],
    maquete: "afinador",
    prints: [
      ["studio-afinador.jpg", "Afinador", "Afinador do Begood Studio com ponteiro, cordas do violão e Lá 440 Hz"],
      ["studio-metronomo.jpg", "Metrônomo", "Metrônomo do Begood Studio em 100 BPM, compasso 4/4"],
      ["studio-player.jpg", "Player", "Player de estudo com forma de onda e repetição de trecho A/B"]
    ],
    funcoes: [
      ["Afinador", ["Mostra a nota, quantos <strong>cents</strong> está acima ou abaixo e a frequência.", "<strong>Ponteiro</strong> ou <strong>estrobo</strong>, como os afinadores de bancada.", "Precisão medida nos testes: cerca de <strong>0,01 cent</strong> em som limpo.", "Toque numa corda para <strong>fixá-la</strong> quando ela estiver muito desafinada."]],
      ["Afinações", ["Violão e guitarra: padrão, meio tom e um tom abaixo, Drop D, Open G, Open D e DADGAD.", "Guitarra de 7 cordas, <strong>baixo</strong> de 4 e 5 cordas, <strong>cavaquinho</strong>, ukulele.", "Violino, bandolim, viola de arco, violoncelo ou modo cromático.", "Lá de referência de 415 a 466 Hz (atalhos 432, 440 e 442)."]],
      ["Metrônomo", ["20 a 300 BPM, ajuste fino, barra ou <strong>toque no ritmo</strong>.", "Compassos de 2/4 a 12/8; colcheias, tercinas e semicolcheias.", "<strong>Treino de velocidade</strong>: sobe o BPM sozinho a cada tantos compassos.", "<strong>Compassos mudos</strong> para treinar o tempo interno."]],
      ["Player de estudo", ["Velocidade de <strong>25% a 200% sem mudar o tom</strong>.", "<strong>Tom</strong> ±12 semitons com ajuste fino em cents.", "Abre MP3, M4A, FLAC, WAV e OGG do celular."]],
      ["Repetir trecho A/B", ["Marque A e B no ponto atual ou <strong>arrastando o dedo na forma de onda</strong>.", "Pausa com contagem antes de repetir e contador de voltas.", "<strong>Acelerar a cada volta</strong>: comece em 60% e chegue a 100%.", "Trechos salvos por música (“Solo 1”, “Riff do refrão”)."]],
      ["Feito para estudar", ["A tela fica acesa enquanto o app está aberto.", "O metrônomo continua tocando junto com o player.", "Sem anúncios interrompendo o estudo."]]
    ],
    privacidade: [
      "<strong>Sem cadastro, sem anúncios e sem internet:</strong> o app não tem permissão de internet.",
      "O som do microfone é analisado na hora, só para o afinador, e <strong>nunca é gravado</strong>.",
      "As músicas abertas no player são lidas do próprio celular."
    ],
    permissoes: [
      ["Microfone", "Ouvir o instrumento no afinador"],
      ["Vibração", "Vibrar no tempo do metrônomo (opcional)"]
    ],
    instalar: [
      ["Baixe o APK", "Pelo celular, toque em “Baixar APK” nesta página."],
      ["Permita a instalação", "Abra o arquivo e permita “instalar apps desconhecidos” quando o Android pedir."],
      ["Permita o microfone", "No afinador, toque em Permitir para o app ouvir o instrumento."],
      ["Escolha a afinação", "No alto do afinador, escolha o instrumento e a afinação. Pronto para tocar."]
    ],
    atualizar: "Baixe o APK da versão nova e instale por cima. Os ajustes e os trechos salvos continuam.",
    faq: [
      ["O afinador do Begood Studio serve para violão, guitarra e baixo?", "Serve. Tem afinações prontas para violão, guitarra (6 e 7 cordas), baixo de 4 e 5 cordas, cavaquinho, ukulele, violino, bandolim, viola e violoncelo, além do modo cromático para qualquer instrumento."],
      ["Dá para deixar a música mais lenta sem mudar o tom?", "Dá. O player muda a velocidade de 25% a 200% mantendo o tom, e também muda o tom sem mexer na velocidade."],
      ["Como repetir só um trecho da música?", "No Player, marque o ponto A e o ponto B (ou arraste o dedo na forma de onda) e ligue Repetir. Dá para acelerar um pouco a cada volta."],
      ["Precisa de internet?", "Não. O Begood Studio não tem permissão de internet: tudo funciona no celular, inclusive no ensaio sem sinal."]
    ]
  }
];

// Perguntas da página inicial (também viram dados estruturados para o Google).
const FAQ_GERAL = [
  ["É seguro instalar um APK fora da Play Store?", "Sim, desde que venha de uma fonte confiável. Os APKs dos apps Begood são gerados e assinados automaticamente a partir do código aberto, publicado no GitHub, onde qualquer pessoa pode conferir o que o app faz."],
  ["Por que o Android mostra um aviso ao instalar?", "O aviso aparece para qualquer app que não veio da Play Store. Basta permitir “instalar apps desconhecidos” para o navegador ou o gerenciador de arquivos. Se o Play Protect avisar, toque em Mais detalhes › Instalar mesmo assim."],
  ["Os apps são mesmo grátis?", "São. Não têm anúncios, compras dentro do app nem assinatura. Quem quiser pode apoiar com um cafezinho por Pix."],
  ["Como atualizar para uma versão nova?", "Baixe o APK da versão nova e instale por cima: os dados continuam. Para ser avisado sozinho, use o Obtainium, um app gratuito que acompanha as versões no GitHub."],
  ["Funciona em qual versão do Android?", "Android 8.0 ou mais novo, em celulares de qualquer marca."]
];

// ---------- utilidades ----------
const I = {
  baixar: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 1.5v9M4 7l4 4 4-4M2 14.5h12"/></svg>',
  github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.34.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/></svg>',
  voltar: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
  seta: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
  copiar: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="5" width="9" height="9"/><path d="M11 5V2H2v9h3"/></svg>',
  marca: '<svg class="marca-sinal" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="17" height="17" stroke="currentColor"/><path d="M7 14v-3M10 15V7M13 13V9M16 14v-2" stroke="#E0A030" stroke-width="1.6" stroke-linecap="square"/></svg>'
};
const cantos = '<span class="canto c1"></span><span class="canto c2"></span><span class="canto c3"></span><span class="canto c4"></span>';
const num = (n) => String(n).padStart(2, "0");
const semTags = (s) => s.replace(/<[^>]+>/g, "");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

function link(pref, alvo) {
  if (PREVIA) {
    if (alvo === "") return pref + "index.html";
    if (alvo.startsWith("#")) return pref + "index.html" + alvo;
    if (alvo.endsWith("/")) return pref + alvo + "index.html";
  }
  if (alvo === "") return pref || "/";
  return pref + alvo;
}

function cabeca({ titulo, descricao, pref, canonico, imagem, dados = [] }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${GOOGLE_VERIFICACAO ? `<meta name="google-site-verification" content="${GOOGLE_VERIFICACAO}">\n` : ""}<title>${titulo}</title>
<meta name="description" content="${descricao}">
<meta name="author" content="${AUTOR}">
<meta name="theme-color" content="#14161c">
<link rel="canonical" href="${SITE_URL}${canonico}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${SITE}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:url" content="${SITE_URL}${canonico}">
<meta property="og:image" content="${SITE_URL}/assets/img/${imagem}">
<meta name="twitter:card" content="${imagem === "og.png" ? "summary_large_image" : "summary"}">
<link rel="icon" href="${pref}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${pref}assets/img/bmp-icone.png">
<link rel="preload" href="${pref}assets/fonts/archivo.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="${pref}assets/fonts/inter-400.woff" as="font" type="font/woff" crossorigin>
<link rel="stylesheet" href="${pref}assets/css/site.css">
${dados.map((d) => `<script type="application/ld+json">${json(d)}</script>`).join("\n")}
</head>`;
}

function topo(pref, atual) {
  const a = (k) => (atual === k ? ' aria-current="page"' : "");
  return `<a class="visually-hidden" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
  <div class="wrap">
    <a class="marca" href="${link(pref, "")}">${I.marca}<span class="hud"><b>Begood</b> Music</span></a>
    <nav class="nav" aria-label="Principal">
      <a href="${link(pref, "#apps")}"${a("apps")}>Apps</a>
      <a href="${link(pref, "#instalar")}">Instalar</a>
      <a class="nav-extra" href="${link(pref, "#cafezinho")}">Cafezinho</a>
    </nav>
  </div>
</header>`;
}

function rodape(pref) {
  return `<footer class="rodape">
  <div class="wrap">
    <div>
      <p class="hud"><b>${AUTOR}</b></p>
      <p class="muted" style="margin:6px 0 0;font-size:14px">Apps de música gratuitos, sem anúncios e de código aberto (GPL-3.0).</p>
    </div>
    <div class="rodape-links hud">
      ${APPS.map((x) => `<a href="${link(pref, x.slug + "/")}">${x.nome}</a>`).join("\n      ")}
      <a href="https://github.com/${GH}" rel="noopener">GitHub</a>
    </div>
  </div>
</footer>
<script src="${pref}assets/js/site.js" defer></script>
<script src="${pref}assets/js/campo.js" defer></script>
</body>
</html>
`;
}

const rotulo = (n, texto) => `<div class="rotulo hud revela">${num(n)}/${texto}</div>`;

function passos(lista) {
  return `<ol class="passos">
${lista.map(([t, d]) => `    <li class="revela"><strong>${t}</strong><p>${d}</p></li>`).join("\n")}
  </ol>`;
}

function perguntas(lista) {
  return `<div class="faq">
${lista.map(([q, r]) => `      <details class="revela"><summary>${q}</summary><p>${r}</p></details>`).join("\n")}
    </div>`;
}
const dadosFaq = (lista) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: lista.map(([q, r]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: r } }))
});

function cafezinho(n, pref) {
  return `<section class="secao" id="cafezinho">
  <div class="wrap">
    ${rotulo(n, "Cafezinho")}
    <div class="duas">
      <div class="revela">
        <h2 class="display display-md secao-titulo">Ajudou no seu <em>som</em>?</h2>
        <p class="lead">Os apps são gratuitos e vão continuar assim. Se algum faz parte do seu dia, dá para apoiar com um Pix de qualquer valor.</p>
      </div>
      <div class="marcas pix revela">${cantos}
        <img class="pix-qr" src="${pref}assets/img/qr-pix.svg" width="168" height="168" alt="QR Code do Pix">
        <div>
          <p class="hud">Chave Pix · e-mail</p>
          <p style="margin:6px 0 0;font-weight:500;word-break:break-all">robertobegood+itau@gmail.com</p>
          <p class="muted" style="margin:0;font-size:14px">${AUTOR}</p>
          <code class="pix-codigo" id="pix">${PIX}</code>
          <button class="btn btn-solido btn-largo" type="button" data-copiar="#pix">${I.copiar}Copiar Pix copia e cola</button>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// Instruções completas para instalar fora da Play Store (home e páginas dos apps).
function marcasCelular() {
  return `<details class="marcas-cel revela">
      <summary>Onde fica “instalar apps desconhecidos” em cada marca</summary>
      <ul class="lista-simples">
        <li><strong>Samsung:</strong> Configurações › Aplicativos › menu ⋮ › Acesso especial › Instalar aplicativos desconhecidos.</li>
        <li><strong>Xiaomi, Redmi e Poco:</strong> Configurações › Privacidade (ou Proteção) › Fontes desconhecidas.</li>
        <li><strong>Motorola e Android puro:</strong> Configurações › Apps › Acesso especial a apps › Instalar apps desconhecidos.</li>
        <li>Escolha o app usado para abrir o APK (Chrome ou Arquivos) e ative <strong>Permitir desta fonte</strong>. Depois de instalar, pode desativar de novo.</li>
        <li>Se o <strong>Play Protect</strong> avisar que o app é desconhecido, toque em <strong>Mais detalhes › Instalar mesmo assim</strong>. O aviso aparece para qualquer app de fora da loja.</li>
      </ul>
    </details>`;
}

// ---------- página inicial ----------
function home() {
  const pref = "";
  const cards = APPS.map((x) => `    <article class="app-card ${x.classe} revela">
      <div class="app-card-topo">
        <img class="app-icone" src="assets/img/${x.icone}.svg" width="64" height="64" alt="">
        <span class="versao" data-repo="${x.repo}" data-campo="versao">···</span>
      </div>
      <p class="hud" style="margin:0;flex:none"><span class="dot"></span>${x.categoria}</p>
      <h3 class="heading"><a href="${link(pref, x.slug + "/")}">${x.nome}</a></h3>
      <p>${x.card}</p>
      <div class="tags">${x.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="acoes">
        <a class="btn" href="${link(pref, x.slug + "/")}">Detalhes</a>
        <a class="btn btn-solido" href="https://github.com/${x.repo}/releases/latest" data-repo="${x.repo}" data-campo="baixar" rel="noopener">${I.baixar}APK</a>
      </div>
    </article>`).join("\n");
  const breve = `    <article class="app-card app-breve revela">
      <div class="app-card-topo"><span class="breve-icone" aria-hidden="true">+</span></div>
      <p class="hud" style="margin:0;flex:none"><span class="dot"></span>Em breve</p>
      <h3 class="heading">Novos apps</h3>
      <p>Mais ferramentas para músicos estão a caminho. Tem uma ideia? Mande uma sugestão no GitHub.</p>
      <div class="acoes" style="grid-template-columns:1fr"><a class="btn" href="https://github.com/${GH}" rel="noopener">${I.github}Ver no GitHub</a></div>
    </article>`;

  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE,
    url: SITE_URL + "/",
    inLanguage: "pt-BR",
    description: "Apps Android gratuitos, sem anúncios e de código aberto para quem ama música.",
    author: { "@type": "Person", name: AUTOR }
  };

  return `${cabeca({ titulo: "Begood Music: player de música, afinador e metrônomo grátis para Android", descricao: "Apps Android gratuitos, sem anúncios e de código aberto para quem ama música: Begood Music Player (player offline com letras e equalizador) e Begood Studio (afinador, metrônomo e player de estudo).", pref, canonico: "/", imagem: "og.png", dados: [site, dadosFaq(FAQ_GERAL)] })}
<body class="app-bmp">
${topo(pref, "apps")}
<main id="conteudo">
<section class="hero">
  <canvas class="campo" aria-hidden="true"></canvas>
  <div class="wrap">
    <p class="hud"><span class="dot"></span>00/Begood Music · Apps Android</p>
    <h1 class="display display-lg">Apps para quem<br><em>vive</em> de música.</h1>
    <p class="lead">Ouvir a sua coleção com letra e equalizador de verdade, afinar o instrumento, marcar o tempo e tirar aquele solo devagar. Gratuitos, sem anúncios e de código aberto.</p>
    <div class="hero-acoes">
      <a class="btn btn-solido" href="#apps">Ver os apps ${I.seta}</a>
      <a class="btn" href="#instalar">Como instalar</a>
    </div>
    <div class="numeros marcas">${cantos}
      <div><span class="hud">Apps</span><strong>${APPS.length}</strong></div>
      <div><span class="hud">Anúncios</span><strong>0</strong></div>
      <div><span class="hud">Preço</span><strong>R$&nbsp;0</strong></div>
      <div><span class="hud">Android</span><strong>8+</strong></div>
    </div>
  </div>
</section>

<section class="secao" id="apps">
  <div class="wrap">
    ${rotulo(1, "Apps")}
    <div class="apps">
${cards}
${breve}
    </div>
  </div>
</section>

<section class="secao" id="instalar">
  <div class="wrap">
    ${rotulo(2, "Como instalar")}
    <h2 class="display display-md secao-titulo revela">Fora da Play Store, em <em>quatro</em> passos.</h2>
    ${passos([
      ["Abra pelo celular", "Entre nesta página pelo navegador do celular Android (8.0 ou mais novo)."],
      ["Baixe o APK", "Toque em “APK” no app que quiser. O download começa na hora."],
      ["Permita a instalação", "Abra o arquivo baixado e permita “instalar apps desconhecidos” quando o Android pedir."],
      ["Pronto", "Abra o app. Para atualizar, instale a versão nova por cima: os dados continuam salvos."]
    ])}
    ${marcasCelular()}
  </div>
</section>

<section class="secao" id="atualizacoes">
  <div class="wrap">
    ${rotulo(3, "Atualizações automáticas")}
    <div class="duas">
      <div class="revela">
        <h2 class="display display-md secao-titulo">Sempre na <em>última</em> versão.</h2>
        <p class="lead">Use o <a href="https://github.com/ImranR98/Obtainium" rel="noopener">Obtainium</a>, um app gratuito e de código aberto que acompanha as versões no GitHub e avisa quando sai uma nova.</p>
      </div>
      <ul class="lista-simples revela">
        <li>Instale o <strong>Obtainium</strong> e abra a página do app que quiser aqui no site.</li>
        <li>Toque em <strong>“Adicionar ao Obtainium”</strong>, ou cole o link do GitHub do app em “Adicionar app”.</li>
        <li>Pronto: ele avisa e instala as atualizações por cima, sem perder os dados.</li>
      </ul>
    </div>
  </div>
</section>

<section class="secao" id="perguntas">
  <div class="wrap">
    ${rotulo(4, "Perguntas frequentes")}
    ${perguntas(FAQ_GERAL)}
  </div>
</section>

${cafezinho(5, pref)}
</main>
${rodape(pref)}`;
}

// ---------- maquetes animadas ----------
function maqueteLateral(x) {
  if (x.maquete === "letra") {
    return `<div class="maquete marcas maquete-letra" aria-hidden="true">${cantos}
        <p class="hud ao-vivo" style="margin:0">Tocando agora</p>
        <div class="capa-falsa"><span></span></div>
        <p class="faixa-nome">Estrada de Luz</p>
        <p class="hud" style="margin:0">Banda Exemplo · Demonstração</p>
        <div class="letra"><div data-letra>
          <p>Liga o som e deixa a noite andar</p>
          <p>Cada nota acende um lugar</p>
          <p>O refrão chegou, pode cantar</p>
          <p>Sua coleção, do jeito que é</p>
          <p>Volume no talo, batida no pé</p>
          <p>Toca de novo, se a gente quiser</p>
        </div></div>
        <div class="barra-tempo"><i data-tempo></i></div>
        <div class="eq-mini"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>`;
  }
  if (x.maquete === "afinador") {
    return `<div class="maquete marcas maquete-afinador" aria-hidden="true">${cantos}
        <p class="hud" style="margin:0">Violão · Padrão (E A D G B E)</p>
        <div class="nota" data-af="nota">A<small>2</small></div>
        <p class="cents" data-af="cents">+12 cents</p>
        <svg class="mostrador" viewBox="0 0 200 110">
          <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/>
          <path d="M92 21 A80 80 0 0 1 108 21" fill="none" stroke="#4CD07D" stroke-width="6"/>
          <g data-af="ponteiro" style="transform-origin:100px 100px;transform:rotate(22deg)"><line x1="100" y1="100" x2="100" y2="28" stroke="#E0A030" stroke-width="3" stroke-linecap="round"/></g>
          <circle cx="100" cy="100" r="6" fill="#E0A030"/>
        </svg>
        <div class="maquete-grade">
          <div><span class="hud">Frequência</span><b data-af="hz">110,76 Hz</b></div>
          <div><span class="hud">Lá</span><b>440 Hz</b></div>
        </div>
        <div class="cordas" data-af="cordas"><i>E2</i><i class="on">A2</i><i>D3</i><i>G3</i><i>B3</i><i>E4</i></div>
      </div>`;
  }
  return "";
}

const scriptMaquete = {
  letra: `<script>
(function(){var L=document.querySelectorAll('[data-letra] p'),T=document.querySelector('[data-tempo]'),i=0;
function m(){L.forEach(function(p,k){p.className=k===i?'atual':(k<i?'passou':'')});var c=document.querySelector('[data-letra]');c.style.transform='translateY('+(-Math.max(0,i-1)*2.1)+'em)';T.style.width=((i+1)/L.length*100)+'%';}
m();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;setInterval(function(){i=(i+1)%L.length;m();},2400);})();
</script>`,
  afinador: `<script>
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var C=[['E',2,82.41],['A',2,110],['D',3,146.83],['G',3,196],['B',3,246.94],['E',4,329.63]],k=1,c=12,q=function(n){return document.querySelector('[data-af='+n+']')};
var P=q('ponteiro'),N=q('nota'),S=q('cents'),H=q('hz'),K=q('cordas').children;
setInterval(function(){c=c*0.82+(Math.random()-.5)*0.6;if(Math.abs(c)<0.4){k=(k+1)%C.length;c=(Math.random()<.5?-1:1)*(15+Math.random()*25);}
var n=C[k];N.innerHTML=n[0]+'<small>'+n[1]+'</small>';S.textContent=(c>0?'+':'')+c.toFixed(1).replace('.',',')+' cents';S.className='cents'+(Math.abs(c)<2?' ok':'');
H.textContent=(n[2]*Math.pow(2,c/1200)).toFixed(2).replace('.',',')+' Hz';P.style.transform='rotate('+(c*1.6)+'deg)';
for(var j=0;j<K.length;j++)K[j].className=j===k?'on':'';},180);})();
</script>`
};

// ---------- página de cada app ----------
function paginaApp(x) {
  const pref = "../";
  let n = 0;
  const url = `${SITE_URL}/${x.slug}/`;
  const app = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: x.nome,
    url,
    description: x.resumo,
    operatingSystem: "Android 8.0 ou superior",
    applicationCategory: "MultimediaApplication",
    image: `${SITE_URL}/assets/img/${x.icone}.png`,
    downloadUrl: `https://github.com/${x.repo}/releases/latest`,
    license: "https://www.gnu.org/licenses/gpl-3.0.html",
    isAccessibleForFree: true,
    inLanguage: "pt-BR",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    author: { "@type": "Person", name: AUTOR }
  };
  if (x.prints) app.screenshot = x.prints.map(([f]) => `${SITE_URL}/assets/img/${f}`);

  const secaoTelas = x.prints ? `
<section class="secao">
  <div class="wrap">
    ${rotulo(++n, "Telas")}
    <div class="galeria" tabindex="0" aria-label="Telas do ${x.nome}">
${x.prints.map(([f, nome, alt], i) => `      <figure><img src="${pref}assets/img/${f}" width="540" height="1200" alt="${alt}" loading="${i < 2 ? "eager" : "lazy"}"><figcaption class="hud">${num(i + 1)}/${nome}</figcaption></figure>`).join("\n")}
    </div>
  </div>
</section>` : "";

  const secaoDestaques = (x.destaques || []).map((d) => `
<section class="secao">
  <div class="wrap">
    ${rotulo(++n, "Destaque")}
    <div class="destaque">
      <div class="revela">
        <h2 class="display display-md secao-titulo">${d.titulo}</h2>
        ${d.texto.map((t) => `<p class="lead" style="margin-bottom:1em">${t}</p>`).join("\n        ")}
      </div>
      <figure class="destaque-print revela"><img src="${pref}assets/img/${d.img}" width="540" height="1200" alt="${d.alt}" loading="lazy"></figure>
    </div>
  </div>
</section>`).join("");

  return `${cabeca({ titulo: `${x.seo} | ${SITE}`, descricao: x.resumo, pref, canonico: `/${x.slug}/`, imagem: `${x.icone}.png`, dados: [app, dadosFaq(x.faq)] })}
<body class="${x.classe}">
${topo(pref, "")}
<main id="conteudo">
<section class="hero">
  <canvas class="campo" aria-hidden="true"></canvas>
  <div class="wrap">
    <a class="voltar hud" href="${link(pref, "")}">${I.voltar}Todos os apps</a>
    <div class="app-hero">
      <div>
        <img class="app-icone app-icone-lg" src="${pref}assets/img/${x.icone}.svg" width="96" height="96" alt="Ícone do ${x.nome}">
        <p class="hud"><span class="dot"></span>${x.nome} · ${x.categoria}</p>
        <h1 class="display display-lg" style="font-size:clamp(40px,7.5vw,80px)">${x.titulo}</h1>
        <p class="lead">${x.resumo}</p>
      </div>
      <div class="baixar marcas" id="baixar">${cantos}
        <div class="baixar-linha"><span class="hud">Versão</span><span data-repo="${x.repo}" data-campo="versao">···</span></div>
        <div class="baixar-linha"><span class="hud">Publicada</span><span data-repo="${x.repo}" data-campo="data">···</span></div>
        <div class="baixar-linha"><span class="hud">Tamanho</span><span data-repo="${x.repo}" data-campo="tamanho">···</span></div>
        <div class="baixar-linha"><span class="hud">Licença</span><span>GPL-3.0</span></div>
        <a class="btn btn-solido btn-largo" href="https://github.com/${x.repo}/releases/latest" data-repo="${x.repo}" data-campo="baixar" rel="noopener">${I.baixar}<span data-rotulo>Baixar APK</span></a>
        <a class="btn btn-largo" href="obtainium://add/https://github.com/${x.repo}">Adicionar ao Obtainium</a>
        <p class="hud aviso-req">Android 8.0 ou superior · Grátis</p>
        <div class="baixar-qr">
          <img src="${pref}assets/img/${x.qr}" width="96" height="96" alt="QR Code para baixar o ${x.nome}" loading="lazy">
          <p>Está no computador? Aponte a câmera do celular para baixar direto.</p>
        </div>
      </div>
    </div>
  </div>
</section>
${secaoTelas}
<section class="secao">
  <div class="wrap">
    ${rotulo(++n, "Funções")}
    <div class="funcoes-com-maquete">
      <div class="funcoes">
${x.funcoes.map(([t, itens], i) => `        <div class="funcao revela"><span class="hud">${num(i + 1)}</span><h3 class="heading">${t}</h3><ul>${itens.map((it) => `<li>${it}</li>`).join("")}</ul></div>`).join("\n")}
      </div>
      <div class="revela maquete-lado">${maqueteLateral(x)}</div>
    </div>
  </div>
</section>
${secaoDestaques}
<section class="secao" id="instalar">
  <div class="wrap">
    ${rotulo(++n, "Como instalar")}
    ${passos(x.instalar)}
    ${marcasCelular()}
    <p class="muted revela" style="margin-top:24px;max-width:46em"><strong style="color:var(--ink);font-weight:500">Atualizações:</strong> ${x.atualizar}${x.dica ? `<br><strong style="color:var(--ink);font-weight:500">Dica:</strong> ${x.dica}` : ""}</p>
  </div>
</section>

<section class="secao">
  <div class="wrap">
    ${rotulo(++n, "Novidades")}
    <div class="duas">
      <div class="revela">
        <h2 class="display display-md secao-titulo">O que mudou na <em>última</em> versão.</h2>
        <a class="btn" href="https://github.com/${x.repo}/releases" rel="noopener">${I.github}Todas as versões</a>
      </div>
      <div class="notas revela" data-repo="${x.repo}" data-campo="notas" aria-live="polite">
        <div class="esqueleto" style="width:40%"></div><div class="esqueleto"></div><div class="esqueleto" style="width:85%"></div><div class="esqueleto" style="width:70%"></div>
      </div>
    </div>
  </div>
</section>

<section class="secao">
  <div class="wrap">
    ${rotulo(++n, "Perguntas frequentes")}
    ${perguntas(x.faq)}
  </div>
</section>

<section class="secao" id="privacidade">
  <div class="wrap">
    ${rotulo(++n, "Privacidade")}
    <div class="duas">
      <div class="revela">
        <h2 class="display display-md secao-titulo">Política de <em>privacidade</em>.</h2>
        <ul class="lista-simples">
${x.privacidade.map((p) => `          <li>${p}</li>`).join("\n")}
        </ul>
      </div>
      <div class="revela">
        <table class="tabela">
          <thead><tr><th>Permissão</th><th>Para quê</th></tr></thead>
          <tbody>
${x.permissoes.map(([p, d]) => `            <tr><td>${p}</td><td>${d}</td></tr>`).join("\n")}
          </tbody>
        </table>
        <p class="muted" style="font-size:14px;margin-top:20px">Código aberto: dá para conferir tudo isso no <a href="https://github.com/${x.repo}" rel="noopener">repositório no GitHub</a>. Dúvidas ou problemas: <a href="https://github.com/${x.repo}/issues" rel="noopener">abra uma issue</a>.</p>
      </div>
    </div>
  </div>
</section>

${cafezinho(++n, pref)}
</main>
${scriptMaquete[x.maquete] || ""}
${rodape(pref)}`;
}

function pagina404() {
  const pref = "/";
  return `${cabeca({ titulo: `Página não encontrada | ${SITE}`, descricao: "Página não encontrada.", pref, canonico: "/404", imagem: "og.png" })}
<body class="app-bmp">
${topo(pref, "")}
<main id="conteudo">
<section class="hero" style="min-height:70vh">
  <canvas class="campo" aria-hidden="true"></canvas>
  <div class="wrap">
    <p class="hud"><span class="dot"></span>404/Fora do tom</p>
    <h1 class="display display-lg">Essa página <em>não</em> existe.</h1>
    <p class="lead">O link pode ter mudado. Os apps continuam no mesmo lugar.</p>
    <div class="hero-acoes"><a class="btn btn-solido" href="/">Ver os apps ${I.seta}</a></div>
  </div>
</section>
</main>
${rodape(pref)}`;
}

// ---------- escrever ----------
function escrever(rel, conteudo) {
  const f = path.join(SAIDA, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, conteudo);
}
if (PREVIA) {
  fs.rmSync(SAIDA, { recursive: true, force: true });
  fs.cpSync(path.join(RAIZ, "assets"), path.join(SAIDA, "assets"), { recursive: true });
}
escrever("index.html", home());
if (!PREVIA) {
  const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
  const urls = ["/", ...APPS.map((x) => `/${x.slug}/`)];
  escrever("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${hoje}</lastmod></url>`).join("\n")}
</urlset>
`);
  escrever("robots.txt", `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
}
for (const x of APPS) escrever(`${x.slug}/index.html`, paginaApp(x));
if (!PREVIA) escrever("404.html", pagina404());
console.log(`Páginas geradas em ${SAIDA}`);
