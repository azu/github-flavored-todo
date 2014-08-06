"use strict";
// specially get from chrome context
var gui = window.require('nw.gui');
require("./node-webkit/workaround")();
require("./node-webkit/menu")(gui);
require("./markdown-rendering/rendering-controller")();
