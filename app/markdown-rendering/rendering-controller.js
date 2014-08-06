"use strict";
var Vue = require("vue");
var marked = require("./lib/marked-nit");
var RenderingModel = require("./Rendering-model");
var model = new RenderingModel('# Hw\n' +
    '- [ ] todo');
function didLoad() {
    var preview = new Vue({
        el: '#editor',
        data: model.getRawData(),
        filters: {
            marked: marked
        }
    });
}
module.exports = didLoad;