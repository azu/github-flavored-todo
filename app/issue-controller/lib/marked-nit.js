"use strict";
// https://github.com/chjj/marked/issues/107#issuecomment-44542001
// - [ ] supports extension
var marked = require('marked');
var renderer = new marked.Renderer();
renderer.listitem = function (text) {
    if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
            .replace(/^\s*\[ \]\s*/, '<input class="markdown-task-checkbox" type="checkbox">')
            .replace(/^\s*\[x\]\s*/, '<input class="markdown-task-checkbox" type="checkbox" checked>');
        return '<li class="task-list-item enabled">' + text + '</li>';
    } else {
        return '<li>' + text + '</li>';
    }
};

module.exports = function (v, k) {
    return marked(v, {renderer: renderer});
};