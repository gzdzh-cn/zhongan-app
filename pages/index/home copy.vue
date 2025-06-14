<template>
	<cl-page backgroundColor="#f6f5fa">
		<view class="page-main">
			<view
				class="main"
				ref="container"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd"
			>
				<view class="section-one" :style="sectionOneStyle">
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
								<uni-icons
									custom-prefix="iconfont-3156"
									type="icon-yanjing2"
									size="17"
									class="yanjing"
								></uni-icons>
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

				<view class="section-two" :style="sectionTwoStyle">
					<scroll-view
						:scroll-top="scrollTop"
						:scroll-y="isAtTop"
						class="scroll-Y"
						@scrolltoupper="upper"
						@scrolltolower="lower"
						@scroll="scroll"
					>
						<view class="background-layer" :style="backgroundStyle"> </view>
						<view class="top-nav" v-show="isAtTop">
							<view class="nav-list">
								<view class="nav-item">
									<span>全部</span>
								</view>

								<view class="nav-item" v-for="(item, index) in navItems" :key="index">
									<image :src="item.img" mode="aspectFit" class="new-img" />
									<span>{{ item.name }}</span>
									<view v-if="index === navItems.length - 1" class="blur-mask"></view>
								</view>
							</view>
						</view>

						<view class="top-title" :style="topTitle">
							<span class="t-all">动态 - 全部</span>
						</view>

						<view class="new-contain" :style="newContainStyle">
							<view class="new-head" v-show="!isAtTop">
								<span class="t"> 动态 </span>
							</view>
							<view class="list">
								<!-- 月份 -->
								<view class="top-head list-head" v-show="isAtTop">
									<view class="current-m">
										<span class="t-current-m">{{ topNameArray[0] }}</span>
										<uni-icons
											custom-prefix="iconfont-3156"
											type="icon-sanjiaoxing_xiangxia"
											size="12"
											color="#9e9fa7"
											class="sticky-icon"
											v-show="maxIndex == 0"
										></uni-icons>
									</view>
									<uni-icons
										custom-prefix="iconfont-3156"
										type="icon-shaixuan-F"
										size="16"
										color="#9e9fa7"
										class="sticky-icon"
										v-show="maxIndex == 0"
									></uni-icons>
								</view>

								<view class="card">
									<view class="title">
										<u-icon name="bell-fill" color="#f2c342" size="36"></u-icon>
										<text class="t-h">消息(+14)</text>
									</view>
									<view class="con">
										<view class="left">
											<image src="/static/3156/img/new-1.png" mode="aspectFit" class="new-img" />
										</view>
										<view class="notice">
											<view class="title">
												<image
													src="/static/3156/img/new-icon.png"
													mode="aspectFit"
													class="new-icon"
												/>
												<text>「最佳销售」基金排行榜更新了 </text>
											</view>
											<view class="desc">
												<text class="t-desc">查看过往3个月最受欢迎的基金。投资...</text>
											</view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon1.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>有2个新用户专属任务在等你！即刻做任务赚丰富奖...</text>
												</view>
												<view class="desc">
													<text class="time">5月12日 13:20</text>
												</view>
											</view>
											<view class="r"> </view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon2.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>成功用新设备登录{{ showTopTile }}</text>
												</view>
												<view class="desc">
													<text class="time">5月9日 00:35</text>
												</view>
											</view>

											<view class="r"> </view>
										</view>
									</view>
								</view>
								<!-- 广告 -->
								<view class="ad">
									<image
										src="/static/3156/img/ad1.png"
										mode="fill"
										class="ad-img"
										style="width: 100%; height: 210rpx"
									/>
								</view>
								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon2.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>签到成功</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="tip">爆肌 Alfle</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 广告 -->
								<view class="ad">
									<image
										src="/static/3156/img/ad2.jpg"
										mode="fill"
										class="ad-img"
										style="width: 460rpx; height: 150rpx"
									/>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<view class="circle-btn">C</view>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>转给 CHEN Z******</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="m-t">
													<view class="m-desc">
														<text class="m-type">-HKD</text>
														<text class="money">50.00</text>
													</view>
													<text class="m-tip">成功入账</text>
												</view>
											</view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/diyuee-icon.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>低余额提示</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="desc">
													<view class="auto-btn">自动增值</view>
												</view>
											</view>
										</view>
									</view>
								</view>

								<!-- 月份 -->
								<view class="top-head list-head" v-show="isAtTop">
									<view class="current-m">
										<span class="t-current-m">{{ topNameArray[1] }}</span>
										<uni-icons
											custom-prefix="iconfont-3156"
											type="icon-sanjiaoxing_xiangxia"
											size="12"
											color="#9e9fa7"
											class="sticky-icon"
											v-show="maxIndex == 1"
										></uni-icons>
									</view>
									<uni-icons
										custom-prefix="iconfont-3156"
										type="icon-shaixuan-F"
										size="16"
										color="#9e9fa7"
										class="sticky-icon"
										v-show="maxIndex == 1"
									></uni-icons>
								</view>

								<view class="card">
									<view class="title">
										<u-icon name="bell-fill" color="#f2c342" size="36"></u-icon>
										<text class="t-h">消息(+14)</text>
									</view>
									<view class="con">
										<view class="left">
											<image src="/static/3156/img/new-1.png" mode="aspectFit" class="new-img" />
										</view>
										<view class="notice">
											<view class="title">
												<image
													src="/static/3156/img/new-icon.png"
													mode="aspectFit"
													class="new-icon"
												/>
												<text>「最佳销售」基金排行榜更新了 </text>
											</view>
											<view class="desc">
												<text class="t-desc">查看过往3个月最受欢迎的基金。投资...</text>
											</view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon1.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>有2个新用户专属任务在等你！即刻做任务赚丰富奖...</text>
												</view>
												<view class="desc">
													<text class="time">5月12日 13:20</text>
												</view>
											</view>
											<view class="r"> </view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon2.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>成功用新设备登录{{ showTopTile }}</text>
												</view>
												<view class="desc">
													<text class="time">5月9日 00:35</text>
												</view>
											</view>

											<view class="r"> </view>
										</view>
									</view>
								</view>
								<!-- 广告 -->
								<view class="ad">
									<image
										src="/static/3156/img/ad1.png"
										mode="fill"
										class="ad-img"
										style="width: 100%; height: 210rpx"
									/>
								</view>
								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/icon2.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>签到成功</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="tip">爆肌 Alfle</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 广告 -->
								<view class="ad">
									<image
										src="/static/3156/img/ad2.jpg"
										mode="fill"
										class="ad-img"
										style="width: 460rpx; height: 150rpx"
									/>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<view class="circle-btn">C</view>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>转给 CHEN Z******</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="m-t">
													<view class="m-desc">
														<text class="m-type">-HKD</text>
														<text class="money">50.00</text>
													</view>
													<text class="m-tip">成功入账</text>
												</view>
											</view>
										</view>
									</view>
								</view>

								<view class="card">
									<view class="con">
										<view class="left">
											<image
												src="/static/3156/img/diyuee-icon.png"
												mode="aspectFit"
												class="new-img icon"
											/>
										</view>
										<view class="right">
											<view class="l">
												<view class="title jiangli">
													<text>低余额提示</text>
												</view>
												<view class="desc">
													<text class="time">5月7日 11:34</text>
												</view>
											</view>
											<view class="r">
												<view class="desc">
													<view class="auto-btn">自动增值</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view
					class="tran-container"
					:class="[{ active: state.isDragging, completed: state.completed }]"
					:style="tranStyle"
				>
					<view
						v-show="state.isDragging"
						class="main-btn origin-point"
						:style="originPointStyle"
					></view>
					<view v-show="state.isDragging" class="connection-line" :style="connectionStyle">
						<image :src="connectSvgIcon" mode="fill"></image>
					</view>
					<view
						class="main-btn"
						:style="mainButtonStyle"
						@touchstart.stop.prevent="onTouchStart"
						@touchmove.stop.prevent="onTouchMove"
						@touchend.stop.prevent="onTouchEnd"
					>
						<div v-show="!state.completed" class="icon">
							<view class="tran-text-wrapper tran-out" :style="tranTextWrapperStyle">
								<text class="tran-text" :style="tranTextStyle">转出</text>
								<uni-icons
									custom-prefix="iconfont-3156"
									type="icon-xiangshangjiantoukuan-xianxing"
									size="15"
									color="#c5c5cd"
									class="arrow-up"
									:style="tranTextStyle"
								></uni-icons>
							</view>
							<view class="tran-guid">
								<image :src="tranGuidSvgIcon" mode="fill"></image>
							</view>
							<view class="tran-text-wrapper tran-in" :style="tranTextWrapperStyle">
								<uni-icons
									custom-prefix="iconfont-3156"
									type="icon-xiangxiajiantoukuan-xianxing"
									size="15"
									color="#c5c5cd"
									class="arrow-down"
									:style="tranTextStyle"
								></uni-icons>
								<text class="tran-text" :style="tranTextStyle">转入</text>
							</view>
						</div>
					</view>
				</view>
			</view>

			<view class="guid" v-show="false">
				<view class="login-box">
					<view class="login-btn">
						<text class="btn-t">登入</text>
					</view>

					<view
						class="main-btn"
						:style="mainButtonStyle"
						@touchstart.stop.prevent="onTouchStart"
						@touchmove.stop.prevent="onTouchMove"
						@touchend.stop.prevent="onTouchEnd"
					>
						<div v-show="!state.completed" class="icon">
							<view class="tran-text-wrapper tran-out" :style="tranTextWrapperStyle">
								<text class="tran-text" :style="tranTextStyle">转出</text>
								<uni-icons
									custom-prefix="iconfont-3156"
									type="icon-xiangshangjiantoukuan-xianxing"
									size="15"
									color="#c5c5cd"
									class="arrow-up"
									:style="tranTextStyle"
								></uni-icons>
							</view>
							<view class="tran-guid">
								<image :src="tranGuidSvgIcon" mode="fill"></image>
							</view>
							<view class="tran-text-wrapper tran-in" :style="tranTextWrapperStyle">
								<uni-icons
									custom-prefix="iconfont-3156"
									type="icon-xiangxiajiantoukuan-xianxing"
									size="15"
									color="#c5c5cd"
									class="arrow-down"
									:style="tranTextStyle"
								></uni-icons>
								<text class="tran-text" :style="tranTextStyle">转入</text>
							</view>
						</div>
					</view>
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

