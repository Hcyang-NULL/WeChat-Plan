'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var plans = [];
exports.default = Page({
    data: {
        plans: [['21st-July', 80.00], ['22nd-July', 10.54], ['23rd-July', 40.12], ['24th-July', 70.89]],
        colors: []
    },
    onShow: function onShow() {
        var that = this;
        wx.request({
            url: app.globalData.server + '/past',
            data: {},
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            success: function success(result) {
                console.log(result);
                that.setData({
                    plans: result.data.plans,
                    colors: result.data.colors
                });
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    },
    details: function details(e) {
        console.log(e);
        var id = e.currentTarget.id;
        var that = this;
        if (this.data.plans[id][1] == -1) {
            wx.navigateTo({
                url: '../check/check?past=1&today=' + that.data.plans[id][2]
            });
        } else {
            wx.navigateTo({
                url: '../details/details?date=' + that.data.plans[id][2]
            });
        }
    }
});