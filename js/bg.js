/* 
    uniform circular motion demo! ()cleoold
*/


const pBody = document.querySelector('body');
const pHtml = document.querySelector('html');

// background change

var bgChangeFlag = -1;
(() => {
    const colors = ['#30542c', '#232170', '#530a80', '#870c6d', '#873a0b'];
    //var colorsLight = ['#4c9144', '#514db0', '#a06bc2', '#ab609b'];
    let i = 0;
    bgChangeFlag = setTimeout(function loopBgColor() {
        if (++i == 5) i = 0;
        pBody.style.backgroundColor = colors[i];
        pHtml.style.backgroundColor = colors[i];
        if (bgChangeFlag)
            bgChangeFlag = setTimeout(loopBgColor, 5000);
    }, 5000);
})();

document.querySelector('.cancel-bg-change').addEventListener('click', function fn(e) {
    document.querySelector('.cancel-bg-change').removeEventListener('click', fn);
    clearTimeout(bgChangeFlag);
    bgChangeFlag = null;
});

document.querySelector('.cancel-bg-change-and-enable-star').addEventListener('click', function fn(e) {
    document.querySelector('.cancel-bg-change-and-enable-star').removeEventListener('click', fn);
    clearTimeout(bgChangeFlag);
    bgChangeFlag = null;
    pBody.style.backgroundColor = 'unset';
    pHtml.style.backgroundColor = 'unset';
    pHtml.style.background = 'url("./assets/bg.jpg")';
    pHtml.style.backgroundPosition = 'center center';
    pHtml.style.backgroundAttachment = 'fixed';
    document.querySelector('#container').style.backgroundColor = 'unset';

    // change origin display styles, add lights
    const colors = [
        '1px 1px 15px 8px rgba(255,144,61,.89)',
        '1px 1px 15px 8px rgba(255,100,61,.93)',
        '1px 1px 15px 8px rgba(255,88,61,.89)',
        '1px 1px 15px 8px rgba(255,88,61,.5)',
        '1px 1px 15px 8px rgba(255,100,61,.89)',
        '1px 1px 15px 8px rgba(255,144,61,.77)',
    ];
    let i = 0;
    const origin = document.querySelector('#origin');
    origin.style.backgroundColor = 'orange';
    setTimeout(function loopSunColor() {
        if (++i == 6) i =0;
        origin.style.boxShadow = colors[i];
        origin.style.WebkitBoxShadow = colors[i];
        setTimeout(loopSunColor, 4000);
    }, 0);
});