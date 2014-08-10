"use strict";
var fs = require("fs");
module.exports = {
    template: fs.readFileSync(__dirname + "/../view/issue-list-item.html", "utf-8")
};
