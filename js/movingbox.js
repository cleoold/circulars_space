/* 
    uniform circular motion demo! ()cleoold
*/

// page layout

const pBody = document.querySelector('body');
const pHtml = document.querySelector('html');

// background change
window.addEventListener('load', () => {
        const colors = ['#30542c', '#232170', '#530a80', '#870c6d', '#873a0b'];
        //var colorsLight = ['#4c9144', '#514db0', '#a06bc2', '#ab609b'];
        let i = 0;
        setInterval(() => {
            if (++i == 5) i = 0;
            pBody.style.backgroundColor = colors[i];
            pHtml.style.backgroundColor = colors[i];
        }, 5000);
    });

// container of moving block

const container = document.querySelector('div#container');
const containerWidthText = document.querySelector('.container-width');

var containerLength = 0;

function floatToPx(num) {
    return String(num) + 'px';
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

    var origin = document.querySelector('div#origin');
    origin.style.left = floatToPx(parseFloat(window.getComputedStyle(container).width) / 2);
    origin.style.top = floatToPx(parseFloat(window.getComputedStyle(container).height) / 2);
}
window.addEventListener('load', onChangeContainerSize);
window.addEventListener('resize', onChangeContainerSize);

function Block(initOffset = 0, initPeriod = 0, initRadius = 0) {
    this.offset = initOffset;
    this.initPeriod = initPeriod;
    this.initRadius = initRadius;
    this.period = (t) => this.initPeriod;
    this.omega = (t) => 2 * Math.PI / this.period(t);
    this.radius = (t) => this.initRadius;
    this.yieldX = (t) => this.radius(t) * Math.cos(this.omega(t) * t - this.offset);
    this.yieldY = (t) => this.radius(t) * Math.sin(this.omega(t) * t - this.offset);
}

// moving block area