const touchStartY = ref(0);
const currentOffset = ref(0); // 当前偏移
const isAnimating = ref(false);
const UP_THRESHOLD = 10; // 上滑阈值
const DOWN_THRESHOLD = 5; // 下滑阈值
const isAtTop = ref(false); // 是否在顶部位置

let appTop = 90; // section-two的初始top值（rpx）
// #ifdef APP
// 根据平台调整高度比例
appTop = 160;
// #endif
const viewportWidth = ref(uni.getSystemInfoSync().windowWidth);
// 计算section-two的初始位置到顶部的距离
const INITIAL_TOP_DISTANCE = 760 - appTop; // section-two的初始top值（rpx）
const INITIAL_TOP_DISTANCE_PX = (INITIAL_TOP_DISTANCE * viewportWidth.value) / 750; // 转换为px

// 修改TOP_POSITION的计算方式，确保不会超过初始位置
const TOP_POSITION = -INITIAL_TOP_DISTANCE_PX; // 最大上滑距离为初始位置到顶部的距离
const INITIAL_POSITION = 0;

// 计算背景图片透明度
const backgroundOpacity = computed(() => {
	const progress = Math.abs(currentOffset.value) / 10; // 使用10px作为渐变范围
	return Math.min(1, Math.max(0, progress));
});

