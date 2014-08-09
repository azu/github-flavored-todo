"use strict";
var issueHeadObject = {
    "user": {
        "login": "user-name",
        "avatar_url": "https://avatars.githubusercontent.com/u/19714?v=2"
    },
    id : 333333,
    "title": "issue title",
    "body": "Issue\n\n" +
        "- [x] Todo",
    "created_at": "2014-05-23T00:12:21Z",
    "updated_at": "2014-05-23T00:12:37Z"
};
function RootIssueModel() {
    this.issueHead = issueHeadObject;
}
RootIssueModel.prototype.getRawData = function () {
    return this.issueHead;
};

module.exports = RootIssueModel;