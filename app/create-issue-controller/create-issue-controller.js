/**
 * Created by azu on 2014/08/10.
 * LICENSE : MIT
 */
"use strict";
var Vue = require("vue");
var assert = require("assert");
var RootIssue = require("../issue-controller/model/RootIssue-model");
function CreateIssueController() {
    this.viewController = null;
    this.createIssueHandler = null;
    this.loadView();
}
CreateIssueController.prototype.addCreateIssueHandler = function (callback) {
    this.createIssueHandler = callback;
};
CreateIssueController.prototype.loadView = function () {
    var that = this;
    this.viewController = new Vue({
        el: '#js-main-header',
        data: {
            placeholderIssue: {}
        },
        methods: {
            createIssue: function () {
                assert(typeof that.createIssueHandler === "function");
                var rootIssue = new RootIssue({
                    "user": {
                        "login": "user-name",
                        "avatar_url": "https://avatars.githubusercontent.com/u/19714?v=2"
                    },
                    title: "",
                    body: "",
                    id: 333333,
                    "created_at": new Date(),
                    "updated_at": new Date()
                });
                that.createIssueHandler(rootIssue);
            }
        },
        components: {
            "create-issue": require("./vue-component/create-issue")
        }
    });
};
module.exports = CreateIssueController;