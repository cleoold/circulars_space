/* 
    uniform circular motion demo! ()cleoold
*/

// background change

var bgChangeFlag = -1;
(() => {
    const pBody = document.querySelector('body');
    const pHtml = document.querySelector('html');
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

document.querySelector('.shared-info-container-bo .cancel-bg-change').addEventListener('click', (e) => {
    bgChangeFlag = null;
});