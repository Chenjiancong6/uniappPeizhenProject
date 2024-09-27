"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (topInfo + serviceInfo + serviceForm + _easycom_uni_popup)();
}
const topInfo = () => "./topInfo.js";
const serviceInfo = () => "./serviceInfo.js";
const serviceForm = () => "./serviceForm.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const service = common_vendor.ref({});
    const formData = common_vendor.ref({});
    const cfg = common_vendor.reactive({
      // 服务协议
      page_xy: "",
      page_fw: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const orderPrice = common_vendor.ref(0);
    const popup = common_vendor.ref(null);
    const validMobile = common_vendor.ref({
      validCode: "",
      // 验证码
      phone: ""
      // 手机号
    });
    const countdown = common_vendor.ref({
      validText: "获取验证码",
      time: 60
      // 倒计时
    });
    const QRCodePopup = common_vendor.ref(null);
    let serviceFormData = {
      personInfo: {
        name: "",
        age: "",
        mobile: "",
        sex: ""
      },
      // 订单数据
      order: {
        price: "",
        // 价格
        starttime: 0,
        // 就诊时间
        tel: "",
        // 联系电话
        demand: "",
        // 服务需求
        address: {
          userName: "",
          cityName: "",
          countyName: "",
          detailInfo: ""
        },
        receiveAddress: ""
        // 接送地址
      },
      // 用户收货信息
      userReceiveInfo: "",
      hospitals: {},
      hospital_index: 0,
      service: []
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.value.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          duration: 1e3,
          icon: "none"
        });
      }
      if (flag)
        return;
      flag = true;
      const timer = setInterval(() => {
        if (countdown.value.time <= 0) {
          countdown.value.validText = "获取验证码";
          countdown.value.time = 60;
          clearInterval(timer);
          flag = false;
        } else {
          countdown.value.time -= 1;
          countdown.value.validText = `剩余${countdown.value.time}S`;
        }
      }, 1e3);
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.value.phone
          // 手机号
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "验证码发送成功,请尽快验证!",
          duration: 1e3,
          icon: "none"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err.msg,
          duration: 1e3,
          icon: "none"
        });
      });
    };
    const cancal = () => {
      popup.value.close();
    };
    const ok = () => {
      if (!validMobile.value.phone || !validMobile.value.validCode) {
        return common_vendor.index.showToast({
          title: "请检查输入信息",
          duration: 1e3,
          icon: "none"
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.value.phone,
          // 手机号
          code: validMobile.value.validCode
          // 验证码
        }
      }).then((res) => {
        common_vendor.index.setStorageSync("token", res.data.token);
        popup.value.close();
        createOrder(orderData);
      }, (err) => {
        popup.value.close();
        common_vendor.index.showToast({
          title: err.msg,
          duration: 1e3,
          icon: "none"
        });
      });
    };
    const createOrder = (params) => {
      QRCodePopup.value.open("center");
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: params,
        success: (res) => {
          formatWXPayToQRCode(res.wx_code);
          console.log(res);
        },
        fail: (res) => {
          console.error(res);
        }
      });
    };
    const closeQRCodePopup = () => {
      QRCodePopup.value.close();
      common_vendor.index.switchTab({
        url: "../order/index"
      });
    };
    const formatWXPayToQRCode = (url) => {
      var qr = new common_vendor.UQRCode();
      qr.data = url;
      qr.size = 200;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    common_vendor.index.$on("serviceComData", (data) => {
      serviceFormData = {
        ...data
      };
    });
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    let orderData = {};
    const submit = () => {
      var _a;
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请您阅读并同意用户协议和服务协议",
          duration: 1500,
          icon: "none",
          mask: true
        });
      }
      const serviceData = serviceFormData.service;
      orderData = serviceFormData.order;
      const personInfoData = serviceFormData.personInfo;
      const hospitalsData = serviceFormData.hospitals;
      if (serviceData) {
        if (serviceData.stype < 100) {
          if (serviceFormData.hospital_index == 0) {
            return common_vendor.index.showToast({
              title: "请选择医院",
              duration: 1e3,
              icon: ""
            });
          }
          orderData.hospital_id = hospitalsData[serviceFormData.hospital_index].id;
          orderData.hospital_name = hospitalsData[serviceFormData.hospital_index].name;
        }
        if (serviceData.stype == "10" || serviceData.stype == "15" || serviceData.stype == "20") {
          if (orderData.starttime == 0) {
            return common_vendor.index.showToast({
              title: "请选择就诊时间",
              duration: 1e3,
              icon: ""
            });
          }
          if (serviceFormData.personInfoData == "") {
            return common_vendor.index.showToast({
              title: "请选择就诊人",
              duration: 1e3,
              icon: ""
            });
          }
          if (serviceData.stype == "15") {
            if (!orderData.receiveAddress) {
              return common_vendor.index.showToast({
                title: "请填写接送地址",
                duration: 1e3,
                icon: ""
              });
            }
          }
          orderData.client = personInfoData;
        }
        if (serviceData.stype == "30" || serviceData.stype == "40") {
          if (orderData.starttime == 0) {
            return common_vendor.index.showToast({
              title: "请选择服务时间",
              duration: 1e3,
              icon: ""
            });
          }
          if (!orderData.address.userName) {
            return common_vendor.index.showToast({
              title: "请选择收件信息",
              duration: 1e3,
              icon: ""
            });
          }
        }
      }
      if (!((_a = serviceFormData.order) == null ? void 0 : _a.tel)) {
        return common_vendor.index.showToast({
          title: "请填写联系电话",
          duration: 1e3,
          icon: ""
        });
      }
      orderData.service_code = serviceData.code;
      orderData.service_id = serviceData.id;
      orderData.service_name = serviceData.name;
      orderData.service_stype = serviceData.stype;
      console.log(orderData, "提交订单的数据");
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        createOrder(orderData);
      }
    };
    common_vendor.onLoad((option) => {
      getServiceDetail(option);
    });
    const getServiceDetail = (option) => {
      const {
        svid
      } = option;
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid
        }
      }).then((res, err) => {
        service.value = res == null ? void 0 : res.data.service;
        formData.value = {
          ...res == null ? void 0 : res.data,
          hid: option.hid
        };
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          service: service.value
        }),
        b: common_vendor.p({
          formData: formData.value
        }),
        c: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        d: common_vendor.o(onXieyiChange),
        e: cfg.page_xy,
        f: cfg.page_fw,
        g: orderPrice.value > 0
      }, orderPrice.value > 0 ? {
        h: common_vendor.t(orderPrice.value.value)
      } : {}, {
        i: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        j: common_vendor.o(submit),
        k: validMobile.value.phone,
        l: common_vendor.o(($event) => validMobile.value.phone = $event.detail.value),
        m: validMobile.value.validCode,
        n: common_vendor.o(($event) => validMobile.value.validCode = $event.detail.value),
        o: common_vendor.t(countdown.value.validText),
        p: common_vendor.o(countdownChange),
        q: common_vendor.o(cancal),
        r: common_vendor.o(ok),
        s: common_vendor.sr(popup, "af56f62a-3", {
          "k": "popup"
        }),
        t: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        v: common_assets._imports_0$1,
        w: common_vendor.o(closeQRCodePopup),
        x: common_vendor.sr(QRCodePopup, "af56f62a-4", {
          "k": "QRCodePopup"
        }),
        y: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
