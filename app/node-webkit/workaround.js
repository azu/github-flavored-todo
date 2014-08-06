"use strict";
function patchNodeWebkitWorkAround() {
    global.document = window.document;
    global.navigator = window.navigator;
    window.setTimeout = global.setTimeout;
    window.requestAnimationFrame = global.requestAnimationFrame;
    window.webkitRequestAnimationFrame = global.webkitRequestAnimationFrame;
}
module.exports = patchNodeWebkitWorkAround;