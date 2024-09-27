"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "multipleNavigation",
  props: {
    navs: {
      type: Array,
      fefault: () => {
        return [];
      }
    }
  },
  setup(__props) {
    const goPage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.navs, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.t(item.title),
            c: common_vendor.s("color:" + item.tcolor ? item.tcolor : ""),
            d: common_vendor.o(($event) => goPage(item.stype_link), item.id),
            e: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c620c3f"]]);
wx.createComponent(Component);
