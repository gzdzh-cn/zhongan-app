<template>
	<cl-page>
		<view class="main-con">
			<view class="nav">
				<view class="head-l" @click="back">
					<uni-icons type="closeempty" size="20" />
				</view>

				<view class="head-r">
					<uni-icons custom-prefix="iconfont-3156" type="icon-kefu" size="24" class="kf" />
				</view>
			</view>

			<view class="avatar">
				<image :src="logoSrc" mode="aspectFit" class="avatar-img" />
				<text class="avatar-t">{{ userData.username }}</text>
				<!-- <view class="avatar-t">
					<uni-easyinput
						v-model="userData.username"
						type="text"
						placeholder=""
						:clearable="false"
						:inputBorder="false"
						:trim="true"
						:styles="{ disableColor: false }"
					/>
				</view> -->
			</view>

			<view class="password">
				<uni-easyinput
					class="m-input"
					placeholder="登入密碼"
					v-model="userData.password"
					:type="inputType"
					:passwordIcon="false"
					:inputBorder="false"
					:trim="true"
					:clearable="false"
					:styles="{ disableColor: false }"
				/>
				<uni-icons
					custom-prefix="iconfont-3156"
					type="icon-yanjing2"
					size="23"
					class="yanjing"
					@touchstart="changeType(true)"
					@touchend="changeType(false)"
				/>
			</view>

			<view class="forget">
				<text class="f-t">忘记密码</text>
			</view>

			<view class="bottom">
				<view class="ad">
					<image src="/static/3156/img/ad2.jpg" mode="aspectFit" class="ad-img" />
				</view>
				<view class="btn-box">
					<text class="btn-l">切换账户</text>
					<view class="sub-box" @tap="login">
						<text class="sub">登录</text>
						<uni-icons type="arrow-right" size="23" />
					</view>
				</view>
			</view>
		</view>

		<!-- 加载动画 -->
		<view class="load-box" v-show="loading">
			<div class="loader">
				<span class="dot"></span>
				<span class="dot tail1"></span>
				<span class="dot tail2"></span>
				<span class="dot tail3"></span>
				<span class="dot tail4"></span>
				<span class="dot tail5"></span>
				<span class="dot tail6"></span>
				<span class="dot tail7"></span>
				<span class="dot tail8"></span>
			</div>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { onLoad, onReady, onShow } from "@dcloudio/uni-app";
import { useApp, useCool, useStore, useWx } from "/@/cool";

import { dzhStore, UserInfo } from "/@/dzh";
import { originUserData } from "/@/dzh/store/data";
import { isEmpty } from "lodash";

const { router, storage } = useCool();
const { userInfo } = dzhStore();
const loading = ref(false);
const userData = ref<UserInfo>({});
const logoSrc = ref("/static/3156/img/avtar.png");
const inputType = ref("password");

const back = () => router.home();
const changeType = (isShow: boolean) => {
	inputType.value = isShow ? "text" : "password";
};
const login = () => {
	if (userData.value?.username == "" || userData.value?.password == "") {
		uni.showToast({
			title: "请输入用户名和密码",
			icon: "none",
		});
		return;
	}
	userInfo.set(userData.value);
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		router.home();
	}, 500);
};
onLoad(() => {
 
	if (isEmpty(userInfo.info)) {
		userInfo.resetData();
	}
	userData.value = JSON.parse(JSON.stringify(userInfo.info));
	console.log("onLoad",userInfo.info);
});
onReady(() => {});
onShow(() => {
	console.log("onShow",userInfo.info);
});

onLoad(() => {});
</script>

<style lang="scss" scoped>
.main-con {
	width: 100%;
	padding-top: 68rpx;
	position: relative;
	height: 100vh;
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		right: 0;
		width: 160rpx;
		height: 160rpx;
		background-color: #f7e7a9;
		border-top-left-radius: 100%;
		z-index: 1;
	}
	.nav {
		width: 100%;
		height: 88rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		/* #ifdef APP */
		top: 70rpx;
		/* #endif */
		/* #ifndef APP */
		top: 0;
		/* #endif */
		left: 0;
		.head-l {
			width: 120rpx;
		}
		.head-m {
			flex: 1;
			text-align: center;
			font-weight: 800;
			font-size: 34rpx;
		}
		.head-r {
			width: 50rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.h-r-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.avatar {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15rpx;
		padding: 70rpx 0;
		margin-bottom: 50rpx;
		.avatar-img {
			width: 120rpx;
			height: 120rpx;
		}
		.avatar-t {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 36rpx;
			color: #6a6969;
			text-align: center;
			::v-deep .uni-input-input {
				font-size: 36rpx;
				color: #6a6969;
				text-align: center;
			}
		}
	}
	.password {
		width: 90%;
		height: 70rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #eae8e8;
		::v-deep .uni-easyinput {
			background-color: transparent !important;
		}
		::v-deep .uni-easyinput__content-input {
			font-size: 28rpx;
		}
		::v-deep .uni-easyinput__placeholder-class {
			font-size: 28rpx;
		}
	}
	.forget {
		width: 100%;
		height: 50rpx;
		padding: 0 50rpx;
		margin-top: 50rpx;
		.f-t {
			line-height: 50rpx;
			font-size: 24rpx;
			color: #ebb63a;
		}
	}
	.bottom {
		width: 100%;
		position: fixed;
		bottom: 30rpx;
		z-index: 99;
		.ad {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.ad-img {
				width: 350rpx;
			}
		}
		.btn-box {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx 0 50rpx;
			.btn-l {
				font-size: 26rpx;
				color: #ebb63a;
			}
			.sub-box {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.sub {
					font-size: 38rpx;
					color: #6a6969;
				}
			}
		}
	}
}
</style>
