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
    var viewController = new Vue({
        el: '#js-main-content',
        data: {
            "editingComments": [],
            "rootIssue": rootIssue.getRawData(),
            "comments": commentsModel.getRawData()
        },
        filters: {
            marked: marked
        },
        methods: {
            isEditing: function (target) {
                return this.editingComments.indexOf(target) !== -1;
            },
            editComment: function (target, event) {
                if (this.editingComments.indexOf(target) !== -1) {
                    return;
                }
                this.editingComments.push(target);
                var myTextArea = document.getElementById(target.commentID);
                var myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
                    value: target.body,
                    mode: "markdown"
                });
                var that = this;

                function saveAndClose(cm) {
                    var indexOf = that.editingComments.indexOf(target);
                    if (indexOf != -1) {
                        that.editingComments.splice(indexOf, 1);
                    }
                    target.body = cm.getValue();
                    cm.toTextArea();
                }

                myCodeMirror.addKeyMap({
                    "Ctrl-Enter": function (cm) {
                        saveAndClose(cm);
                    },
                    "Cmd-Enter": function (cm) {
                        saveAndClose(cm)
                    }
                });
                myCodeMirror.setValue(target.body);
                Vue.nextTick(function () {
                    myCodeMirror.focus();
                });
            }
        },
        components: {
            "issue-header": {
                template: fs.readFileSync(templatePath + "issue-header.html", "utf-8")
            },
            "comment": require("./vue-component/comment-component")
        }
    });
}
module.exports = didLoad;