function showToc(toggle, toc) {
    if (toggle && toc) {
        const toggle_el = document.querySelector(toggle);
        const toc_el = document.querySelector(toc);
        toggle_el.addEventListener('click', (e) => {
            e.preventDefault();
            toggle_el.classList.toggle('active');
            toc_el.classList.toggle('shown');
        });
    }
}
showToc('#toc-toggle','aside');