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
        wx.navigateTo({
            url: '../check/check'
        });
    },
    past: function past() {
        wx.navigateTo({
            url: '../past/past'
        });
    },
    onLoad: function onLoad() {
        var date = new Date();
        var week = date.getDay();
        var month = date.getMonth();
        var day = date.getDate();
        var cdate = days[day - 1] + " " + months[month - 1];
        if (day == 31) {
            tomorrow = days[0] + " " + months[month];
        } else {
            tomorrow = days[day] + " " + months[month - 1];
        }

        var plan = [];
        var that = this;
        var hour = date.getHours();
        var minute = date.getMinutes();
        wx.request({
            url: app.globalData.server + '/tomorrow',
            data: {
                'date': tomorrow
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function success(result) {
                console.log(result);
                plan = result.data.plan;
                app.globalData.plan = result.data.plan;

                if (plan == []) {
                    that.setData({
                        now_mission: '未计划'
                    });
                } else {
                    var find = '';
                    for (var i = 0; i < plan.length; i++) {
                        var now = plan[i];
                        if (hour >= now[0] && now[4] != '' && hour <= now[4]) {
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
            cweek: weeks[week - 1],
            cdate: cdate
        });
    }
});