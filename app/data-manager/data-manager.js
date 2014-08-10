"use strict";
/**
 * @typedef {{rootIssue: RootIssueModel, comments : CommentsModel}} IssueItemObject
 */
var fs = require("fs");
var path = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");
var storage = (typeof localStorage !== "undefined") ? localStorage : null;
var RootIssueModel = require("../issue-controller/model/RootIssue-model");
var CommentsModel = require("../issue-controller/model/Comments-model");

function fetchSavedIssueItems() {
    var filterNonExistJSON = function (dirList) {
        var promiseMap = Promise.filter(dirList, function (dirPath) {
            return FS.exists(path.join(dirPath, "issue.json"));
        }).map(function (dirPath) {
            return path.join(dirPath, "issue.json");
        });
        return Promise.all(promiseMap);
    };

    function getLocalDataPath() {
        return path.resolve(__dirname, "../../data/local");
    }

    function getGithubDataPath() {
        return __dirname + "/../data/github"
    }

    return FS.listTree(getLocalDataPath(), function isDir(filePath, stat) {
        if (filePath === getLocalDataPath()) {
            return false;
        }
        return stat.isDirectory();
    }).then(filterNonExistJSON);
}
function getSavedIssueItems() {
    var item = storage.getItem("saved-issue-items");
    if (item != null) {
        return JSON.parse(item);
    }
    return {};
}
function storeIssueItems(items) {
    storage.setItem("saved-issue-items", JSON.stringify(items))
}
function updateLastModified(dirPath) {
    var items = getSavedIssueItems();
    items[dirPath] = {
        "last-modified": new Date()
    };
    storeIssueItems(items);
}
/**
 * save issueItemObject
 * issue.json and comments.json
 * @param {string} dirPath directory path
 * @param {IssueItemObject} issueItemObject
 * @returns {Promise}
 */
function writeData(dirPath, issueItemObject) {
    updateLastModified(dirPath);
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
    fetchSavedIssueItems: fetchSavedIssueItems,
    getSavedIssueItems: getSavedIssueItems,
    storeIssueItems: storeIssueItems,
    changeStorage: changeStorage,
    writeData: writeData,
    readData: readData
};