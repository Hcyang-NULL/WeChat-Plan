'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var id = void 0;
var shour = void 0;
var smin = void 0;
var ehour = void 0;
var emin = void 0;
var event = void 0;
var detail = void 0;
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
        data_detail: ''
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
        smin = options.smin;
        ehour = options.ehour;
        emin = options.emin;
        event = options.event;
        detail = options.detail;
        if (ehour != "") {
            this.setData({
                data_shour: shour,
                data_smin: smin,
                data_ehour: ehour,
                data_emin: emin,
                data_event: event,
                data_detail: detail
            });
            var _e = {};
            _e['detail'] = {};
            _e['detail']['value'] = ehour;
            this.ehourchange(_e);
            _e['detail']['value'] = emin;
            this.eminchange(_e);
        } else {
            this.setData({
                data_shour: shour,
                data_smin: smin,
                data_event: event,
                data_detail: detail
            });
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
    finish: function finish() {}
});