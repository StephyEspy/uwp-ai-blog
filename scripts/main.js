(function () {
  const themeKey = "uwp-ai-theme";
  const root = document.documentElement;
  const navLinks = document.querySelectorAll(".site-nav a");
  const progressBar = document.querySelector(".reading-progress span");
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleIcon = document.querySelector(".theme-toggle-icon");
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
    const nextIcon = nextTheme === "light" ? "☀" : "☾";

    root.dataset.theme = activeTheme;

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
    }

    if (themeToggleText) {
      themeToggleText.textContent = nextLabel;
    }

    if (themeToggleIcon) {
      themeToggleIcon.textContent = nextIcon;
    }

    if (shouldPersist) {
      storeTheme(activeTheme);
    }
  }

  function normalizePath(pathname) {
    return pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "");
  }

  function getRootPath() {
    const rootLink = document.querySelector(".site-logo");
    return rootLink ? normalizePath(new URL(rootLink.href).pathname) : normalizePath(window.location.pathname);
  }

  function getActiveHash() {
    const sectionIds = ["featured", "posts", "about"];
    const visibleSections = sectionIds
      .map((id) => {
        const section = document.getElementById(id);
        return section ? { id, top: section.getBoundingClientRect().top } : null;
      })
      .filter(Boolean);

    if (!visibleSections.length) {
      return "";
    }

    const activeSection = visibleSections.reduce((current, section) => {
      if (section.top <= 120) {
        return section;
      }
      return current;
    }, visibleSections[0]);

    return `#${activeSection.id}`;
  }

  function markActiveNav() {
    const currentPath = normalizePath(window.location.pathname);
    const rootPath = getRootPath();
    const activeHash = currentPath === rootPath ? getActiveHash() : "";

    navLinks.forEach((link) => {
      const linkPath = normalizePath(new URL(link.href).pathname);
      const isSectionLink = activeHash && linkPath === currentPath && link.hash === activeHash;
      const isPostsArea = currentPath.includes("/posts") && link.textContent.trim() === "Posts";
      const isActive = isSectionLink || isPostsArea || (!link.hash && linkPath === currentPath);
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", link.hash ? "location" : "page");
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

    markActiveNav();
  }

  setTheme(getStoredTheme() || root.dataset.theme || "dark", false);
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme, true);
    });
  }

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
})();
