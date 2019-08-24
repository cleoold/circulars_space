/* 
    uniform circular motion demo! ()cleoold
*/



// click to show samples, click again to hide

const samplesClickDisplay = document.querySelector('.samples-display > h5');
let samplesShown = false;

samplesClickDisplay.addEventListener('click', (e) => {
    if (!samplesShown) {
        let urls = [
            './assets/uniformcircular1.gif',
            './assets/uniformcircular2.gif',
            './assets/uniformcircular3.gif',
            './assets/uniformcircular4.gif'
        ];
        for (url of urls) {
            let imgContainer = document.createElement('img');
            imgContainer.src = url;
            document.querySelector('.samples-display').appendChild(imgContainer);
        }
    } else {
        for (each of document.querySelectorAll('.samples-display img'))
            each.remove();
    }
    samplesShown = !samplesShown;
});