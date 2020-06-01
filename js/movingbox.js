/* 
    uniform circular motion demo! ()cleoold
*/



// container of moving block

const container = document.querySelector('div#container');
const containerWidthText = document.querySelector('.container-width');
const origin = document.querySelector('div#origin');

let containerLength = 0;

function floatToPx(num) {
    return String(num) + 'px';
}

function parseFloat200(s) {
    const res = parseFloat(s);
    return (isNaN(res))? Infinity : res;
}

function wrongInput(elem) {
    const o = elem.style.backgroundColor;
    elem.style.backgroundColor = '#c98d8d';
    setTimeout(() => {
        elem.style.backgroundColor = o;
    }, 400);
}

function onChangeContainerSize(e) {
    containerLength = parseFloat(window.getComputedStyle(container).width);
    const containerLengthPx = floatToPx(containerLength);
    container.style.height = containerLengthPx;
    containerWidthText.value = containerLengthPx;

    origin.style.left = floatToPx(parseFloat(window.getComputedStyle(container).width) / 2 - 3.6);
    origin.style.top = floatToPx(parseFloat(window.getComputedStyle(container).height) / 2 - 3.5);
}
onChangeContainerSize();
window.addEventListener('resize', onChangeContainerSize);

// block functions

function degToRadian(deg) { return Math.PI * deg / 180;}

function radianToDeg(rad) { return rad * 180 / Math.PI;}

function rotateX(x, y, rad) { return Math.cos(rad) * x - Math.sin(rad) * y;}

function rotateY(x, y, rad) { return Math.sin(rad) * x + Math.cos(rad) * y;}

/**
 * the block waiting to be rendered. its info is in x-y coordinate and is not corrected for container (which uses top-left)
 * @function Block
 * @constructor
 */
function Block(initOffset = 0, initPeriod = 0, initSemiX = 0, initSemiY = 0, initRotate = 0) {
    this.offset = initOffset;
    this.initPeriod = initPeriod;
    this.initSemiX = initSemiX;
    this.initSemiY = initSemiY;
    this.initRotate = initRotate; // deg
    this.period = (t) => this.initPeriod;
    this.omega = (t) => 2 * Math.PI / this.period(t);
    this.semiX = (t) => this.initSemiX;
    this.semiY = (t) => this.initSemiY;
    this.rotate = (t) => this.initRotate; // deg
    this.yieldX = (t) => this.semiX(t) * Math.cos(this.omega(t) * t - this.offset);
    this.yieldY = (t) => this.semiY(t) * Math.sin(this.omega(t) * t - this.offset);
    /**
     * yields the information of the block's current location
     * @method yieldRotated
     * @for Block
     * @return x:final x axis, y:final y axis,rx:signed semi-x-axis length, ry:signed semi-y-axis length, 
     *         rad:rotation angle in radians, deg:rotation angle in deg
     */
    this.yieldRotated = (t) => {
        const x = this.yieldX(t);
        const y = this.yieldY(t);
        const deg = this.rotate(t);
        const rad = degToRadian(deg);
        return {
            x: rotateX(x,y,rad),
            y: rotateY(x,y,rad),
            rx: this.semiX(t),
            ry: this.semiY(t),
            rad: rad,
            deg: deg
        };
    }
}

// moving block area

let intervals = 40;

/**
 * the rendered block
 * @function BlockInMotion
 * @param {Number} id specifies the index number of the spawned block
 * @return {BlockInMotion} a newly spawned moving block
 * 
 * usage let x = new BlockInMotion(1)
 */
