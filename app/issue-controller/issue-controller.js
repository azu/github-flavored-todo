"use strict";
var Vue = require("vue");
var fs = require("fs");
var marked = require("./lib/marked-nit");
var CommentsModel = require("./model/Comments-model");
var RootIssueModel = require("./model/RootIssue-model");
var commentsModel = new CommentsModel();
var rootIssue = new RootIssueModel();
function didLoad() {
    var templatePath = __dirname + "/view/";
    var preview = new Vue({
        el: '#editor',
        data: {
            "rootIssue": rootIssue.getRawData(),
            "comments": commentsModel.getRawData()
        },
        filters: {
            marked: marked
        },
        components: {
            "issue-header": {
                template: fs.readFileSync(templatePath + "issue-header.html", "utf-8")
            },
            "comment": {
                template: fs.readFileSync(templatePath + "comment.html", "utf-8")
            }
        }
    });
}
module.exports = didLoad;