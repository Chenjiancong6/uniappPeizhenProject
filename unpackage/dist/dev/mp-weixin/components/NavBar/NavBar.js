"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "NavBar",
  props: {
    // 状态栏
    StatusBGColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    // 内容
    containerBGColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 32
    },
    // 文字颜色
    textColor: {
      type: String,
      default: "rgba(0,0,0,1)"
    },
    // 图片宽度
    iconWidth: {
      type: Number,
      default: 116
    },
    // 图片高度
    iconHeight: {
      type: Number,
      default: 38
    },
    // 标题
    title: {
      type: String,
      default: "首页"
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const statusH = common_vendor.ref(0);
    const containerH = common_vendor.ref(0);
    const statusBackground = common_vendor.ref("");
    const contaninerBackground = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const pageLeng = common_vendor.ref(getCurrentPages().length);
    const menu = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    const homeNavStyle = common_vendor.computed(() => {
      return {
        height: containerH.value + "rpx",
        lineHeight: containerH.value + "rpx"
      };
    });
    const navigatorStyle = common_vendor.computed(() => {
      return {
        height: menu.height * 2 + "rpx",
        lineHeight: menu.height * 2 + "rpx",
        marginRight: menu.width * 2 + 24 + "rpx",
        marginTop: menu.top * 2 - statusH.value + "rpx"
      };
    });
    const titleStyle = common_vendor.computed(() => {
      return {
        height: containerH.value + "rpx",
        lineHeight: containerH.value + "rpx",
        color: textColor.value,
        fontSize: fontSize.value + "rpx"
      };
    });
    const setNavStyle = () => {
      const {
        statusBarHeight,
        system,
        osName
      } = common_vendor.index.getSystemInfoSync();
      statusH.value = statusBarHeight * 2;
      const isIOS = (osName == null ? void 0 : osName.indexOf("ios")) > -1;
      if (!isIOS) {
        containerH.value = 96;
      } else {
        containerH.value = 88;
      }
    };
    const setStyle = () => {
      const {
        StatusBGColor,
        containerBGColor,
        iconHeight,
        iconWidth,
        fontSize: fontSize2,
        textColor: textColor2
      } = props;
      statusBackground.value = ["background-color:" + StatusBGColor].join(";");
      contaninerBackground.value = ["background-color:" + containerBGColor].join(";");
      iconStyle.value = ["width:" + iconWidth + "rpx;height:" + iconHeight + "rpx"].join(";");
      textStyle.value = ["color:" + textColor2 + ";font-size:" + fontSize2 + "rpx"].join(";");
    };
    const goPage = () => {
      if (pageLeng.value > 1) {
        common_vendor.index.navigateBack({
          delta: pageLeng.value
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      }
    };
    common_vendor.onBeforeMount(() => {
      setNavStyle();
      setStyle();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + statusH.value + "rpx;" + statusBackground.value),
        b: __props.isHome
      }, __props.isHome ? {
        c: common_vendor.s(navigatorStyle.value),
        d: common_vendor.s(homeNavStyle.value)
      } : common_vendor.e({
        e: pageLeng.value > 1
      }, pageLeng.value > 1 ? {
        f: common_assets._imports_0$5
      } : {
        g: common_assets._imports_1$1
      }, {
        h: common_vendor.o(goPage),
        i: common_vendor.t(__props.title),
        j: common_vendor.s(titleStyle.value),
        k: common_vendor.s("height:" + containerH.value + "rpx;" + contaninerBackground.value)
      }));
    };
  }
};
wx.createComponent(_sfc_main);
