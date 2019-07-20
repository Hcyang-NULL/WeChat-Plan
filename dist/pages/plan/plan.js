"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var plan = [];
exports.default = Page({
    data: {
        tomorrow: "",
        plan: [["6:40 起床", ""], ["7:10-7:30 早餐", ""], ["8:30 开始学习", ""], ["12:20-14:00 午休", "（杨智茹小仙女）"], ["23:30 睡觉", ""]],
        height: ['60', '60', '60', '110', '60']
    },
    onLoad: function onLoad(options) {
        console.log(options);
        this.setData({
            tomorrow: options.tomorrow
        });
    },
    convert: function convert() {
        var temp = [];
        var height = [];
        for (var i = 0; i < plan.length; i++) {
            var now = plan[i];
            var p = '';
            for (var j = 0; j < now.length - 1; j++) {
                p += now[j];
            }
            var temp_now = [];
            temp_now.push(p);
            temp_now.push(now[now.length - 1]);
            temp.push(temp_now);
            if (temp_now[1] == '') {
                height.push('60');
            } else {
                height.push('110');
            }
        }
        this.setData({
            height: height,
            plan: temp
        });
        console.log(this.data.height);
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
    },
    modify: function modify(e) {
        console.log(e);
        var that = this;
        var id = e.currentTarget.id;
        var shour = plan[id][0];
        var smin = plan[id][2];
        var ehour = plan[id][4];
        var emin = plan[id][6];
        var event = plan[id][8];
        var detail = plan[id][9];
        console.log(shour);
        console.log('id=' + id + "&shour=" + shour + "&smin=" + smin + "&ehour=" + ehour + "&emin=" + emin + "&event=" + event + "&detail=" + detail);
        wx.navigateTo({
            url: '../modify/modify?id=' + id + "&shour=" + shour + "&smin=" + smin + "&ehour=" + ehour + "&emin=" + emin + "&event=" + event + "&detail=" + detail
        });
    }
});