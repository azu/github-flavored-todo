"use strict";
var Vue = require("vue");
var CodeMirror = require("codemirror");
var Promise = require("bluebird");
require('codemirror/mode/markdown/markdown');
var marked = require("./lib/marked-nit");
var dataManager = require("../data-manager/data-manager");
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
    var that = this;
    this.silentUpdate(function () {
        that.viewController.$set("issueItemObject", data);
    });
};
IssueController.prototype.registerSaveObserve = function (vm) {
    function saveData() {
        var issueItemObject = vm.$data.issueItemObject;
        var rootIssue = issueItemObject.rootIssue;
        dataManager.writeData("./data/local/" + rootIssue.id, issueItemObject).catch(function (error) {
            console.log(error);
        });
    }

    vm.$watch('issueItemObject', function (value) {
        saveData();
    });
};
IssueController.prototype.silentUpdate = function (action) {
    this.viewController.$unwatch("issueItemObject");
    action();
    this.registerSaveObserve(this.viewController);
};
IssueController.prototype.loadView = function () {
    var that = this;
    this.viewController = new Vue({
        el: '#js-main-content',
        data: {
            "editedIssue": null,
            "editingComments": [],
            "issueItemObject": {
                "rootIssue":{},
                "comments":[]
            }
        },
        ready: function () {
            that.registerSaveObserve(this);
        },
        filters: {
            marked: function (text) {
                if (text == null) {
                    return "";
                }
                return marked(text);
            }
        },
        directives: {
            'todo-focus': function (value) {
                if (!value) {
                    return;
                }
                var el = this.el;
                setTimeout(function () {
                    el.focus();
                }, 0);
            }
        },
        methods: {
            // rootIssue
            editTitle: function (rootIssue) {
                this.editedIssue = rootIssue;
                this.beforeEditCache = rootIssue.title;
            },
            doneEdit: function (rootIssue) {
                if (!this.editedIssue) {
                    return;
                }
                this.editedIssue = null;
            },
            cancelEdit: function (rootIssue) {
                this.editedIssue = null;
                rootIssue.title = this.beforeEditCache;
            },
            // comments
            isEditing: function (target) {
                return this.editingComments.indexOf(target) !== -1;
            },
            editComment: function (target, event) {
                var that = this;
                if (this.editingComments.indexOf(target) !== -1) {
                    return;
                }
                this.editingComments.push(target);
                var myTextArea = document.getElementById("js-issue-comment-" + target.id);
                var myCodeMirror = CodeMirror.fromTextArea(myTextArea);

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
                Vue.nextTick(function () {
                    myCodeMirror.setValue(target.body);
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