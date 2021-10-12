const bar = document.querySelector('#progress-bar');
const post = document.querySelector('article');
let html = document.documentElement;

let height = post.scrollHeight + post.offsetTop;

window.addEventListener('scroll', () => {
    bar.style.width = (html.scrollTop / (height - html.clientHeight)) * 100 + '%';
});
