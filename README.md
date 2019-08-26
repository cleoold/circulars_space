# interactive circular/elliptic motion demo

* uniform circular motion

![uniform circular motion](https://cleoold.com/wp-content/uploads/2019/08/ffawvv.gif)

* many uniform circular motions

![uniform circular motion](https://cleoold.com/wp-content/uploads/2019/08/gsgeef.gif)

* many circular motions with varying focus length & speed

![elliptic motion](https://cleoold.com/wp-content/uploads/2019/08/dadasdsa.gif)

* elliptic motion and harmonic motion with rotation

![elliptic motion](https://cleoold.com/wp-content/uploads/2019/08/dawbsd.gif)

* real elliptic motion (planet models)

![elliptic motion](https://cleoold.com/wp-content/uploads/2019/08/dafwwg.gif)

This is the elliptic motion version.

uniform (probably not so uniform because it supports linear acceleration) circular motion demo page with auto div scaling!

see demo at https://cleoold.github.io/uniform_circular_motion/index.html

#### Interesting setups

* two uniform circular motions
  * Block 1: 
    semi X axis:166, Rx Δ: 0, semi Y axis: 166, Ry Δ: 0, period: 10, T Δ: 0, rotate angle: 0, α Δ: 0, rotate around: origin
  * Block 2:
    96, 0, 96, 0, 10, 0, 0, 0, origin
* two springs perpendicular to each other and rotating
  * Block 1:
    162, 0, 0, 0, 5, 0, 0, 10, origin
  * Block 2:
    0, 0, 162, 0, 5, 0, 0, 10, origin
* one oscillation and a bigger rotating ellipse
  * Block 1:
    50, 0, 0, 0, 1, 0, 0, 0, origin
  * Block 2:
    180, 0, 80, 0, 5, 0, 0, 30, origin
* chaotic comet with unknown trajectory
  * Block 1:
    80, 0, 80, -10, 2, 0, 0, 30, focus
* planets
  * Block 1: 50, 0, 50, 0, 5, 0, 0, 0, origin
  * Block 2: 60, 0, 59, 0, 10, 0, 0, 0, focus
  * Block 3: 80, 0, 75, 0, 22, 0, 0, 0, focus
  * Block 4: 90, 0, 82, 0, 5, 0, 0, 0, focus
  * Block 5: 162, 0, 122, 0, 5, 0, 0, 0, focus
  * Block 6: 271, 0, 271, 0, -10, 0, 0, 0, origin

##### Some special points to point:

* The size of the container (which contains balls) will change based on the change of the window size while the ball preserves its semi-X-axis and semi-Y-axis (or radius) of circular motion. If the ball hits the boundary it will stop.
* The layout is optimized(?) for the screen size of the device.
* The `X-axis` and `Y-axis` are un-settable. Instead the offset can be set by dragging the ball.
* When reset, the semi-X-axis and semi-Y-axis of circular motion is set default to half of the container length.
* If the semi-X-axis or semi-Y-axis changes when the ball is in motion, the text in the `semi-X-axis(px)` or `semi-Y-axis(px)` box does not change; but when the user clicks the text box, it changes to the newest value. Same for period.
* `one-click` options are hidden if there is only one ball present.

#### Not compatible with
* Dark reader (trajectory randomly goes missing)





#### License
* [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)