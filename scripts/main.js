(function () {
  const navLinks = document.querySelectorAll(".site-nav a");
  const progressBar = document.querySelector(".reading-progress span");
  const header = document.querySelector(".site-header");

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

  markActiveNav();
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
})();
