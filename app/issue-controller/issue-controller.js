"use strict";
var Vue = require("vue");
var fs = require("fs");
var CodeMirror = require("codemirror");
require('codemirror/mode/markdown/markdown');
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
        methods: {
            toggleEdit: function (target, event) {
                var myTextArea = document.getElementById(target.commentID);
                var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
                    value: target.body,
                    mode: "markdown"
                });
                myCodeMirror.addKeyMap({
                    "Cmd-Enter": function (cm) {
                        target.body = cm.getValue();
                        cm.toTextArea()
                    }
                });
                myCodeMirror.setValue(target.body);
            }
        },
        components: {
            "issue-header": {
                template: fs.readFileSync(templatePath + "issue-header.html", "utf-8")
            },
            "comment": require("./component/comment-component")
        }
    });
}
module.exports = didLoad;