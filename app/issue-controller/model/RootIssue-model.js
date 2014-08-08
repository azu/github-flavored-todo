"use strict";
var issueHeadObject = {
    "user": {
        "login": "user-name",
        "avatar_url": "https://avatars.githubusercontent.com/u/19714?v=2"
    },
    "title": "issue title",
    "body": "Issue\n\n" +
        "- [x] Todo",
    "created_at": "2014-05-23T00:12:21Z",
    "updated_at": "2014-05-23T00:12:37Z"
};
function IssueHeadModel() {
    this.issueHead = issueHeadObject;
}
IssueHeadModel.prototype.getRawData = function () {
    return this.issueHead;
};

module.exports = IssueHeadModel;