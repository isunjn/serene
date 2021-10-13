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

// // active toc item

// let options = {
//     threshold: 1.0
// };

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const id = entry.target.getAttribute('id');
//         if (entry.isIntersecting) {
//             document.querySelector(`aside nav a[href="#${id}"]`).classList.add('active');
//         } else {
//             document.querySelector(`aside nav a[href="#${id}"]`).classList.remove('active');
//         }
//     });
// }, options);

// document.querySelectorAll('h2, h3').forEach((header) => {
//     observer.observe(header);
// });