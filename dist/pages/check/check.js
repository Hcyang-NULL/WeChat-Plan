'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var today = void 0,
    past = void 0;
exports.default = Page({
    data: {
        planList: [],
        checklist: []
    },
    onLoad: function onLoad(options) {
        today = options.today;
        past = options.past;
        var that = this;

        if (past == 0) {
            wx.request({
                url: app.globalData.server + '/istodaycheck',
                data: {
                    'date': today
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                dataType: 'json',
                success: function success(result) {
                    if (result.data.code != 404) {
                        wx.showToast({
                            title: '今日已经提交',
                            icon: 'none',
                            duration: 1500,
                            mask: true
                        });
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    } else {
                        var plans = [];
                        console.log(app.globalData.today);
                        for (var i = 0; i < app.globalData.today.length; i++) {
                            var now = app.globalData.today[i];
                            var temp = '';
                            for (var j = 0; j < 9; j++) {
                                temp += now[j];
                            }
                            plans.push(temp);
                        }
                        that.setData({
                            planList: plans,
                            checklist: []
                        });
                        if (plans.length == 0) {
                            wx.showToast({
                                title: '今日无计划',
                                icon: 'none',
                                duration: 1500,
                                mask: true
                            });
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 1500);
                        }
                    }
                },
                fail: function fail() {},
                complete: function complete() {}
            });
        } else {
            wx.request({
                url: app.globalData.server + '/tomorrow',
                data: {
                    'date': today
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                dataType: 'json',
                success: function success(result) {
                    console.log(result);
                    var old_day = result.data.plan;
                    var plans = [];
                    console.log(old_day);
                    for (var i = 0; i < old_day.length; i++) {
                        var now = old_day[i];
                        var temp = '';
                        for (var j = 0; j < 9; j++) {
                            temp += now[j];
                        }
                        plans.push(temp);
                    }
                    that.setData({
                        planList: plans,
                        checklist: []
                    });
                },
                fail: function fail() {},
                complete: function complete() {}
            });
        }
    },
    change: function change(e) {
        this.setData({
            checklist: e.detail.value
        });
    },
    submit: function submit() {
        var that = this;
        wx.showModal({
            title: '任务自检',
            content: '仅一次提交机会',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '提交',
            confirmColor: '#3CC51F',
            success: function success(result) {
                if (result.confirm) {
                    wx.showLoading({
                        title: '提交中..',
                        mask: true
                    });
                    that.updata();
                }
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    },
    updata: function updata() {
        var checklist = this.data.checklist;
        var planList = this.data.planList;
        var result = [];
        for (var i = 0; i < planList.length; i++) {
            if (checklist.indexOf(planList[i]) != -1) {
                result.push(i);
            }
        }
        console.log(result);
        wx.request({
            url: app.globalData.server + '/todaycheck',
            data: {
                'date': today,
                'situation': result,
                'total': planList.length
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function success(result) {
                wx.hideLoading();
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1500,
                    mask: true
                });
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    }
});