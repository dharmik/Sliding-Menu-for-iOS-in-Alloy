function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.sideScreen = Ti.UI.createWindow({
        backgroundColor: "white",
        top: 0,
        left: 0,
        width: 150,
        id: "sideScreen"
    });
    $.addTopLevelView($.__views.sideScreen);
    $.__views.navWindow = Ti.UI.createWindow({
        width: 320,
        id: "navWindow"
    });
    $.addTopLevelView($.__views.navWindow);
    $.__views.win = Ti.UI.createWindow({
        title: "Main Window",
        backgroundColor: "#28292c",
        barColor: "#28292c",
        moving: !1,
        axis: 0,
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var menuTitles = [ {
        title: "Menu 1"
    }, {
        title: "Menu 2"
    }, {
        title: "Menu 3"
    }, {
        title: "Menu 4"
    }, {
        title: "Menu 5"
    }, {
        title: "Menu 6"
    } ], tableView = Ti.UI.createTableView({
        data: menuTitles
    });
    $.sideScreen.add(tableView);
    var navGroup = Ti.UI.iPhone.createNavigationGroup({
        window: $.win
    });
    $.navWindow.add(navGroup);
    var menuButton = Ti.UI.createButton({
        title: "Menu",
        toggle: !1
    });
    $.win.setLeftNavButton(menuButton);
    menuButton.addEventListener("click", function(e) {
        if (e.source.toggle == 1) {
            $.navWindow.animate({
                left: 0,
                duration: 400,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            e.source.toggle = !1;
        } else {
            $.navWindow.animate({
                left: 150,
                duration: 400,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
            });
            e.source.toggle = !0;
        }
    });
    $.win.addEventListener("touchstart", function(e) {
        e.source.axis = parseInt(e.x);
    });
    $.win.addEventListener("touchmove", function(e) {
        var coordinates = parseInt(e.globalPoint.x) - e.source.axis;
        if (coordinates > 20 || coordinates < -20) e.source.moving = !0;
        if (e.source.moving == 1 && coordinates <= 150 && coordinates >= 0) {
            $.navWindow.animate({
                left: coordinates,
                duration: 20
            });
            $.navWindow.left = coordinates;
        }
    });
    $.win.addEventListener("touchend", function(e) {
        e.source.moving = !1;
        if ($.navWindow.left >= 75 && $.navWindow.left < 150) {
            $.navWindow.animate({
                left: 150,
                duration: 300
            });
            menuButton.toggle = !0;
        } else {
            $.navWindow.animate({
                left: 0,
                duration: 300
            });
            menuButton.toggle = !1;
        }
    });
    $.sideScreen.open();
    $.navWindow.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;