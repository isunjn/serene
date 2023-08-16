/* dark mode */

const themeToggle = document.querySelector('#theme-toggle');
const hlLink = document.querySelector('link#hl');
const preferDark = window.matchMedia("(prefers-color-scheme: dark)");

if (!localStorage.getItem("theme") && preferDark.matches) toggleTheme("dark");
if (localStorage.getItem("theme") == "dark") toggleTheme("dark");

themeToggle.addEventListener('click', () => toggleTheme(localStorage.getItem("theme") == "dark" ? "light" : "dark"));
preferDark.addEventListener("change", e => toggleTheme(e.matches ? "dark" : "light"));

function toggleTheme(theme) {
  if (theme == "dark") document.body.classList.add('dark'); else document.body.classList.remove('dark');
  if (hlLink) hlLink.href = `/hl-${theme}.css`;
  themeToggle.innerHTML = theme == "dark" ? themeToggle.dataset.sunIcon : themeToggle.dataset.moonIcon;
  localStorage.setItem("theme", theme);
  toggleGiscusTheme(theme);
}

function toggleGiscusTheme(theme) {
  const iframe = document.querySelector('iframe.giscus-frame');
  if (iframe) iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: `${location.origin}/giscus_${theme}.css` } } }, 'https://giscus.app');
}

window.addEventListener('message', initGiscusTheme);
function initGiscusTheme() {
  toggleGiscusTheme(localStorage.getItem("theme") || (preferDark.matches ? "dark" : "light"));
  window.removeEventListener('message', initGiscusTheme);
}

/* post page */

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
      alert.querySelector('.content').textContent = msg;
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
  /* code copy button */
  const addCopyBtns = () => {
    const cfg = document.querySelector('#copy-cfg');
    if (!cfg) return;
    const copyIcon = cfg.dataset.copyIcon;
    const checkIcon = cfg.dataset.checkIcon;
    document.querySelectorAll('pre').forEach(block => {
      if (block.classList.contains('mermaid')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      const btn = document.createElement('button');
      btn.className = 'copy';
      btn.ariaLabel = 'copy';
      btn.innerHTML = copyIcon;
      const copy = () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          btn.innerHTML = checkIcon;
          btn.classList.add('copied');
          btn.removeEventListener('click', copy);
          setTimeout(() => {
            btn.innerHTML = copyIcon;
            btn.classList.remove('copied');
            btn.addEventListener('click', copy);
          }, 2000);
        });
      };
      btn.addEventListener('click', copy);
      wrapper.appendChild(block.cloneNode(true));
      wrapper.appendChild(btn);
      block.replaceWith(wrapper);
    });
  };
  addCopyBtns();
  /* back-to-top button */
  const backBtn = document.querySelector('#back-to-top');
  if (backBtn) {
    const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const toggle = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 80 && !backBtn.classList.contains('shown')) {
        backBtn.classList.add('shown');
        backBtn.addEventListener('click', toTop);
      } else if (scrollTop <= 80 && backBtn.classList.contains('shown')) {
        backBtn.classList.remove('shown');
        backBtn.removeEventListener('click', toTop);
      }
    };
    window.addEventListener('scroll', toggle);
    toggle();
  }
  /* img lightense */
  window.addEventListener("load", () => Lightense("article img", { background: 'rgba(43, 43, 43, 0.19)' }));
}
