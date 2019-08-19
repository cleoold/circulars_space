/* 
    uniform circular motion demo! ()cleoold
*/

// page layout

var pBody = document.querySelector('body')
var pHtml = document.querySelector('html')

// background change
window.addEventListener('load', () => {
        var colors = ['#30542c', '#232170', '#530a80', '#870c6d', '#873a0b']
        //var colorsLight = ['#4c9144', '#514db0', '#a06bc2', '#ab609b']
        let i = 0
        setInterval(() => {
            if (++i == 5) i = 0
            pBody.style.backgroundColor = colors[i]
            pHtml.style.backgroundColor = colors[i]
        }, 5000)
    })

// container of moving block

var container = document.querySelector('div#container')
var containerWidthText = document.querySelector('.container-width')

var containerLength = 0

function floatToPx(num) {
    return String(num) + 'px'
}

function wrongInput(elem) {
    let o = elem.style.backgroundColor
    elem.style.backgroundColor = '#c98d8d'
    setTimeout(() => {
        elem.style.backgroundColor = o
    }, 400)
}

function onChangeContainerSize(e) {
    containerLength = parseFloat(window.getComputedStyle(container).width)
    var containerLengthPx = floatToPx(containerLength)
    container.style.height = containerLengthPx
    containerWidthText.value = containerLengthPx

    var origin = document.querySelector('div#origin')
    origin.style.left = floatToPx(parseFloat(window.getComputedStyle(container).width) / 2)
    origin.style.top = floatToPx(parseFloat(window.getComputedStyle(container).height) / 2)
}
window.addEventListener('load', onChangeContainerSize)
window.addEventListener('resize', onChangeContainerSize)

function Block(initOffset = 0, initPeriod = 0, initRadius = 0) {
    this.offset = initOffset
    this.initPeriod = initPeriod
    this.initRadius = initRadius
    this.period = (t) => this.initPeriod
    this.omega = (t) => 2 * Math.PI / this.period(t)
    this.radius = (t) => this.initRadius
    this.yieldX = (t) => this.radius(t) * Math.cos(this.omega(t) * t - this.offset)
    this.yieldY = (t) => this.radius(t) * Math.sin(this.omega(t) * t - this.offset)
}

// moving block area

function BlockInMotion(id) {
    var block1 = new Block()
    var maxRadiusInContainer = 0
    var timer = 0
    var blockElement = document.querySelector(`div#moving-obj-${id}`)
    var movingBoxXText = document.querySelector(`#info-container-${id} .box-x`)
    var movingBoxYText = document.querySelector(`#info-container-${id} .box-y`)
    var setPeriodText = document.querySelector(`#info-container-${id} .set-period`)
    var setRadiusText = document.querySelector(`#info-container-${id} .set-radius`)
    var setPeriodLDeltaText = document.querySelector(`#info-container-${id} .set-period-change`)
    var setRadiusLDeltaText = document.querySelector(`#info-container-${id} .set-radius-change`)
    // set default values of the circle
    window.addEventListener('load', (e) => {
        maxRadiusInContainer = containerLength / 2
        setPeriodText.value = 5
        setRadiusText.value = containerLength / 4
        setPeriodLDeltaText.value = 0
        setRadiusLDeltaText.value = 0
        blockElement.style.left = '50%'
        blockElement.style.top = '50%'
    })
    // ON RESIZE, if object exceeds the container, keep it at the boundary
    window.addEventListener('resize', (e) => {
        maxRadiusInContainer = containerLength / 2
        if (block1.initRadius > maxRadiusInContainer) {
            block1.initRadius = maxRadiusInContainer
            block1.initRadius = maxRadiusInContainer
        }
        setRadiusText.value = block1.initRadius
    })

    // renders the moving object every frame, also updates the X, Y- axis text box
    setInterval(() => {
        timer += 40
        var realTimer = timer / 1000
        var x = block1.yieldX(realTimer) + maxRadiusInContainer
        var y = block1.yieldY(realTimer) + maxRadiusInContainer
        // ON ACCELERATION, if object exceeds the container, keep it at the boundary
        if (x < 0 || x > containerLength || y < 0 || y > containerLength) {
            block1.initRadius = maxRadiusInContainer
            block1.radius = (t) => block1.initRadius
            block1.initPeriod = 0
            block1.period = (t) => block1.initPeriod
            setRadiusLDeltaText.value = 0
            setPeriodText.value = 0
        }
        blockElement.style.left = floatToPx(x)
        movingBoxXText.value = floatToPx(x)
        blockElement.style.top = floatToPx(y)
        movingBoxYText.value = floatToPx(y)

        // move these somewhere else
        //setPeriodText.value = block1.period(realTimer)
        //setRadiusText.value = block1.radius(realTimer)
    }, 40)

    var enterBtn = document.querySelector(`#info-container-${id} .set-attr-go`)
    enterBtn.addEventListener('click', (e) => {
        if (Math.abs(parseFloat(setRadiusText.value)) <= maxRadiusInContainer) {
            block1.initPeriod = parseFloat(setPeriodText.value)
            block1.initRadius = parseFloat(setRadiusText.value)
            enterBtn.value = 'Change!'
        } else {
            wrongInput(setRadiusText)
        }
        if (!setPeriodLDeltaText.value) setPeriodLDeltaText.value = 0
        if (!setRadiusLDeltaText.value) setRadiusLDeltaText.value = 0
        if (Math.abs(parseFloat(setRadiusLDeltaText.value)) <= maxRadiusInContainer) {
            var periodLD = parseFloat(setPeriodLDeltaText.value)
            block1.period = (t) => block1.initPeriod + t * periodLD
            var radiusLD = parseFloat(setRadiusLDeltaText.value)
            block1.radius = (t) => block1.initRadius + t * radiusLD
        } else {
            wrongInput(setRadiusLDeltaText)
        }
    })
}

var circular1 = new BlockInMotion('1')



