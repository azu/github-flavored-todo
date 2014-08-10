"use strict";
/**
 * @typedef {{rootIssue: RootIssueModel, comments : CommentsModel}} IssueItemObject
 */
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var storage = (typeof localStorage !== "undefined") ? localStorage : null;
var RootIssueModel = require("../issue-controller/model/RootIssue-model");
var CommentsModel = require("../issue-controller/model/Comments-model");
/**
 * save issueItemObject
 * issue.json and comments.json
 * @param {string} dirPath directory path
 * @param {IssueItemObject} issueItemObject
 * @returns {Promise}
 */
function writeData(dirPath, issueItemObject) {
    storage.setItem(dirPath, {
        "last-modified": new Date()
    });
    var commentsPromise = new Promise(function (resolve, reject) {
        var commentsPath = path.join(dirPath, "comments.json");
        fs.writeFile(commentsPath, issueItemObject.comments, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
    var issuePromise = new Promise(function (resolve, reject) {
        var issuePath = path.join(dirPath, "issue.json");
        fs.writeFile(issuePath, issueItemObject.rootIssue, function (error, data) {
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
 * @returns {Promise}
 */
function readData(dirPath) {
    var commentsPromise = new Promise(function (resolve, reject) {
        var commentsPath = path.join(dirPath, "comments.json");
        fs.readFile(commentsPath, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(new CommentsModel(JSON.parse(data)));
            }
        });
    });
    var issuePromise = new Promise(function (resolve, reject) {
        var issuePath = path.join(dirPath, "issue.json");
        fs.readFile(issuePath, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(new RootIssueModel(JSON.parse(data)));
            }
        });
    });
    return Promise.all([commentsPromise, issuePromise]).then(function (results) {
        /**
         * @type {IssueItemObject}
         */
        return {
            comments: results[0],
            rootIssue: results[1]
        }
    });

}

function changeStorage(storageObject) {
    storage = storageObject;
}
module.exports = {
    changeStorage: changeStorage,
    writeData: writeData,
    readData: readData
};