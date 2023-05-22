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
  /* outdate alert */
  const alert = document.querySelector('#outdate_alert');
  if (alert) {
    const publish = document.querySelector('#publish');
    const updated = document.querySelector('#updated');
    const updateDate = new Date(updated ? updated.textContent : publish.textContent);
    const intervalDays = Math.floor((Date.now() - updateDate.getTime()) / (24 * 60 * 60 * 1000));
    const warnDays = parseInt(alert.dataset.days);
    if (intervalDays >= warnDays) {
      const msg = alert.dataset.alertTextBefore + intervalDays + alert.dataset.alertTextAfter;
      alert.lastChild.textContent = msg;
      alert.classList.remove('hidden');
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
  /* img lightense */
  window.addEventListener("load", () => Lightense("article img", { background: 'rgba(43, 43, 43, 0.19)' }), false);
}
