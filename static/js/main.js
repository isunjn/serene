/* dark mode */
const themeToggle = document.querySelector('#theme-toggle');
const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
function toggleTheme(theme) {
  document.body.classList.toggle('dark');
  localStorage.setItem("theme", theme);
  if (themeToggle) themeToggle.innerHTML = theme == "dark" ? themeToggle.dataset.sunIcon : themeToggle.dataset.moonIcon;
}
if (!localStorage.getItem("theme") && preferDark.matches) toggleTheme("dark");
if (themeToggle) themeToggle.addEventListener('click', () => toggleTheme(localStorage.getItem("theme") == "dark" ? "light" : "dark"));
preferDark.addEventListener("change", e => toggleTheme(e.matches ? "dark" : "light"));

if (document.body.classList.contains('post')) {
  /* outdate warn */
  const warn = document.querySelector('#outdate_warn');
  if (warn) {
    const publish = document.querySelector('#publish');
    const updated = document.querySelector('#updated');
    const updateDate = new Date(updated ? updated.textContent : publish.textContent);
    const intervalDays = Math.floor((Date.now() - updateDate.getTime()) / (24 * 60 * 60 * 1000));
    const warnDays = parseInt(warn.dataset.days);
    if (intervalDays >= warnDays) {
      const msg = warn.dataset.warnTextBefore + intervalDays + warn.dataset.warnTextAfter;
      warn.lastChild.textContent = msg;
      warn.classList.remove('hidden');
    }
  }
  /* toc toggle */
  const tocToggle = document.querySelector('#toc-toggle');
  if (tocToggle) {
    const aside = document.querySelector('aside');
    tocToggle.addEventListener('click', () => {
      tocToggle.classList.toggle('active');
      aside.classList.toggle('shown');
    });
  }
  /* back to top */
  const backToTop = document.querySelector('#back-to-top');
  if (backToTop) backToTop.addEventListener('click', () => document.documentElement.scrollTop = 0);
  /* img lightense */
  window.addEventListener("load", () => Lightense("article img", { background: 'rgba(43, 43, 43, 0.19)' }), false);
}
