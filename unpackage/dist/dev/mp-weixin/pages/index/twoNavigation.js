"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "twoNavigation",
  props: {
    nav2s: {
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
        a: common_vendor.f(__props.nav2s, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: common_vendor.o(($event) => goPage(item.stype_link), item.id),
            c: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4dec1b13"]]);
wx.createComponent(Component);
