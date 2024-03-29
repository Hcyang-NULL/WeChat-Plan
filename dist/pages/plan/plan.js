'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var plan = [];
var tomorrow = void 0;
exports.default = Page({
    data: {
        tomorrow: "",
        plan: [],
        height: []
    },
    onLoad: function onLoad(options) {
        console.log('onload');
        // console.log('----------')
        // console.log()
        // console.log('----------')
        tomorrow = options.tomorrow;
        this.setData({
            tomorrow: tomorrow
        });
        var that = this;
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
                that.convert();
            },
            fail: function fail() {},
            complete: function complete() {}
        });
    },
    convert: function convert() {
        var temp = [];
        var height = [];
        console.log('confirm convert');
        for (var i = 0; i < plan.length; i++) {
            var now = plan[i];
            var p = '';
            for (var j = 0; j < now.length - 1; j++) {
                p += now[j];
            }
            var temp_now = [];
            temp_now.push(p);
            temp_now.push(now[now.length - 1]);
            temp.push(temp_now);
            if (temp_now[1] == '') {
                height.push('60');
            } else {
                height.push('110');
            }
        }
        console.log('convert');
        console.log(temp);
        this.setData({
            height: height,
            plan: temp
        });
        console.log(this.data.height);
    },
    onShow: function onShow() {
        plan = app.globalData.plan;
        this.convert();
    },
    torecog: function torecog() {
        var that = this;
        wx.navigateTo({
            url: '../recog/recog?tomorrow=' + that.data.tomorrow
        });
    },
    modify: function modify(e) {
        console.log(e);
        var that = this;
        var id = e.currentTarget.id;
        var shour = plan[id][0];
        var smin = plan[id][2];
        var ehour = plan[id][4];
        var emin = plan[id][6];
        var event = plan[id][8];
        var detail = plan[id][9];
        console.log(shour);
        console.log('tomorrow' + that.data.tomorrow + '&id=' + id + "&shour=" + shour + "&smin=" + smin + "&ehour=" + ehour + "&emin=" + emin + "&event=" + event + "&detail=" + detail);
        wx.navigateTo({
            url: '../modify/modify?tomorrow=' + that.data.tomorrow + '&id=' + id + "&shour=" + shour + "&smin=" + smin + "&ehour=" + ehour + "&emin=" + emin + "&event=" + event + "&detail=" + detail
        });
    },
    addhandy: function addhandy() {
        var id = app.globalData.plan.length;
        var that = this;
        wx.navigateTo({
            url: '../modify/modify?tomorrow=' + that.data.tomorrow + '&id=' + id + "&shour=12&smin=30&ehour=12&emin=30&event=&detail="
        });
    }
});