'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    server: 'https://www.hcy-null.top'
  },
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
  },
  onLoad: function onLoad() {},
  onHide: function onHide() {},
  getOpenid: function getOpenid() {
    var _this = this;

    var that = this;
    wx.login({
      timeout: 3000,
      success: function success(res) {
        wx.request({
          url: _this.globalData.server + '/request_openid',
          data: {
            js_code: res.code
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          dataType: 'json',
          success: function success(result) {
            console.log(result);
            if (result.statusCode == 200) {
              if (result.data.status == 200) {
                wx.setStorage({
                  key: 'openid',
                  data: result.data.open_id
                });
                return 0;
              }
              return 1;
            }
            return 2;
          },
          fail: function fail() {
            return 3;
          }
        });
      }
    });
  }
});