// 添加 section-one 的样式计算属性
const sectionOneStyle = computed(() => ({
	opacity: isAtTop.value ? 0 : 1, // 只在到达顶部时完全透明
	transition: "opacity 0.3s ease",
}));

// 背景图片样式
const backgroundStyle = computed(() => ({
	opacity: 1,
	transition: isAnimating.value ? "all 0.3s ease" : "none",
	"--slice-opacity": 1 - backgroundOpacity.value,
	"--none-slice-opacity": backgroundOpacity.value,
	"--slice-image": "url(/static/3156/img/slice.png)",
	"--none-slice-image": isAtTop.value
		? "url(/static/3156/img/slice-end.png)"
		: "url(/static/3156/img/none-slice.png)",
}));

// 添加 section-two 的样式计算属性
const sectionTwoStyle = computed(() => ({
	transform: `translateY(${currentOffset.value}px)`,
	transition: isAnimating.value ? "transform 0.3s ease" : "none",
	willChange: "transform",
}));
//
const newContainStyle = computed(() => ({
	zIndex: showTopTile.value ? "8" : "11",
}));

const state = reactive({
	originX: 0,
	originY: 0,
	currentX: 0,
	currentY: 0,
	isDragging: false,
	maxDistance: 160,
	completed: false,
	screenWidth: 0,
});

