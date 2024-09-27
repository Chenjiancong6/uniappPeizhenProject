<template>
	<view class="index-swiper">
		<swiper :indicator-dots="true" circular autoplay :interval="4000" :duration="1000">
			<swiper-item v-for="(item,index) in props.bannerList" :key="item.id">
				<image :src="item.pic_image_url" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	// import { defineProps } from 'vue';
	import {
		onLoad, onShow
	} from "@dcloudio/uni-app";
	const props = defineProps({
		bannerList: {
			type: Array,
			default: () => {
				return []
			}
		}
	});
		onLoad(()=>{
			// console.log(props.bannerList,"+++onLoad----")
		})
</script>

<style scoped>
	.index-swiper {
		overflow: hidden;
		margin: 20rpx 20rpx 0;
	}
	
	.index-swiper swiper {
		overflow: hidden;
		height: 320rpx;
		border-radius: 10rpx;
	}
	
	.index-swiper swiper-item image {
		width: 100%;
		height: 100%;
	}
</style>