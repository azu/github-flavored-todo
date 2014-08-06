"use strict";
function setupMenu(gui){
    var mb = new gui.Menu({type: "menubar"});
    mb.createMacBuiltin("github-flavored-todo");
    gui.Window.get().menu = mb;
}

module.exports = setupMenu;