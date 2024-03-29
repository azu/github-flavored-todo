"use strict";
var commentObject = {
    "user": {
        "login": "user-name",
        "avatar_url": "https://avatars.githubusercontent.com/u/19714?v=2"
    },
    id: 33122223333,
    "body": "*Markdown* text",
    "created_at": "2014-05-23T00:12:21Z",
    "updated_at": "2014-05-23T00:12:37Z"
};

function CommentsModel(comments) {
    this.comments = comments || [commentObject];
}
CommentsModel.prototype.getRawData = function () {
    return this.comments;
};
CommentsModel.prototype.toString = function () {
    return JSON.stringify(this.comments);
};
/**
 * adding comment object to list
 * @param {commentObject} comment
 */
CommentsModel.prototype.addComments = function (comment) {
    this.comments.push(comment);
};
module.exports = CommentsModel;