"use strict";
var Vue = require("vue");
var marked = require("./lib/marked-nit");
var CommentsModel = require("./Comments-model");
var IssueHeadModel = require("./Issuehead-model");
var commentsModel = new CommentsModel();
var issueHeadModel = new IssueHeadModel();
function didLoad() {
    var preview = new Vue({
        el: '#editor',
        data: {
            "issue": issueHeadModel.getRawData(),
            "comments": commentsModel.getRawData()
        },
        filters: {
            marked: marked
        }
    });
}
module.exports = didLoad;