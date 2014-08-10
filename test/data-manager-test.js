"use strict";
var dataManager = require("../app/data-manager/data-manager");
var assert = require("power-assert");
var MockStorage = require("mock-localstorage");
var fs = require('fs-extra');
var Promise = require("bluebird");
var shouldFulfilled = require("promise-test-helper").shouldFulfilled;
var shouldRejected = require("promise-test-helper").shouldRejected;
var RootIssueModel = require("../app/issue-controller/model/RootIssue-model");
var CommentsModel = require("../app/issue-controller/model/Comments-model");
describe("data-manager", function () {
    var storage;
    var tmpDir = __dirname + "/tmp";
    /**
     *
     * @type {IssueItemObject}
     */
    var issueItemObject;
    beforeEach(function (done) {
        issueItemObject = {
            rootIssue: new RootIssueModel,
            comments: new CommentsModel
        };
        storage = new MockStorage();
        dataManager.changeStorage(storage);
        fs.mkdirs(tmpDir, done);
    });
    afterEach(function (done) {
        fs.remove(tmpDir, done);
    });
    describe("writeData", function () {
        describe("localstorage", function () {
            it("write path as key, value is date", function () {
                dataManager.writeData(tmpDir, issueItemObject);
                assert(storage.getItem(tmpDir) != null);
                assert(storage.getItem(tmpDir)["last-modified"] instanceof Date);
            });
        });
        describe("write file", function () {
            it("should return Promise", function () {
                var promise = dataManager.writeData(tmpDir, issueItemObject);
                assert(promise instanceof Promise);
            });
            it("write path as key, value is date", function () {
                dataManager.writeData(tmpDir, issueItemObject);

            });
        });
    });
    describe("readData", function () {
        it("should return Promise", function () {
            var promise = dataManager.readData(tmpDir);
            assert(promise instanceof Promise);
        });
        context("when non-exist path", function () {
            it("should return rejected promise", function () {
                var issueItemPromise = dataManager.readData(tmpDir);
                return shouldRejected(issueItemPromise).catch(function (error) {
                    assert(error instanceof Error);
                });
            });
        });
        context("when exist path", function () {
            beforeEach(function () {
                return dataManager.writeData(tmpDir, issueItemObject);
            });
            it("should return issueItemObject", function () {
                var promise = dataManager.readData(tmpDir);
                return shouldFulfilled(promise).then(function (object) {
                    assert(typeof object === "object");
                    assert(object.comments != null);
                    assert(object.rootIssue != null);
                });
            });
        });
    });
});