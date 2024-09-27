<template>
	<view>
		<NavBar :isHome="true"></NavBar>
		<!-- 通知栏 -->
		<view style="margin-top: 130rpx;">
			<view class="weui-cell" style="background-color: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_myapp.png" class="noice-img"></image>
				</view>
				<view class="weui-cell__bd">
					<text class="noice-title">点击右上角“添加到我的小程序”，方便下次找到!</text>
				</view>
				<view class="weui-cell__ft">
					<image src="/static/resource/images/modal_closer.png" class="noice-closer"></image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<SwiperImg :bannerList="bannerList" />
		<!-- 2个导航 -->
		<TwoNavigation :nav2s="nav2s" />
		<!-- 多个导航 -->
		<MultipleNavigation :navs="navs" />
		<!-- 医院列表 -->
		<HospitalList :hospitalList="hospitalList" />
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import { ref } from "vue";
	import SwiperImg from './swiperImg.vue';
	import TwoNavigation from "./twoNavigation.vue";
	import MultipleNavigation from "./multipleNavigation.vue";
	import HospitalList from "./hospitalList.vue";
	
	const app = getApp() // 获取uniapp实例
	const bannerList = ref([]) // 轮播图
	const nav2s = ref([]) // 2个导航
	const navs = ref([]) // 多个导航
	const hospitalList = ref([]); // 医院列表
	
	const utils = app.globalData.utils;
	onLoad(() => {
		// 登录接口
		// app.globalData.utils.getUserInfo();
		
		// 先获取地区码
		utils.request({
			url: '/app/init',
		}).then((res,err)=> {
			const {
				id
			} = res?.data?.area;
			if(!id) return;
			// 根据地区码获取该地区的医院信息（轮播图）
			utils.request({
				url:'/Index/index',
				data:{
					aid: id
				}
			}).then((res,err)=> {
				bannerList.value = res.data?.slides; // 轮播
				nav2s.value = res.data?.nav2s; // 两个导航数据
				navs.value = res?.data.navs;// 多个导航
				hospitalList.value = res?.data.hospitals; // 医院列表
			})
			
		})
	})
</script>

<style>
	.noice-img {
		display: block;
		width: 40rpx;
		height: 40rpx;
		margin-right: 14rpx;
	}

	.noice-closer {
		display: block;
		width: 30rpx;
		height: 30rpx;
	}

	.noice-title {
		color: #be9719;
		font-size: 26rpx;
	}
</style>