"use strict";
var todoRegexp = /^-\s*\[[x ]\]\s*/;
function collectTodo(text) {
    if (text == null) {
        return [];
    }
    var lineByLine = text.split("\n");
    return lineByLine.filter(function (line) {
        return todoRegexp.test(line);
    });
}
module.exports = collectTodo;