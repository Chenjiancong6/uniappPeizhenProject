"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "swiperImg",
  props: {
    bannerList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.bannerList, (item, index, i0) => {
          return {
            a: item.pic_image_url,
            b: item.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86b82d74"]]);
wx.createComponent(Component);
