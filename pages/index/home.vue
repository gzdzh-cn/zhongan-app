<template>
	<cl-page backgroundColor="#f5f5fc">
		<view
			class="main"
			ref="container"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<view class="section1 section-one">
				<!-- logo -->
				<view class="head">
					<view class="nav-item-l">
						<image :src="logoSrc" mode="aspectFit" class="logo-img" />
						<span class="name">Hi, Czy<text class="name numFont">666999</text></span>
					</view>

					<view class="nav-item-r">
						<uni-icons
							custom-prefix="iconfont-3156"
							type="icon-kefu"
							size="30"
							class="kf"
						></uni-icons>
						<uni-icons
							custom-prefix="iconfont-3156"
							type="icon-erweima"
							size="26"
							class="qrcode"
						></uni-icons>
					</view>
				</view>

				<!-- 余额 -->
				<view class="hd">
					<view class="card left">
						<view class="card-t">
							<text class="t"> 总结余 (HKD等值)</text>
						</view>
						<view class="card-t">
							<text class="t numFont money">106<text class="numFont money-mini">.00</text></text>
							<u-icon name="arrow-right" color="#5b5c66" size="18" class="jiantou-right"></u-icon>
						</view>
						<view class="card-t">
							<text class="t"> 活期存款 <text class="numFont">106.00 </text></text>
						</view>
					</view>

					<view class="card right">
						<view class="c-l">
							<view class="card-t">
								<text class="t"> ZA Quest </text>
							</view>
							<view class="card-t">
								<text class="t"> 签到有奖</text>
							</view>
							<view class="card-t">
								<text class="t go-color"> Go > </text>
							</view>
						</view>
						<view class="dan">
							<image src="/static/3156//img/dan1.png" mode="aspectFit" class="dan-img1" />
							<image
								src="/static/3156//img/dan2.png"
								mode="aspectFit"
								class="dan-img2 rotating-image"
							/>
						</view>
					</view>
				</view>

				<!-- 导航 -->
				<view class="nav">
					<view class="nav-contain">
						<view class="nav-item">
							<image src="/static//3156//img/n1.png" mode="aspectFit" class="nav-img" />
							<text>存款</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n2.png" mode="aspectFit" class="nav-img" />
							<text>保险</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n3.png" mode="aspectFit" class="nav-img" />
							<text>账户信息</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n4.png" mode="aspectFit" class="nav-img" />
							<text>钱罐</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n5.png" mode="aspectFit" class="nav-img" />
							<text>海外汇款</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n6.png" mode="aspectFit" class="nav-img" />
							<text>推荐好友</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n7.png" mode="aspectFit" class="nav-img" />
							<text>最劲抽</text>
						</view>
						<view class="nav-item">
							<image src="/static//3156//img/n8.png" mode="aspectFit" class="nav-img" />
							<text>全部</text>
						</view>
					</view>
					<view class="point">
						<view class="p-black"></view>
						<view class="p-cc"></view>
					</view>
				</view>
			</view>

			<view class="news section-two" :style="sectionStyle">
				<view class="background-layer" :style="backgroundStyle"></view>
				<view class="new-contain">
					<span class="t"> 动态 </span>

					<view class="card">
						<view class="title">
							<u-icon name="bell-fill" color="#f2c342" size="36"></u-icon>
							<text>消息(+14)</text>
						</view>
						<view class="con">
							<view class="left">
								<image src="/static/3156/img/new-1.png" mode="aspectFit" class="new-img" />
							</view>
							<view class="right">
								<view class="title">
									<image src="/static/3156/img/new-icon.png" mode="aspectFit" class="new-icon" />
									<text>「最佳销售」基金排行榜更新了 </text>
								</view>
								<view class="con">
									<text>查看过往3个月最受欢迎的基金。投资...</text>
								</view>
							</view>
						</view>
					</view>

					<view class="card">
						<view class="con">
							<view class="left">
								<image src="/static/3156/img/icon1.png" mode="aspectFit" class="new-img icon" />
							</view>
							<view class="right">
								<view class="title jiangli">
									<text>有2个新用户专属任务在等你！即刻做任务赚丰富奖...</text>
								</view>
								<view class="con">
									<text>5月12日 13:20</text>
								</view>
							</view>
						</view>
					</view>

					<view class="card">
						<view class="con">
							<view class="left">
								<image src="/static/3156/img/icon2.png" mode="aspectFit" class="new-img icon" />
							</view>
							<view class="right">
								<view class="title jiangli">
									<text>成功用新设备登录</text>
								</view>
								<view class="con">
									<text>5月9日 00:35</text>
								</view>
							</view>
						</view>
					</view>

					<view class="ad">
						<image src="/static/3156/img/ad1.png" mode="aspectFill" class="ad-img" />
					</view>

					<view class="card">
						<view class="con">
							<view class="left">
								<image src="/static/3156/img/icon2.png" mode="aspectFit" class="new-img icon" />
							</view>
							<view class="right">
								<view class="title jiangli">
									<text>成功用新设备登录</text>
								</view>
								<view class="con">
									<text>5月9日 00:35</text>
								</view>
							</view>
						</view>
					</view>

					<view class="ad">
						<image src="/static/3156/img/ad2.jpg" mode="aspectFit" class="ad-img" />
					</view>
				</view>
			</view>

			<view class="tran" :style="tranStyle">
				<view class="box">
					<text class="tran-text" :style="tranTextStyle">转出</text>
					<view class="tran-btn-container">
						<view class="fixed-circle" :class="{ 'show': showFixedCircle }"></view>
						<svg class="liquid-connector" :class="{ 'show': showFixedCircle }" width="120" height="300" viewBox="0 0 120 300">
							<path :d="liquidPath" fill="#f8d653" />
						</svg>
						<view class="tran-btn" 
							:style="tranBtnStyle"
							@touchstart.stop.prevent="handleTranTouchStart"
							@touchmove.stop.prevent="handleTranTouchMove"
							@touchend.stop.prevent="handleTranTouchEnd"
						>
							<uni-icons
								custom-prefix="iconfont-3156"
								type="icon-xiangshangjiantoukuan-xianxing"
								size="15"
								color="#c5c5cd"
								class="arrow-up"
								:style="tranTextStyle"
							></uni-icons>
							<view class="btn">
								<image src="/static/3156/img/tran-img.png" mode="aspectFit" class="new-img" />
							</view>
							<uni-icons
								custom-prefix="iconfont-3156"
								type="icon-xiangxiajiantoukuan-xianxing"
								size="15"
								color="#c5c5cd"
								class="arrow-down"
								:style="tranTextStyle"
							></uni-icons>
						</view>
					</view>
					<text class="tran-text" :style="tranTextStyle">转入</text>
				</view>
			</view>
		</view>
		<tabbar />
	</cl-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";
