"use strict";
var Vue = require("vue");
function SavedIssueListController() {
    /**
     * @type {Vue|null}
     */
    this.viewController = null;
    this.loadView();
}
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