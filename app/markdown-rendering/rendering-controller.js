"use strict";
var Vue = require("vue");
var fs = require("fs");
var marked = require("./lib/marked-nit");
var CommentsModel = require("./Comments-model");
var IssueHeadModel = require("./Issuehead-model");
var commentsModel = new CommentsModel();
var issueHeadModel = new IssueHeadModel();
function didLoad() {
    var templatePath = __dirname + "/../template/";
    var preview = new Vue({
        el: '#editor',
        data: {
            "issue": issueHeadModel.getRawData(),
            "comments": commentsModel.getRawData()
        },
        filters: {
            marked: marked
        },
        components: {
            "comment": {
                template: fs.readFileSync(templatePath + "comment.html", "utf-8")

            }
        }
    });
}
module.exports = didLoad;