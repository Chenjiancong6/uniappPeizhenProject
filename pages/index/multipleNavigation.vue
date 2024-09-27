<template>
	<view class="nav-list">
		<block v-for="(item,index) in navs" :key="item.id">
			<view class="nav-item" @click="goPage(item.stype_link)">
				<view class="nav-pic">
					<image :src="item.pic_image_url" mode="widthFix"></image>
				</view>
				<view class="nav-text" :style="'color:'+item.tcolor ? item.tcolor: ''">
					{{ item.title }}
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
	defineProps({
		navs: {
			type: Array,
			fefault: () => {
				return []
			}
		}
	});

	// 导航跳转
	const goPage = (url) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style scoped>
	.nav-list {
		display:flex;
	}
	.nav-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav-item {
		float: left;
		margin-top: 20rpx;
		width: 20%;
		text-align: center;
		padding: 10rpx 0;
	}

	.nav-pic image {
		display: block;
		margin: 0 auto;
		width: 110rpx;
		height: 110rpx;
	}

	.nav-text {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
	}
</style>