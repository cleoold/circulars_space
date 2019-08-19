/* 
    uniform circular motion demo! ()cleoold
*/

var container = document.querySelector('div#container')
var containerWidthText = document.querySelector('#container-width')
var movingBoxXText = document.querySelector('#box-x')
var movingBoxYText = document.querySelector('#box-y')
var setPeriodText = document.querySelector('#set-period')
var setRadiusText = document.querySelector('#set-radius')

var containerLength = 0

function floatToPx(num) {
    return String(num) + 'px'
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
    this.yieldX = (t) => this.radius() * Math.cos(this.omega() * t - this.offset)
    this.yieldY = (t) => this.radius() * Math.sin(this.omega() * t - this.offset)
}

var block1 = new Block()
var timer = 0
var blockElement = document.querySelector('div#moving-obj')
window.addEventListener('load', (e) => {
    setPeriodText.value = 5
    setRadiusText.value = containerLength / 4
})

setInterval(() => {
    timer += 40
    var realTimer = timer / 1000
    var x = floatToPx(block1.yieldX(realTimer) + containerLength / 2)
    var y = floatToPx(block1.yieldY(realTimer) + containerLength / 2)
    blockElement.style.left = x
    movingBoxXText.value = x
    blockElement.style.top = y
    movingBoxYText.value = y
}, 40)

document.querySelector('#set-attr-go').addEventListener('click', (e) => {
    if (Math.abs(parseFloat(setRadiusText.value)) <= containerLength / 2) {
        block1.initPeriod = parseFloat(setPeriodText.value)
        block1.initRadius = parseFloat(setRadiusText.value)
    } else {
        let o = setRadiusText.style.backgroundColor
        setRadiusText.style.backgroundColor = '#c98d8d'
        setTimeout(() => {
            setRadiusText.style.backgroundColor = o
        }, 400)
    }
})