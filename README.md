# uniform circular motion demo

This is the circular motion version.

uniform (probably not so uniform because it supports linear acceleration) circular motion demo page with auto div scaling!


Some special points to point:

* The size of the container (which contains balls) will change based on the change of the window size while the ball preserves its radius of circular motion. If the ball hits the boundary it will stop.
* The layout is optimized(?) for the screen size of the device.
* The `X-axis` and `Y-axis` are un-settable. Instead the offset can be set by dragging the ball.
* When reset, the radius of circular motion is set default to half of the container length.
* If the radius changes when the ball is in motion, the text in the `radius(px)` box does not change; but when the user clicks the text box, it changes to the newest value. Same for period.
* `one-click` options are hidden if there is only one ball present.
