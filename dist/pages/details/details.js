'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
exports.default = Page({
    data: {
        details: []
    },
    onLoad: function onLoad(options) {
        console.log(options);
        var that = this;
        wx.request({
            url: app.globalData.server + '/details',
            data: {
                'date': options.date
            },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            success: function success(result) {
                that.setData({
                    details: result.data.details
                });
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    }
});