import { onShow } from "@dcloudio/uni-app";
import Tabbar from "/@/components/tabbar.vue";
import { dzhStore } from "/@/dzh";

const logoSrc = ref("/static/3156/logo.png");
const { setting } = dzhStore();

const viewportHeight = ref(uni.getSystemInfoSync().windowHeight);

const touchStartY = ref(0);
const currentOffset = ref(0); // 当前偏移
const isAnimating = ref(false);
const THRESHOLD = 30;
const isAtTop = ref(false); // 是否在顶部位置

const TOP_POSITION = -viewportHeight.value * 0.56;
const INITIAL_POSITION = 0;

// 计算背景图片透明度
const backgroundOpacity = computed(() => {
	const progress = Math.abs(currentOffset.value) / 20; // 使用20px作为渐变范围
	return Math.min(1, Math.max(0, progress));
});

const sectionStyle = computed(() => ({
	transform: `translateY(${currentOffset.value}px)`,
	transition: isAnimating.value ? "transform 0.3s ease" : "none",
	willChange: "transform",
}));

// 背景图片样式
const backgroundStyle = computed(() => ({
	opacity: 1,
	transition: isAnimating.value ? "all 0.3s ease" : "none",
	'--slice-opacity': 1 - backgroundOpacity.value,
	'--none-slice-opacity': backgroundOpacity.value,
}));

const handleTouchStart = (e: TouchEvent) => {
	if (isAnimating.value) return;
	touchStartY.value = e.touches[0].clientY;
	isAnimating.value = false;
};

const handleTouchMove = (e: TouchEvent) => {
	if (isAnimating.value) return;
	
	const deltaY = e.touches[0].clientY - touchStartY.value;
	const nextOffset = currentOffset.value + deltaY;

	// 限制滑动范围
	if (nextOffset >= INITIAL_POSITION) {
		currentOffset.value = INITIAL_POSITION;
	} else if (nextOffset <= TOP_POSITION) {
		currentOffset.value = TOP_POSITION;
	} else {
		currentOffset.value = nextOffset;
	}

	// 如果移动距离超过阈值，自动滑动到顶部
	if (Math.abs(deltaY) > THRESHOLD && deltaY < 0) {
		isAnimating.value = true;
		currentOffset.value = TOP_POSITION;
		isAtTop.value = true;
		setTimeout(() => {
			isAnimating.value = false;
		}, 300);
	}

	// 如果在顶部位置，检测下滑
	if (isAtTop.value && deltaY > 0) {
		if (deltaY > THRESHOLD) {
			isAnimating.value = true;
			currentOffset.value = INITIAL_POSITION;
			isAtTop.value = false;
			setTimeout(() => {
				isAnimating.value = false;
			}, 300);
		}
	}

	// 更新初始点，便于连续滑动
	touchStartY.value = e.touches[0].clientY;
};

