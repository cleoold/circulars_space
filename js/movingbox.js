/* 
    uniform circular motion demo! ()cleoold
*/



// container of moving block

const container = document.querySelector('div#container');
const containerWidthText = document.querySelector('.container-width');
const origin = document.querySelector('div#origin');

var containerLength = 0;

function floatToPx(num) {
    return String(num) + 'px';
}

function parseFloat200(s) {
    let res = parseFloat(s);
    return (isNaN(res))? Infinity : res;
}

function wrongInput(elem) {
    let o = elem.style.backgroundColor;
    elem.style.backgroundColor = '#c98d8d';
    setTimeout(() => {
        elem.style.backgroundColor = o;
    }, 400);
}

function onChangeContainerSize(e) {
    containerLength = parseFloat(window.getComputedStyle(container).width);
    var containerLengthPx = floatToPx(containerLength);
    container.style.height = containerLengthPx;
    containerWidthText.value = containerLengthPx;

    origin.style.left = floatToPx(parseFloat(window.getComputedStyle(container).width) / 2 - 3.6);
    origin.style.top = floatToPx(parseFloat(window.getComputedStyle(container).height) / 2 - 3.5);
}
onChangeContainerSize();
window.addEventListener('resize', onChangeContainerSize);

function Block(initOffset = 0, initPeriod = 0, initSemiX = 0, initSemiY = 0) {
    this.offset = initOffset;
    this.initPeriod = initPeriod;
    this.initSemiX = initSemiX;
    this.initSemiY = initSemiY;
    this.period = (t) => this.initPeriod;
    this.omega = (t) => 2 * Math.PI / this.period(t);
    this.semiX = (t) => this.initSemiX;
    this.semiY = (t) => this.initSemiY;
    this.yieldX = (t) => this.semiX(t) * Math.cos(this.omega(t) * t - this.offset);
    this.yieldY = (t) => this.semiY(t) * Math.sin(this.omega(t) * t - this.offset);
}

// moving block area

var intervals = 40;