const rpx2px = (value: number) => {
	return (value * state.screenWidth) / 750;
};

const px2rpx = (value: number) => {
	return (value * 750) / state.screenWidth;
};
// 水滴效果按钮圆
const mainButtonStyle = computed(() => ({
	transform: `translate(${px2rpx(state.currentX) - 60}rpx, ${
		px2rpx(state.currentY) - 60
	}rpx) scale(var(--float-scale))`,
	transition: state.isDragging ? "none" : "",
}));

// 水滴效果小圆点
const originPointStyle = computed(() => ({
	transform: `translate(${px2rpx(state.originX) - 30}rpx, ${px2rpx(state.originY) - 30}rpx)`,
}));
// 水滴容器
const connectionStyle = computed(() => {
	const dx = state.currentX - state.originX;
	const dy = state.currentY - state.originY;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const angle = Math.atan2(dy, dx);
	return {
		width: `${px2rpx(distance)}rpx`,
		transform: `translate(${px2rpx(state.originX)}rpx, ${px2rpx(
			state.originY - 25
		)}rpx) rotate(${angle}rad)`,
	};
});

// 水滴长度
const distance = computed(() => {
	return Number(connectionStyle.value.width.replace("rpx", ""));
});

// 水滴液化svg效果
const connectSvgIcon = computed(() => {
	// 这段代码是动态生成一个SVG图标，并将其转换为base64编码的数据URL
	const width = rpx2px(Math.ceil(distance.value * 100) / 100); // 将rpx单位的距离转换为px，并四舍五入到两位小数
	// 创建SVG字符串，定义一个自适应宽度的SVG图形
	// viewBox设置为动态宽度和固定高度50
	// 绘制一个填充为黄色(#f3d76a)的路径，形成一个类似连接线或箭头的形状
	// 路径使用贝塞尔曲线(Q命令)创建平滑的曲线效果
	// 路径会根据width动态调整大小，保持视觉上的连贯性
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${width} 50">
			<path fill="#f3d76a" d="M 0 10 L 0 40 Q ${width / 2} 20, ${width} 50 L ${width} 0 Q ${
		width / 2
	} 30, 0 10 Z"></path>
		</svg>
		`;
	// 将SVG转换为base64编码的数据URL，可以直接用于img标签的src属性
	return `data:image/svg+xml;base64,${btoa(svg)}`;
});
// 按钮svg图标
const tranGuidSvgIcon = computed(() => {
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
			<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="4" d="M42 19H6M30 7l12 12M6.799 29h36m-36 0l12 12" />
		</svg>
		`;
	return `data:image/svg+xml;base64,${btoa(svg)}`;
});
// 按钮文字
const tranTextWrapperStyle = computed(() => {
	return {
		opacity: 1 - Math.min(distance.value / 10, 1),
	};
});
// 按钮位置初始化
const initPosition = () => {
	const { screenWidth, windowHeight } = uni.getSystemInfoSync();
	state.screenWidth = screenWidth;
	state.originX = (screenWidth / 5) * 4.2;
	let heightRatio = 0;
	// #ifdef APP
	// 根据平台调整高度比例
	heightRatio = 0.59;
	// #endif
	// #ifndef APP
	// 根据平台调整高度比例
	heightRatio = 0.59;
	// #endif
	state.originY = windowHeight * heightRatio;
	state.currentX = state.originX;
	state.currentY = state.originY;
};
// 按钮触摸
const onTouchStart = () => {
	state.isDragging = true;
};
// 按钮触摸
const onTouchMove = (e: TouchEvent) => {
	if (!state.isDragging) return;
	const touch = e.touches[0];

	let newX = state.originX;
	let newY = touch.clientY;

	const dx = newX - state.originX;
	const dy = newY - state.originY;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance > state.maxDistance) {
		newX = state.originX + (dx * state.maxDistance) / distance;
		newY = state.originY + (dy * state.maxDistance) / distance;
	}

	state.currentX = newX;
	state.currentY = newY;
};
// 按钮触摸
const onTouchEnd = () => {
	state.isDragging = false;
	const offset = rpx2px(distance.value);

	if (offset > state.maxDistance - 10) {
		state.completed = true;
		setTimeout(() => {
			uni.navigateTo({
				url: "/pages/index/transfer",
				// animationType: "slide-in-right",
				// animationDuration: 200,
				success: (res) => {},
				fail: () => {},
				complete: () => {
					state.completed = false;
					state.currentX = state.originX;
					state.currentY = state.originY;
				},
			});
		}, 400);
	} else {
		state.currentX = state.originX;
		state.currentY = state.originY;
	}
};