const handleTouchEnd = () => {
	if (isAnimating.value) return;
	
	isAnimating.value = true;
	const deltaY = currentOffset.value - INITIAL_POSITION;

	// 如果在顶部位置，检测下滑
	if (isAtTop.value && deltaY > 0) {
		if (deltaY > THRESHOLD) {
			currentOffset.value = INITIAL_POSITION;
			isAtTop.value = false;
		} else {
			currentOffset.value = TOP_POSITION;
		}
	} else {
		// 如果移动距离小于阈值，恢复到初始位置
		if (Math.abs(deltaY) < THRESHOLD) {
			currentOffset.value = INITIAL_POSITION;
			isAtTop.value = false;
		} else {
			// 如果移动距离超过阈值，滑动到顶部
			currentOffset.value = TOP_POSITION;
			isAtTop.value = true;
		}
	}

	// 动画结束后移除 transition
	setTimeout(() => {
		isAnimating.value = false;
	}, 300);
};

const tranOpacity = computed(() => {
	const progress = Math.abs(currentOffset.value) / 30; // 使用30px作为渐变范围
	return Math.max(0, 1 - progress);
});

const tranStyle = computed(() => ({
	opacity: tranOpacity.value,
	transition: isAnimating.value ? 'opacity 0.3s ease' : 'none',
}));

// tran 按钮移动相关状态
const isTranDragging = ref(false);
const tranStartY = ref(0);
const tranCurrentY = ref(0);
const showFixedCircle = ref(false);
const liquidPath = ref('');

const tranBtnStyle = computed(() => ({
	transform: `translateY(${tranCurrentY.value}px)`,
	transition: isTranDragging.value ? 'none' : 'transform 0.3s ease'
}));

// 添加液体路径计算
const calculateLiquidPath = (startY: number, endY: number, distance: number, isUpward: boolean) => {
	const centerX = 60;
	const fixedRadius = 25;
	const btnRadius = 60;
	const maxWidth = btnRadius * 0.5;
	const minWidth = 10;
	const widthFactor = Math.max(0, 1 - distance / 200);
	const liquidWidth = minWidth + (maxWidth - minWidth) * widthFactor;
	const elasticFactor = Math.sin(distance * 0.03) * Math.min(6, distance * 0.1);
	const maxOffset = 20;
	const offsetFactor = Math.max(0, 1 - distance / 250);
	const controlOffset = maxOffset * offsetFactor;
	// 以startY为基准，所有控制点都用 (endY - startY) 的比例
	return `
		M ${centerX - fixedRadius} ${startY}
		C ${centerX - fixedRadius} ${startY + controlOffset},
		  ${centerX - liquidWidth - elasticFactor} ${startY + (endY - startY) * 0.3},
		  ${centerX - liquidWidth + elasticFactor} ${startY + (endY - startY) * 0.5}
		C ${centerX - liquidWidth * 0.8} ${startY + (endY - startY) * 0.7},
		  ${centerX - btnRadius} ${endY - controlOffset},
		  ${centerX - btnRadius} ${endY}
		A ${btnRadius} ${btnRadius} 0 1 0 ${centerX + btnRadius} ${endY}
		C ${centerX + btnRadius} ${endY - controlOffset},
		  ${centerX + liquidWidth * 0.8} ${startY + (endY - startY) * 0.7},
		  ${centerX + liquidWidth - elasticFactor} ${startY + (endY - startY) * 0.5}
		C ${centerX + liquidWidth + elasticFactor} ${startY + (endY - startY) * 0.3},
		  ${centerX + fixedRadius} ${startY + controlOffset},
		  ${centerX + fixedRadius} ${startY}
		A ${fixedRadius} ${fixedRadius} 0 1 0 ${centerX - fixedRadius} ${startY}
	`;
};

const handleTranTouchStart = (e: TouchEvent) => {
	e.preventDefault();
	e.stopPropagation();
	isTranDragging.value = true;
	tranStartY.value = e.touches[0].clientY;
	tranCurrentY.value = 0;
	showFixedCircle.value = false;
	liquidPath.value = calculateLiquidPath(150, 150, 0, true);
};

