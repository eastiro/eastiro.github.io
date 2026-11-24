/* ==========================================================================
   eastiro.github.io — behaviour
   Zero dependencies, progressive enhancement only:
     1. theme toggle persisted in localStorage + theme-color meta sync
     2. sticky header border on scroll
     3. project category filtering (All / Esports / Systems & Strategy / Experiments)
     4. subtle pointer-tracking spotlight on project tiles
     5. reveal-on-scroll & gentle hero count-up (respects reduced motion)
     6. active nav section highlight & footer year
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. theme ---------- */
  var toggle = document.getElementById("themeToggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncThemeUI() {
    var isLight = currentTheme() === "light";
    if (toggle) {
      toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
    }
    if (metaTheme) {
      metaTheme.setAttribute("content", isLight ? "#ffffff" : "#000000");
    }
  }

  if (toggle) {
    syncThemeUI();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      syncThemeUI();
    });
  }

  /* ---------- 2. hairline under sticky nav once scrolled ---------- */
  var header = document.querySelector(".globalnav");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. project category filtering ---------- */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn[data-filter]"));
  var tilesGrid = document.getElementById("projectTiles");
  var tiles = Array.prototype.slice.call(document.querySelectorAll("#projectTiles .tile[data-category]"));
  var expBlock = document.getElementById("experimentsBlock");
  var expItems = Array.prototype.slice.call(document.querySelectorAll("#experimentsBlock .exp-item[data-category]"));
  var filterStatus = document.getElementById("filterStatus");

  function applyFilter(category) {
    var visibleTiles = 0;
    tiles.forEach(function (tile) {
      var match = category === "all" || tile.getAttribute("data-category") === category;
      tile.hidden = !match;
      if (match) visibleTiles += 1;
    });

    var visibleExp = 0;
    expItems.forEach(function (item) {
      var match = category === "all" || item.getAttribute("data-category") === category;
      item.hidden = !match;
      if (match) visibleExp += 1;
    });

    if (tilesGrid) {
      tilesGrid.hidden = visibleTiles === 0;
      tilesGrid.setAttribute("data-filtered", category === "all" ? "false" : "true");
    }
    if (expBlock) {
      expBlock.hidden = visibleExp === 0;
    }

    filterButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-filter") === category;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (filterStatus) {
      var total = visibleTiles + visibleExp;
      filterStatus.textContent = category === "all"
        ? "Showing all " + total + " projects."
        : "Showing " + total + " projects in " + category + ".";
    }
  }

  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ---------- 4. subtle pointer-tracking spotlight on tiles ---------- */
  if (!reduceMotion && tiles.length) {
    tiles.forEach(function (tile) {
      tile.addEventListener("pointermove", function (ev) {
        var rect = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", (ev.clientX - rect.left).toFixed(1) + "px");
        tile.style.setProperty("--my", (ev.clientY - rect.top).toFixed(1) + "px");
      }, { passive: true });
    });
  }

  /* ---------- 5. reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 7. nav active highlight ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (targets.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active",
            a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- 8. footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
