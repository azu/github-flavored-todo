var fs = require("fs");
module.exports = {
    template: fs.readFileSync(__dirname + "/../view/issue-header.html", "utf-8")
};