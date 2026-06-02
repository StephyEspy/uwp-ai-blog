(function () {
  const themeKey = "uwp-ai-theme";
  const root = document.documentElement;
  const navLinks = document.querySelectorAll(".site-nav a");
  const progressBar = document.querySelector(".reading-progress span");
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleText = document.querySelector(".theme-toggle-text");

  function getStoredTheme() {
    try {
      return localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (error) {
      return;
    }
  }

  function setTheme(theme, shouldPersist) {
    const activeTheme = theme === "light" ? "light" : "dark";
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    const nextLabel = nextTheme === "light" ? "Light" : "Dark";

    root.dataset.theme = activeTheme;

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    }

    if (themeToggleText) {
      themeToggleText.textContent = nextLabel;
    }

    if (shouldPersist) {
      storeTheme(activeTheme);
    }
  }

  function normalizePath(pathname) {
    return pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "");
  }

  function markActiveNav() {
    const currentPath = normalizePath(window.location.pathname);

    navLinks.forEach((link) => {
      const linkPath = normalizePath(new URL(link.href).pathname);
      const isHashOnly = link.hash && linkPath === currentPath;
      const isActive = !isHashOnly && linkPath === currentPath;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateScrollState() {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 12);
    }
  }

  setTheme(getStoredTheme() || root.dataset.theme || "dark", false);
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme, true);
    });
  }

  markActiveNav();
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
})();
