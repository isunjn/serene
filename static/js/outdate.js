const publish = document.querySelector('#publish');
const updated = document.querySelector('#updated');
const outdateWarn = document.querySelector('#outdate_warn');

let postDate;
if (updated) {
    postDate = new Date(updated.textContent);
} else {
    postDate = new Date(publish.textContent);
}

const intervalDays = Math.floor((Date.now() - postDate.getTime()) / (24 * 60 * 60 * 1000));
const warnDays = parseInt(outdateWarn.dataset.days);
if (intervalDays >= warnDays) {
    const warnMsg = outdateWarn.dataset.text1 + intervalDays + outdateWarn.dataset.text2;
    outdateWarn.lastChild.textContent = warnMsg;
    outdateWarn.classList.remove('hidden');
}