function BlockInMotion(id) {
    var block1 = new Block();
    const blockElement = document.querySelector(`div#moving-obj-${id}`);
    const blockTrajectoryElement = document.querySelector(`div#moving-obj-trajectory-${id}`);
    const blockPrjElement = document.querySelector(`div#moving-obj-prj-${id}`);
    const movingBoxXText = document.querySelector(`#info-container-${id} .box-x`);
    const movingBoxYText = document.querySelector(`#info-container-${id} .box-y`);
    const setColorText = document.querySelector(`#info-container-${id} .set-color`);
    const setSizeText = document.querySelector(`#info-container-${id} .set-size`);
    const setPeriodText = document.querySelector(`#info-container-${id} .set-period`);
    const setSemiXText = document.querySelector(`#info-container-${id} .set-semi-X-axis`);
    const setSemiYText = document.querySelector(`#info-container-${id} .set-semi-Y-axis`);
    const setPeriodLDeltaText = document.querySelector(`#info-container-${id} .set-period-change`);
    const setSemiXLDeltaText = document.querySelector(`#info-container-${id} .set-semi-X-axis-change`);
    const setSemiYLDeltaText = document.querySelector(`#info-container-${id} .set-semi-Y-axis-change`);
    const enterBtn = document.querySelector(`#info-container-${id} .set-attr-go`);
    const resetBtn = document.querySelector(`#info-container-${id} .set-attr-reset`);
    var maxRadiusInContainer = 0;
    var timer = 0;
    var rendered = null;

    var dragFlag = false;
    var blockElementIniX = 0;
    var blockElementIniY = 0;

    // set default values of the circle
    function setDefaultValsForCircle(e, resetColor=true) {
        timer = 0;
        maxRadiusInContainer = containerLength / 2;
        setSizeText.value = 20;
        setPeriodText.value = 5;
        setSemiXText.value = maxRadiusInContainer / 2;
        setSemiYText.value = maxRadiusInContainer / 2;
        setPeriodLDeltaText.value = 0;
        setSemiXLDeltaText.value = 0;
        setSemiYLDeltaText.value = 0;

        // this value should be 'corrected' like below in rendering, but since this is default case
        // where the moving obj is always 20px, just set the percentage. users will not notice
        blockElement.style.left = '49.1%';
        blockElement.style.top = '48.9%';
        blockElement.style.width = '20px';
        blockElement.style.height = '20px';

        blockPrjElement.style.left = '49.1%';

        blockTrajectoryElement.style.width = '0px';
        blockTrajectoryElement.style.height = '0px';

        if (resetColor) {
            setColorText.value = 'yellow';
            enterBtn.style.backgroundColor = 'yellow';
            blockElement.style.backgroundColor = 'yellow';
            blockPrjElement.style.backgroundColor = 'yellow';
        }

        rendered = null;
    }

    function blockOffBoundary(x, y, o) {                                                        // |
        return x < 0 || x > containerLength - o || y < 0 || y > containerLength - 1.1 * o;      // |
    }                                                                                           // |
                                                                                                // |
    // renders the moving object every frame, also updates the X, Y- axis text box              // |
    // also renders x-projection                                                                // |
    // also renders semiX/semiY trajectory                                                           // |
    function rendersBlock() {                                                                   // |
        timer += intervals;                                                                     // |
        var realTimer = timer / 1000; // intriguing geometry. i do not like                     // |
        let o = parseFloat(blockElement.style.width);
        let correction = maxRadiusInContainer - o / 2;
        var x = block1.yieldX(realTimer) + correction;
        var y = block1.yieldY(realTimer) + correction;
        // ON ACCELERATION, if object exceeds the container, halt it at the boundary
        if (blockOffBoundary(x, y, o)) {
            block1.initSemiX = maxRadiusInContainer;
            block1.SemiX = (t) => block1.initSemiX;
            block1.initSemiY = maxRadiusInContainer;
            block1.SemiY = (t) => block1.initSemiY;
            block1.initPeriod = 0;
            block1.period = (t) => block1.initPeriod;
            setSemiXLDeltaText.value = 0;
            setSemiYLDeltaText.value = 0;
            setPeriodText.value = 0;
        }
        blockElement.style.left = floatToPx(x);
        movingBoxXText.value = floatToPx(x);
        blockElement.style.top = floatToPx(y);
        movingBoxYText.value = floatToPx(y);

        blockPrjElement.style.left = floatToPx(x);

        redrawsTrajectory(block1.semiX(realTimer), block1.semiY(realTimer));

        rendered = setTimeout(rendersBlock, intervals);
    }

    function redrawsTrajectory(semiX, semiY) {
        semiX = Math.abs(semiX);
        semiY = Math.abs(semiY);
        blockTrajectoryElement.style.width = floatToPx(semiX * 2);
        blockTrajectoryElement.style.height = floatToPx(semiY * 2);
        let leftTopPos = parseFloat(window.getComputedStyle(container).width) / 2;
        blockTrajectoryElement.style.left = floatToPx(leftTopPos - semiX);
        blockTrajectoryElement.style.top = floatToPx(leftTopPos - semiY);
    }


    setDefaultValsForCircle();
    // ON RESIZE, if object exceeds the container, keep it at the boundary
    window.addEventListener('resize', (e) => {
        maxRadiusInContainer = containerLength / 2;
        if (block1.initSemiX > maxRadiusInContainer)
            block1.initSemiX = maxRadiusInContainer;
        if (block1.initSemiY > maxRadiusInContainer)
            block1.initSemiY = maxRadiusInContainer;
        if ('ontouchstart' in document.documentElement) return;
        // irrelevant. on mobile, when scrolling the page the semiX/semiY is set to 0 which is wired. fix it here in this if.
        setSemiXText.value = block1.initSemiX;
        setSemiYText.value = block1.initSemiY;
    });

    // period and semiX/semiY text box will change on click based on the block1's status
    setPeriodText.addEventListener('click', (e) => {
        setPeriodText.value = block1.period(timer / 1000);
    });
    setSemiXText.addEventListener('click', (e) => {
        setSemiXText.value = block1.semiX(timer / 1000);
    });
    setSemiYText.addEventListener('click', (e) => {
        setSemiYText.value = block1.semiY(timer / 1000);
    });

    enterBtn.addEventListener('click', function triggerCircleMotion(e) {
        // check color and size boxes
        const setSizeTextVal = parseFloat(setSizeText.value)
        if (setSizeTextVal <= 30 && setSizeTextVal >= 5) {
            enterBtn.style.backgroundColor = setColorText.value;

            blockElement.style.backgroundColor = setColorText.value;
            blockElement.style.width = floatToPx(setSizeTextVal);
            blockElement.style.height = floatToPx(setSizeTextVal);

            blockPrjElement.style.backgroundColor = setColorText.value;
        } else {
            wrongInput(setSizeText);
            return;
        }
        // check period and semiX/semiY boxes
        let TNotValid = isNaN(parseFloat(setPeriodText.value));
        let XToLarge = Math.abs(parseFloat200(setSemiXText.value)) > maxRadiusInContainer;
        let YToLarge = Math.abs(parseFloat200(setSemiYText.value)) > maxRadiusInContainer;
        if (!XToLarge && !YToLarge && !TNotValid) {
            block1.initPeriod = parseFloat(setPeriodText.value);
            block1.initSemiX = parseFloat(setSemiXText.value);
            block1.initSemiY = parseFloat(setSemiYText.value);

            setPeriodText.value = parseFloat(setPeriodText.value);
            setSemiXText.value = parseFloat(setSemiXText.value);
            setSemiYText.value = parseFloat(setSemiYText.value);
        } else {
            if (XToLarge) wrongInput(setSemiXText);
            if (YToLarge) wrongInput(setSemiYText);
            if (TNotValid) wrongInput(setPeriodText);
            return;
        }
        // check period delta and semiX/semiY delta boxes
        if (!setPeriodLDeltaText.value) setPeriodLDeltaText.value = 0;
        if (!setSemiXLDeltaText.value) setSemiXLDeltaText.value = 0;
        if (!setSemiYLDeltaText.value) setSemiYLDeltaText.value = 0;
        let TLDNotValid = isNaN(parseFloat(setPeriodLDeltaText.value));
        let XLDToLarge = Math.abs(parseFloat200(setSemiXLDeltaText.value)) > maxRadiusInContainer;
        let YLDToLarge = Math.abs(parseFloat200(setSemiYLDeltaText.value)) > maxRadiusInContainer;
        if (!XLDToLarge && !YLDToLarge && !TLDNotValid) {
            var periodLD = parseFloat(setPeriodLDeltaText.value);
            block1.period = (t) => block1.initPeriod + t * periodLD;
            var semiXLD = parseFloat(setSemiXLDeltaText.value);
            block1.semiX = (t) => block1.initSemiX + t * semiXLD;
            var semiYLD = parseFloat(setSemiYLDeltaText.value);
            block1.semiY = (t) => block1.initSemiY + t * semiYLD;

            setPeriodLDeltaText.value = parseFloat(setPeriodText.value);
            setSemiXLDeltaText.value = parseFloat(setSemiXLDeltaText.value);
            setSemiYLDeltaText.value = parseFloat(setSemiYLDeltaText.value);
        } else {
            if (XLDToLarge) wrongInput(setSemiXLDeltaText);
            if (YLDToLarge) wrongInput(setSemiYLDeltaText);
            if (TLDNotValid) wrongInput(setPeriodLDeltaText);
            return;
        }
        const realTimer = timer / 1000;
        clearTimeout(rendered);
        // to fix
        block1.offset -= block1.omega(realTimer) * realTimer;
        timer = 0;
        rendered = setTimeout(rendersBlock, intervals);
        enterBtn.value = 'Change!';
    });
    resetBtn.addEventListener('click', (e) => {
        clearTimeout(rendered);
        block1 = null;
        setDefaultValsForCircle(null, false);
        block1 = new Block();
        enterBtn.value = 'Go!';
        movingBoxXText.value = null;
        movingBoxYText.value = null;
    });

    // box draggable at beginning
    // can set radius and offset (offset is implicit)

    var blockElementDrag1 = (e) => {
        e = e || window.event;
        e.preventDefault();
        blockElementIniX = (e.clientX || e.touches[0].clientX) - blockElement.offsetLeft;
        blockElementIniY = (e.clientY || e.touches[0].clientY) - blockElement.offsetTop;
        dragFlag = true;
    };
    var blockElementDrag2 = (e) => {
        if (dragFlag) {
            e = e || window.event;
            e.preventDefault();
            let o = parseFloat(blockElement.style.width);
            let newX = (e.clientX || e.touches[0].clientX) - blockElementIniX;
            let newY = (e.clientY || e.touches[0].clientY) - blockElementIniY;
            if (blockOffBoundary(newX, newY, o)) return;
            blockElement.style.left = floatToPx(newX);
            blockElement.style.top = floatToPx(newY);
            movingBoxXText.value = newX;
            movingBoxYText.value = newY;

            blockPrjElement.style.left = floatToPx(newX);

            let dX = newX - parseFloat(origin.style.left);
            let dY = newY - parseFloat(origin.style.top);
            let newRadius = Math.sqrt((dX ** 2 + dY ** 2));
            setSemiXText.value = newRadius;
            setSemiYText.value = newRadius;
            block1.offset = -Math.atan2(dY, dX);

            redrawsTrajectory(newRadius, newRadius);
        }
    };
    var blockElementDrag3 = (e) => {
        dragFlag = false;
        blockElementIniX = 0;
        blockElementIniY = 0;
    };

    if ('onmousedown' in document.documentElement) {
        blockElement.addEventListener('mousedown', blockElementDrag1);
        container.addEventListener('mousemove', blockElementDrag2);
        container.addEventListener('mouseup', blockElementDrag3);
    }
    if ('ontouchstart' in document.documentElement) {
        blockElement.addEventListener('touchstart', blockElementDrag1);
        container.addEventListener('touchmove', blockElementDrag2);
        container.addEventListener('touchend', blockElementDrag3);
    }
}


// change fps button

const setFpsText = document.querySelector('.shared-info-container-bo > span:nth-child(2)');

document.querySelector('.shared-info-container-bo .fps-decrease').addEventListener('click', (e) => {
    let fps = parseInt(setFpsText.innerText);
    if (fps <= 5) {
        setFpsText.innerText = 5;
        return;
    }
    intervals = parseInt(1000 / fps);
    setFpsText.innerText = fps - ((fps >= 40) ? 10 : 5);
});
document.querySelector('.shared-info-container-bo .fps-increase').addEventListener('click', (e) => {
    let fps = parseInt(setFpsText.innerText);
    if (fps >= 150) {
        setFpsText.innerText = 150;
        return;
    }
    intervals = parseInt(1000 / fps);
    setFpsText.innerText = fps + ((fps >= 40) ? 10 : 5);
});


