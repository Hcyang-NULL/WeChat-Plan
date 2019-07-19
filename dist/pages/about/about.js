'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var start = 1557590400000;
var app = getApp();
exports.default = Page({
    data: {
        msg: ''
    },
    onLoad: function onLoad() {
        var _this = this;

        var date = new Date();
        var now = date.getTime();
        if (now - start >= 0) {
            this.setData({
                msg: '祝妈妈节日快乐!'
            });
        } else {
            wx.getStorage({
                key: 'openid',
                success: function success(result) {
                    console.log(result);
                    if (result.data == app.globalData.Mum) {
                        _this.setData({
                            msg: '妈妈生日快乐'
                        });
                    } else {
                        _this.setData({
                            msg: 'Information'
                        });
                    }
                },
                fail: function fail() {
                    var res = app.getOpenid();
                    if (res == 0) {
                        wx.getStorage({
                            key: 'openid',
                            success: function success(result) {
                                if (result.data = app.globalData.Mum) {
                                    _this.setData({
                                        msg: '妈妈生日快乐！'
                                    });
                                }
                            }
                        });
                        return;
                    }
                    if (res == 1) {
                        wx.showToast({
                            title: '暂停服务',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: true
                        });
                    } else if (res == 2 || res == 3) {
                        wx.showToast({
                            title: '网络错误',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: true
                        });
                    }
                    _this.setData({
                        msg: 'Information'
                    });
                },
                complete: function complete() {}
            });
        }
    }
});