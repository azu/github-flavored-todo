"use strict";
var Vue = require("vue");
var assert = require("assert");
var fs = require("fs");
var FS = require("q-io/fs");
var path = require("path");
var Promise = require("bluebird");
var CommentsModel = require("../issue-controller/model/Comments-model");
var RootIssueModel = require("../issue-controller/model/RootIssue-model");

var dataManager = require("../data-manager/data-manager");
function SavedIssueListController() {
    /**
     * @type {Vue|null}
     */
    this.viewController = null;
    this.clickHandeler = null;
    this.loadView();
    this.reloadData();
}
SavedIssueListController.prototype.reloadData = function () {
    var that = this;
    dataManager.fetchSavedIssueItems().then(function (fileList) {
        return Promise.all(fileList.map(function (filePath) {
            return FS.read(filePath).then(JSON.parse).then(function (rootIssue) {
                return {
                    rootIssue: rootIssue,
                    filePath: filePath
                };
            });
        }));
    }).then(function (issueList) {
        that.viewController.rootIssueList = issueList;
    }).catch(function (error) {
        console.log(error);
    });
};
SavedIssueListController.prototype.addClickHandler = function (callback) {
    this.clickHandeler = callback;
};
SavedIssueListController.prototype.loadView = function () {
    var that = this;
    this.viewController = new Vue({
        el: '#js-main-sidebar',
        data: {
            "rootIssueList": [
                {
                    rootIssue: null,
                    filePath: null
                }
            ]
        },
        methods: {
            loadIssue: function (object) {
                assert(typeof that.clickHandeler === "function");
                var commentsPath = path.dirname(object.filePath);
                var data = fs.readFileSync(path.join(commentsPath, "comments.json"), "utf-8");
                var comments = JSON.parse(data);
                that.clickHandeler({
                    rootIssue: new RootIssueModel(object.rootIssue),
                    comments: new CommentsModel(comments)
                });
            }
        },
        components: {
            "issueListItem": require("./vue-component/issue-list-item")
        }
    });
};
module.exports = SavedIssueListController;