(function () {
  "use strict";

  function initializeNavigation() {
    const nav = document.querySelector(".topnav");
    const menu = document.getElementById("primary-navigation");
    const toggle = document.querySelector(".nav-toggle");

    if (!nav || !menu || !toggle) return;

    const links = Array.from(menu.querySelectorAll('a[href^="#"]'));

    function setMenuState(isOpen) {
      menu.classList.toggle("is-open", isOpen);
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    toggle.addEventListener("click", function () {
      setMenuState(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenuState(false);
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) setMenuState(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setMenuState(false);
    });

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

      const marker = window.scrollY + nav.offsetHeight + 36;
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavigation);
  } else {
    initializeNavigation();
  }
})();
