"use strict";
var Vue = require("vue");
var CodeMirror = require("codemirror");
require('codemirror/mode/markdown/markdown');
var marked = require("./lib/marked-nit");
var CommentsModel = require("./model/Comments-model");
var RootIssueModel = require("./model/RootIssue-model");
var commentsModel = new CommentsModel(require("../../data/local/1/comments.json"));
var rootIssue = new RootIssueModel(require("../../data/local/1/issue.json"));

function IssueController() {
    /**
     * @type {Vue|null}
     */
    this.viewControler = null;
    this.loadView();
}
/**
 *
 * @param {IssueItemObject} data
 */
IssueController.prototype.updateWithIssueItemObject = function (data) {
    var rootIssue = data.rootIssue;
    var commentsModel = data.comments;
    this.viewController.$set("rootIssue", rootIssue.getRawData());
    this.viewController.$set("comments", commentsModel.getRawData());
};
IssueController.prototype.loadView = function () {
    this.viewController = new Vue({
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
            "issue-header": require("./vue-component/issue-header"),
            "comment": require("./vue-component/comment-component")
        }
    });
};
module.exports = IssueController;