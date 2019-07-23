'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
var id = void 0;
var shour = void 0;
var smin = void 0;
var ehour = void 0;
var emin = void 0;
var event = void 0;
var detail = void 0;
var noend = false;
var tomorrow = void 0;
function trans_min(a) {
    if (a < 10) {
        return '0' + a;
    } else {
        return a;
    }
}
exports.default = Page({
    data: {
        current2: 0,
        activeTabStyle: {
            'color': '#e60012'
        },
        inkBarStyle: {
            'border-bottom': '1px solid red',
            'width': '60%',
            'color': 'red'
        },
        tbObj1: {
            'position': 'absolute',
            'width': '25px',
            'height': '25px',
            'background-color': '#3399FF',
            'border': '0',
            'border-radius': '12px',
            'top': '2px',
            'left': '15px',
            'z-index': '2',
            'box-shadow': '0px 0px 0px'
        },
        width: wx.WIN_WIDTH,
        shour: '',
        data_shour: 0,
        smin: '30分',
        data_smin: 0,
        ehour: '',
        data_ehour: 0,
        emin: '30分',
        data_emin: 0,
        data_event: '',
        data_detail: '',
        noend: false
    },
    switchChange: function switchChange(e) {
        noend = e.detail.value;
    },
    shourchange: function shourchange(e) {
        shour = e.detail.value;
        var temp = '';
        if (shour <= 12) {
            temp = shour + '时 AM';
        } else {
            temp = shour - 12 + '时 PM';
        }
        this.setData({
            shour: temp
        });
    },
    sminchange: function sminchange(e) {
        smin = e.detail.value;
        var temp = smin + '分';
        this.setData({
            smin: temp
        });
    },
    ehourchange: function ehourchange(e) {
        ehour = e.detail.value;
        var temp = '';
        if (ehour <= 12) {
            temp = ehour + '时 AM';
        } else {
            temp = ehour - 12 + '时 PM';
        }
        this.setData({
            ehour: temp
        });
    },
    eminchange: function eminchange(e) {
        emin = e.detail.value;
        var temp = emin + '分';
        this.setData({
            emin: temp
        });
    },
    handleChange2: function handleChange2(e) {
        var index = e.detail.index;
        this.setData({
            current2: index
        });
    },
    handleContentChange2: function handleContentChange2(e) {
        var current = e.detail.current;
        this.setData({
            current2: current
        });
    },
    onLoad: function onLoad(options) {
        console.log(options);
        id = options.id;
        shour = options.shour;
        smin = parseInt(options.smin);
        ehour = options.ehour;
        emin = parseInt(options.emin);
        event = options.event;
        detail = options.detail;
        tomorrow = options.tomorrow;
        if (ehour != "") {
            this.setData({
                data_shour: shour,
                data_smin: smin,
                data_ehour: ehour,
                data_emin: emin,
                data_event: event,
                data_detail: detail,
                noend: false
            });
            var _e = {};
            _e['detail'] = {};
            _e['detail']['value'] = ehour;
            this.ehourchange(_e);
            _e['detail']['value'] = emin;
            this.eminchange(_e);
            noend = false;
        } else {
            this.setData({
                data_shour: shour,
                data_smin: smin,
                data_event: event,
                data_detail: detail,
                noend: true
            });
            noend = true;
        }
        var e = {};
        e['detail'] = {};
        e['detail']['value'] = shour;
        this.shourchange(e);
        e['detail']['value'] = smin;
        this.sminchange(e);
        console.log('onload');
    },
    blur1: function blur1(e) {
        event = e.detail.value;
        console.log(e);
    },
    blur2: function blur2(e) {
        detail = e.detail.value;
        console.log(e);
    },
    finish: function finish() {
        var modify = [];
        modify.push(shour);
        modify.push(':');
        modify.push(trans_min(smin));
        if (!noend) {
            modify.push('-');
            modify.push(ehour);
            modify.push(':');
            modify.push(trans_min(emin));
        } else {
            for (var i = 0; i < 4; i++) {
                modify.push('');
            }
        }
        modify.push(' ');
        modify.push(event);
        modify.push(detail);
        if (id >= app.globalData.plan.length) {
            app.globalData.plan.push(modify);
        } else {
            app.globalData.plan[id] = modify;
        }
        console.log(app.globalData.plan);
        console.log(modify);
        wx.request({
            url: app.globalData.server + '/store',
            data: {
                'date': tomorrow,
                'plan': app.globalData.plan
            },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            success: function success(result) {
                console.log(result);
            }
        });
        wx.navigateBack({
            delta: 1
        });
    },
    delete: function _delete() {
        console.log(id);
        console.log(app.globalData.plan.length);
        if (id < app.globalData.plan.length) {
            app.globalData.plan.splice(id, 1);
            wx.request({
                url: app.globalData.server + '/store',
                data: {
                    'date': tomorrow,
                    'plan': app.globalData.plan
                },
                header: { 'content-type': 'application/json' },
                method: 'POST',
                dataType: 'json',
                success: function success(result) {
                    console.log(result);
                }
            });
        }
        wx.navigateBack({
            delta: 1
        });
    }
});