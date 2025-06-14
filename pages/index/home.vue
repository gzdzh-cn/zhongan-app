<template>
	<cl-page backgroundColor="#f6f5fa">
		<view class="page-main">
			<!-- 已登录 -->
			<view
				v-show="hanLogin"
				class="main"
				ref="container"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd"
			>
				<view class="section-one" :style="sectionOneStyle">
					<!-- logo -->
					<view class="head">
						<view class="nav-item-l" @tap="logout">
							<image :src="logoSrc" mode="aspectFit" class="logo-img" />
							<span class="name"
								>Hi, {{ userInfo.info?.username }}<text class="name numFont"></text
							></span>
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
								<text class="t numFont money"
									>{{ formatNumber(Math.floor(depositAmount))
									}}<text class="numFont money-mini"
										>.{{ (depositAmount % 1).toFixed(2).slice(2) }}</text
									></text
								>
								<u-icon name="arrow-right" color="#5b5c66" size="18" class="jiantou-right"></u-icon>
							</view>
							<view class="card-t">
								<text class="t">
									活期存款 <text class="numFont">{{ formatNumber(Math.floor(depositAmount)) }}</text
									>.{{ (depositAmount % 1).toFixed(2).slice(2) }}</text
								>
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
							<view class="nav-item" v-for="(item, index) in navList" :key="index">
								<image :src="item.img" mode="aspectFit" class="nav-img" />
								<text class="nav-text">{{ item.text }}</text>
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
									<text>全部</text>
								</view>

								<view class="nav-item" v-for="(item, index) in navItems" :key="index">
									<image :src="item.img" mode="aspectFit" class="new-img" />
									<text class="nav-text">{{ item.name }}</text>
									<view v-if="index === navItems.length - 1" class="blur-mask"></view>
								</view>
							</view>
						</view>

						<view class="top-title" :style="topTitle">
							<text class="t-all">动态 - 全部</text>
						</view>

						<view class="new-contain" :style="newContainStyle">
							<view class="new-head" v-show="!isAtTop">
								<text class="t"> 动态 </text>
							</view>
							<view class="list">
								<template v-for="(monthData, monthIndex) in monthList" :key="monthIndex">
									<!-- 月份头部 -->
									<view
										class="list-head"
										:class="{ is_sticky: isSticky(monthIndex) }"
										v-show="isAtTop"
										:id="'list-head-' + monthIndex"
									>
										<view class="current-m">
											<span class="t-current-m">{{ monthData.month }}</span>
											<uni-icons
												custom-prefix="iconfont-3156"
												type="icon-sanjiaoxing_xiangxia"
												size="12"
												color="#9e9fa7"
												class="sticky-icon"
												v-show="maxIndex == monthIndex"
											></uni-icons>
										</view>
										<uni-icons
											custom-prefix="iconfont-3156"
											type="icon-shaixuan-F"
											size="16"
											color="#9e9fa7"
											class="sticky-icon"
											v-show="maxIndex == monthIndex"
										></uni-icons>
									</view>

									<!-- 月份内容 -->
									<template v-for="(item, index) in monthData.list" :key="index">
										<!-- 消息卡片 -->
										<view class="card" v-if="item.type === 'message'">
											<view class="title">
												<u-icon name="bell-fill" color="#f2c342" size="36"></u-icon>
												<text class="t-h">{{ item.title }}</text>
											</view>
											<view class="con">
												<view class="left">
													<image :src="item.img" mode="aspectFit" class="new-img" />
												</view>
												<view class="notice">
													<view class="title">
														<image :src="item.icon" mode="aspectFit" class="new-icon" />
														<text class="title-text">{{ item.content }}</text>
													</view>
													<view class="desc">
														<text class="t-desc">{{ item.desc }}</text>
													</view>
												</view>
											</view>
										</view>

										<!-- 普通卡片 -->
										<view class="card" v-else-if="item.type === 'normal'">
											<view class="con">
												<view class="left">
													<image
														:src="item.img"
														mode="aspectFit"
														class="new-img icon"
														v-if="!item.isTransfer"
													/>
													<view class="circle-btn" v-if="item.isTransfer">{{
														getTransferInitial(item.transferName || "")
													}}</view>
												</view>
												<view class="right">
													<view class="l">
														<view
															class="title"
															:class="{ jiangli: item.reward, transfer: item.isTransfer }"
														>
															<text class="l-text" v-if="!item.isTransfer">{{ item.title }}</text>
															<text class="l-text" v-else
																>{{ item.transferType }} {{ item.transferName }}</text
															>
														</view>
														<view class="desc">
															<text class="time">{{ item.time }}</text>
														</view>
													</view>
													<view class="r">
														<view class="jiang-box" v-if="item.reward">
															<text class="r-text">{{ item.reward }}</text>
															<image :src="item.rewardImg" mode="aspectFit" class="new-img" />
														</view>
														<view class="m-t" v-if="item.money">
															<view class="m-desc">
																<text class="m-type">{{ item.moneyType }}</text>
																<text class="money">{{ item.money }}</text>
															</view>
															<text class="m-tip">{{ item.tip }}</text>
														</view>
														<view class="tip" v-if="item.tipText">{{ item.tipText }}</view>
														<view class="desc" v-if="item.autoBtn">
															<view class="auto-btn">{{ item.autoBtn }}</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="card" v-else-if="item.type === 'money'">
											<view class="con">
												<view class="left">
													<image
														:src="item.img"
														mode="aspectFit"
														class="new-img icon"
														v-if="!item.isTransfer"
													/>
													<view class="circle-btn" v-if="item.isTransfer">{{
														getTransferInitial(item.transferName || "")
													}}</view>
												</view>
												<view class="right">
													<view class="l">
														<view
															class="title"
															:class="{ jiangli: item.reward, transfer: item.isTransfer }"
														>
															<text class="l-text" v-if="!item.isTransfer">{{ item.title }}</text>
															<text class="l-text" v-else
																>{{ item.transferType }} {{ item.transferName }}</text
															>
														</view>
														<view class="desc">
															<text class="time">{{ item.time }}</text>
														</view>
													</view>
													<view class="r">
														<view class="jiang-box" v-if="item.reward">
															<text class="r-text">{{ item.reward }}</text>
															<image :src="item.rewardImg" mode="aspectFit" class="new-img" />
														</view>
														<view class="m-t" v-if="item.money">
															<view class="m-desc">
																<text class="m-type">{{ item.moneyType }}</text>
																<text class="money">{{ item.money }}</text>
															</view>
															<text class="m-tip">{{ item.tip }}</text>
														</view>
														<view class="tip" v-if="item.tipText">{{ item.tipText }}</view>
														<view class="desc" v-if="item.autoBtn">
															<view class="auto-btn">{{ item.autoBtn }}</view>
														</view>
													</view>
												</view>
											</view>
										</view>

										<!-- 广告卡片 -->
										<view class="ad" v-else-if="item.type === 'ad'">
											<image :src="item.img" mode="fill" class="ad-img" :style="item.style" />
										</view>
									</template>
								</template>
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

			<!-- 未登录 -->
			<view class="guid" v-if="!hanLogin">
				<view class="section-one">
					<!-- logo -->
					<view class="head">
						<view class="nav-item-l">
							<image :src="logoSrc" mode="aspectFit" class="logo-img" />
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
				</view>

				<view class="login-box">
					<view class="login-btn" @tap="toLogin">
						<text class="btn-t">登入</text>
					</view>
					<view class="main-btn" :style="mainButtonStyle">
						<div v-show="!state.completed" class="icon">
							<view class="tran-text-wrapper tran-out" :style="tranTextWrapperStyle">
								<image src="/static//3156/img/shuangjiantou.png" mode="fill" class="up"></image>
							</view>
							<view class="tran-guid">
								<image :src="tranGuidSvgIcon" mode="fill"></image>
							</view>
							<view class="tran-text-wrapper tran-in" :style="tranTextWrapperStyle">
								<image src="/static//3156/img/shuangjiantou.png" mode="fill" class="down"></image>
							</view>
						</div>
					</view>
				</view>
			</view>

			<!-- 编辑按钮 -->
			<u-button
				@click="showEditPopup = true"
				type="primary"
				size="medium"
				:style="editStyle"
				v-if="userInfo.info?.isIcon && hanLogin"
				>编辑数据</u-button
			>
		</view>

		<!-- 编辑弹窗表单 -->
		<u-popup v-model="showEditPopup" mode="center">
			<view class="edit-dialog" :style="editDialogStyle">
				<view class="edit-tabs">
					<u-tabs :list="tabsList" v-model="tabsIndex" />
				</view>

				<template v-if="tabsIndex == 0">
					<view class="edit-header">
						<view class="edit-title">编辑月份</view>
					</view>
					<view class="edit-content">
						<view class="yue-list" style="padding: 50rpx 0">
							<view class="yue-item" v-for="(item, idx) in monthListEditable" :key="idx">
								<view class="yue-item-title">
									<u-input v-model="item.month" placeholder="月份" :border="true" />
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-if="tabsIndex == 1">
					<view class="edit-header">
						<view class="edit-title">编辑月份数据</view>

						<view class="yue-title-tabs">
							<!-- <u-button @click="addMonth" size="mini" type="success">+月</u-button> -->
							<u-tabs
								:list="monthListEditable.map((m) => ({ name: m.month }))"
								v-model="currentEditMonthIndex"
							/>
							<!-- <u-button
						@click="removeMonth"
						size="mini"
						type="error"
						v-if="monthListEditable.length > 1"
						>删月</u-button
					> -->
						</view>
					</view>
					<u-button @click="addItem" size="mini" type="success">添加一条</u-button>
					<scroll-view scroll-y class="scroll-Y" ref="editScrollView" :scroll-top="scrollTop">
						<view class="edit-content">
							<view
								v-for="(item, idx) in monthListEditable[currentEditMonthIndex].list"
								:key="idx"
								class="edit-item"
							>
								<view class="item">
									<u-input
										v-model="item.type"
										placeholder="类型(消息/普通/广告/交易)"
										disabled
										:border="true"
									/>
								</view>
								<view class="item" v-if="item.type != 'ad' && item.type != 'message'">
									<u-input v-model="item.title" placeholder="标题" :border="true" />
								</view>

								<view class="item" v-if="item.type == 'message'">
									<u-input v-model="item.content" placeholder="副标题" :border="true" />
								</view>
								<view class="item" v-if="item.type === 'message'">
									<u-input v-model="item.desc" placeholder="描述" :border="true" />
								</view>
								<view class="item" v-if="item.type != 'ad'">
									<u-input v-model="item.time" placeholder="时间" :border="true" />
								</view>

								<view class="item" v-if="item.type === 'money'">
									<u-input v-model="item.money" placeholder="金额" :border="true" />
								</view>
								<view class="item" v-if="item.type === 'money'">
									<u-input v-model="item.moneyType" placeholder="金额类型" :border="true"
								/></view>
								<view class="item" v-if="item.type === 'money'"
									><u-input
										v-model="item.tip"
										placeholder="提示词"
										v-if="item.type === 'money'"
										:border="true"
								/></view>
								<view class="item" v-if="item.type === 'normal'"
									><u-input
										v-model="item.tipText"
										placeholder="右侧提示词"
										v-if="item.type === 'normal'"
										:border="true"
								/></view>
								<view class="item" v-if="item.type === 'normal'">
									<u-input
										v-model="item.autoBtn"
										placeholder="右侧提示词2"
										v-if="item.type === 'normal'"
										:border="true"
									/>
								</view>
								<view class="item">
									<u-input v-model="item.sort" placeholder="排序" :border="true" />
								</view>

								<u-button @click="removeItem(idx)" size="mini" type="error">删除</u-button>
							</view>
						</view>
					</scroll-view>
				</template>
				<template v-if="tabsIndex == 2">
					<view class="edit-header">
						<view class="edit-title">编辑个人资料</view>
					</view>
					<scroll-view scroll-y class="scroll-Y">
						<view class="edit-content">
							<view class="edit-item">
								<view class="item">
									<u-input v-model="userData.username" placeholder="请输入姓名" :border="true"
								/></view>
								<view class="item">
									<u-input v-model="userData.avatar" placeholder="请输入号码" :border="true"
								/></view>
								<view class="item">
									<u-input v-model="userData.desc" placeholder="请输入余额描述" :border="true"
								/></view>
								<view class="item">
									<u-input v-model="userData.money" placeholder="请输入余额" :border="true"
								/></view>
								<view class="item">
									<u-input v-model="userData.errorMsg" placeholder="请输入错误信息" :border="true"
								/></view>
							</view>
						</view>
					</scroll-view>
				</template>
				<view class="edit-footer">
					<button class="edit-btn cancel" @click="showEditPopup = false">取消</button>
					<button class="edit-btn confirm" @click="saveEditMonthList">保存</button>
				</view>
			</view>
		</u-popup>

		<tabbar :isAtTop="isAtTop" />
	</cl-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance, nextTick } from "vue";
