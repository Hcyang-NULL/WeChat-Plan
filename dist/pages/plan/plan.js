'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var plan = [];
exports.default = Page({
    data: {
        tomorrow: "",
        plan: []
    },
    onLoad: function onLoad(options) {
        console.log(options);
        this.setData({
            tomorrow: options.tomorrow
        });
    },
    convert: function convert() {
        var temp = [];
        for (var i = 0; i < plan.length; i++) {
            var now = plan[i];
            var p = '';
            for (var j = 0; j < now.length; j++) {
                p += now[j];
            }
            temp.push(p);
        }
        this.setData({
            plan: temp
        });
    },
    onShow: function onShow() {
        if (app.globalData.plan.length != 0) {
            plan = app.globalData.plan;
            app.globalData.plan = [];
            this.convert();
        }
    },
    torecog: function torecog() {
        wx.navigateTo({
            url: '../recog/recog'
        });
    }
});