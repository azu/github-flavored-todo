/**
 * Created by azu on 2014/08/10.
 * LICENSE : MIT
 */
"use strict";
function MockLocalStorage() {
    Object.defineProperty(this, "_storage", {
        value: {},
        writable: true,
        configurable: false,
        enumerable: false
    });
}
MockLocalStorage.prototype.getItem = function (key) {
    return key ? this._storage[escape(key)] : null
};
MockLocalStorage.prototype.setItem = function (key, value) {
    if (!key) {
        return;
    }
    this._storage[escape(key)] = value;
};
MockLocalStorage.prototype.removeItem = function (key) {
    if (!key) {
        return;
    }
    delete this._storage[escape(key)];
};
MockLocalStorage.prototype.key = function (index) {
    return this._storage[index];
};
MockLocalStorage.prototype.length = function () {
    return this._storage.length;
};
module.exports = MockLocalStorage;