import { onShow } from "@dcloudio/uni-app";
import Tabbar from "/@/components/tabbar.vue";
import { dzhStore, MonthList, UserInfo } from "/@/dzh";
import { router } from "/@/cool";

const { userInfo, tranFlowInfo } = dzhStore();
const touchStartY = ref(0);
const currentOffset = ref(0); // 当前偏移
const isAnimating = ref(false);
const UP_THRESHOLD = 10; // 上滑阈值
const DOWN_THRESHOLD = 5; // 下滑阈值
const isAtTop = ref(false); // 是否在顶部位置
const hanLogin = ref(true);
const logoSrc = ref(hanLogin.value ? "/static/3156/img/avtar.png" : "/static/3156/img/avtar.png");
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
let appBottom = 150;
// #ifdef APP
appBottom = 250;
// #endif

const newContainStyle = computed(() => ({
	zIndex: showTopTile.value ? "8" : "11",
	paddingBottom: `${appBottom}rpx`,
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
const mainButtonStyle = computed(() => {
	if (hanLogin.value) {
		return {
			transform: `translate(${px2rpx(state.currentX) - 60}rpx, ${
				px2rpx(state.currentY) - 60
			}rpx) scale(var(--float-scale))`,
			transition: state.isDragging ? "none" : "",
		};
	}
	if (!hanLogin.value) {
		return {
			position: "static" as const,
		};
	}
});

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

// 添加滚动事件处理函数
const upper = (e: any) => {
	console.log("滚动到顶部");
};

const lower = (e: any) => {
	console.log("滚动到底部");
};
const maxIndex = ref(0);
const stickyStates = ref<boolean[]>([]);

// 判断某个 list-head 是否在顶部
const isSticky = (index: number) => {
	return stickyStates.value[index];
};

// 修改 scroll 函数
const scroll = (e: any) => {
	const currentScrollTop = e.detail.scrollTop;
	scrollTop.value = currentScrollTop;

	nextTick(() => {
		// 使用 uni.createSelectorQuery 获取元素位置
		const query = uni.createSelectorQuery();
		monthList.value.forEach((_, index) => {
			query.select(`#list-head-${index}`).boundingClientRect((rect: any) => {
				if (rect) {
					// 70rpx 转换为 px
					const stickyThreshold = rpx2px(70);
					stickyStates.value[index] = rect.top <= stickyThreshold;
				}
			});
		});
	});

	if (scrollTop.value > rpx2px(70)) {
		showTopTile.value = true;
	} else {
		showTopTile.value = false;
	}
};

const logout = () => {
	userInfo.set({
		username: userInfo.info?.username,
		password: "",
		desc: userInfo.info?.desc || "可用活期余额：HKD 23,628.18，今日可转账限额：HKD267,010.00",
		money: userInfo.info?.money || 1547434,
		isIcon: userInfo.info?.isIcon || false,
		errorMsg: userInfo.info?.errorMsg || "付款账户状态异常，该交易未能处理。请于工作时间内联系我们",
	});
	hanLogin.value = false;
};

// 屏幕触摸
const handleTouchStart = (e: TouchEvent) => {
	if (isAnimating.value || showEditPopup.value) return;
	touchStartY.value = e.touches[0].clientY;
	isAnimating.value = false;
};
// 屏幕触摸
const handleTouchMove = (e: TouchEvent) => {
	if (isAnimating.value || showEditPopup.value) return;

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
	if (isAnimating.value || showEditPopup.value) return;

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

// 添加存款金额变量
const depositAmount = computed(() => {
	return userInfo.info?.money ?? 0;
});

// 第二屏导航
const navItems = ref([
	{ img: "/static/3156/img/card-icon.png", name: "ZA Card" },
	{ img: "/static/3156/img/zhuan-icon.png", name: "转账" },
	{ img: "/static/3156/img/cun-icon.png", name: "存款" },
	{ img: "/static/3156/img/baoxian-icon.png", name: "保险" },
	{ img: "/static/3156/img/jijin-icon.png", name: "基金" },
]);

// 第一屏导航
const navList = [
	{
		img: "/static/3156/img/n1.png",
		text: "存款",
	},
	{
		img: "/static/3156/img/n2.png",
		text: "保险",
	},
	{
		img: "/static/3156/img/n3.png",
		text: "账户信息",
	},
	{
		img: "/static/3156/img/n4.png",
		text: "钱罐",
	},
	{
		img: "/static/3156/img/n5.png",
		text: "海外汇款",
	},
	{
		img: "/static/3156/img/n6.png",
		text: "推荐好友",
	},
	{
		img: "/static/3156/img/n7.png",
		text: "最劲抽",
	},
	{
		img: "/static/3156/img/n8.png",
		text: "全部",
	},
];

// 全局控制变量
const useRandomTime = ref(false);

// 月份数组改为计算属性
const monthArray = ref(["本月", "5月", "4月"]);

// 静态默认数据改为计算属性
const defaultMonthList = ref<MonthList>([
	{
		month: monthArray.value[0],
		list: [
			// {
			// 	type: "message",
			// 	img: "/static/3156/img/new-1.png",
			// 	title: "消息(+14)",
			// 	icon: "/static/3156/img/new-icon.png",
			// 	content: "「最佳销售」基金排行榜更新了",
			// 	desc: "查看过往3个月最受欢迎的基金。投资...",
			// 	sort: 1,
			// 	time: "6月15日 14:30",
			// },
			{
				type: "normal",
				img: "/static/3156/img/icon1.png",
				title: "有 2 个新用户专属任务在等你！即刻做任务赚丰富奖...",
				time: "6月15日 13:20",
				reward: "赚奖赏",
				rewardImg: "/static/3156/img/t_27.png",
				sort: 2,
			},
			{
				type: "money",
				img: "/static/3156/img/t_28.png",
				title: "港元- 派息",
				time: "6月1日 01:28",
				moneyType: "+HKD",
				money: "0.40",
				isInterest: true,
				sort: 3,
			},
			// {
			// 	type: "ad",
			// 	img: "/static/3156/img/ad1.png",
			// 	style: "width: 100%; height: 210rpx",
			// 	sort: 4,
			// },
		],
	},
	{
		month: monthArray.value[1],
		list: [
			{
				type: "message",
				img: "/static/3156/img/t_31.jpg",
				title: "消息(+14)",
				icon: "/static/3156/img/t_32.jpg",
				content: "31/5 截止！领高达 HKD 880！",
				desc: "不要错过领高达 HKD 880 的最后机会...",
				sort: 1,
				time: "6月15日 14:30",
			},
			{
				type: "ad",
				img: "/static/3156/img/ad3.png",
				style: "width: 100%; height: 210rpx",
				sort: 2,
			},
			{
				type: "money",
				img: "/static/3156/img/t_28.png",
				title: "港元- 派息",
				time: "5月1日 01:28",
				moneyType: "+HKD",
				money: "0.39",
				isInterest: true,
				sort: 3,
			},
			// {
			// 	type: "normal",
			// 	img: "/static/3156/img/icon2.png",
			// 	title: "成功用新设备登录",
			// 	time: "5月9日 00:35",
			// 	sort: 1,
			// },
			// {
			// 	type: "normal",
			// 	img: "/static/3156/img/icon2.png",
			// 	title: "签到成功",
			// 	time: "5月7日 11:34",
			// 	tipText: "爆肌 Alfle",
			// 	sort: 2,
			// },
			// {
			// 	type: "ad",
			// 	img: "/static/3156/img/ad2.jpg",
			// 	style: "width: 460rpx; height: 150rpx",
			// 	sort: 3,
			// },
		],
	},
	{
		month: monthArray.value[2],
		list: [
			{
				type: "normal",
				img: "/static/3156/img/icon2.png",
				title: "签到成功",
				time: "4月2日 00:55",
				tipText: "爆肌 Alfle",
				sort: 2,
			},
			{
				type: "normal",
				img: "/static/3156/img/icon2.png",
				title: "成功用新设备登录",
				time: "4月2日 00:30",
				sort: 1,
			},

			{
				type: "money",
				img: "/static/3156/img/t_28.png",
				title: "港元- 派息",
				time: "4月1日 01:28",
				moneyType: "+HKD",
				money: "0.18",
				isInterest: true,
				sort: 3,
			},
			// {
			// 	type: "money",
			// 	img: "/static/3156/img/icon2.png",
			// 	transferType: "转给",
			// 	transferName: "HEN Z******",
			// 	time: "4月30日 11:34",
			// 	moneyType: "-HKD",
			// 	money: "50.00",
			// 	tip: "成功入账",
			// 	isTransfer: true,
			// 	sort: 1,
			// },
			// {
			// 	type: "normal",
			// 	img: "/static/3156/img/diyuee-icon.png",
			// 	title: "低余额提示",
			// 	time: "4月1日 00:34",
			// 	autoBtn: "自动增值",
			// 	sort: 3,
			// },
		],
	},
]);

// 修改 monthListEditable 的初始化
// const monthListEditable = ref(JSON.parse(JSON.stringify(defaultMonthList.value)));
const monthListEditable = computed(() => defaultMonthList.value);

// 修改 monthList 计算属性
const monthList = computed(() => {
	if (!useRandomTime.value) {
		return defaultMonthList.value.map((month) => ({
			...month,
			list: [...month.list].sort((a, b) => (a.sort || 0) - (b.sort || 0)),
		}));
	}

	return defaultMonthList.value.map((month) => ({
		...month,
		list: month.list
			.map((item) => ({
				...item,
				time: item.time
					? generateRandomTime(parseInt(month.month === "本月" ? "6" : month.month))
					: undefined,
			}))
			.sort((a, b) => (a.sort || 0) - (b.sort || 0)),
	}));
});

// 添加生成随机时间的函数
const generateRandomTime = (month: number): string => {
	const now = new Date();
	const currentMonth = now.getMonth() + 1;
	const currentDay = now.getDate();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();

	// 获取月份的天数
	const daysInMonth = new Date(2024, month, 0).getDate();

	// 如果是当前月份，限制日期不超过今天
	let maxDay = daysInMonth;
	if (month === currentMonth) {
		maxDay = currentDay;
	}

	// 生成随机日期
	const day = Math.floor(Math.random() * maxDay) + 1;

	// 如果是当前月份且是今天，限制时间不超过当前时间
	let maxHour = 24;
	let maxMinute = 60;
	if (month === currentMonth && day === currentDay) {
		maxHour = currentHour;
		maxMinute = currentMinute;
	}

	// 生成随机时间
	const hour = Math.floor(Math.random() * maxHour);
	const minute = Math.floor(Math.random() * maxMinute);

	return `${month}月${day}日 ${hour.toString().padStart(2, "0")}:${minute
		.toString()
		.padStart(2, "0")}`;
};

// 添加获取首字母的计算属性
const getTransferInitial = (name: string): string => {
	if (!name) return "";
	return name.charAt(0).toUpperCase();
};

// 添加数字格式化函数
const formatNumber = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//////////////////// 编辑弹窗相关方法 ////////////////////

const tabsList = ref([{ name: "月份" }, { name: "数据" }, { name: "我的" }]);
const tabsIndex = ref(0);
const showEditPopup = ref(false);

//个人资料
const currentEditMonthIndex = ref(0);
const userData = ref<UserInfo>({
	username: "llt888999",
	password: "",
	avatar: "",
	desc: "可用活期余额：HKD 47,434.97,今日可转账限额：HKD200,000.00",
	money: 47434.97,
	isIcon: false,
	errorMsg: "付款账户状态异常，该交易未能处理。请于工作时间内联系我们",
});

// 个人资料

let appTop_ = 0;
// #ifdef APP
appTop_ = 120;
// #endif
// #ifndef APP
appTop_ = 90;
// #endif
const editDialogStyle = computed(() => ({
	padding: `${appTop - appTop_}px 0 0 0`,
}));

const addItem = () => {
	monthListEditable.value[currentEditMonthIndex.value].list.push({
		type: "normal",
		title: "",
		time: "",
		money: "",
		moneyType: "",
		tip: "",
		sort: monthListEditable.value[currentEditMonthIndex.value].list.length + 1,
	});

	// 使用 nextTick 确保 DOM 更新后再滚动
	nextTick(() => {
		const query = uni.createSelectorQuery();
		query
			.select(".edit-content")
			.boundingClientRect((rect) => {
				if (rect && rect.height) {
					scrollTop.value = rect.height;
				}
			})
			.exec();
	});
};
const removeItem = (idx: number) => {
	monthListEditable.value[currentEditMonthIndex.value].list.splice(idx, 1);
};
const addMonth = () => {
	monthListEditable.value.push({
		month: `新月份${monthListEditable.value.length + 1}`,
		list: [],
	});
	currentEditMonthIndex.value = monthListEditable.value.length - 1;
};
const removeMonth = () => {
	if (monthListEditable.value.length > 1) {
		monthListEditable.value.splice(currentEditMonthIndex.value, 1);
		currentEditMonthIndex.value = 0;
	}
};
const editStyle = computed(() => ({
	position: "fixed",
	right: "50rpx",
	top: appTop - appTop_ + 30 + "px",
	zIndex: "999",
}));

const saveEditMonthList = () => {
	useRandomTime.value = false;
	showEditPopup.value = false;

	if (userData.value?.username == "" || userData.value?.desc == "") {
		uni.showToast({
			title: "请输入数据",
			icon: "none",
		});
		return;
	}
	userInfo.set(userData.value);
	tranFlowInfo.set(defaultMonthList.value);
};

const toLogin = () => {
	uni.navigateTo({
		url: "/pages/user/login",
		success: function (res) {
			hanLogin.value = true;
		},
	});
	hanLogin.value = true;
};

onMounted(() => {
	initPosition();
	stickyStates.value = new Array(monthList.value.length).fill(false);
	console.log(userInfo.info);
	userInfo.set(userData.value);
	tranFlowInfo.set(defaultMonthList.value);
});

onShow(() => {
	console.log("onShow", userInfo.info?.password);

	if (userInfo.info?.password != "") {
		console.log("onShow 不空");
		hanLogin.value = true;
		userData.value = JSON.parse(JSON.stringify(userInfo.info));
		if (tranFlowInfo.info) {
			defaultMonthList.value = JSON.parse(JSON.stringify(tranFlowInfo.info));
		}
	}
	if (userInfo.info?.password == "") {
		console.log("onShow 空");
		hanLogin.value = false;
		return;
	}
});
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

.page-main {
	--float-scale: 1;
	--float-background-color: #f3d76a;
	--float-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
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

					.nav-text {
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
	.main {
		height: 100vh;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		.numFont {
			font-family: "number-3156" !important;
			letter-spacing: 0.001rem;
		}
		.scroll-Y {
			height: 100vh;
			-webkit-overflow-scrolling: touch;
			overflow-y: auto;
			position: relative;
			transform: translateZ(0);
			will-change: transform;
		}

		.section-two {
			width: 100%;
			height: 100vh;
			position: absolute; // 改为fixed定位
			top: 760rpx;
			left: 0;
			z-index: 1;
			overflow: hidden;
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
							.nav-text {
								font-weight: 400;
								color: #000;
							}
						}
						&:last-child {
							.new-img,
							.nav-text {
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
				height: 70rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				background-color: #f6f5fa;
				z-index: 9;
				padding-top: 20rpx;
				.t-all {
					font-weight: 500;
					color: #000;
					font-size: 32rpx;
				}
			}

			.new-contain {
				width: 100%;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 200rpx;
				// padding-bottom: 150rpx;
				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.new-head {
					width: 100%;
					padding: 10rpx 46rpx 10rpx 46rpx;
					height: 80rpx;
					.t {
						font-weight: 500;
						font-size: 34rpx;
					}
				}
				.list-head {
					height: 90rpx;
					position: sticky;
					top: 70rpx;
					z-index: 99;
					background-color: #f6f5fa;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 0 46rpx;
					width: 100%;
					transition: height 0.3s ease;
					&.is_sticky {
						height: 60rpx;
					}

					.t {
						font-weight: bold;
						font-size: 36rpx;
					}

					.current-m {
						display: flex;
						align-items: center;
						gap: 10px;
						.t-current-m {
							font-weight: 300;
							color: #0f122e;
							font-size: 26rpx;
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
									.l-text {
										// font-weight: bold;
										font-size: 28rpx;
									}

									.new-icon {
										width: 30rpx;
										height: 30rpx;
									}
								}

								.jiangli {
									.l-text {
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
								.jiang-box {
									display: flex;
									flex-direction: row;
									justify-content: flex-end;
									align-items: center;
									background-color: #fdf4e0;
									padding: 0 15rpx;
									border-radius: 30rpx;
									font-size: 24rpx;
									white-space: nowrap;
									gap: 10rpx;
									margin-top: 5rpx;
									.r-text {
										font-size: 28rpx;
										color: #dc9734;
									}
									.new-img {
										width: 35rpx;
										height: 35rpx;
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
								.title-text {
									font-weight: bold;
								}

								.new-icon {
									width: 30rpx;
									height: 30rpx;
								}
							}

							// .jiangli {
							// 	width: 66%;

							// 	span {
							// 		font-weight: normal;
							// 		line-height: 50rpx;
							// 	}
							// }

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
			pointer-events: none;
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

			.origin-point {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

	.guid {
		position: fixed; /* 添加固定定位 */
		width: 100%;
		height: 100vh;
		background: url("/static/3156/img/1-0.jpg") no-repeat top center;
		background-size: 100% auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;

		.login-box {
			width: 100%;
			position: fixed;
			bottom: 200rpx;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 20rpx;
			.login-btn {
				width: 75%;
				height: 100rpx;
				border-radius: 50rpx;
				background-color: #3cf5bd;
				text-align: center;
				.btn-t {
					line-height: 100rpx;
					font-weight: 800;
					font-size: 36rpx;
				}
			}
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
				width: 120rpx;
				height: 70rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5rpx;
				.up {
					width: 30rpx;
					height: 30rpx;
					transform: rotate(180deg);
					bottom: -5rpx;
					opacity: 0.3;
				}
				.down {
					width: 30rpx;
					height: 30rpx;
					top: -5rpx;
					opacity: 0.3;
				}
				&.tran-out {
					top: -66rpx;
				}

				&.tran-in {
					bottom: -66rpx;
				}
			}
		}
	}
}

.edit-dialog {
	width: 100vw;
	background: #fff;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	position: relative;

	.edit-tabs {
		height: 60rpx;
	}
	.edit-header {
		padding: 30rpx 30rpx 0;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10rpx;
		.yue-title-tabs {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
		.edit-title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
		}
	}
	.scroll-Y {
		height: 100vh;
		-webkit-overflow-scrolling: touch;
		overflow-y: auto;
		position: relative;
		transform: translateZ(0);
		will-change: transform;
	}
	.edit-content {
		padding: 0 30rpx 140rpx 30rpx;
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		.yue-list {
			height: 100vh;
			overflow: hidden;
			.yue-item {
				height: 100rpx;
				border-radius: 20rpx;
				margin-bottom: 10rpx;
				.yue-item-title {
					font-size: 28rpx;
				}
			}
		}

		.edit-item {
			padding: 20rpx 0;
			// border-bottom: 1rpx solid #cecccc;
			margin-bottom: 20rpx;
			width: 100%;
			.item {
				height: 70rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	.edit-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		border-top: 1rpx solid #eee;
		background: #fff;
		z-index: 1;

		.edit-btn {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			font-size: 28rpx;

			&.cancel {
				background: #f5f5f5;
				color: #666;
			}

			&.confirm {
				background: #007aff;
				color: #fff;
			}
		}
	}
}
</style>
