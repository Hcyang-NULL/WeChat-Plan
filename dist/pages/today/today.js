'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var plans = [];
exports.default = Page({
    data: {
        plans: [],
        height: []
    },
    onLoad: function onLoad() {
        plans = app.globalData.today;
        console.log(plans);
        this.convert();
        // this.setData({
        //     plans: plans    
        // })
    },
    convert: function convert() {
        var temp = [];
        var height = [];
        for (var i = 0; i < plans.length; i++) {
            var now = plans[i];
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
        this.setData({
            height: height,
            plans: temp
        });
    }
});