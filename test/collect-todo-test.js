"use strict";
var assert = require("power-assert");
var collectTodo = require("../app/issue-controller/util/collect-todo");
describe("collect-todo", function () {
    context("when text is null", function () {
        it("should return []", function () {
            assert.deepEqual(collectTodo(), [])
        });
    });
    context("when text not contain tod", function () {
        it("should return [text]", function () {
            assert.deepEqual(collectTodo("- test"), []);
        });
    });
    context("when text contain - []", function () {
        it("should return [text]", function () {
            assert.deepEqual(collectTodo("- [ ] test"), ["- [ ] test"]);
        });
        it("should return [text,text]", function () {
            assert.deepEqual(collectTodo("- [ ] test\n" +
                "- [x] test\n"), ["- [ ] test","- [x] test"]);
        });

    })

});
