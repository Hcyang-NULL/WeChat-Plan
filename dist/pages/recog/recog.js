'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var input_text = '6点40分起床，7点20分开始学习，7：20到7:50墨墨单词（50个），7：50到8:10每日一句*2，8:10到9:40练恋有词，9:40-11:10英语真题（2010testA），11点10分到11点40分锻炼（斜右肌+天鹅臂）11:40-12:10吃饭，12:10-12：40墨墨单词（50个），12:40-下午1点10分午休，13:10-下午3点10分政治，下午3点20分到下午5点20分有机，下午5点20分-晚上6点整锻炼（有氧20+腹部10），晚上6点整到晚上7点整晚饭，晚上7点整到晚上9点整生化，晚上9点整到晚上10点半药化，晚上10点半到晚上11点10分锻炼（斜右肌10+天鹅臂15+腹部10），晚上11点59分之前睡觉。';
//6:40起床，7点10结束早餐，7点半到8点整墨墨单词，8点整到8点半每日一句，8点半到10点整练恋有词，10点整到11点半英语真题（30min逻辑+1h视频test），11点半到12点整锻炼，12点整到下午1点整休息，下午1点整到下午1点半墨墨单词，下午1点半到14:00午休，下午2点整到下午4点整政治，16:00到17:30生化，下午5点半到晚上6点整锻炼，晚上8点半到晚上10点半有机，晚上10点半到晚上11点整锻炼，晚上11点半睡觉
var tomorrow = '';
exports.default = Page({
    data: {
        example: "早上6:40起床，7:10-7:30早餐；上午7点半到12点整看有机。下午1点20分到下午2点整午休，14:00到下午17:00英语（30min单词+真题），晚上11点半睡觉。"
    },
    onLoad: function onLoad(options) {
        tomorrow = options.tomorrow;
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
            if (input_text[input_text.length - 1] != ',' || input_text[input_text.length - 1] != '，' || input_text[input_text.length - 1] != '。' || input_text[input_text.length - 1] != ';' || input_text[input_text.length - 1] != '；') {
                input_text += '。';
            }
            wx.request({
                url: app.globalData.server + '/analysis',
                data: {
                    'text': input_text,
                    'date': tomorrow
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