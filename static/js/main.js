function enableThemeToggle() {
  const themeToggle = document.querySelector('#theme-toggle');
  const hlLink = document.querySelector('link#hl');
  const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
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
  function initGiscusTheme() {
    toggleGiscusTheme(localStorage.getItem("theme") || (preferDark.matches ? "dark" : "light"));
    window.removeEventListener('message', initGiscusTheme);
  }
  window.addEventListener('message', initGiscusTheme);
  themeToggle.addEventListener('click', () => toggleTheme(localStorage.getItem("theme") == "dark" ? "light" : "dark"));
  preferDark.addEventListener("change", e => toggleTheme(e.matches ? "dark" : "light"));
  if (!localStorage.getItem("theme") && preferDark.matches) toggleTheme("dark");
  if (localStorage.getItem("theme") == "dark") toggleTheme("dark");
}

function enableNavFold() {
  const nav = document.querySelector('header nav');
  if (!nav) return;
  const toggler = nav.querySelector('#toggler');
  if (!toggler) return;
  const foldItems = nav.querySelectorAll('.fold');
  toggler.addEventListener('click', () => {
    if (window.innerWidth < 768 && [...foldItems].every(item => !item.classList.contains('shown'))) return;
    foldItems.forEach(item => item.classList.toggle('shown'));
  });  
}

function enableOutdateAlert() {
  const alert = document.querySelector('#outdate_alert');
  if (!alert) return;
  const publish = document.querySelector('#publish');
  const updated = document.querySelector('#updated');
  const updateDate = new Date(updated ? updated.textContent : publish.textContent);
  const intervalDays = Math.floor((Date.now() - updateDate.getTime()) / (24 * 60 * 60 * 1000));
  const alertDays = parseInt(alert.dataset.days);
  if (intervalDays >= alertDays) {
    const msg = alert.dataset.alertTextBefore + intervalDays + alert.dataset.alertTextAfter;
    alert.querySelector('.content').textContent = msg;
    alert.classList.remove('hidden');
  }
}

function enableTocToggle() {
  const tocToggle = document.querySelector('#toc-toggle');
  if (!tocToggle) return;
  const aside = document.querySelector('aside');
  tocToggle.addEventListener('click', () => {
    tocToggle.classList.toggle('active');
    aside.classList.toggle('shown');
  });
}

function enableTocIndicate() {
  const toc = document.querySelector('aside nav');
  if (!toc) return;
  const headers = document.querySelectorAll('h2, h3');
  const tocMap = new Map();
  headers.forEach(header => tocMap.set(header, toc.querySelector(`a[href="#${header.id}"]`)));
  let actived = null;
  const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = tocMap.get(entry.target);
      if (target == actived) return;
      if (actived) actived.classList.remove('active');
      target.classList.add('active');
      actived = target;
    }
  }), { rootMargin: '-9% 0px -90% 0px' });
  headers.forEach(header => observer.observe(header));
}

function addCopyBtns() {
  const cfg = document.querySelector('#copy-cfg');
  if (!cfg) return;
  const copyIcon = cfg.dataset.copyIcon;
  const checkIcon = cfg.dataset.checkIcon;
  document.querySelectorAll('pre').forEach(block => {
    if (block.classList.contains('mermaid')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'codeblock';
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
}

function addBackToTopBtn() {
  const backBtn = document.querySelector('#back-to-top');
  if (!backBtn) return;
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggle = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 200 && !backBtn.classList.contains('shown')) {
      backBtn.classList.add('shown');
      backBtn.addEventListener('click', toTop);
    } else if (scrollTop <= 200 && backBtn.classList.contains('shown')) {
      backBtn.classList.remove('shown');
      backBtn.removeEventListener('click', toTop);
    }
  };
  window.addEventListener('scroll', toggle);
  toggle();
}

function addFootnoteBacklink() {
  const backlinkIcon = document.querySelector('.prose').dataset.backlinkIcon;
  const footnotes = document.querySelectorAll('.footnote-definition');
  footnotes.forEach(footnote => {
    const backlink = document.createElement('button');
    backlink.className = 'backlink';
    backlink.ariaLabel = 'backlink';
    backlink.innerHTML = backlinkIcon;
    backlink.addEventListener('click', () => window.scrollTo({
      top: document.querySelector(`.footnote-reference a[href="#${footnote.id}"]`).getBoundingClientRect().top + window.scrollY - 50,
    }));
    footnote.appendChild(backlink);
  });
}

function enableImgLightense() {
  window.addEventListener("load", () => Lightense(".prose img", { background: 'rgba(43, 43, 43, 0.19)' }));
}

//--------------------------------------------

enableThemeToggle();
enableNavFold();
if (document.body.classList.contains('post')) {
  enableOutdateAlert();
  enableTocToggle();
  enableTocIndicate();
  addBackToTopBtn();
}
if (document.querySelector('.prose')) {
  addCopyBtns();
  addFootnoteBacklink();
  enableImgLightense();
}
