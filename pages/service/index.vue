<template>
	<view>
		<topInfo />
		<!-- 服务名称显示，代跑取药，小黄人联系  -->
		<serviceInfo :service="service" />
		<!-- form表单相关 -->
		<serviceForm :formData="formData" />

		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="orderPrice > 0">（支付{{ orderPrice.value }}元）</block>
					</button>
				</view>
			</view>
		</view>

		<!-- 手机登录弹窗 -->
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="请输入手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="请输入验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>

		<!-- 支付二维码弹窗 -->
		<uni-popup ref="QRCodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"
					@click="closeQRCodePopup">
				</image>
				<view class="text-center">微信扫一扫</view>
				<!-- 关键 -->
				<canvas id="qrcode" canvas-id="qrcode" style="width: 400rpx;height: 400rpx;"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
	</view>

</template>

<script setup>
	import {
		ref,
		toRaw,
		reactive
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import topInfo from './topInfo.vue';
	import serviceInfo from "./serviceInfo.vue";
	import serviceForm from "./serviceForm.vue";
	import UQRCode from 'uqrcodejs';

	const app = getApp() // 获取uniapp实例
	const service = ref({}) // 服务内容
	const formData = ref({}) // 从接口获取数据，传递给form 表单子组件
	const cfg = reactive({ // 服务协议
		page_xy: '',
		page_fw: ''
	})
	const is_xieyi = ref(false) // 默认不勾选协议
	const orderPrice = ref(0) // 下单前需要支付的价格,从接口数据获得

	// 登录弹窗
	const popup = ref(null)
	// 校验登录信息
	const validMobile = ref({
		validCode: '', // 验证码
		phone: '', // 手机号
	})
	// 验证码
	const countdown = ref({
		validText: '获取验证码',
		time: 60, // 倒计时
	})
	const QRCodePopup = ref(null) // 二维码

	let serviceFormData = {
		personInfo: {
			name: '',
			age: '',
			mobile: '',
			sex: '',
		},
		// 订单数据
		order: {
			price: '', // 价格
			starttime: 0, // 就诊时间
			tel: '', // 联系电话
			demand: '', // 服务需求
			address: {
				userName: '',
				cityName: '',
				countyName: '',
				detailInfo: ''
			},
			receiveAddress: '', // 接送地址
		},
		// 用户收货信息
		userReceiveInfo: '',
		hospitals: {},
		hospital_index: 0,
		service: []
	};


	// 获取验证码
	let flag = false // 做防抖
	const countdownChange = () => {
		// 校验 手机号
		if (!validMobile.value.phone) {
			return uni.showToast({
				title: '请输入手机号',
				duration: 1000,
				icon: 'none'
			})
		}

		// 1.如果flag还开着,带着有定时器,那么直接return出去
		if (flag) return
		// 2.进来就打开
		flag = true
		// 3.开启定时器
		const timer = setInterval(() => {
			if (countdown.value.time <= 0) {
				countdown.value.validText = '获取验证码'
				countdown.value.time = 60
				clearInterval(timer)
				// 时间走完要关闭
				flag = false
			} else {
				countdown.value.time -= 1
				countdown.value.validText = `剩余${countdown.value.time}S`
			}
		}, 1000)
		// 获取验证码API
		app.globalData.utils.request({
			url: '/get/code',
			method: 'POST',
			data: {
				tel: validMobile.value.phone // 手机号
			},
		}).then(res => {
			uni.showToast({
				title: '验证码发送成功,请尽快验证!',
				duration: 1000,
				icon: 'none'
			});
		}).catch(err => {
			uni.showToast({
				title: err.msg,
				duration: 1000,
				icon: 'none'
			});
		});
	}

	// 取消弹窗
	const cancal = () => {
		popup.value.close() // 关闭弹窗
	}

	// 确认弹窗
	const ok = () => {
		// 如果手机号为空 或 验证码为空,则提示用户
		if (!validMobile.value.phone || !validMobile.value.validCode) {
			return uni.showToast({
				title: '请检查输入信息',
				duration: 1000,
				icon: 'none'
			})
		}
		// 验证码验证,正式登录  
		app.globalData.utils.request({
			url: '/user/authentication',
			method: 'POST',
			data: {
				tel: validMobile.value.phone, // 手机号
				code: validMobile.value.validCode // 验证码
			},
		}).then((res) => {
			// 登录成功将token设置到缓存中
			uni.setStorageSync('token', res.data.token)
			popup.value.close() // 关闭弹窗
			// 接下来正式创建订单
			createOrder(orderData)
		}, (err) => {
			popup.value.close() // 关闭弹窗
			uni.showToast({
				title: err.msg,
				duration: 1000,
				icon: 'none'
			})
		})
	};

	// 创建订单
	const createOrder = (params) => {
		// 先显示二维码弹框，再调接口，返回的支付url给UQRCode函数，渲染展示到qrcode view标签上
		QRCodePopup.value.open('center')
		app.globalData.utils.request({
			url: '/pay/createOrder',
			method: 'POST',
			header: {
				token: uni.getStorageSync('token')
			},
			data: params,
			success: res => {
				formatWXPayToQRCode(res.wx_code)
				console.log(res)
			},
			fail: res => {
				console.error(res)
			},
		})
	};

	// 关闭二维码弹窗并跳转到订单列表
	const closeQRCodePopup = () => {
		QRCodePopup.value.close()
		uni.switchTab({
			url: '../order/index'
		})
	}
	// 将微信支付url转换为微信二维码
	const formatWXPayToQRCode = (url) => {
		// 获取uQRCode实例
		var qr = new UQRCode();
		// 设置二维码内容
		qr.data = url;
		// 设置二维码大小，必须与canvas设置的宽高一致
		qr.size = 200;
		// 调用制作二维码方法
		qr.make();
		// 获取canvas上下文
		var canvasContext = uni.createCanvasContext('qrcode');
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}

	// 接收来着子组件form表单处理后的数据
	uni.$on('serviceComData', (data) => {
		serviceFormData = {
			...data
		};
		// console.log(data, "接收来着子组件form表单处理后的数据")
	});

	// 监听协议单选
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	};


	// 支付
	let orderData = {};
	const submit = () => {
		// 校验 阅读协议按钮
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请您阅读并同意用户协议和服务协议',
				duration: 1500,
				icon: 'none',
				mask: true,
			});
		}
		const serviceData = serviceFormData.service // 返回没响应式的服务对象
		orderData = serviceFormData.order // 返回没响应式的订单对象
		const personInfoData = serviceFormData.personInfo // 返回没响应式的就诊人信息对象
		const hospitalsData = serviceFormData.hospitals // 返回没响应式的酒店对象
		if (serviceData) {
			// 校验 选择的医院
			if (serviceData.stype < 100) {
				// 如果用户没有选择医院,则请提示
				if (serviceFormData.hospital_index == 0) {
					return uni.showToast({
						title: '请选择医院',
						duration: 1000,
						icon: ''
					});
				}
				// 有则代表有选择医院,则用索引取出选择医院的id和名称
				orderData.hospital_id = hospitalsData[serviceFormData.hospital_index].id
				orderData.hospital_name = hospitalsData[serviceFormData.hospital_index].name
			}

			// 非代跑取药的
			if (serviceData.stype == '10' || serviceData.stype == '15' || serviceData.stype == '20') {
				// 校验 就诊时间
				if (orderData.starttime == 0) {
					return uni.showToast({
						title: '请选择就诊时间',
						duration: 1000,
						icon: ''
					});
				}

				// 校验 选择就诊人
				if (serviceFormData.personInfoData == '') {
					return uni.showToast({
						title: '请选择就诊人',
						duration: 1000,
						icon: ''
					});
				}

				// 尊享陪诊
				if (serviceData.stype == '15') {
					// 校验 接送地址
					if (!orderData.receiveAddress) {
						return uni.showToast({
							title: '请填写接送地址',
							duration: 1000,
							icon: ''
						});
					}
				}
				orderData.client = personInfoData // 就诊人
			}

			// 代跑取药的
			if (serviceData.stype == '30' || serviceData.stype == '40') {

				// 校验 服务时间
				if (orderData.starttime == 0) {
					return uni.showToast({
						title: '请选择服务时间',
						duration: 1000,
						icon: ''
					});
				}

				// 校验 收件信息
				if (!orderData.address.userName) {
					return uni.showToast({
						title: '请选择收件信息',
						duration: 1000,
						icon: ''
					});
				}
			}
		}

		// 校验联系电话
		if (!serviceFormData.order?.tel) {
			return uni.showToast({
				title: '请填写联系电话',
				duration: 1000,
				icon: ''
			})
		}

		orderData.service_code = serviceData.code // 服务code
		orderData.service_id = serviceData.id // 服务id
		orderData.service_name = serviceData.name // 服务名称
		orderData.service_stype = serviceData.stype // 服务类型

		console.log(orderData, '提交订单的数据');

		// 上面验证都通过,正式创建订单之前做登录校验,验证用户是否已登录,未登录则显示弹窗,让其去手机号登录
		if (!uni.getStorageSync('token')) {
			popup.value.open('center') // 显示弹窗
		} else {
			// 创建订单逻辑
			createOrder(orderData)
		}
	}



	onLoad((option) => {
		getServiceDetail(option)
	});

	// 获取服务详情API
	const getServiceDetail = (option) => {
		const {
			svid
		} = option;
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid
			}
		}).then((res, err) => {
			service.value = res?.data.service; // 服务相关信息
			formData.value = {
				...res?.data,
				hid: option.hid,
			}; // 从接口获取数据，传递给form 表单子组件
		})
	}
</script>

<style>
	@import './index.css';
</style>