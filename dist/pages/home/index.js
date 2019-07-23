"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var tomorrow = void 0;
var weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var days = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
exports.default = Page({
    data: {
        cweek: "",
        cdate: "",
        now_mission: "无安排"
    },
    plan: function plan() {
        console.log("plan tomorrow");
        var that = this;
        wx.navigateTo({
            url: '../plan/plan?tomorrow=' + tomorrow
        });
    },
    check: function check() {
        var that = this;
        wx.navigateTo({
            url: '../check/check?past=0&today=' + that.data.cdate
        });
    },
    past: function past() {
        wx.navigateTo({
            url: '../past/past'
        });
    },
    view_today: function view_today() {
        wx.navigateTo({
            url: '../today/today'
        });
    },
    onLoad: function onLoad() {
        wx.setEnableDebug({
            enableDebug: true
        });
        var date = new Date();
        var week = date.getDay();
        var month = date.getMonth();
        var day = date.getDate();
        console.log(month);
        var cdate = days[day - 1] + " " + months[month];
        if (day == 31) {
            tomorrow = days[0] + " " + months[month];
        } else {
            tomorrow = days[day] + " " + months[month];
        }

        var today = [];
        var that = this;
        var hour = date.getHours();
        var minute = date.getMinutes();
        wx.request({
            url: app.globalData.server + '/tomorrow',
            data: {
                'date': cdate
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function success(result) {
                console.log(result);
                today = result.data.plan;
                app.globalData.today = result.data.plan;

                if (today == []) {
                    that.setData({
                        now_mission: '未计划'
                    });
                } else {
                    var find = '';
                    for (var i = 0; i < today.length; i++) {
                        var now = today[i];
                        if (hour >= now[0] && now[4] != '' && hour <= now[4]) {
                            if (now[0] != now[4]) {
                                if (hour == now[0] && minute >= now[2]) {
                                    find = now[8];
                                    break;
                                } else if (hour == now[4] && minute <= now[6]) {
                                    find = now[8];
                                    break;
                                } else if (hour != now[0] && hour != now[4]) {
                                    find = now[8];
                                    break;
                                }
                            } else {
                                if (minute >= now[2] && minute <= now[6]) {
                                    find = now[8];
                                    break;
                                }
                            }
                        }
                    }
                    if (find == '') {
                        find = '暂无计划事件';
                    }
                    that.setData({
                        now_mission: find
                    });
                }
            },
            fail: function fail() {},
            complete: function complete() {}
        });

        this.setData({
            cweek: weeks[week],
            cdate: cdate
        });
    }
});