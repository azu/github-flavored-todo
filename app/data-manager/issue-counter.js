"use strict";
var storage = (typeof localStorage !== "undefined") ? localStorage : null;
function increment() {
    var count = getCount();
    storage.setItem("issue-count", count + 1);
}
function getCount() {
    var count = storage.getItem("issue-count");
    if (count != null) {
        return parseInt(count, 10);
    }
    return 1;
}
function changeStorage(storageObject) {
    storage = storageObject;
}
module.exports = {
    getCount: getCount,
    increment: increment,
    changeStorage: changeStorage
};