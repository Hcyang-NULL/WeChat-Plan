'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var content = '';
var name = '';
var s_month = 5,
    s_day = 12,
    remain = 0;
exports.default = Page({
    data: {
        choose: [1, 1],
        s_month: 5,
        s_day: 12,
        name: '',
        content: ''
    },
    change1: function change1(e) {
        var val = e.detail.toString();
        s_month = val;
    },
    change2: function change2(e) {
        var val = e.detail.toString();
        s_day = val;
    },
    onShow: function onShow() {
        wx.getStorage({
            key: 'openid',
            fail: function fail() {
                var res = app.getOpenid();
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
            }
        });
    },
    content_input: function content_input(e) {
        content = e.detail.value;
    },
    name_input: function name_input(e) {
        name = e.detail.value;
    },
    send: function send() {
        var that = this;
        if (name == '') {
            wx.showToast({
                title: '请填写收件人',
                icon: 'none',
                duration: 1500,
                mask: true
            });
            return;
        }
        if (content == '') {
            wx.showToast({
                title: '无内容',
                icon: 'none',
                duration: 1500,
                mask: true
            });
            return;
        }
        wx.showModal({
            title: '请确认',
            content: '注意：同一账号最多发送三封',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '发送',
            confirmColor: '#3CC51F',
            success: function success(result) {
                if (result.confirm) {
                    wx.showLoading({
                        title: '发送中..',
                        mask: true,
                        success: function success(result) {
                            wx.getStorage({
                                key: 'openid',
                                success: function success(result) {
                                    var openid = result.data;
                                    content = content.replace(/\n/g, 'メ');
                                    console.log(content);
                                    wx.request({
                                        url: app.globalData.server + '/send',
                                        data: {
                                            name: name,
                                            day: s_day,
                                            month: s_month,
                                            content: content,
                                            openid: openid
                                        },
                                        header: {
                                            'content-type': 'application/json'
                                        },
                                        method: 'POST',
                                        dataType: 'json',
                                        success: function success(result) {
                                            console.log(result);
                                            wx.hideLoading();
                                            if (result.statusCode == 200) {
                                                if (result.data.status == 200) {
                                                    remain = result.data.remain;
                                                    wx.showModal({
                                                        title: '发送成功',
                                                        content: '还可写' + remain + '封',
                                                        showCancel: false,
                                                        cancelText: '取消',
                                                        cancelColor: '#000000',
                                                        confirmText: '关闭',
                                                        confirmColor: '#3CC51F',
                                                        success: function success(result) {
                                                            if (result.confirm) {
                                                                that.clear();
                                                                return;
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    wx.showModal({
                                                        title: '发送失败',
                                                        content: result.data.msg,
                                                        showCancel: false,
                                                        cancelText: '取消',
                                                        cancelColor: '#000000',
                                                        confirmText: '关闭',
                                                        confirmColor: '#3CC51F',
                                                        success: function success(result) {
                                                            if (result.confirm) {
                                                                return;
                                                            }
                                                        }
                                                    });
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: '网络错误',
                                                    icon: 'none',
                                                    image: '',
                                                    duration: 1500,
                                                    mask: true
                                                });
                                            }
                                        },
                                        fail: function fail() {
                                            wx.hideLoading();
                                            wx.showToast({
                                                title: '网络错误',
                                                icon: 'none',
                                                image: '',
                                                duration: 1500,
                                                mask: true
                                            });
                                        }
                                    });
                                },
                                fail: function fail() {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '发送失败',
                                        icon: 'none',
                                        image: '',
                                        duration: 1500,
                                        mask: true
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    clear: function clear() {
        this.setData({
            name: '',
            content: ''
        });
        name = '';
        content = '';
    }
});