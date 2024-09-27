"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "hospitalList",
  props: {
    hospitalList: {
      type: Array,
      fefault: () => {
        return [];
      }
    }
  },
  setup(__props) {
    const goHospitalDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/hospital/index?svid=1&hid=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.hospitalList, (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar_url : "../../static/resource/images/avatar.jpg",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.rank),
            d: common_vendor.t(item.label),
            e: common_vendor.t(item.intro),
            f: item.id,
            g: common_vendor.o(($event) => goHospitalDetail(item.id), item.id)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62a9325c"]]);
wx.createComponent(Component);
