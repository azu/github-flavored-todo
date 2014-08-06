"use strict";
function RenderingModel(input) {
    this.data = {};
    if (input != null) {
        this.data.input = input;
    }
}
RenderingModel.prototype.getRawData = function () {
    return this.data;
};
RenderingModel.prototype.setInputText = function (text) {
    this.data.input = text;
};
module.exports = RenderingModel;