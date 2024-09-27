"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  (_easycom_NavBar + SwiperImg + TwoNavigation + MultipleNavigation + HospitalList)();
}
const SwiperImg = () => "./swiperImg.js";
const TwoNavigation = () => "./twoNavigation.js";
const MultipleNavigation = () => "./multipleNavigation.js";
const HospitalList = () => "./hospitalList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const bannerList = common_vendor.ref([]);
    const nav2s = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitalList = common_vendor.ref([]);
    const utils = app.globalData.utils;
    common_vendor.onLoad(() => {
      utils.request({
        url: "/app/init"
      }).then((res, err) => {
        var _a;
        const {
          id
        } = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.area;
        if (!id)
          return;
        utils.request({
          url: "/Index/index",
          data: {
            aid: id
          }
        }).then((res2, err2) => {
          var _a2, _b;
          bannerList.value = (_a2 = res2.data) == null ? void 0 : _a2.slides;
          nav2s.value = (_b = res2.data) == null ? void 0 : _b.nav2s;
          navs.value = res2 == null ? void 0 : res2.data.navs;
          hospitalList.value = res2 == null ? void 0 : res2.data.hospitals;
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          isHome: true
        }),
        b: common_assets._imports_0,
        c: common_assets._imports_0$1,
        d: common_vendor.p({
          bannerList: bannerList.value
        }),
        e: common_vendor.p({
          nav2s: nav2s.value
        }),
        f: common_vendor.p({
          navs: navs.value
        }),
        g: common_vendor.p({
          hospitalList: hospitalList.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