const handleTranTouchMove = (e: TouchEvent) => {
	e.preventDefault();
	e.stopPropagation();
	if (!isTranDragging.value) return;
	
	const deltaY = e.touches[0].clientY - tranStartY.value;
	const limitedDeltaY = Math.max(-150, Math.min(150, deltaY));
	tranCurrentY.value = limitedDeltaY;
	
	// 计算液体路径
	const distance = Math.abs(limitedDeltaY);
	const startY = 150; // 固定圆的Y坐标
	const endY = startY + limitedDeltaY;
	const isUpward = limitedDeltaY < 0;
	
	// 无论上滑还是下滑，都显示液体效果和固定圆点
	showFixedCircle.value = distance > 0;
	liquidPath.value = calculateLiquidPath(startY, endY, distance, isUpward);
};

const handleTranTouchEnd = (e: TouchEvent) => {
	e.preventDefault();
	e.stopPropagation();
	if (!isTranDragging.value) return;
	
	isTranDragging.value = false;
	tranCurrentY.value = 0;
	showFixedCircle.value = false;
	liquidPath.value = '';
};

// tran 文本透明度计算
const tranTextOpacity = computed(() => {
	const progress = Math.abs(tranCurrentY.value) / 30;
	return Math.max(0, 1 - progress);
});

const tranTextStyle = computed(() => ({
	opacity: tranTextOpacity.value,
	transition: 'opacity 0.3s ease',
}));
</script>

<style scoped>
/* 添加CSS类来进一步优化渲染性能 */
.optimized-transitions {
	transform: translateZ(0);
	will-change: transform;
	contain: layout style;
	touch-action: pan-y; /* 优化触摸事件处理 */
}
</style>
<style lang="less">
@import "/@/static/3156/font/font.css";

.gesture-container {
	height: 100vh;
	overflow: hidden;
	position: relative;
}

.section {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 2rem;
	box-sizing: border-box;
}

.section-one {
	height: 760rpx;
	position: fixed;
	z-index: 0;
}

.section-two {
	height: 100vh;
	position: absolute;
	top: 760rpx;
	left: 0;
	z-index: 1;
}
/* 动画类 */
.slide-up {
}

.main {
	height: 100vh;
	position: relative;
	overflow: hidden;
}

.section1 {
	padding: 30rpx 26rpx 0 26rpx;
}
.numFont {
	font-family: "number-3156" !important;
	letter-spacing: 0.001rem;
}

.head {
	width: 100%;
	height: 90rpx;
	padding: 0 10rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	// border: 1px solid #ccc;
	overflow: hidden;
	.nav-item-l {
		display: flex;
		gap: 15rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.logo-img {
			width: 68rpx;
			height: 68rpx;
			overflow: hidden;
		}
		.name {
			font-weight: bold;
			font-size: 32rpx;
			letter-spacing: 0.001rem;
		}
	}
	.nav-item-r {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 34rpx;
		.kf {
			font-weight: b;
		}
	}
}

.hd {
	margin-top: 20rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10rpx;
	.card {
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 30rpx;
		width: 100%;
		height: 185rpx;
		.t {
			font-size: 23rpx;
			line-height: 1.6rem;
			font-weight: 400;
		}
		.go-color {
			color: #dd9734;
		}

		&:nth-child(2) {
			display: flex;
			align-items: center;
			gap: 10rpx;
			.t {
				font-size: 35rpx;
				font-weight: bold;
			}
			.money {
				font-size: 42rpx;
			}
			.money-mini {
				font-size: 34rpx;
				font-weight: 800;
			}
			.money-fh {
				font-size: 18rpx;
			}
		}
		.card-t {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: 0;
			.jiantou-right {
				position: relative;
				left: 5rpx;
			}
		}
	}
	.left {
		width: 56%;
	}
	.right {
		flex: 1;
		position: relative;
		.dan {
			position: absolute;
			bottom: 20rpx;
			right: 0rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.dan-img1 {
				width: 70rpx;
				height: 25rpx;
			}
			.dan-img2 {
				width: 90rpx;
				height: 90rpx;
				position: relative;
				top: -5px;
			}
			@keyframes rotate-bottom {
				0%,
				100% {
					transform: rotate(0deg);
				} /* 初始/结束状态 */
				50% {
					transform: rotate(8deg);
				} /* 向右旋转15° */
				25%,
				75% {
					transform: rotate(-8deg);
				} /* 向左旋转15° */
			}
			.rotating-image {
				transform-origin: center bottom; /* 旋转中心：底部中点 */
				animation: rotate-bottom 1.5s infinite ease-in-out; /* 动画配置 */
			}
		}
	}
}

