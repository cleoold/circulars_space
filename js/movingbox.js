/* 
    uniform circular motion demo! ()cleoold
*/

var container = document.querySelector('div#container')
var containerWidthText = document.querySelector('#container-width')
var containerHeightText = document.querySelector('#container-height')
var movingBoxXText = document.querySelector('#box-x')
var movingBoxYText = document.querySelector('#box-y')
var setPeriodText = document.querySelector('#set-period')

var containerLength = 0

function floatToPx(num) {
    return String(num) + 'px'
}

function onChangeContainerSize(e) {
    containerLength = parseFloat(window.getComputedStyle(container).width)
    var containerLengthPx = floatToPx(containerLength)
    container.style.height = containerLengthPx
    containerHeightText.value = containerLengthPx
    containerWidthText.value = containerLengthPx

    var origin = document.querySelector('div#origin')
    origin.style.left = floatToPx(parseFloat(window.getComputedStyle(container).width) / 2)
    origin.style.top = floatToPx(parseFloat(window.getComputedStyle(container).height) / 2)
}
window.addEventListener('load', onChangeContainerSize)
window.addEventListener('resize', onChangeContainerSize)

function Block(offset, period) {
    this.offset = offset
    this.period = period
    this.omega = () => 2 * Math.PI / this.period
    this.radius = () => containerLength / 2
    this.yieldX = (t) => this.radius() * Math.cos(this.omega() * t - this.offset)
    this.yieldY = (t) => this.radius() * Math.sin(this.omega() * t - this.offset)
}

var block1 = new Block(0, 0)
var timer = 0
var blockElement = document.querySelector('div#moving-obj')

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

document.querySelector('#set-period-go').addEventListener('click', () => {
    block1.period = setPeriodText.value
})