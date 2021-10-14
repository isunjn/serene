const btns = document.querySelectorAll('.showhidden button');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const hidden = document.querySelector(`.posts-${btn.dataset.category}`);
        hidden.classList.toggle('hidden');
        if(btn.firstChild.textContent == 'More') {
            btn.firstChild.textContent = 'Less';    
        } else {
            btn.firstChild.textContent = 'More';
        }
        btn.lastChild.classList.toggle('ri-arrow-down-s-line');
        btn.lastChild.classList.toggle('ri-arrow-up-s-line');
    });
});