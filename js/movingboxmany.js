/* 
    uniform circular motion demo! ()cleoold
*/




const grandContainer = document.querySelector('.grand-container');
const infoContainer1 = document.querySelector('#info-container-1');
const movingObj1 = document.querySelector('#moving-obj-1');
const movingObjTrajectory1 = document.querySelector('#moving-obj-trajectory-1');
const objManageNode = document.querySelector('.obj-manage');
const movingObjProjection1 = document.querySelector('#moving-obj-prj-1');

const oneClickGoBtn = document.querySelector('.obj-manage .objs-oneclick-go');
const oneClickResetBtn = document.querySelector('.obj-manage .objs-oneclick-reset');
const oneClickBtnsSeparator = document.querySelector('.obj-manage br');

var circular1 = new BlockInMotion('1');

// manage multiple circulations (max 1+5=6)
var CircularsCount = 1;
var Circulars = new Array();

document.querySelector('.obj-manage .append-objs').addEventListener('click', (e) => {
    if (CircularsCount >= 6) return;
    ++CircularsCount;

    // create nodes
    var clonedInfoContainer = infoContainer1.cloneNode(true);
    clonedInfoContainer.id = `info-container-${CircularsCount}`;
    clonedInfoContainer.children[0].innerText = `Block ${CircularsCount}`;
    grandContainer.insertBefore(clonedInfoContainer, container);

    var clonedMovingObj = movingObj1.cloneNode(true);
    clonedMovingObj.id = `moving-obj-${CircularsCount}`;
    container.appendChild(clonedMovingObj);

    var clonedMovingObjTrajectory = movingObjTrajectory1.cloneNode(true);
    clonedMovingObjTrajectory.id = `moving-obj-trajectory-${CircularsCount}`;
    container.insertBefore(clonedMovingObjTrajectory, origin);

    var clonedMovingObjProjection = movingObjProjection1.cloneNode();
    clonedMovingObjProjection.id = `moving-obj-prj-${CircularsCount}`;
    var clonedMovingObjProjectionContainer = document.createElement('div');
    clonedMovingObjProjectionContainer.setAttribute('class', 'projections');
    clonedMovingObjProjectionContainer.appendChild(clonedMovingObjProjection);
    grandContainer.insertBefore(clonedMovingObjProjectionContainer, objManageNode);

    // create moving block js objects
    var bl = new BlockInMotion(CircularsCount);
    document.querySelector(`#info-container-${CircularsCount} .set-color`).value =
        `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},1)`;
    Circulars.push(bl);

    // displays the multi-ball control buttons
    oneClickGoBtn.style.display = 'unset';
    oneClickResetBtn.style.display = 'unset';
    oneClickBtnsSeparator.style.display = 'unset';
    window.scrollBy(0, 299);
});

document.querySelector('.obj-manage .delete-objs').addEventListener('click', (e) => {
    if (CircularsCount <= 1) return;
    // remove js objects
    delete Circulars[Circulars.length - 1];
    Circulars.pop();

    // remove nodes
    document.querySelector(`#info-container-${CircularsCount}`).remove();
    document.querySelector(`#moving-obj-${CircularsCount}`).remove();
    document.querySelector(`#moving-obj-trajectory-${CircularsCount}`).remove();
    document.querySelector(`#moving-obj-prj-${CircularsCount}`).parentNode.remove()

    if (--CircularsCount == 1) {
        // hides the multi-ball control buttons
        oneClickGoBtn.style.display = 'none';
        oneClickResetBtn.style.display = 'none';
        oneClickBtnsSeparator.style.display = 'none';
    }
    window.scrollBy(0, -299);
});

document.querySelector('.obj-manage .objs-oneclick-go').addEventListener('click', (e) => {
    var btns = document.querySelectorAll('.info-container .set-attr-go');
    for (each of btns) each.click();
});

document.querySelector('.obj-manage .objs-oneclick-reset').addEventListener('click', (e) => {
    var btns = document.querySelectorAll('.info-container .set-attr-reset');
    for (each of btns) each.click();
});