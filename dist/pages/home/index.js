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
        ctime: "",
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
        var hour = date.getHours();
        var ctime = "";
        if (hour < 4) {
            ctime = "深夜";
        } else if (hour < 7) {
            ctime = "清晨";
        } else if (hour < 12) {
            ctime = "早上好";
        } else if (hour < 14) {
            ctime = "午后";
        } else if (hour < 19) {
            ctime = "下午好";
        } else if (hour < 20) {
            ctime = "傍晚";
        } else if (hour < 23) {
            ctime = "晚上好";
        } else {
            ctime = "深夜";
        }
        console.log(hour);

        this.setData({
            cweek: weeks[week - 1],
            cdate: cdate,
            ctime: ctime
        });
    }
});