/* 
    uniform circular motion demo! ()cleoold
*/

// background change
(() => {
    const pBody = document.querySelector('body');
    const pHtml = document.querySelector('html');
    const colors = ['#30542c', '#232170', '#530a80', '#870c6d', '#873a0b'];
    //var colorsLight = ['#4c9144', '#514db0', '#a06bc2', '#ab609b'];
    let i = 0;
    setInterval(() => {
        if (++i == 5) i = 0;
        pBody.style.backgroundColor = colors[i];
        pHtml.style.backgroundColor = colors[i];
    }, 5000);
})();