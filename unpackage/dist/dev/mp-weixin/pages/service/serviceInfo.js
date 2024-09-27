"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "serviceInfo",
  props: {
    service: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(__props) {
    const handleServiceTap = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: __props.service.icon_image ? __props.service.icon_image_url : "../../static/resource/images/avatar.jpg",
        b: common_vendor.t(__props.service.name),
        c: common_vendor.o(handleServiceTap)
      };
    };
  }
};
wx.createComponent(_sfc_main);
