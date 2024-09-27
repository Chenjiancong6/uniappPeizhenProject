<!-- form表单相关 -->
<template>
	<!-- 非代跑取药的，例如尊享陪诊 -->
	<block v-if="hospitals.length > 0 && service.stype == '10' || service.stype == '15'	|| service.stype == '20' ">
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd" style="display: flex;width: 100%;">
						<view class="weui-label">
							就诊医院
						</view>
						<view class="weui-cell__bd">
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals" range-key="name">
									<input type="text" :disabled="true" placeholder="请选择要就诊的医院" :value="hospitals[hospital_index].name"
										placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd" style="display: flex;width: 100%;">
						<view class="weui-label">
							就诊时间
						</view>
						<view class="weui-cell__bd">
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime" placeholder="请选择就诊时间">
								</dtPicker>
							</view>
						</view>
					</view>
				</view>
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd" style="display: flex;width: 100%;">
						<view class="weui-label">
							就诊人
						</view>
						<view class="weui-cell__bd">
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view @click="goSelectPerson">
								<input type="text" class="weui-input" :value="personInfo.name" placeholder="请选择就诊人"
									placeholder-class="vp-placeholder" :disabled="true" style="text-align: right;" />
							</view>
						</view>
					</view>
				</view>
				<!-- 尊享陪诊 -->
				<block v-if="service.stype == 15">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">接送地址</view>
						<view class="weui-cell__bd">
							<input class="weui-input" name="receiveAddress" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址" v-model="order.receiveAddress" />
						</view>
					</view>
				</block>

				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">联系电话</view>
					<view class="weui-cell__bd">
						<input class="weui-input" type="number" name="tel" style="text-align: right"
							placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-tt">服务需求</view>
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__bd">
						<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.." placeholder-class="vp-placeholder"
							style="min-height: 150rpx" v-model="order.demand" />
					</view>
				</view>
			</view>
		</view>
	</block>
	<!-- 代跑取药的 -->
	<block v-if="hospitals.length > 0 && service.stype == '30' || service.stype == '40'	">
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<view class="weui-label">代跑取药所在医院</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access">
						<view>
							<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals" range-key="name">
								<input type="text" :disabled="true" placeholder="请选择就诊所在医院" :value="hospitals[hospital_index].name"
									placeholder-class="vp-placeholder" />
							</picker>
						</view>
					</view>
				</view>
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<view class="weui-label">服务时间</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access">
						<view>
							<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime" placeholder="请选择期望服务时间">
							</dtPicker>
						</view>
					</view>
				</view>

				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<view class="weui-label">收件信息</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access" @click="onAddressChange">
						<input class="weui-input" :disabled="true" style="text-align: right" placeholder-class="vp-placeholder"
							placeholder="请选择收件信息" :value="userReceiveInfo" />
						<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
					</view>
				</view>
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">联系电话</view>
					<view class="weui-cell__bd">
						<input class="weui-input" type="number" name="tel" style="text-align: right"
							placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-tt">服务需求</view>
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__bd">
						<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.." placeholder-class="vp-placeholder"
							style="min-height: 150rpx" v-model="order.demand" />
					</view>
				</view>
			</view>
		</view>
	</block>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		computed,
		watch,
		reactive,
		ref,
		toRaw,
		toRef
	} from "vue";

	const props = defineProps({
		formData: {
			type: Object,
			default: () => {}
		},
	});

	const service = ref({}) // 服务内容
	const hospital_index = ref(0) // 选中的医院索引
	const hospitals = ref([]) // 可选医院数组
	// 用户收货信息
	const userReceiveInfo = ref('')
	// 订单数据
	const order = reactive({
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
	});

	const personInfo = ref({
		name: '',
		age: '',
		mobile: '',
		sex: '',
	}); // 就诊人姓名
	
	
	// 将选中的数据保存到全局的serviceComData上，并发送出去给父组件
	const setEmitComData = (data) => {
		const refData = {
			// 就诊人姓名
			personInfo: {
				name:personInfo.value.name,
				age:personInfo.value.age,
				mobile:personInfo.value.mobile,
				sex:personInfo.value.sex,
			},
			// 订单数据
			order: toRaw(order),
			// 用户收货信息
			userReceiveInfo: userReceiveInfo.value,
			hospitals: toRaw(hospitals.value),
			hospital_index: hospital_index.value,
			service: toRaw(service.value)
		}
		uni.$emit('serviceComData', toRaw(refData))
	};

	// 监听选择的医院   将用户选中的索引和医院价格更新一下
	const onHospitalChange = (e) => {
		const changeIndex = parseInt(e.detail.value)
		hospital_index.value = changeIndex
		order.price = hospitals.value[changeIndex].service_price ?? '';
		setTimeout(function() {
			setEmitComData()
		}, 100);
	}
	// 选择就诊时间
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value;
		setTimeout(function() {
			setEmitComData()
		}, 100);
	}
	// 就诊人
	const goSelectPerson = () => {
		uni.navigateTo({
			url: '/pages/clients/index?act=select'
		})
	};

	// 选择收货地址
	const onAddressChange = () => {
		uni.chooseAddress({
			success: (res) => {
				const {
					cityName,
					countyName,
					detailInfo,
					userName
				} = res

				userReceiveInfo.value = res ? userName + '(' + cityName + countyName + detailInfo + ')' :
					''
				order.address.userName = userName
				order.address.cityName = cityName
				order.address.countyName = countyName
				order.address.detailInfo = detailInfo;
				
				setTimeout(function() {
					setEmitComData()
				}, 100);
			},
			fail: (err) => {
				console.log(err, 'err');
			}
		})
	};

	// 接收触发全局的自定义事件  
	uni.$on('clientData', (data) => {
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
		// console.log(data, '接收触发全局的自定义事件');
	});
	

	
	// 在父组件中拿到接口数据，给ref数据赋值
	const setPorpsDataFn = (data) => {
		service.value = data.service; // 服务相关信息
		hospitals.value = data.hospitals; // 可选医院数组
		if (data.hid > 0) {
			// 将响应式数组转化为响应式之前的数组，也就是普通数组
			const hospitalsData = toRaw(hospitals.value)
			for (let i = 0; i < hospitalsData.length; i++) {
				let hosI = hospitalsData[i]
				if (hosI.id == data.hid) {
					hospital_index.value = i; // 选中的索引
					order.price = hosI.service_price ?? ''; // 医院价格
					break;
				}
			}
		}
	};

	// 在Vue3中，由于引入了Composition API，对于props的处理方式和Vue2有所不同。
	// Vue3使用setup()函数进行组件的初始化，并通过defineProps()来声明并获取组件的props。
	// 如果直接在setup中引用props，Vue默认不会自动追踪其变化，因此当props数据发生改变时，视图可能不会随之更新
	watch(() => props.formData,
		(newVal) => {
			setPorpsDataFn(newVal)
			// console.log(newVal, "newVal")
		});
	
	// 把数据传递出去
	watch(()=> [order.tel, order.demand,order.receiveAddress,personInfo.name],
	()=> {
		setTimeout(function() {
			setEmitComData()
		}, 100);
	}
	)

	onLoad(() => {
		// console.log("form表单相关")
	})
</script>

<style>
	@import './index.css';
</style>