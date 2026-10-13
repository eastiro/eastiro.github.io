/* ==========================================================================
   eastiro.github.io — behaviour
   Small, dependency-free. Three jobs:
     1. theme toggle, persisted in localStorage
     2. sticky-header shadow once the page has scrolled
     3. reveal-on-scroll, using IntersectionObserver with a safe fallback
   Everything degrades: with JavaScript disabled the page is fully readable,
   because the reveal animation is only applied under the .js class that the
   inline bootstrap script adds.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 1. theme ---------- */
  var toggle = document.getElementById("themeToggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncToggle() {
    if (!toggle) return;
    // aria-pressed reflects "light mode is on", so screen readers announce a
    // meaningful state rather than an unlabelled button.
    toggle.setAttribute("aria-pressed", currentTheme() === "light" ? "true" : "false");
  }

  if (toggle) {
    syncToggle();
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      syncToggle();
    });
  }

  /* ---------- 2. sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    // Old browser: show everything immediately rather than leaving it hidden.
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. nav highlight ---------- */
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

  /* ---------- 5. footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
