"use strict";
var fs = require("fs");
module.exports = {
    template: fs.readFileSync(__dirname + "/../view/create-issue.html", "utf-8")
};