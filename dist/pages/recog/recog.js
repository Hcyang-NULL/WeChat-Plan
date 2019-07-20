'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var input_text = '6:40起床，7:10-7:30早餐；8点半开始学习。12点20分到下午2点整午休，晚上11点半睡觉。';
exports.default = Page({
    data: {
        example: "6:40起床，7:10-7:30早餐；8点半开始学习。12点20分到下午2点整午休，晚上11点半睡觉。"
    },
    analysis: function analysis() {
        var that = this;
        if (input_text == '') {
            wx.showToast({
                title: '无计划描述',
                icon: 'none',
                duration: 1500,
                mask: true
            });
            return;
        } else {
            wx.showLoading({
                title: '分析中..',
                mask: true
            });
            wx.request({
                url: app.globalData.server + '/analysis',
                data: {
                    'text': input_text
                },
                header: { 'content-type': 'application/json' },
                method: 'POST',
                dataType: 'json',
                success: function success(result) {
                    app.globalData.plan = result.data.plan;
                    wx.hideLoading();
                    wx.showToast({
                        title: '分析成功',
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
    },
    blur: function blur(e) {
        console.log(e);
        input_text = e.detail.value;
    }
});