<template>
	<cl-page backgroundColor="#f6f5fa">
		<view class="main-con">
			<view class="nav">
				<view class="head-r" @click="sure">
					<text class="complete-t">完成</text>
				</view>
			</view>

			<view class="section1" v-show="sectionShow == 1">
				<view class="info-box">
					<view class="info">
						<view class="circle-btn"> {{ getTransferInitial(contact?.name ?? "") }} </view>
					</view>

					<view class="xinfeng">
						<image src="/static/3156/img/xinfeng.png" mode="aspectFit" class="m-icon" />
						<text class="xf-t">转账中</text>
					</view>
					<image src="/static/3156/img/t_30.png" mode="aspectFit" class="xf-icon1" />
					<image src="/static/3156/img/t_30.png" mode="aspectFit" class="xf-icon2" />
				</view>

				<view class="account">
					<view class="item">
						<text class="l"> 收款银行 </text>
						<text class="r"> {{ contact?.receiveBankName }} </text>
					</view>
					<view class="item">
						<text class="l"> 收款账号 </text>
						<text class="r"> {{ contact?.receiveBankAccount }} </text>
					</view>
				</view>
			</view>

			<view class="section2" v-show="sectionShow == 2">
				<view class="s-box">
					<view class="icon-box">
						<uni-icons
							custom-prefix="iconfont-3156"
							type="icon-kulian4"
							size="100"
							color="#cd3e3e"
							class="icon1"
							v-show="iconShow == 1"
							:class="{ 'fade-out': iconShow == 2 }"
						></uni-icons>
						<uni-icons
							custom-prefix="iconfont-3156"
							type="icon-chacha"
							size="70"
							color="#cd3e3e"
							class="icon2"
							v-show="iconShow == 2"
							:class="{ 'fade-in': iconShow == 2 }"
						></uni-icons>
					</view>

					<view class="t-box">
						<text class="t1"> 交易失败 </text>
						<text class="t2">付款账户状态异常，该交易未能处理。请于工作时间内联系我们</text>
					</view>
				</view>

				<text class="help">
					<text class="t1">需要帮助？</text>
					<text class="t2">联系客服</text>
				</text>
			</view>
		</view>
	</cl-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { useCool } from "/@/cool";
import { onShow } from "@dcloudio/uni-app";
import { dzhStore, Contact } from "/@/dzh";



const { router, storage } = useCool();
const { userInfo,tranInfo } = dzhStore();
interface Props {
	id?: number | string;
}
 
const props = defineProps<Props>();

const contact = ref<Contact>({
	name: "",
	phoneNumber: "",
	letter: "",
	receiveBankName: "",
	type: "",
	colorNum: 0,
	sort: 0,
	isTop: false,
	receiveBankAccount: ""
});
const sectionShow = ref(1);
const iconShow = ref(1);

setTimeout(() => {
	sectionShow.value = 2;
	setTimeout(() => {
		iconShow.value = 2;
	}, 1000);
}, 1500);


const sure =()=>{
	router.push("/pages/index/home")
} 
 
// 首个字母转大写
const getTransferInitial = (name: string): string => {
	if (!name) return "";
	return name.charAt(0).toUpperCase();
};

onShow(()=>{
	const id = Number(props.id);
	contact.value = tranInfo.info.find((item: Contact) => item.id == id);
	console.log("contact", contact.value);
})

</script>

<style lang="less">
.main-con {
	width: 100%;
	// height: 100vh;
	padding-top: 68rpx;
	position: relative;
	.nav {
		width: 100%;
		height: 88rpx;
		// padding: 0 0rpx;
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
		// z-index: 999;
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
			width: 100rpx;
			margin-left: auto;
			.complete-t {
				font-size: 30rpx;
			}
		}
	}
	.section1 {
		.info-box {
			padding-top: 30rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 260rpx;
			position: relative;
			.info {
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				z-index: 10;
				.circle-btn {
					width: 120rpx;
					height: 120rpx;
					background-color: #c0d5de;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-weight: bold;
					color: #333;
				}
			}
			.xinfeng {
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				z-index: 10;
				.m-icon {
					width: 130rpx;
					height: 130rpx;
				}
				.xf-t {
					font-size: 30rpx;
				}
			}
			.xf-icon1 {
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				bottom: 110rpx;
				animation: moveUp1 2.5s ease-out infinite;
			}
			.xf-icon2 {
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				bottom: 50rpx;
				animation: moveUp2 2.5s ease-out infinite;
			}
		}
		.account {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 30rpx;
			padding: 0 50rpx;
			margin-top: 80rpx;
			.item {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.l,
				.r {
					color: #666;
				}
			}
		}
	}
	.section2 {
		width: 100%;
		height: 100vh;
		// position: absolute;
		// top: 0;
		// padding-top: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		.s-box {
			width: 360rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			// gap: 10rpx;
			.icon-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 170rpx;
				position: relative;
				
				.icon1, .icon2 {
					position: absolute;
					transition: all 0.8s ease;
				}
				
				.fade-out {
					opacity: 0;
					transform: scale(0.9);
				}
				
				.fade-in {
					opacity: 1;
					transform: scale(1);
				}
			}
			.t-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				position: relative;
				gap: 20rpx;
				.t1 {
					font-size: 35rpx;
					color: #535353;
				}
				.t2 {
					font-size: 22rpx;
					color: #727171;
					text-align: center;
					word-break: break-all;
				}
			}
		}
		.help {
			font-size: 26rpx;
			position: fixed;
			bottom: 50rpx;
			text-align: center;

			.t1 {
				color: #afadad;
			}
			.t2 {
				color: #ebb63a;
			}
		}
	}
}

@keyframes moveUp1 {
	0% {
		transform: translate(-20rpx, 0);
		opacity: 1;
	}
	20% {
		transform: translate(-20rpx, -100rpx);
		opacity: 1;
	}
	40% {
		transform: translate(-20rpx, -200rpx);
		opacity: 1;
	}
	60% {
		transform: translate(-20rpx, -300rpx);
		opacity: 1;
	}
	70% {
		transform: translate(-10rpx, -300rpx);
		opacity: 1;
	}
	80% {
		transform: translate(-10rpx, -350rpx);
		opacity: 1;
	}
	100% {
		transform: translate(-10rpx, -360rpx);
		opacity: 0;
	}
}
@keyframes moveUp2 {
	0% {
		transform: translate(20rpx, 0);
		opacity: 1;
	}
	20% {
		transform: translate(20rpx, -100rpx);
		opacity: 1;
	}
	40% {
		transform: translate(20rpx, -200rpx);
		opacity: 1;
	}
	60% {
		transform: translate(20rpx, -300rpx);
		opacity: 1;
	}
	70% {
		transform: translate(20rpx, -300rpx);
		opacity: 1;
	}
	80% {
		transform: translate(10rpx, -350rpx);
		opacity: 1;
	}
	100% {
		transform: translate(10rpx, -360rpx);
		opacity: 0;
	}
}

@keyframes iconPop {
	0% {
		opacity: 0;
		transform: scale(0.8);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
