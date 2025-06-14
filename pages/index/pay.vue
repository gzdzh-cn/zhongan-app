<template>
	<cl-page backgroundColor="#f6f5fa">
		<view class="main-con">
			<view class="nav">
				<view class="head-l" @click="back">
					<uni-icons type="arrow-left" size="26"></uni-icons>
				</view>

				<view class="head-r">
					<u-icon name="star" size="38"></u-icon>
					<uni-icons type="more-filled" size="26"></uni-icons>
				</view>
			</view>

			<view class="list">
				<view class="person-box">
					<view class="info">
						<view class="l">
							<view class="name">
								<text class="name-t">{{ contact.name }}</text>
								<u-icon name="edit-pen" size="28"></u-icon>
							</view>
							<view class="con">
								<view class="con-box">
									<text class="c-t"> {{ contact.phoneNumber }} |</text>
									<view>
										<text class="c-t"> {{ contact.receiveBankName }} </text>
										<uni-icons type="left" size="16" class="left-icon" color="#8c8989"></uni-icons>
										<uni-icons type="help" size="16" class="help" color="#8c8989"></uni-icons>
									</view>
								</view>
							</view>
						</view>
						<view class="r">
							<view class="circle-btn" :style="circleStyle(Number(contact.colorNum) ?? 0)">
								{{ getTransferInitial(contact.name ?? "") }}
								<image
									src="/static/3156/img/icon2.png"
									mode="aspectFit"
									class="circle-icon"
									v-show="contact?.isIcon"
								/>
							</view>
						</view>
					</view>

					<view class="btn-choose">
						<view class="btn1">
							<text>转账</text>
						</view>
						<view class="btn2">
							<text>记录</text>
						</view>
					</view>
				</view>

				<view class="money-card">
					<text class="m-title"> 转账金额 </text>
					<view class="m-input-box">
						<text class="mm">HKD</text> -
						<uni-easyinput
							class="m-input"
							type="number"
							placeholder="0.00"
							:inputBorder="false"
							:trim="true"
							v-model="formData.money"
							:clearable="false"
							@keyboardheightchange="keyboardheightchange"
						/>
						<image src="/static/3156/img/t_24.png" mode="aspectFit" class="m-icon" />
					</view>

					<text class="desc"> {{ userData.desc }} </text>
				</view>

				<view class="money-card">
					<text class="m-title"> 类型 </text>
					<view class="btn-list">
						<view
							v-for="(item, index) in btnList"
							:key="index"
							class="btn"
							:class="{ active: activeBtnIndex === index }"
							@tap.stop="handleBtnClick(index)"
						>
							<text class="btn-t">{{ item }}</text>
						</view>
					</view>
					<view class="remark">
						<text class="text">备注 </text>
						<uni-easyinput
							class="m-input"
							type="text"
							:inputBorder="false"
							placeholder="备注"
							:clearable="false"
						/>
					</view>
				</view>
			</view>

			<view class="btn-bottom">
				<view class="btn-box">
					<view class="box-text" :style="boxStyle">
						<text class="btn-t">右滑完成转账</text>
					</view>
					<view
						:class="[{ m_icon: true, active: isPressed && !isCompleted }]"
						:style="iconStyle"
						@touchstart.stop.prevent="handleTouchStart"
						@touchmove.stop.prevent="handleTouchMove"
						@touchend.stop.prevent="handleTouchEnd"
					></view>
				</view>
				<view class="btn-text">
					<text class="btn-t">请确认收款人和转账等资料正确，以免转账错误及不必要的损失。</text>
				</view>
			</view>

			<u-popup
				v-model="popupPayAShow"
				mode="bottom"
				border-radius="25"
				length="38%"
				@close="popupPayChange('close')"
				:mask-custom-style="mcs"
				z-index="99"
				:closeable="true"
				:safe-area-inset-bo="true"
				class="pay-box"
			>
				<view class="p-box">
					<view class="m-box">
						<text class="title">转出金额(HKD)</text>
						<text class="money">{{ formattedMoney }}</text>
					</view>

					<view class="p-bank">
						<text class="sk"> 收款账户 </text>
						<text class="name"> {{ contact.receiveBankName }} </text>
					</view>

					<view class="sub">
						<text class="save">确认</text>
						<view class="circle-btn" @click="sure">
							<uni-icons type="arrow-right" size="20"></uni-icons>
						</view>
					</view>
				</view>
			</u-popup>

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
		</view>
	</cl-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { useCool } from "/@/cool";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { dzhStore, Contact, UserInfo } from "/@/dzh";

interface FormData {
	money: `${number}.${number}` | `${number}` | ""; // 支持整数、带两位小数的金额或空字符串
}

