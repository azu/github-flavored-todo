"use strict";
var debugController = {
    debugStyleElement : null,
    isDebugMode: function () {
        return localStorage.getItem("debug-mode") != null;
    },
    enableDebug: function () {
        localStorage.setItem("debug-mode", true);
        this.attachDebugContent();
    },
    disableDebug: function () {
        localStorage.removeItem("debug-mode");
        debugStyle.parentNode.removeChild(debugStyle);
    },
    attachDebugContent: function () {
        var fs = require("fs");
        this.debugStyleElement = document.createElement("style");
        this.debugStyleElement.type = "text/css";
        this.debugStyleElement.textContent = fs.readFileSync("app/debug-controller/css/debug.css");
        document.head.appendChild(this.debugStyleElement);
    }
};
if (debugController.isDebugMode()) {
    debugController.enableDebug();
}