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
oneClickGoBtn.style.display = 'none';
oneClickResetBtn.style.display = 'none';
oneClickBtnsSeparator.style.display = 'none';

var prevObjSelect = new Array();
var nextObjSelect = new Array();
// var prevBtnHandlers = too lazy do not want to do it is not needed
var nextBtnHandlers = new Array();

var circular1 = new BlockInMotion(1);

// manage multiple circulations (max 1+5=6)
var CircularsCount = 1;
var Circulars = new Array();

document.querySelector('.obj-manage .append-objs').addEventListener('click', (e) => {
    if (CircularsCount >= 6) return;
    ++CircularsCount;

    // create nodes
    var clonedInfoContainer = infoContainer1.cloneNode(true);
    clonedInfoContainer.id = `info-container-${CircularsCount}`;
    clonedInfoContainer.children[0].children[1].innerText = `Block ${CircularsCount}`;
    clonedInfoContainer.style.display = 'none';
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
    if (CircularsCount == 2) {
        oneClickGoBtn.style.display = '';
        oneClickResetBtn.style.display = '';
        oneClickBtnsSeparator.style.display = '';
    }
    //window.scrollBy(0, 299);

    // activates the switch-previous-next buttons
    const cc = CircularsCount
    document.querySelector(`#info-container-${cc} .switch-obj-prev`).addEventListener('click', (e) => {
        document.querySelector(`#info-container-${cc}`).style.display = 'none';
        document.querySelector(`#info-container-${cc-1}`).style.display = 'grid';
    });
    nextBtnHandlers.push((e) => {
        document.querySelector(`#info-container-${cc-1}`).style.display = 'none';
        document.querySelector(`#info-container-${cc}`).style.display = 'grid';
    });
    document.querySelector(`#info-container-${cc-1} .switch-obj-next`).addEventListener('click', nextBtnHandlers[cc-2]);
});

document.querySelector('.obj-manage .delete-objs').addEventListener('click', (e) => {
    if (CircularsCount <= 1) return;
    // remove js objects
    delete Circulars[Circulars.length - 1];
    Circulars.pop();

    const infoBox = document.querySelector(`#info-container-${CircularsCount}`);
    const prevInfoBox = document.querySelector(`#info-container-${CircularsCount-1}`);
    const amIAtThisPage = infoBox.style.display != 'none';

    // remove nodes
    infoBox.remove();
    document.querySelector(`#moving-obj-${CircularsCount}`).remove();
    document.querySelector(`#moving-obj-trajectory-${CircularsCount}`).remove();
    document.querySelector(`#moving-obj-prj-${CircularsCount}`).parentNode.remove();

    // unbind the next-button event for the previous one
    document.querySelector(`#info-container-${CircularsCount-1} .switch-obj-next`).removeEventListener('click', nextBtnHandlers.pop());
    // if user is now at this page, move to the previous page
    if (amIAtThisPage) prevInfoBox.style.display = 'grid';

    if (--CircularsCount == 1) {
        // hides the multi-ball control buttons
        oneClickGoBtn.style.display = 'none';
        oneClickResetBtn.style.display = 'none';
        oneClickBtnsSeparator.style.display = 'none';
    }
    //window.scrollBy(0, -299);
});

document.querySelector('.obj-manage .objs-oneclick-go').addEventListener('click', (e) => {
    var btns = document.querySelectorAll('.info-container .set-attr-go');
    for (each of btns) each.click();
});

document.querySelector('.obj-manage .objs-oneclick-reset').addEventListener('click', (e) => {
    var btns = document.querySelectorAll('.info-container .set-attr-reset');
    for (each of btns) each.click();
});