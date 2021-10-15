const bar = document.querySelector('#progress-bar');
const post = document.querySelector('article');
const html = document.documentElement;

const height = post.scrollHeight + post.offsetTop;

window.addEventListener('scroll', () => {
    bar.style.width = (html.scrollTop / (height - html.clientHeight)) * 100 + '%';
});
