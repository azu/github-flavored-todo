"use strict";
var Vue = require("vue");
var FS = require("q-io/fs");
var Promise = require("bluebird");
var dataManager = require("../data-manager/data-manager");
function SavedIssueListController() {
    /**
     * @type {Vue|null}
     */
    this.viewController = null;
    this.loadView();
    this.reloadData();
}
SavedIssueListController.prototype.reloadData = function () {
    var that = this;
    dataManager.fetchSavedIssueItems().then(function (fileList) {
        return Promise.all(fileList.map(function (filePath) {
            return FS.read(filePath).then(JSON.parse);
        }));
    }).then(function(issueList){
        that.viewController.rootIssueList = issueList;
    }).catch(function(error){
        console.log(error);
    });
};
SavedIssueListController.prototype.loadView = function () {
    this.viewController = new Vue({
        el: '#js-main-sidebar',
        data: {
            "rootIssueList": [
                {title: "test"}
            ]
        },
        components: {
            "issueListItem": require("./vue-component/issue-list-item")
        }
    });
};
module.exports = SavedIssueListController;