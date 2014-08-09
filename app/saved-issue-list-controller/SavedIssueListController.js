"use strict";
var Vue = require("vue");
function SavedIssueListController() {
    /**
     * @type {Vue|null}
     */
    this.viewController = null;
    this.loadView();
    this.reloadData();
}
SavedIssueListController.prototype.reloadData = function () {
    var issue = require("../../data/local/1/issue.json");
    this.viewController.rootIssueList.push(issue);
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