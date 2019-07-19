'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var start = 1557590400000;
var name = '',
    s_month = void 0,
    s_day = void 0,
    num = void 0,
    now = void 0;
var app = getApp();
exports.default = Page({
    data: {
        begin: true,
        detail: false,
        num: -1,
        contents: [],
        now: -1,
        hasNext: false
    },
    onShow: function onShow() {
        var _this = this;

        var date = new Date();
        now = date.getTime();
        console.log('pos1');
        console.log(now);
        var that = this;
        wx.getStorage({
            key: 'openid',
            success: function success(result) {
                console.log('pos2');
                console.log(now);
                if (result.data == app.globalData.Mum) {
                    _this.setData({
                        begin: true,
                        now: -1,
                        contents: [],
                        num: -1,
                        hasNext: false,
                        detail: false
                    });
                } else {
                    console.log('recive');
                    console.log(now);
                    console.log(start);
                    console.log(now - start);
                    if (now - start >= 0) {
                        _this.setData({
                            begin: true,
                            now: -1,
                            contents: [],
                            num: -1,
                            hasNext: false,
                            detail: false
                        });
                    } else {
                        _this.setData({
                            begin: false,
                            detail: false
                        });
                    }
                }
            },
            fail: function fail() {
                that.checkOpenid();
            },
            complete: function complete() {}
        });
        s_month = 5;
        s_day = 12;
        name = '';
        num = -1;
    },
    checkOpenid: function checkOpenid() {
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
    empty: function empty() {
        wx.showModal({
            title: '查询完成',
            content: '目前还没有您的信',
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
    },
    read_next: function read_next() {
        now++;
        if (now == num - 1) {
            this.setData({
                now: now,
                hasNext: false
            });
        } else {
            this.setData({
                now: now,
                hasNext: true
            });
        }
    },
    read: function read() {
        var _this2 = this;

        var that = this;
        wx.showModal({
            title: '开始拆封',
            content: '一共有' + num + '封您的信',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: function success(result) {
                if (result.confirm) {
                    now++;
                    console.log(now);
                    console.log(that.data.contents);
                    if (num == 1) {
                        _this2.setData({
                            detail: true,
                            now: now,
                            hasNext: false
                        });
                    } else {
                        _this2.setData({
                            detail: true,
                            now: now,
                            hasNext: true
                        });
                    }
                    return;
                } else {
                    return;
                }
            }
        });
    },
    confirm: function confirm() {
        var that = this;
        if (name == '') {
            wx.showToast({
                title: '请填写名字',
                icon: 'none',
                duration: 1500,
                mask: true
            });
            return;
        }
        wx.getStorage({
            key: 'openid',
            success: function success(result) {
                var d = new Date(Date.now());
                if (result.data == app.globalData.Mum && name == '梁辉' && s_month == 5 && s_day == 8) {
                    wx.showModal({
                        title: '拆封',
                        content: '您有一封生日信件或者选择查询其他人给您发送的信件',
                        showCancel: true,
                        cancelText: '其他信件',
                        cancelColor: '#000000',
                        confirmText: '生日信件',
                        confirmColor: '#3CC51F',
                        success: function success(result) {
                            if (result.confirm) {
                                wx.redirectTo({
                                    url: '../lh/lh'
                                });
                            } else {
                                that.search();
                            }
                        },
                        fail: function fail() {},
                        complete: function complete() {}
                    });
                } else if (s_month == 7 && s_day == 30 && name == '杨智茹') {
                    wx.showModal({
                        title: '拆封',
                        content: '您有一封节日信件(带上耳机哦)或者选择查询其他人给您发送的信件',
                        showCancel: true,
                        cancelText: '其他信件',
                        cancelColor: '#000000',
                        confirmText: '节日信件',
                        confirmColor: '#3CC51F',
                        success: function success(result) {
                            if (result.confirm) {
                                wx.redirectTo({
                                    url: '../yzr/yzr'
                                });
                            } else {
                                that.search();
                            }
                        },
                        fail: function fail() {},
                        complete: function complete() {}
                    });
                } else {
                    that.search();
                }
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    },
    search: function search() {
        var that = this;
        wx.showLoading({
            title: '查询中..',
            mask: false,
            success: function success(result) {
                wx.getStorage({
                    key: 'openid',
                    success: function success(result) {
                        var openid = result.data;
                        wx.request({
                            url: app.globalData.server + '/recive',
                            data: {
                                openid: openid,
                                name: name,
                                month: s_month,
                                day: s_day
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            method: 'POST',
                            dataType: 'json',
                            success: function success(result) {
                                wx.hideLoading();
                                if (result.statusCode == 200) {
                                    if (result.data.status == 200) {
                                        var resdata = result.data;
                                        console.log(resdata);
                                        if (resdata.num == 0) {
                                            that.empty();
                                            return;
                                        }
                                        for (var i = 0; i < resdata.num; i++) {
                                            resdata.contents[i] = resdata.contents[i].replace(/メ/g, '\n');
                                        }
                                        that.setData({
                                            num: resdata.num,
                                            contents: resdata.contents,
                                            now: -1
                                        });
                                        num = resdata.num;
                                        now = -1;
                                        that.read();
                                        return;
                                    } else {
                                        wx.showModal({
                                            title: '查询失败',
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
                            title: '查询失败',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: true
                        });
                    }
                });
            }
        });
    },
    name_input: function name_input(e) {
        name = e.detail.value;
    },
    change1: function change1(e) {
        var val = e.detail.toString();
        s_month = val;
    },
    change2: function change2(e) {
        var val = e.detail.toString();
        s_day = val;
    }
});