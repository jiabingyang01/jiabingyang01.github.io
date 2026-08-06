(function () {
  "use strict";

  function initializeNavigation() {
    const nav = document.querySelector(".side-nav");
    const menu = document.getElementById("primary-navigation");

    if (!nav || !menu) return;

    const links = Array.from(menu.querySelectorAll('a[href^="#"]'));

    const sections = links
      .map(function (link) {
        const id = decodeURIComponent(link.hash.slice(1));
        return { id: id, link: link, element: document.getElementById(id) };
      })
      .filter(function (item) {
        return item.element;
      });

    function updateActiveLink() {
      if (!sections.length) return;

      const marker = window.scrollY + 40;
      let activeId = sections[0].id;

      sections.forEach(function (section) {
        if (section.element.offsetTop <= marker) activeId = section.id;
      });

      sections.forEach(function (section) {
        const isActive = section.id === activeId;
        section.link.classList.toggle("is-active", isActive);
        if (isActive) {
          section.link.setAttribute("aria-current", "location");
        } else {
          section.link.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("hashchange", updateActiveLink);
    updateActiveLink();
  }

  function initializeThemeToggle() {
    const root = document.documentElement;
    const toggle = document.querySelector(".theme-toggle");

    if (!toggle) return;

    function updateToggle(theme) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const label = "Switch to " + nextTheme + " mode";
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    }

    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      updateToggle(theme);
    }

    toggle.addEventListener("click", function () {
      const currentTheme = root.getAttribute("data-theme") || "light";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    updateToggle(root.getAttribute("data-theme") || "light");
  }

  function initializeBackToTop() {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    function updateVisibility() {
      const isVisible = window.scrollY > 320;
      button.classList.toggle("is-visible", isVisible);
      button.tabIndex = isVisible ? 0 : -1;
      button.setAttribute("aria-hidden", String(!isVisible));
    }

    button.addEventListener("click", function () {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeNavigation();
      initializeThemeToggle();
      initializeBackToTop();
    });
  } else {
    initializeNavigation();
    initializeThemeToggle();
    initializeBackToTop();
  }
})();
