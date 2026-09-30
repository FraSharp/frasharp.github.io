(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const setTheme = (theme, persist = false) => {
    root.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "◑" : "◐";
    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
      themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    }
    themeColor?.setAttribute("content", theme === "dark" ? "#1b1b1b" : "#fafafa");
    if (persist) {
      try {
        localStorage.setItem("frasharp-theme", theme);
      } catch {
        // The theme still works when browser storage is unavailable.
      }
    }
  };

  const savedTheme = (() => {
    try {
      return localStorage.getItem("frasharp-theme");
    } catch {
      return null;
    }
  })();
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferredTheme);

  if (themeButton) themeButton.hidden = false;

  themeButton?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
