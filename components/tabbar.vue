<template>
	<view class="tabbar">
		 <view class="tabbar__inner">
			<view
				class="item"
				v-for="(item, index) in list"
				:key="index"
				:class="{
					is_active: item.active,
				}"
				@tap="toLink(item.pagePath)"
			>
				<view class="custom" v-if="item.pagePath == 'custom'">
					<view class="icon">
						<image src="/static/chat.png" mode="aspectFit" />
					</view>
				</view>

				<template v-else>
					<view class="icon">
						<image :src="item.icon" mode="aspectFit" />
					</view>
					<text class="label">{{ item.text }}</text>
					<view class="badge" v-if="item.number > 0">{{ item.number || 0 }}</view>
				</template>
			</view>
		</view>  
	</view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCool } from "/@/cool";

const props = defineProps({
	isAtTop: {
		type: Boolean,
		default: false
	}
});

const { router } = useCool();

const list = computed(() => {
	const arr = [...router.tabs];
	const newArr = arr.map((e, index) => {
		const active = router.path?.includes(e.pagePath);
		let iconPath:string = "/" + (active ? e.selectedIconPath : e.iconPath);
		
		// 当 isAtTop 为 true 且是第一个图标时，使用 home-2.png
		if (props.isAtTop && index === 0) {
			iconPath = "/static/3156/img/home-2.png";
		}

		return {
			icon: iconPath,
			active,
			number: 0,
			...e,
		};
	});
	
	return newArr
});

function toLink(pagePath: string) {
	if (pagePath == "custom") {
		// #ifdef H5
		location.href = "/";
		// #endif
	} else {
		router.push("/" + pagePath);
	}
}

uni.hideTabBar();
</script>

<style lang="scss" scoped>
.tabbar {
	padding-bottom: env(safe-area-inset-bottom);
	height: 100rpx;

	&__inner {
		padding-top: 0px;
		padding-bottom: inherit;
		height: inherit;
		width: 100%;
		display: flex;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 399;
		border-top: 1rpx solid #eee;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 1;
			position: relative;

			.icon {
				height: 46rpx;
				width: 46rpx;
				transition: all 0.3s ease;

				image {
					height: 100%;
					width: 100%;
				}
			}

			.label {
				font-size: 24rpx;
				color: #bfbfbf;
			}

			.badge {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 20rpx;
				transform: translateX(20rpx);
				font-size: 20rpx;
				height: 36rpx;
				min-width: 36rpx;
				padding: 0 6rpx;
				background-color: #f56c6c;
				border: 4rpx solid #fff;
				color: #fff;
				border-radius: 18rpx;
				font-weight: bold;
				box-sizing: border-box;
			}

			&.is_active {
				position: relative;
				
				&::before {
					content: '';
					position: absolute;
					top: -30rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 140rpx;
					height: 60rpx;
					background-color: #fff;
					border-radius: 70rpx 70rpx 0 0;
					z-index: -1;
				}

				.icon {
					height: 70rpx;
					width: 70rpx;
					transform: translateY(-15rpx);
				}

				.label {
					color: $cl-color-success;
					transform: translateY(-10rpx);
				}
			}

			.custom {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				.icon {
					background: linear-gradient(
						to bottom right,
						#408fff,
						#6b69f8,
						#a35df2,
						#d14bd8,
						#e9388a
					);
					border-radius: 100%;
					padding: 16rpx;
				}
			}
		}
	}
}
</style>