interface Props {
	id?: number | string;
}

const props = defineProps<Props>();

const { router, storage } = useCool();
const { userInfo, tranInfo } = dzhStore();
const uToastRef = ref();
const mcs = ref({ background: "rgba(0, 0, 0, 0.2)" });

const formData = reactive<FormData>({
	money: "",
});

const userData = ref<UserInfo>({
	username: userInfo.info.username,
	desc: userInfo.info.desc,
});

const contact = ref<Contact>({
	name: "",
	phoneNumber: "",
	letter: "",
	receiveBankName: "",
	type: "",
	colorNum: 0,
	sort: 0,
	isTop: false,
	receiveBankAccount: "",
});
const popupPayAShow = ref(false);
const loading = ref(false);

const sure = () => {
	router.push({ path: "/pages/index/tranAfter", query: { id: contact.value.id } });
};
const back = () => {
	router.back();
};

const touchStartX = ref(0);
const currentX = ref(0);
const maxX = ref(0);
const lastMoveX = ref(0);
const isPressed = ref(false);
const windowWidth = ref(0);
const isCompleted = ref(false);

const iconStyle = computed(() => ({
	transform: `translate3d(${currentX.value}rpx, -5%, 0)`,
}));

const boxStyle = computed(() => {
	const progress = currentX.value / maxX.value;
	return {
		background: `linear-gradient(to right, #5ac2a7 ${progress * 100}%, #000 ${progress * 100}%)`,
	};
});

const handleTouchStart = (e: TouchEvent) => {
	touchStartX.value = e.touches[0].clientX;
	lastMoveX.value = touchStartX.value;
	isPressed.value = true;
	currentX.value = 0;
	// 让所有input失焦
	uni.hideKeyboard();
};

const handleTouchMove = (e: TouchEvent) => {
	const moveX = e.touches[0].clientX;
	const deltaX = moveX - lastMoveX.value;
	const rpxDeltaX = (deltaX * 750) / windowWidth.value;

	lastMoveX.value = moveX;

	if (currentX.value + rpxDeltaX > 0) {
		currentX.value = Math.min(currentX.value + rpxDeltaX, maxX.value);
		if (currentX.value >= maxX.value) {
			isCompleted.value = true;
		} else {
			isCompleted.value = false;
		}
	}
};

const handleTouchEnd = () => {
	isPressed.value = false;
	if (formData.money == "") {
		currentX.value = 0;
		popupPayAShow.value = false;
		uToastRef.value.show({
			title: "请输入金额",
			type: "warning",
		});
		return;
	}
	if (currentX.value >= maxX.value) {
		console.log("转账完成");
		isCompleted.value = false;
		loading.value = true;
		setTimeout(() => {
			popupPayAShow.value = true;
			loading.value = false;
		}, 300);
	} else {
		currentX.value = 0;
		popupPayAShow.value = false;
	}

	lastMoveX.value = 0;
	uni.hideKeyboard();
};
const colorArr = ref(["#f6ebef", "#e5eef7", "#eff2e9", "#faf2e7", "#e0fbf2"]);

const circleStyle = (index: number) => {
	return {
		backgroundColor: colorArr.value[index],
	};
};


const btnList = ["即時", "預設", "定期"];
const activeBtnIndex = ref(0);

const handleBtnClick = (index: number) => {
	activeBtnIndex.value = index;
};

const popupPayChange = (type: string) => {
	if (type == "close") {
		currentX.value = 0;
		loading.value = false;
	}
};

const keyboardheightchange = (e: any) => {
	console.log("e", e);
};

const formattedMoney = computed(() => {
	if (!formData.money) return "";
	const num = Number(formData.money);
	if (Number.isInteger(num)) {
		return num.toFixed(2);
	}
	return formData.money;
});

// 首个字母转大写
const getTransferInitial = (name: string): string => {
	if (!name) return "";
	return name.charAt(0).toUpperCase();
};

onMounted(() => {
	windowWidth.value = uni.getSystemInfoSync().windowWidth;
	// 获取btn-box的宽度
	const query = uni.createSelectorQuery();
	query
		.select(".btn-box")
		.boundingClientRect((data: any) => {
			if (data && data.width) {
				maxX.value = (data.width * 750) / windowWidth.value - 100;
			}
		})
		.exec();
});

onShow(() => {
	const id = Number(props.id);
	contact.value = tranInfo.info.find((item: Contact) => item.id == id);
	console.log("contact", contact.value);
});
onLoad((options: any) => {});
</script>

