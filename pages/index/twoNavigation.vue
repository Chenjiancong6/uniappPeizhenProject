<template>
	<view class="nav2-list">
		<block v-for="(item,index) in nav2s" :key="item.id">
			<view class="nav2-item" @click="goPage(item.stype_link)">
				<view class="nav2-pic">
					<image :src="item.pic_image_url" mode="widthFix"></image>
				</view>
			</view>
		</block>
	</view>
</template>

<script setup>
	defineProps({
		nav2s: {
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
	.nav2-list {
		margin: 10rpx 20rpx 0 20rpx;
	}

	.nav2-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav2-item {
		float: left;
		margin-top: 20rpx;
		width: 50%;
		text-align: center;
		box-sizing: border-box;
		padding: 0 5rpx;
	}

	.nav2-pic {
		width: 100%;
	}

	.nav2-pic image {
		display: block;
		width: 100%;
	}
</style>