function BlockInMotion(id) {
    var block1 = new Block();
    const intervals = 40;
    const blockElement = document.querySelector(`div#moving-obj-${id}`);
    const movingBoxXText = document.querySelector(`#info-container-${id} .box-x`);
    const movingBoxYText = document.querySelector(`#info-container-${id} .box-y`);
    const setColorText = document.querySelector(`#info-container-${id} .set-color`);
    const setSizeText = document.querySelector(`#info-container-${id} .set-size`);
    const setPeriodText = document.querySelector(`#info-container-${id} .set-period`);
    const setRadiusText = document.querySelector(`#info-container-${id} .set-radius`);
    const setPeriodLDeltaText = document.querySelector(`#info-container-${id} .set-period-change`);
    const setRadiusLDeltaText = document.querySelector(`#info-container-${id} .set-radius-change`);
    const enterBtn = document.querySelector(`#info-container-${id} .set-attr-go`);
    const resetBtn = document.querySelector(`#info-container-${id} .set-attr-reset`);
    var maxRadiusInContainer = 0;
    var timer = 0;
    var rendered = null;
    // set default values of the circle
    function setDefaultValsForCircle(e) {
        timer = 0;
        maxRadiusInContainer = containerLength / 2;
        setColorText.value = 'yellow';
        setSizeText.value = 20;
        setPeriodText.value = 5;
        setRadiusText.value = maxRadiusInContainer / 2;
        setPeriodLDeltaText.value = 0;
        setRadiusLDeltaText.value = 0;

        // this value should be 'corrected' like below in rendering, but since this is default case
        // where the moving obj is always 20px, just set the percentage. users will not notice
        blockElement.style.left = '49.3%';
        blockElement.style.top = '47.8%';
        blockElement.style.backgroundColor = 'yellow';
        blockElement.style.width = '20px';
        blockElement.style.height = '20px';

        rendered = setInterval(() => {}, 100000);
    }

    // renders the moving object every frame, also updates the X, Y- axis text box
    function rendersBlock() {
        timer += intervals;
        var realTimer = timer / 1000; // intriguing geometry. i do not like
        let o = parseFloat(blockElement.style.width);
        let correction = maxRadiusInContainer - o / 2;
        var x = block1.yieldX(realTimer) + correction;
        var y = block1.yieldY(realTimer) + correction;
        // ON ACCELERATION, if object exceeds the container, halt it at the boundary
        if (x < 0 || x > containerLength-o || y < 0 || y > containerLength - 1.5*o) {
            block1.initRadius = maxRadiusInContainer;
            block1.radius = (t) => block1.initRadius;
            block1.initPeriod = 0;
            block1.period = (t) => block1.initPeriod;
            setRadiusLDeltaText.value = 0;
            setPeriodText.value = 0;
        }
        blockElement.style.left = floatToPx(x);
        movingBoxXText.value = floatToPx(x);
        blockElement.style.top = floatToPx(y);
        movingBoxYText.value = floatToPx(y);
        // move these somewhere else
        //setPeriodText.value = block1.period(realTimer);
        //setRadiusText.value = block1.radius(realTimer);
    }

    window.addEventListener('load', setDefaultValsForCircle);
    // ON RESIZE, if object exceeds the container, keep it at the boundary
    window.addEventListener('resize', (e) => {
        maxRadiusInContainer = containerLength / 2;
        if (block1.initRadius > maxRadiusInContainer) {
            block1.initRadius = maxRadiusInContainer;
            block1.initRadius = maxRadiusInContainer;
        }
        setRadiusText.value = block1.initRadius;
    });

    // period and radius text box will change on click based on the block1's status
    setPeriodText.addEventListener('click', (e) => {
        setPeriodText.value = block1.period(timer / 1000);
    });
    setRadiusText.addEventListener('click', (e) => {
        setRadiusText.value = block1.radius(timer / 1000);
    });

    enterBtn.addEventListener('click', function triggerCircleMotion(e) {
        // check color and size boxes
        const setSizeTextVal = parseFloat(setSizeText.value)
        if (setSizeTextVal <= 30 && setSizeTextVal >= 5) {
            blockElement.style.backgroundColor = setColorText.value;
            blockElement.style.width = floatToPx(setSizeTextVal);
            blockElement.style.height = floatToPx(setSizeTextVal);
        } else {
            wrongInput(setSizeText);
            return;
        }
        // check period and radius boxes
        if (Math.abs(parseFloat(setRadiusText.value)) <= maxRadiusInContainer) {
            block1.initPeriod = parseFloat(setPeriodText.value);
            block1.initRadius = parseFloat(setRadiusText.value);
        } else {
            wrongInput(setRadiusText);
            return;
        }
        // check period delta and radius delta boxes
        if (!setPeriodLDeltaText.value) setPeriodLDeltaText.value = 0;
        if (!setRadiusLDeltaText.value) setRadiusLDeltaText.value = 0;
        if (Math.abs(parseFloat(setRadiusLDeltaText.value)) <= maxRadiusInContainer) {
            var periodLD = parseFloat(setPeriodLDeltaText.value);
            block1.period = (t) => block1.initPeriod + t * periodLD;
            var radiusLD = parseFloat(setRadiusLDeltaText.value);
            block1.radius = (t) => block1.initRadius + t * radiusLD;
        } else {
            wrongInput(setRadiusLDeltaText);
            return;
        }
        const realTimer = timer / 1000;
        clearInterval(rendered);
        // to fix
        block1.offset -= block1.omega(realTimer) * realTimer;
        timer = 0;
        rendered = setInterval(rendersBlock, intervals);
        enterBtn.value = 'Change!';
    });
    resetBtn.addEventListener('click', (e) => {
        clearInterval(rendered);
        block1 = null;
        setDefaultValsForCircle();
        block1 = new Block();
        enterBtn.value = 'Go!';
        movingBoxXText.value = null;
        movingBoxYText.value = null;
    });
}

var circular1 = new BlockInMotion('1');