<style lang="less" scoped>
.main-con {
	width: 100%;
	padding-top: 68rpx;
	position: relative;
	.nav {
		width: 100%;
		height: 88rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		background-color: #fff;
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
			width: 120rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.h-r-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25rpx;
	}
	.person-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		gap: 15rpx;
		.info {
			width: 100%;
			height: 170rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
			padding: 20rpx 20rpx;

			.l {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				.name {
					width: 96%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;
					gap: 10rpx;
					.name-t {
						font-size: 43rpx;
						font-weight: 800;
						flex: 1;
						overflow: hidden;
						// text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.con {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 5rpx;
					.con-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
						gap: 5rpx;
					}
					.c-t {
						color: #333;
					}
					.left-icon {
						transform: rotate(-90deg);
						display: inline-block;
						vertical-align: middle;
					}
				}
			}
			.r {
				.circle-btn {
					width: 115rpx;
					height: 115rpx;
					background-color: #e5edf7;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 48rpx;
					font-weight: 400;
					color: #333;
					position: relative;
					.circle-icon {
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}

		.btn-choose {
			width: 100%;
			height: 70rpx;
			border-radius: 50rpx;
			background-color: #f7f6fc;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 5rpx;
			.btn1 {
				width: 50%;
				height: 85%;
				background-color: #fff;
				border-radius: 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				span {
					font-weight: 800;
				}
			}
			.btn2 {
				width: 50%;
				height: 85%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				span {
					font-weight: 400;
				}
			}
		}
	}
	.money-card {
		margin: 0 auto;
		width: 94%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: #fff;
		padding: 40rpx 50rpx;
		gap: 20rpx;
		border-radius: 25rpx;
		.m-title {
			font-size: 30rpx;
			color: #797878;
		}
		.m-input-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 10rpx;
			border-bottom: 1px solid #f6f6f6;
			.mm {
				font-size: 30rpx;
				font-weight: 900;
			}
			.m-icon {
				width: 40rpx;
				height: 40rpx;
			}
			::v-deep .uni-easyinput__content-input {
				font-size: 60rpx;
				font-weight: bold;
			}
			::v-deep .uni-easyinput__placeholder-class {
				font-size: 60rpx;
			}
		}
		.desc {
			color: #7d7b7b;
			font-size: 24rpx;
			width: 100%;
			word-break: break-all;
		}
		.btn-list {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 25rpx;
			.btn {
				flex: 1;
				border: 1px solid #c3c2c2;
				border-radius: 15rpx;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				-webkit-tap-highlight-color: transparent;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				user-select: none;

				.btn-t {
					font-weight: 500;
				}

				&.active {
					border: 1px solid #000;
					background-color: #f5f5f5;
				}
			}
		}
		.remark {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			gap: 30rpx;
			.text {
				font-size: 30rpx;
			}
			::v-deep .uni-easyinput__content-input {
				font-size: 30rpx;
				color: #c3c2c2;
				text-align: right;
			}
		}
	}
	.btn-bottom {
		width: 100%;
		height: 130rpx;
		position: fixed;
		bottom: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20rpx;
		.btn-box {
			width: 85%;
			height: 110rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			.box-text {
				width: 100%;
				height: 110rpx;
				background-color: #000;
				border-radius: 50rpx;
				text-align: center;
				line-height: 110rpx;
				.btn-t {
					color: #fff;
					font-size: 32rpx;
				}
			}
			.m_icon {
				width: 130rpx;
				height: 130rpx;
				position: absolute;
				left: -15rpx;
				transform: translateY(-5%);
				will-change: transform;
				-webkit-tap-highlight-color: transparent;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				user-select: none;
				background-image: url("/static/3156/img/t_25.png");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				backface-visibility: hidden;
				perspective: 1000;

				&.active {
					background-image: url("/static/3156/img/t_26.png");
				}
			}
		}
		.btn-text {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			text-align: center;
			.btn-t {
				font-size: 21rpx;
				color: #7d7b7b;
			}
		}
	}
	::v-deep .uni-easyinput__placeholder-class {
		font-size: 28rpx;
	}
	.p-box {
		padding: 100rpx 30rpx 30rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 80rpx;
		.m-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10rpx;
			.title {
				font-size: 30rpx;
				color: #979595;
			}
			.money {
				font-size: 60rpx;
				font-weight: 800;
			}
		}
		.p-bank {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			.sk,
			.name {
				font-size: 30rpx;
				color: #6e6b6b;
			}
		}
		.sub {
			width: 100%;
			padding: 0 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			gap: 20rpx;
			.save {
				font-size: 36rpx;
				font-weight: 500;
			}
			.circle-btn {
				width: 120rpx;
				height: 120rpx;
				background-color: #f1ce5a;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-weight: bold;
				color: #333;
			}
		}
	}
}
</style>