// 首页下部分滚动
const topTitle = computed(() => {
	return {
		display: showTopTile.value ? "flex" : "none",
	};
});
const scrollTop = ref(0);
const showTopTile = ref(false);
const topNameArray = reactive(["本月", "5月", "4月"]);

// 添加滚动事件处理函数
const upper = (e: any) => {
	console.log("滚动到顶部");
};

const lower = (e: any) => {
	console.log("滚动到底部");
};
const maxIndex = ref(0);
const scroll = (e: any) => {
	const currentScrollTop = e.detail.scrollTop;
	scrollTop.value = currentScrollTop;
	if (scrollTop.value > rpx2px(70)) {
		showTopTile.value = true;
	} else {
		showTopTile.value = false;
	}
	// 实时获取所有 list-head 元素的位置
	// uni
	// 	.createSelectorQuery()
	// 	.selectAll(".list-head")
	// 	.boundingClientRect((data: any) => {
	// 		if (data) {
	// 			// 检查是否所有元素都在阈值之上
	// 			const allAboveThreshold = data.every((item: any) => item.top > rpx2px(70 + appTop - 100));
	// 			if (allAboveThreshold) {
	// 				showTopTile.value = false;
	// 			} else {
	// 				// 找到到达顶部的最大索引
	// 				maxIndex.value = -1;
	// 				data.forEach((item: any, index: number) => {
	// 					if (item.top <= rpx2px(70 + appTop - 100)) {
	// 						maxIndex.value = Math.max(maxIndex.value, index);
	// 					}
	// 				});
	// 			}
	// 		}
	// 	})
	// 	.exec();
};

onMounted(() => {
	initPosition();
});

onBeforeUnmount(() => {
	// 清理工作
});