function BlockInMotion(id) {
    let block1 = new Block();
    const blockElement = document.querySelector(`div#moving-obj-${id}`);
    const blockTrajectoryElement = document.querySelector(`div#moving-obj-trajectory-${id}`);
    const blockPrjElement = document.querySelector(`div#moving-obj-prj-${id}`);
    const movingBoxXText = document.querySelector(`#info-container-${id} .box-x`);
    const movingBoxYText = document.querySelector(`#info-container-${id} .box-y`);
    const setColorText = document.querySelector(`#info-container-${id} .set-color`);
    const setSizeText = document.querySelector(`#info-container-${id} .set-size`);
    const setPeriodText = document.querySelector(`#info-container-${id} .set-period`);
    const setRotateText = document.querySelector(`#info-container-${id} .set-angle`);
    const setSemiXText = document.querySelector(`#info-container-${id} .set-semi-X-axis`);
    const setSemiYText = document.querySelector(`#info-container-${id} .set-semi-Y-axis`);
    const setPeriodLDeltaText = document.querySelector(`#info-container-${id} .set-period-change`);
    const setSemiXLDeltaText = document.querySelector(`#info-container-${id} .set-semi-X-axis-change`);
    const setSemiYLDeltaText = document.querySelector(`#info-container-${id} .set-semi-Y-axis-change`);
    const setRotateLDeltaText = document.querySelector(`#info-container-${id} .set-angle-change`);
    const setRotateAroundSelect = document.querySelector(`#info-container-${id} .set-rotate-around`);
    const enterBtn = document.querySelector(`#info-container-${id} .set-attr-go`);
    const resetBtn = document.querySelector(`#info-container-${id} .set-attr-reset`);
    let maxRadiusInContainer = 0;
    let timer = 0;
    let rendered = null;
    let isFocus = false;

    let dragFlag = false;
    let blockElementIniX = 0;
    let blockElementIniY = 0;

    // set default values of the circle
    function setDefaultValsForCircle(e, resetColor=true) {
        timer = 0;
        maxRadiusInContainer = containerLength / 2;
        setSizeText.value = 15;
        setPeriodText.value = 5;
        setSemiXText.value = maxRadiusInContainer / 2;
        setSemiYText.value = maxRadiusInContainer / 2;
        setRotateText.value = 0;
        setPeriodLDeltaText.value = 0;
        setSemiXLDeltaText.value = 0;
        setSemiYLDeltaText.value = 0;
        setRotateLDeltaText.value = 0;
        setRotateAroundSelect.value = 'origin';
        isFocus = false;

        // this value should be 'corrected' like below in rendering, but since this is default case
        // where the moving obj is always 20px, just set the percentage. users will not notice
        blockElement.style.left = '49.1%';
        blockElement.style.top = '48.9%';
        blockElement.style.width = '15px';
        blockElement.style.height = '15px';

        blockPrjElement.style.left = '49.1%';

        blockTrajectoryElement.style.width = '0px';
        blockTrajectoryElement.style.height = '0px';
        blockTrajectoryElement.style.left = '0px';
        blockTrajectoryElement.style.top = '0px';
        blockTrajectoryElement.style.borderColor = 'rgba(255,255,255,.18) !important';

        if (resetColor) {
            setColorText.value = 'yellow';
            enterBtn.style.backgroundColor = 'yellow';
            blockElement.style.backgroundColor = 'yellow';
            blockPrjElement.style.backgroundColor = 'yellow';
        }

        rendered = null;
    }

    function blockOffBoundaryLax(x, y, o) {
        return x < -containerLength || x > containerLength*2 || y < -containerLength || y > containerLength*2;
    } // this version allows the object to fly out of the boundary

    function blockOffBoundary(x, y, o) {                                                        // |
        return x < 0 || x > containerLength - o || y < 0 || y > containerLength - 1.1 * o;      // |
    }                                                                                           // |
                                                                                                // |
    // renders the moving object every frame, also updates the X, Y- axis text box              // |
    // also renders x-projection                                                                // |
    // also renders semiX/semiY trajectory                                                      // |
    function rendersBlock() {                                                                   // |
        timer += intervals;                                                                     // |
        const realTimer = timer / 1000; // intriguing geometry. i do not like                     // |
        const o = parseFloat(blockElement.style.width);
        const correction = maxRadiusInContainer - o / 2;
        const coordinateSet = block1.yieldRotated(realTimer);
        let x = coordinateSet.x + correction;
        let y = coordinateSet.y + correction;

        let dX = 0, dY = 0;
        if (isFocus) { // if ellipse circulates around the focus, shift
            const rad = coordinateSet.rad;
            if (Math.abs(coordinateSet.rx) >= Math.abs(coordinateSet.ry)) {
                let c = Math.sqrt(coordinateSet.rx ** 2 - coordinateSet.ry ** 2);
                dX = c * Math.cos(rad);
                dY = c * Math.sin(rad);
            } else {
                let c = Math.sqrt(coordinateSet.ry ** 2 - coordinateSet.rx ** 2);
                dX = c * Math.sin(-rad);
                dY = c * Math.cos(rad); // should also be -rad, but cos function is even
            }
            x += dX;
            y += dY;
        }
        // ON ACCELERATION, if object exceeds the container, halt it at the boundary
        if (blockOffBoundaryLax(x, y, o)) {
            block1.initSemiX = maxRadiusInContainer;
            block1.SemiX = (t) => block1.initSemiX;
            block1.initSemiY = maxRadiusInContainer;
            block1.SemiY = (t) => block1.initSemiY;
            block1.initPeriod = 0;
            block1.period = (t) => block1.initPeriod;
            //block1.initRotate = 0;
            block1.rotate = (t) => block1.initRotate;
            setSemiXLDeltaText.value = 0;
            setSemiYLDeltaText.value = 0;
            setPeriodText.value = 0;
            movingBoxXText.value = 'stopped';
            movingBoxYText.value = 'stopped';
            return;
        }
        blockElement.style.left = floatToPx(x);
        movingBoxXText.value = floatToPx(x);
        blockElement.style.top = floatToPx(y);
        movingBoxYText.value = floatToPx(y);

        blockPrjElement.style.left = floatToPx(x);

        // displays the trajectory as the ball moves
        redrawsTrajectory(coordinateSet.rx, coordinateSet.ry, coordinateSet.deg, dX, dY);

        rendered = setTimeout(rendersBlock, intervals);
    }

    // draws the trajectory with given semiX, semiY and rotation angle in deg. can supply with its additional X, Y offsets
    function redrawsTrajectory(semiX, semiY, deg, dX=0, dY=0) {
        semiX = Math.abs(semiX);
        semiY = Math.abs(semiY);
        blockTrajectoryElement.style.width = floatToPx(semiX * 2);
        blockTrajectoryElement.style.height = floatToPx(semiY * 2);
        const leftTopPos = parseFloat(window.getComputedStyle(container).width) / 2;
        blockTrajectoryElement.style.left = floatToPx(leftTopPos - semiX + dX);
        blockTrajectoryElement.style.top = floatToPx(leftTopPos - semiY + dY);
        blockTrajectoryElement.style.transform = `rotate(${deg}deg)`;
        blockTrajectoryElement.style.WebkitTransform = `rotate(${deg}deg)`;
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
        // irrelevant. on mobile, when scrolling the page the semiX/semiY is set to 0 which is weird. fix it here in this if.
        setSemiXText.value = block1.initSemiX;
        setSemiYText.value = block1.initSemiY;
    });

    // period, semiX/semiY and rotation text box will change on click based on the block1's status
    setPeriodText.addEventListener('click', (e) => {
        setPeriodText.value = block1.period(timer / 1000);
    });
    setSemiXText.addEventListener('click', (e) => {
        setSemiXText.value = block1.semiX(timer / 1000);
    });
    setSemiYText.addEventListener('click', (e) => {
        setSemiYText.value = block1.semiY(timer / 1000);
    });
    setRotateText.addEventListener('click', (e) => {
        setRotateText.value = block1.rotate(timer / 1000);
    });

    // by changing the 'rotate around', we can make the ball circulate around origin, or focus (apply to ellipses)
    //     updates the isFocus
    setRotateAroundSelect.addEventListener('change', (e) => {
        const option = setRotateAroundSelect.value;
        if (option === 'origin') isFocus = false;
        else isFocus = true;
    });

    // by clicking go button, start rotating the ball
    enterBtn.addEventListener('click', function triggerCircleMotion(e) {
        // check color and size boxes
        const setSizeTextVal = parseFloat(setSizeText.value);
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
        // check period, semiX/semiY, rotation boxes
        const TNotValid = isNaN(parseFloat(setPeriodText.value));
        const ANotValid = isNaN(parseFloat(setRotateText.value)) || Math.abs(parseFloat(setRotateText.value)) > 360;
        const XToLarge = Math.abs(parseFloat200(setSemiXText.value)) > maxRadiusInContainer;
        const YToLarge = Math.abs(parseFloat200(setSemiYText.value)) > maxRadiusInContainer;
        if (!XToLarge && !YToLarge && !TNotValid && !ANotValid) {
            block1.initPeriod = parseFloat(setPeriodText.value);
            block1.initSemiX = parseFloat(setSemiXText.value);
            block1.initSemiY = parseFloat(setSemiYText.value);
            block1.initRotate = parseFloat(setRotateText.value);

            setPeriodText.value = parseFloat(setPeriodText.value);
            setSemiXText.value = parseFloat(setSemiXText.value);
            setSemiYText.value = parseFloat(setSemiYText.value);
            setRotateText.value = parseFloat(setRotateText.value);
        } else {
            if (XToLarge) wrongInput(setSemiXText);
            if (YToLarge) wrongInput(setSemiYText);
            if (TNotValid) wrongInput(setPeriodText);
            if (ANotValid) wrongInput(setRotateText);
            return;
        }
        // check period delta, semiX/semiY, rotation boxes delta boxes
        if (!setPeriodLDeltaText.value) setPeriodLDeltaText.value = 0;
        if (!setSemiXLDeltaText.value) setSemiXLDeltaText.value = 0;
        if (!setSemiYLDeltaText.value) setSemiYLDeltaText.value = 0;
        if (!setRotateLDeltaText.value) setRotateLDeltaText.value = 0;
        const TLDNotValid = isNaN(parseFloat(setPeriodLDeltaText.value));
        const ALDNotValid = isNaN(parseFloat(setRotateLDeltaText.value)) || Math.abs(parseFloat(setRotateLDeltaText.value)) > 360;
        const XLDToLarge = Math.abs(parseFloat200(setSemiXLDeltaText.value)) > maxRadiusInContainer;
        const YLDToLarge = Math.abs(parseFloat200(setSemiYLDeltaText.value)) > maxRadiusInContainer;
        if (!XLDToLarge && !YLDToLarge && !TLDNotValid && !ALDNotValid) {
            const periodLD = parseFloat(setPeriodLDeltaText.value);
            block1.period = (t) => block1.initPeriod + t * periodLD;
            const semiXLD = parseFloat(setSemiXLDeltaText.value);
            block1.semiX = (t) => block1.initSemiX + t * semiXLD;
            const semiYLD = parseFloat(setSemiYLDeltaText.value);
            block1.semiY = (t) => block1.initSemiY + t * semiYLD;
            const rotateLD = parseFloat(setRotateLDeltaText.value);
            block1.rotate = (t) => block1.initRotate + t * rotateLD;

            setPeriodLDeltaText.value = periodLD;
            setSemiXLDeltaText.value = semiXLD;
            setSemiYLDeltaText.value = semiYLD;
            setRotateLDeltaText.value = rotateLD;
        } else {
            if (XLDToLarge) wrongInput(setSemiXLDeltaText);
            if (YLDToLarge) wrongInput(setSemiYLDeltaText);
            if (TLDNotValid) wrongInput(setPeriodLDeltaText);
            if (ALDNotValid) wrongInput(setRotateLDeltaText);
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
    // by clicking reset, stop the ball and reset the form
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

    function blockElementDrag1(e) {
        e = e || window.event;
        e.preventDefault();
        blockElementIniX = (e.clientX || e.touches[0].clientX) - blockElement.offsetLeft;
        blockElementIniY = (e.clientY || e.touches[0].clientY) - blockElement.offsetTop;
        dragFlag = true;
    };
    function blockElementDrag2(e) {
        if (dragFlag) {
            e = e || window.event;
            e.preventDefault();
            const o = parseFloat(blockElement.style.width);
            const newX = (e.clientX || e.touches[0].clientX) - blockElementIniX;
            const newY = (e.clientY || e.touches[0].clientY) - blockElementIniY;
            if (blockOffBoundary(newX, newY, o)) return;
            blockElement.style.left = floatToPx(newX);
            blockElement.style.top = floatToPx(newY);
            movingBoxXText.value = newX;
            movingBoxYText.value = newY;

            blockPrjElement.style.left = floatToPx(newX);

            const dX = newX - parseFloat(origin.style.left);
            const dY = newY - parseFloat(origin.style.top);
            const newRadius = Math.sqrt((dX ** 2 + dY ** 2));
            setSemiXText.value = newRadius;
            setSemiYText.value = newRadius;
            block1.offset = -Math.atan2(dY, dX);

            redrawsTrajectory(newRadius, newRadius, 0);
        }
    };
    function blockElementDrag3(e) {
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

    this.cleanUp = function() {
        clearTimeout(rendered);
        block1 = null;
    };
}


// change fps button

const setFpsText = document.querySelector('.shared-info-container-bo > span:nth-child(2)');

document.querySelector('.shared-info-container-bo .fps-decrease').addEventListener('click', (e) => {
    const fps = parseInt(setFpsText.innerText);
    if (fps <= 5) {
        setFpsText.innerText = 5;
        return;
    }
    intervals = parseInt(1000 / fps);
    setFpsText.innerText = fps - ((fps >= 40) ? 10 : 5);
});
document.querySelector('.shared-info-container-bo .fps-increase').addEventListener('click', (e) => {
    const fps = parseInt(setFpsText.innerText);
    if (fps >= 150) {
        setFpsText.innerText = 150;
        return;
    }
    intervals = parseInt(1000 / fps);
    setFpsText.innerText = fps + ((fps >= 40) ? 10 : 5);
});
