"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var plan = [];
exports.default = Page({
    data: {
        tomorrow: "",
        plan: [["6:40", "", "起床", ""], ["7:10", "7:30", "吃早餐", ""], ["10:00", "11:30", "英语真题", "30min逻辑+1h视频test"]]
    },
    onLoad: function onLoad(options) {
        console.log(options);
        this.setData({
            tomorrow: options.tomorrow
        });
    }
});