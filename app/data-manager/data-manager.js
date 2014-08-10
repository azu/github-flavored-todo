"use strict";
/**
 * @typedef {{rootIssue: RootIssueModel, comments : CommentsModel}} IssueItemObject
 */
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var storage = (typeof localStorage !== "undefined") ? localStorage : null;
/**
 * save issueItemObject
 * issue.json and comments.json
 * @param {string} dirPath directory path
 * @param {IssueItemObject} issueItemObject
 */
function writeData(dirPath, issueItemObject) {
    storage.setItem(dirPath, {
        "last-modified": new Date()
    });
    var commentsPromise = new Promise(function (resolve, reject) {
        fs.writeFile(path.join(dirPath, "comments.json"), issueItemObject.comments, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
    var issuePromise = new Promise(function (resolve, reject) {
        fs.writeFile(path.join(dirPath, "issue.json"), issueItemObject.rootIssue, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
    return Promise.all([commentsPromise, issuePromise]);
}


/**
 * read IssueItemObject
 * @param {string} dirPath directory path
 * @returns {IssueItemObject}
 */
function readData(dirPath) {
    return {};
}

function changeStorage(storageObject) {
    storage = storageObject;
}
module.exports = {
    changeStorage: changeStorage,
    writeData: writeData,
    readData: readData
};