// 屏幕触摸
const handleTouchStart = (e: TouchEvent) => {
	if (isAnimating.value) return;
	touchStartY.value = e.touches[0].clientY;
	isAnimating.value = false;
};
// 屏幕触摸
const handleTouchMove = (e: TouchEvent) => {
	if (isAnimating.value) return;

	const deltaY = e.touches[0].clientY - touchStartY.value;
	const nextOffset = currentOffset.value + deltaY;

	// 限制滑动范围
	if (nextOffset >= INITIAL_POSITION) {
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
	} else if (nextOffset <= TOP_POSITION) {
		currentOffset.value = TOP_POSITION;
		isAtTop.value = true;
	} else {
		currentOffset.value = nextOffset;
	}

	// section-two专用吸附逻辑
	if (!isAtTop.value && Math.abs(deltaY) > UP_THRESHOLD) {
		// 上滑超过10px，吸附到顶部
		isAnimating.value = true;
		currentOffset.value = TOP_POSITION;
		isAtTop.value = true;
		setTimeout(() => {
			isAnimating.value = false;
		}, 300);
	}
	if (isAtTop.value && deltaY > DOWN_THRESHOLD) {
		// 在顶部下滑超过5px，回到初始位置
		isAnimating.value = true;
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
		setTimeout(() => {
			isAnimating.value = false;
		}, 300);
	}

	touchStartY.value = e.touches[0].clientY;
};
// 屏幕触摸
const handleTouchEnd = () => {
	if (isAnimating.value) return;

	isAnimating.value = true;
	const deltaY = currentOffset.value - INITIAL_POSITION;

	if (isAtTop.value && deltaY > DOWN_THRESHOLD) {
		// 在顶部下滑超过5px，回到初始位置
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
	} else if (!isAtTop.value && Math.abs(deltaY) > UP_THRESHOLD && deltaY < 0) {
		// 上滑超过10px，吸附到顶部
		currentOffset.value = TOP_POSITION;
		isAtTop.value = true;
	} else if (!isAtTop.value) {
		// 未达到阈值，回到初始位置
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
	}

	setTimeout(() => {
		isAnimating.value = false;
	}, 300);
};

const tranOpacity = computed(() => {
	const progress = Math.abs(currentOffset.value) / 20; // 渐变范围
	return Math.max(0, 1 - progress);
});

const tranStyle = computed(() => ({
	opacity: tranOpacity.value,
	transition: isAnimating.value ? "opacity 0.3s ease" : "none",
	display: tranOpacity.value == 0 ? "none" : "block",
}));

// tran 按钮移动相关状态
const tranCurrentY = ref(0);
// tran 文本透明度计算
const tranTextOpacity = computed(() => {
	const progress = Math.abs(tranCurrentY.value) / 20;
	return Math.max(0, 1 - progress);
});

const tranTextStyle = computed(() => ({
	opacity: tranTextOpacity.value,
	transition: "opacity 0.3s ease",
}));

const navItems = ref([
	{ img: "/static/3156/img/card-icon.png", name: "ZA Card" },
	{ img: "/static/3156/img/zhuan-icon.png", name: "转账" },
	{ img: "/static/3156/img/cun-icon.png", name: "存款" },
	{ img: "/static/3156/img/baoxian-icon.png", name: "保险" },
	{ img: "/static/3156/img/jijin-icon.png", name: "基金" },
]);
</script>

<style scoped>
/* 添加CSS类来进一步优化渲染性能 */
.optimized-transitions {
	transform: translateZ(0);
	will-change: transform;
	contain: layout style;
	touch-action: pan-y;
	/* 优化触摸事件处理 */
}
</style>
<style lang="less">
@import "/@/static/3156/font/font.css";