.nav {
	width: 100%;
	height: auto;
	padding: 0rpx;
	margin-top: 15rpx;
	.nav-contain {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		height: 380rpx;
		background-color: #fff;
		padding: 25rpx 0;
		border-radius: 30rpx;
		.nav-item {
			width: 150rpx;
			height: 150rpx;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 6rpx;
			.nav-img {
				width: 85rpx;
				height: 85rpx;
			}
			span {
				font-size: 24rpx;
			}
		}
	}
	.point {
		width: 100%;
		height: 18px;
		// background-color: #dd9734;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 5rpx;
		.p-black {
			width: 16rpx;
			height: 7rpx;
			background-color: #4f4e4e;
			border-radius: 80rpx;
		}
		.p-cc {
			background-color: #ccc;
			width: 10rpx;
			height: 7rpx;
			border-radius: 50%;
		}
	}
}

.news {
	width: 100%;
	padding-top: 220rpx;
	position: relative;
	.background-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			transition: opacity 0.3s ease;
		}
		&::before {
			background-image: url(/static/3156/img/slice.png);
			opacity: var(--slice-opacity);
		}
		&::after {
			background-image: url(/static/3156/img/none-slice.png);
			opacity: var(--none-slice-opacity);
		}
	}
	.new-contain {
		position: relative;
		z-index: 1;
		padding: 33rpx 26rpx;
		.t {
			font-weight: bold;
			font-size: 36rpx;
			padding: 0 10rpx;
		}
		.card {
			background-color: #fff;
			width: 100%;
			height: auto;
			border-radius: 30rpx;
			margin-top: 10rpx;
			margin-bottom: 15rpx;
			padding: 20rpx 30rpx;
			.title {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				gap: 5rpx;
				span {
					font-weight: 300;
				}
			}
			.con {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding: 10rpx 0;
				.left {
					padding: 0;
					.new-img {
						width: 90rpx;
						height: 90rpx;
					}
					.icon {
						width: 60rpx;
						height: 60rpx;
					}
				}
				.right {
					padding: 0 20rpx;
					width: 100%;
					.title {
						span {
							font-weight: bold;
						}
						.new-icon {
							width: 30rpx;
							height: 30rpx;
						}
					}
					.jiangli {
						width: 66%;
						span {
							font-weight: normal;
						}
					}
					.con {
						span {
							font-weight: 300;
						}
					}
				}
			}
		}
		.ad {
			width: 100%;
			height: 210rpx;
			text-align: center;
			margin: 15rpx 0;
			.ad-img {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.tran {
	position: absolute;
	right: 50rpx;
	top: 820rpx;
	z-index: 1;
	will-change: opacity;
	
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3rpx;
		
		.tran-text {
			font-size: 24rpx;
			font-weight: bold;
			will-change: opacity;
		}
		
		.tran-btn-container {
			position: relative;
			height: 160rpx;
			width: 120rpx;
			
			.fixed-circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 50rpx;
				height: 50rpx;
				background-color: #f8d653;
				border-radius: 50%;
				opacity: 0;
				transition: opacity 0.2s ease;
				z-index: 1;
				box-shadow: 0 0 8rpx rgba(248, 214, 83, 0.4);
				
				&.show {
					opacity: 1;
				}
			}
			
			.liquid-connector {
				position: absolute;
				top: -150rpx;
				left: 0;
				width: 120rpx;
				height: 460rpx;
				pointer-events: none;
				opacity: 0;
				transition: opacity 0.2s ease;
				z-index: 0;
				
				&.show {
					opacity: 1;
				}
				
				path {
					transition: d 0.1s ease-out;
					filter: drop-shadow(0 0 4px rgba(248, 214, 83, 0.3));
					fill: #f8d653;
				}
			}
			
			.tran-btn {
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;
				z-index: 2;
				
				.btn {
					width: 120rpx; // 恢复原始大小
					height: 120rpx; // 恢复原始大小
					border-radius: 50%;
					background-color: #f8d653;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0 0 10rpx rgba(248, 214, 83, 0.3);
					
					.new-img {
						width: 60rpx; // 恢复原始大小
						height: 60rpx; // 恢复原始大小
					}
				}
				
				.arrow-up,
				.arrow-down {
					height: 15rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 5rpx 0;
				}
			}
		}
	}
}

// 添加过渡动画
.tran-btn {
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	will-change: transform;
	
	&:active {
		transform: scale(0.98);
	}
}
</style>

