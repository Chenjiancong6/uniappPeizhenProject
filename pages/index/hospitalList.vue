<template>
	<view class="weui-cells hosp-list">
		<view class="weui-cell hosp-itemweui-cell_access" v-for="(item,index) in hospitalList" :key="item.id"
			@click="goHospitalDetail(item.id)">
			<view class="weui-cell__hd">
				<image :src="item.avatar ? item.avatar_url: '../../static/resource/images/avatar.jpg'" class="hosp-avatar"
					mode="aspectFill"></image>
			</view>
			<view class="weui-cell__bd">
				<view class="hosp-name">
					{{ item.name }}
				</view>
				<view class="hosp-line">
					<text class="hosp-rank">{{ item.rank }}</text>
					<text class="hosp-label">{{ item.label }}</text>
				</view>
				<view class="hosp-line">
					<text class="hosp-intro">{{ item.intro }}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	defineProps({
		hospitalList: {
			type: Array,
			fefault: () => {
				return []
			}
		}
	});

	// 去医院详情
	const goHospitalDetail = (id) => {
		uni.navigateTo({
			url: '/pages/hospital/index?svid=1&hid=' + id
		})
	}
</script>

<style scoped>
	.hosp-list {
		margin: 10rpx 0 0 0;
		background: none;
	}

	.hosp-list::before {
		display: none;
	}

	.hosp-list::after {
		display: none;
	}

	.hosp-item {
		-webkit-box-align: stretch;
		-webkit-align-items: stretch;
		align-items: stretch;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
	}

	.hosp-item::before {
		display: none;
	}

	.hosp-item::after {
		display: none;
	}

	.hosp-name {
		font-weight: bold;
		font-size: 34rpx;
	}

	.hosp-avatar {
		display: block;
		width: 200rpx;
		height: 180rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.hosp-line {
		margin-top: 5rpx;
	}

	.hosp-line text {
		font-size: 26rpx;
	}

	.hosp-rank {
		font-weight: bold;
		color: #0bb585;
		margin-right: 15rpx;
	}

	.hosp-label {
		font-weight: bold;
		color: #0ca7ae;
		margin-right: 15rpx;
	}

	.hosp-intro {
		color: #999999;
	}
</style>