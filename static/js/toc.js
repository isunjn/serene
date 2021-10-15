function toggleToc() {
    const btn = document.querySelector('#toc-toggle');
    const toc = document.querySelector('aside');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        toc.classList.toggle('shown');
    });
}
toggleToc();