.page-main {
	pointer-events: none;
	--float-scale: 1;
	--float-background-color: #f3d76a;
	--float-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

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

.numFont {
	font-family: "number-3156" !important;
	letter-spacing: 0.001rem;
}

.main {
	height: 100vh;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;

	.section-one {
		height: 760rpx;
		position: fixed;
		z-index: 0;
		transition: opacity 0.3s ease;
		will-change: opacity;
		width: 90%;
		// border: 2px solid #dd9734;
		padding-top: 0.7rem;
		// display: none;
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

				.card-t {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					gap: 5px;
					.yanjing {
						color: #df1010;
					}
					.jiantou-right {
						position: relative;
						// left: 5rpx;
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
						}

						/* 初始/结束状态 */
						50% {
							transform: rotate(8deg);
						}

						/* 向右旋转15° */
						25%,
						75% {
							transform: rotate(-8deg);
						}

						/* 向左旋转15° */
					}

					.rotating-image {
						transform-origin: center bottom;
						/* 旋转中心：底部中点 */
						animation: rotate-bottom 1.5s infinite ease-in-out;
						/* 动画配置 */
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
	}
	.section-two {
		width: 100%;
		height: 100vh;
		position: absolute; // 改为fixed定位
		top: 760rpx;
		left: 0;
		z-index: 1;
		overflow: hidden;
		.scroll-Y {
			height: 100vh;
			-webkit-overflow-scrolling: touch;
			overflow-y: auto;
			position: relative;
			transform: translateZ(0);
			will-change: transform;
		}
		.background-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			pointer-events: none;

			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center top;
				transition: opacity 0.3s ease;
				background-image: var(--slice-image);
				opacity: var(--slice-opacity);
			}

			&::after {
				content: "";
				position: absolute;
				top: var(--after-top, 0);
				left: 0;
				width: 100%;
				height: 100%;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center top;
				transition: opacity 0.3s ease, top 0.3s ease, background-image 0.3s ease;
				background-image: var(--none-slice-image);
				opacity: var(--none-slice-opacity);
			}
		}
		.top-nav {
			width: 98%;
			position: absolute;
			top: 90rpx;
			z-index: 11;
			overflow: hidden;
			height: 90rpx;
			.nav-list {
				width: 108%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				position: relative;
				.nav-item {
					width: 160rpx;
					height: 90rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					position: relative;
					.new-img {
						width: 40rpx;
						height: 40rpx;
					}
					&:first-child {
						justify-content: end;
						span {
							font-weight: 400;
							color: #000;
						}
					}
					&:last-child {
						.new-img,
						span {
							position: relative;
							&::after {
								content: "";
								position: absolute;
								right: 0;
								top: 0;
								width: 280%;
								height: 100%;
								background: linear-gradient(
									90deg,
									rgba(0, 0, 0, 0) 30%,
									rgb(57, 229, 177, 0.9) 90%,
									rgb(57, 229, 177, 1) 100%
								);
								filter: blur(4px);
								-webkit-filter: blur(4px);
								pointer-events: none;
							}
						}
					}
				}
			}
		}
		.top-title {
			width: 100%;
			position: fixed;
			height: 60rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			background-color: #f6f5fa;
			z-index: 9;
			.t-all {
				line-height: 60rpx;
			}
		}
		.top-head {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 46rpx;

			.t {
				font-weight: bold;
				font-size: 36rpx;
			}
			.current-m {
				display: flex;
				align-items: center;
				gap: 10px;
				.t-current-m {
					font-weight: 400;
					color: #0f122e;
					font-size: 14px;
				}
			}
		}
		.new-contain {
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 200rpx;
			padding-bottom: 150rpx;
			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.new-head {
				width: 100%;
				padding: 10rpx 46rpx;
				.t {
					font-weight: bold;
					font-size: 36rpx;
				}
			}
			.list-head {
				height: 80rpx;
				position: sticky;
				top: 50rpx;
				z-index: 99;
				background-color: #f6f5fa;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 46rpx;

				.current-m {
					display: flex;
					align-items: center;
					gap: 10px;
					.t-current-m {
						font-weight: 300;
						color: #0f122e;
						font-size: 14px;
					}
				}

				.sticky-icon {
					opacity: 1;
					transition: opacity 0.3s ease;
				}
			}

			.card {
				background-color: #fff;
				width: 90%;
				height: auto;
				border-radius: 30rpx;
				margin-bottom: 15rpx;
				padding: 20rpx 30rpx;
				z-index: 1;
				.title {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					gap: 5rpx;
					.t-h {
						font-weight: 300;
					}
				}

				.con {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding: 10rpx 0;
					gap: 20rpx;
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
						.circle-btn {
							width: 65rpx;
							height: 65rpx;
							background-color: #e5edf7;
							border-radius: 50%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
						}
					}

					.right {
						padding: 0 0 0 0;
						width: 100%;
						display: flex;
						flex-direction: row;
						.l {
							width: 66%;
							.title {
								span {
									font-weight: bold;
									font-size: 28rpx;
								}

								.new-icon {
									width: 30rpx;
									height: 30rpx;
								}
							}

							.jiangli {
								span {
									font-weight: normal;
									line-height: 50rpx;
								}
							}

							.desc {
								.t-desc {
									font-weight: 300;
								}
								.time {
									font-weight: 300;
									font-size: 24rpx;
								}
							}
						}
						.r {
							width: 34%;
							display: flex;
							flex-direction: row;
							justify-content: flex-end;
							align-items: flex-start;

							.m-t {
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								gap: 10rpx;
								.m-desc {
									display: flex;
									flex-direction: row;
									justify-content: center;
									align-items: flex-end;
									gap: 5rpx;
									font-weight: bold;

									.m-type {
										font-size: 20rpx;
										font-weight: 800;
										line-height: 38rpx;
									}
									.money {
										font-size: 34rpx;
									}
								}
								.m-tip {
									font-weight: 300;
									font-size: 26rpx;
								}
							}
							.desc {
								width: 100%;
								height: 100%;
								display: flex;
								flex-direction: row;
								justify-content: flex-end;
								align-items: center;
								.auto-btn {
									background-color: #39e4b1;
									padding: 10rpx 20rpx;
									border-radius: 30rpx;
									font-size: 24rpx;
									white-space: nowrap;
								}
							}
						}
						.tip {
							font-size: 28rpx;
						}
					}
					.notice {
						padding: 0 0 0 0;
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
								line-height: 50rpx;
							}
						}

						.desc {
							.t-desc {
								font-weight: 300;
							}
							.time {
								font-weight: 300;
								font-size: 24rpx;
							}
						}
					}
				}
			}

			.ad {
				width: 90%;
				text-align: center;
				margin: 5rpx 0;
			}
		}
	}

	.tran-container {
		position: fixed;
		inset: 0;
		// pointer-events: none;
		// --float-scale: 1;
		// --float-background-color: #f3d76a;
		// --float-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
		z-index: 1;
		will-change: opacity;
		&.active {
			pointer-events: auto;
			background-color: rgba(255, 255, 255, 0.67); // 使用 rgba 替代 #fffa
		}
		&.completed {
			--float-scale: 99;
		}
		&.completed .main-btn {
			transition: transform 0.8s linear;
		}
		.connection-line {
			pointer-events: auto;
			position: absolute;
			height: 100rpx;
			transform-origin: 0 50%;
			color: var(--float-background-color);

			image {
				width: 100%;
				height: 100%;
				object-fit: contain; // 确保图片比例正确
			}
		}
		.main-btn {
			pointer-events: auto;
			position: absolute;
			width: 120rpx;
			height: 120rpx;
			background-color: var(--float-background-color);
			border-radius: 50%;
			transition: var(--float-transition);
			.icon {
				width: 100%;
				height: 100%;
				font-size: 48rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.tran-guid {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: rotate(-90deg);

					image {
						width: 50%;
						height: 50%;
						object-fit: contain; // 确保图片比例正确
					}
				}
				.tran-text {
					font-size: 24rpx;
					font-weight: bold;
					will-change: opacity;
				}
				.tran-text-wrapper {
					position: absolute;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;

					&.tran-out {
						top: -56rpx;
					}

					&.tran-in {
						bottom: -56rpx;
					}
				}
			}
		}

		.origin-point {
			width: 60rpx;
			height: 60rpx;
		}
	}
}

.guid {
	width: 100%;
	height: 100vh;
	background: url("/static/3156/img/1-0.jpg") no-repeat top center;
	background-size: contain;
	.login-box {
		width: 100%;
		position: fixed;
		bottom: 200rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.login-btn {
		width: 75%;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #38efb7;
		text-align: center;
		.btn-t {
			line-height: 100rpx;
			font-weight: 800;
			font-size: 36rpx;
		}
	}
}
</style>
