"use strict";
var fs = require("fs");
module.exports = {
    template: fs.readFileSync(__dirname + "/../view/collection-todo.html", "utf-8")
};
