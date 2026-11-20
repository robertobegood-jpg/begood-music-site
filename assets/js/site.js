/* Comportamento do site: versão ao vivo do GitHub, link direto do APK,
   novidades da versão, copiar o Pix e revelar ao rolar. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Revelar ao rolar ---------- */
  var revelar = document.querySelectorAll(".revela");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revelar.forEach(function (el) { io.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add("visivel"); });
  }

  /* ---------- Toast ---------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, 2200);
  }

  /* ---------- Copiar (Pix) ---------- */
  document.querySelectorAll("[data-copiar]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var alvo = document.querySelector(btn.getAttribute("data-copiar"));
      var texto = alvo ? alvo.textContent.trim() : "";
      function ok() { toast("Copiado"); }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(ok, function () { selecionar(alvo); });
      } else { selecionar(alvo); }
      function selecionar(el) {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand("copy"); ok(); } catch (e) { toast("Selecionado: copie manualmente"); }
      }
    });
  });

  /* ---------- Versão mais recente pelo GitHub ---------- */
  function escapar(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function inline(s) {
    return s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
  }
  /* Markdown mínimo das notas da versão (títulos, listas, parágrafos). */
  function markdown(md) {
    var html = "", lista = false;
    escapar(md || "").split(/\r?\n/).forEach(function (linha) {
      var l = linha.trim();
      var item = l.match(/^[-*]\s+(.*)/);
      if (item) {
        if (!lista) { html += "<ul>"; lista = true; }
        html += "<li>" + inline(item[1]) + "</li>";
        return;
      }
      if (lista) { html += "</ul>"; lista = false; }
      if (!l) return;
      var tit = l.match(/^#{1,6}\s+(.*)/);
      if (tit) html += "<h4>" + inline(tit[1]) + "</h4>";
      else html += "<p>" + inline(l) + "</p>";
    });
    if (lista) html += "</ul>";
    return html;
  }
  function data(iso) {
    try { return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, ""); }
    catch (e) { return ""; }
  }
  function tamanho(b) { return b ? (b / 1048576).toFixed(1).replace(".", ",") + " MB" : ""; }

  function buscar(repo) {
    var chave = "rel:" + repo;
    try {
      var c = JSON.parse(sessionStorage.getItem(chave) || "null");
      if (c && Date.now() - c.t < 10 * 60 * 1000) return Promise.resolve(c.d);
    } catch (e) {}
    return fetch("https://api.github.com/repos/" + repo + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var apk = (d.assets || []).filter(function (a) { return /\.apk$/i.test(a.name); })[0];
        var info = {
          versao: d.tag_name || d.name || "",
          data: d.published_at,
          notas: d.body || "",
          url: d.html_url,
          apk: apk ? apk.browser_download_url : null,
          tamanho: apk ? apk.size : 0
        };
        try { sessionStorage.setItem(chave, JSON.stringify({ t: Date.now(), d: info })); } catch (e) {}
        return info;
      });
  }

  var repos = {};
  document.querySelectorAll("[data-repo]").forEach(function (el) {
    var r = el.getAttribute("data-repo");
    (repos[r] = repos[r] || []).push(el);
  });

  Object.keys(repos).forEach(function (repo) {
    buscar(repo).then(function (info) {
      repos[repo].forEach(function (el) {
        var campo = el.getAttribute("data-campo");
        if (campo === "versao" && info.versao) { el.textContent = info.versao; el.classList.add("ok"); }
        else if (campo === "data" && info.data) el.textContent = data(info.data);
        else if (campo === "tamanho" && info.tamanho) el.textContent = tamanho(info.tamanho);
        else if (campo === "baixar" && info.apk) {
          el.href = info.apk;
          el.setAttribute("download", "");
          var rot = el.querySelector("[data-rotulo]");
          if (rot && info.versao) rot.textContent = "Baixar APK " + info.versao;
        }
        else if (campo === "notas") {
          el.innerHTML = info.notas ? markdown(info.notas) :
            '<p>Sem notas nesta versão. <a href="' + escapar(info.url) + '" rel="noopener">Ver no GitHub</a>.</p>';
        }
      });
    }).catch(function () {
      // Sem acesso à API (limite ou offline): os links continuam apontando para a página da última versão.
      repos[repo].forEach(function (el) {
        var campo = el.getAttribute("data-campo");
        if (campo === "versao") el.textContent = "Última versão";
        if (campo === "data" || campo === "tamanho") el.textContent = "—";
        if (campo === "notas") {
          el.innerHTML = '<p>Não foi possível carregar as novidades agora. <a href="https://github.com/' +
            escapar(repo) + '/releases" rel="noopener">Ver todas as versões no GitHub</a>.</p>';
        }
      });
    });
  });
})();
