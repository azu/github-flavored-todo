"use strict";
// specially get from chrome context
var gui = window.require('nw.gui');
gui.Window.get().showDevTools()
require("./node-webkit/workaround")();
require("./node-webkit/menu")(gui);
// content
require("./issue-controller/issue-controller")();
