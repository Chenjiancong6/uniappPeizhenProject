"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  _easycom_dtPicker2();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
if (!Math) {
  _easycom_dtPicker();
}
const _sfc_main = {
  __name: "serviceForm",
  props: {
    formData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const service = common_vendor.ref({});
    const hospital_index = common_vendor.ref(0);
    const hospitals = common_vendor.ref([]);
    const userReceiveInfo = common_vendor.ref("");
    const order = common_vendor.reactive({
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
    });
    const personInfo = common_vendor.ref({
      name: "",
      age: "",
      mobile: "",
      sex: ""
    });
    const setEmitComData = (data) => {
      const refData = {
        // 就诊人姓名
        personInfo: {
          name: personInfo.value.name,
          age: personInfo.value.age,
          mobile: personInfo.value.mobile,
          sex: personInfo.value.sex
        },
        // 订单数据
        order: common_vendor.toRaw(order),
        // 用户收货信息
        userReceiveInfo: userReceiveInfo.value,
        hospitals: common_vendor.toRaw(hospitals.value),
        hospital_index: hospital_index.value,
        service: common_vendor.toRaw(service.value)
      };
      common_vendor.index.$emit("serviceComData", common_vendor.toRaw(refData));
    };
    const onHospitalChange = (e) => {
      const changeIndex = parseInt(e.detail.value);
      hospital_index.value = changeIndex;
      order.price = hospitals.value[changeIndex].service_price ?? "";
      setTimeout(function() {
        setEmitComData();
      }, 100);
    };
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
      setTimeout(function() {
        setEmitComData();
      }, 100);
    };
    const goSelectPerson = () => {
      common_vendor.index.navigateTo({
        url: "/pages/clients/index?act=select"
      });
    };
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          const {
            cityName,
            countyName,
            detailInfo,
            userName
          } = res;
          userReceiveInfo.value = res ? userName + "(" + cityName + countyName + detailInfo + ")" : "";
          order.address.userName = userName;
          order.address.cityName = cityName;
          order.address.countyName = countyName;
          order.address.detailInfo = detailInfo;
          setTimeout(function() {
            setEmitComData();
          }, 100);
        },
        fail: (err) => {
          console.log(err, "err");
        }
      });
    };
    common_vendor.index.$on("clientData", (data) => {
      const {
        age,
        mobile,
        sex,
        name
      } = data;
      personInfo.value.name = name;
      personInfo.value.mobile = mobile;
      personInfo.value.sex = sex;
      personInfo.value.age = age;
    });
    const setPorpsDataFn = (data) => {
      service.value = data.service;
      hospitals.value = data.hospitals;
      if (data.hid > 0) {
        const hospitalsData = common_vendor.toRaw(hospitals.value);
        for (let i = 0; i < hospitalsData.length; i++) {
          let hosI = hospitalsData[i];
          if (hosI.id == data.hid) {
            hospital_index.value = i;
            order.price = hosI.service_price ?? "";
            break;
          }
        }
      }
    };
    common_vendor.watch(
      () => props.formData,
      (newVal) => {
        setPorpsDataFn(newVal);
      }
    );
    common_vendor.watch(
      () => [order.tel, order.demand, order.receiveAddress, personInfo.name],
      () => {
        setTimeout(function() {
          setEmitComData();
        }, 100);
      }
    );
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: hospitals.value.length > 0 && service.value.stype == "10" || service.value.stype == "15" || service.value.stype == "20"
      }, hospitals.value.length > 0 && service.value.stype == "10" || service.value.stype == "15" || service.value.stype == "20" ? common_vendor.e({
        b: hospitals.value[hospital_index.value].name,
        c: common_vendor.o(onHospitalChange),
        d: hospital_index.value,
        e: hospitals.value,
        f: common_vendor.o(onStartTimeChanged),
        g: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        h: personInfo.value.name,
        i: common_vendor.o(goSelectPerson),
        j: service.value.stype == 15
      }, service.value.stype == 15 ? {
        k: order.receiveAddress,
        l: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        m: order.tel,
        n: common_vendor.o(($event) => order.tel = $event.detail.value),
        o: order.demand,
        p: common_vendor.o(($event) => order.demand = $event.detail.value)
      }) : {}, {
        q: hospitals.value.length > 0 && service.value.stype == "30" || service.value.stype == "40"
      }, hospitals.value.length > 0 && service.value.stype == "30" || service.value.stype == "40" ? {
        r: hospitals.value[hospital_index.value].name,
        s: common_vendor.o(onHospitalChange),
        t: hospital_index.value,
        v: hospitals.value,
        w: common_vendor.o(onStartTimeChanged),
        x: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        y: userReceiveInfo.value,
        z: common_vendor.o(onAddressChange),
        A: order.tel,
        B: common_vendor.o(($event) => order.tel = $event.detail.value),
        C: order.demand,
        D: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
