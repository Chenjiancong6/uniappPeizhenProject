"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseurl = "https://code.itndedu.com/pz";
  }
  // 获取登录信息
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        this.request({
          url: "/auth/wxLogin",
          method: "GET",
          data: {
            code: res.code
          },
          isShowLoading: true
          // 弃用通过参数获得数据，改造通过promise链式调用获得
          // success: (res) => {
          // 	console.log(res, 'request res');
          // },
          // fail: (err) => {
          // 	console.error(err, 'request err');
          // }
        }).then((res2) => {
          console.log("then", res2);
        });
      }
    });
  }
  // 二次封装请求函数
  request(options = {
    isShowLoading: false
  }) {
    if (!options.url)
      return false;
    if (options.isShowLoading) {
      this.showLoadingFn();
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: this.baseurl + options.url,
        // 请求地址
        method: options.method ? options.method : "GET",
        // 请求方式
        header: options.header ? options.header : {},
        // 请求头
        data: options.data ? options.data : {},
        // 请求参数
        success: function(response) {
          common_vendor.index.hideLoading();
          if (response.data.code != 1e4) {
            reject(response.data);
            if (options.fail && typeof options.fail == "function") {
              options.fail(response);
            }
          } else {
            resolve(response.data);
            if (options.success && typeof options.success == "function") {
              options.success(response);
            }
          }
        },
        fail: function(err) {
          console.error(err, "err");
          common_vendor.index.hideLoading();
          reject(err);
        }
      });
    });
  }
  // 封装加载动画函数
  showLoadingFn() {
    const isLoading = common_vendor.index.getStorageSync("isShowLoading");
    if (isLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoading({
      title: "加载中...",
      complete: function() {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail: function() {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;
