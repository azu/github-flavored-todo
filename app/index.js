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