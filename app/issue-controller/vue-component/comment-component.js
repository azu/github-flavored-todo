"use strict";
var fs = require("fs");
module.exports = {
    template: fs.readFileSync(__dirname + "/../view/comment.html", "utf-8")
};
