"use strict";
// specially get from chrome context
var gui = window.require('nw.gui');
gui.Window.get().showDevTools();
require("./node-webkit/workaround")();
require("./node-webkit/menu")(gui);

// content
var IssueController = require("./issue-controller/IssueController");
var issueController = new IssueController();
// list
var SavedIssueListController = require("./saved-issue-list-controller/SavedIssueListController");
var savedIssueListController = new SavedIssueListController();
savedIssueListController.addClickHandler(function (issueItemObject) {
    issueController.updateWithIssueItemObject(issueItemObject);
});
// header
var CreateIssueController = require("./create-issue-controller/create-issue-controller");
var createIssueController = new CreateIssueController();
createIssueController.addCreateIssueHandler(function (itemObject) {
    issueController.updateWithIssueItemObject(itemObject);
});