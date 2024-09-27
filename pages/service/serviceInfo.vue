<!-- 服务名称显示，代跑取药，小黄人联系 -->
<template>
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<image class="serv-icon"
								:src="service.icon_image ? service.icon_image_url : '../../static/resource/images/avatar.jpg'"
								mode='widthFix' />
						</view>
						<view class="weui-cell__bd">
							<text class="serv-name">{{ service.name }}</text>
						</view>
						<view class="weui-cell__ft">
							<view class="f5 ic_info" @click="handleServiceTap">服务内容</view>
						</view>
					</view>
				</view>
			</view>
</template>

<script setup>
	
	defineProps({
		service: {
			type: Object,
			default: () => {
				return {}
			}
		}
	});
	
		// 服务内容
		const handleServiceTap = () => {
	
		}
</script>

<style>
		@import './index.css';
</style>