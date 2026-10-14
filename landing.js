(function () {
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var btn = document.getElementById("btn-sidebar");

  function abrir() {
    sidebar.classList.add("aberto");
    overlay.classList.add("mostra");
  }

  function fechar() {
    sidebar.classList.remove("aberto");
    overlay.classList.remove("mostra");
  }

  if (btn) {
    btn.addEventListener("click", function () {
      if (sidebar.classList.contains("aberto")) {
        fechar();
      } else {
        abrir();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", fechar);
  }

  var linksSidebar = document.querySelectorAll(".sidebar .nav-link");
  linksSidebar.forEach(function (link) {
    link.addEventListener("click", fechar);
  });

  var linksTopo = document.querySelectorAll(".menu a[href^='#']");
  linksTopo.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href.length > 1) {
        var alvo = document.querySelector(href);
        if (alvo) {
          e.preventDefault();
          alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  var navLinks = document.querySelectorAll(".nav-link");
  var secoes = document.querySelectorAll("section[id], .secao[id], #inicio");

  function atualizarNav() {
    var scrollY = window.scrollY + 120;
    secoes.forEach(function (secao) {
      if (!secao.id) return;
      var topoSecao = secao.offsetTop;
      var alturaSecao = secao.offsetHeight;
      if (scrollY >= topoSecao && scrollY < topoSecao + alturaSecao) {
        navLinks.forEach(function (link) {
          link.classList.remove("ativo");
          if (link.getAttribute("href") === "#" + secao.id) {
            link.classList.add("ativo");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", atualizarNav);
  window.addEventListener("load", atualizarNav);

  var reveals = document.querySelectorAll(".reveal");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("aparece");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function (el) {
    io.observe(el);
  });
})();
