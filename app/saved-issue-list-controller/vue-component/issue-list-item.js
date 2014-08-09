"use strict";
var fs = require("fs");
module.exports = {
    computed: {
        commentID: function () {
            return "js-issue-comment-" + this.id;
        }
    },
    template: fs.readFileSync(__dirname + "/../view/issue-list-item.html", "utf-8")
};
