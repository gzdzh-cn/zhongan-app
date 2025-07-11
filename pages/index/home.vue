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

					<!-- 通告栏 -->
					<view class="notice-bar">
					 
							<uni-icons
								custom-prefix="iconfont-3156"
								type="icon-ling"
								size="19"
								color="#dd9734"
								class="icon-ling"
							></uni-icons>
							<text class="notice-bar-text">
								账户状态异常，请留意查收我们发出的通知
							</text>
					 
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

				<view
					class="section-two"
					:style="sectionTwoStyle"
					@touchstart="stHandleTouchStart"
					@touchend="stHandleTouchEnd"
				>
					<scroll-view
						:scroll-top="scrollTop"
						:scroll-y="isAtTop"
						class="scroll-Y"
						@scrolltoupper="upper"
						@scrolltolower="lower"
						@scroll="scroll"
					>
						<view class="background-layer" :style="backgroundStyle"> </view>
						<!-- 第二屏导航 -->
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
													<image :src="doSrc(item)" mode="aspectFit" class="new-img" />
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
													<image :src="doSrc(item)" mode="aspectFit" class="new-img icon" />
												</view>
												<view class="right">
													<view class="l">
														<view class="title" :class="{ jiangli: item.reward }">
															<text class="l-text">{{ item.title }}</text>
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
												<!-- 左侧图标 -->
												<view class="left">
													<image
														:src="doSrc(item)"
														mode="aspectFit"
														class="new-img icon"
														v-if="item.isInterest"
													/>
													<view class="circle-btn" v-if="!item.isInterest">{{
														getTransferInitial(item.transferName || "")
													}}</view>
												</view>
												<!-- 右侧内容 -->
												<view class="right">
													<view class="l">
														<!-- 标题 -->
														<view class="title">
															<!-- 标题图标 -->
															<image
																:src="item.icon"
																mode="aspectFit"
																class="new-icon"
																v-if="item.icon && item.isInterest"
															/>
															<!-- 标题文字 -->
															<text class="l-text" v-if="item.isInterest">{{ item.title }}</text>

															<!-- 交易类型和名称 -->
															<text class="l-text" v-if="!item.isInterest"
																>{{ item.transferType }} {{ item.transferName }}</text
															>
														</view>
														<!-- 时间 -->
														<view class="desc">
															<text class="time">{{ item.time }}</text>
														</view>
													</view>

													<view class="r">
														<view class="m-t">
															<view class="m-desc">
																<text class="m-type">{{ item.moneyType }}</text>
																<text class="money">{{ item.money }}</text>
															</view>
															<text class="m-tip">{{ item.tip }}</text>
														</view>
													</view>
												</view>
											</view>
										</view>

										<!-- 广告卡片 -->
										<view class="ad" v-else-if="item.type === 'ad'">
											<image :src="doSrc(item)" mode="fill" class="ad-img" :style="item.style" />
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
									<view class="item-title"><text class="item-title-text">类型:</text></view>
									<uni-data-select
										v-model="item.type"
										:localdata="typeRange"
										@change="changeType($event, item)"
									></uni-data-select>
								</view>
								<view
									class="item"
									v-if="
										item.type == 'message' ||
										item.type == 'normal' ||
										(item.type == 'money' && item.isInterest)
									"
								>
									<view class="item-title"><text class="item-title-text">左侧图标:</text></view>

									<uni-file-picker
										title="选择图片"
										v-model="item.img"
										limit="1"
										file-mediatype="image"
										@select="selectFile($event, item)"
									></uni-file-picker>
								</view>
								<view class="item" v-if="item.type == 'message' || item.type == 'normal' || item.type == 'money' && item.isInterest">
									<view class="item-title"><text class="item-title-text">标题:</text></view>
									<u-input v-model="item.title" type="textarea" placeholder="标题" :border="true" />
								</view>

								<view class="item" v-if="item.type == 'message'">
									<view class="item-title"><text class="item-title-text">副标题:</text></view>
									<u-input
										v-model="item.content"
										type="textarea"
										placeholder="副标题"
										:border="true"
									/>
								</view>
								<view class="item" v-if="item.type === 'message'">
									<view class="item-title"><text class="item-title-text">描述:</text></view>
									<u-input v-model="item.desc" type="textarea" placeholder="描述" :border="true" />
								</view>

								<view class="item" v-if="item.type === 'money'&& !item.isInterest">
									<view class="item-title"><text class="item-title-text">转账类型:</text></view>
									<u-input v-model="item.transferType" placeholder="转给/来自" :border="true" />
								</view>
								<view class="item" v-if="item.type === 'money'&& !item.isInterest">
									<view class="item-title"><text class="item-title-text">转账对方:</text></view>
									<u-input v-model="item.transferName"  placeholder="HEN Z******" :border="true" />
								</view>

								<view class="item" v-if="item.type != 'ad'">
									<view class="item-title"><text class="item-title-text">时间:</text></view>
									<u-input v-model="item.time" placeholder="时间" :border="true" />
								</view>

								<view class="item" v-if="item.type === 'money'">
									<view class="item-title"><text class="item-title-text">金额:</text></view>
									<u-input v-model="item.money" placeholder="金额" :border="true" />
								</view>
								<view class="item" v-if="item.type === 'money'">
									<view class="item-title"><text class="item-title-text">金额类型:</text></view>
									<u-input v-model="item.moneyType" placeholder="金额类型" :border="true"
								/></view>
								<view class="item" v-if="item.type === 'money' && !item.isInterest">
									<view class="item-title"><text class="item-title-text">提示词:</text></view>
									<u-input
										v-model="item.tip"
										placeholder="提示词"
										v-if="item.type === 'money'"
										:border="true"
								/></view>
								<view class="item" v-if="item.type === 'money'">
									<view class="item-title"><text class="item-title-text">是否派息:</text></view>
									<switch
										:checked="item.isInterest"
										@change="switch1Change($event, item)"
										color="#FFCC33"
										style="transform: scale(0.7)"
									/>
								</view>

								<view class="item" v-if="item.type === 'normal'">
									<view class="item-title"><text class="item-title-text">右侧提示词:</text></view>
									<u-input
										v-model="item.tipText"
										placeholder="右侧提示词"
										v-if="item.type === 'normal'"
										:border="true"
								/></view>
								<view class="item" v-if="item.type === 'normal'">
									<view class="item-title"><text class="item-title-text">右侧提示词2:</text></view>
									<u-input
										v-model="item.autoBtn"
										placeholder="右侧提示词2"
										v-if="item.type === 'normal'"
										:border="true"
									/>
								</view>

								<view class="item" v-if="item.type == 'ad'">
									<view class="item-title"><text class="item-title-text">广告图:</text></view>
									<uni-file-picker
										title="选择图片"
										v-model="item.img"
										limit="1"
										file-mediatype="image"
										@select="selectFile($event, item)"
									></uni-file-picker>
								</view>

								<view class="item">
									<view class="item-title"><text class="item-title-text">排序:</text></view>
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
									<view class="item-title"><text class="item-title-text">姓名:</text></view>
									<u-input v-model="userData.username" placeholder="请输入姓名" :border="true"
								/></view>
								<view class="item">
									<view class="item-title"><text class="item-title-text">头像:</text></view>
									<u-input v-model="userData.avatar" placeholder="请输入号码" :border="true"
								/></view>
								<view class="item">
									<view class="item-title"><text class="item-title-text">余额描述:</text></view>
									<u-input
										v-model="userData.desc"
										type="textarea"
										placeholder="请输入余额描述"
										:border="true"
								/></view>
								<view class="item">
									<view class="item-title"><text class="item-title-text">余额:</text></view>
									<u-input v-model="userData.money" placeholder="请输入余额" :border="true"
								/></view>
								<view class="item">
									<view class="item-title"><text class="item-title-text">错误信息:</text></view>
									<u-input
										v-model="userData.errorMsg"
										type="textarea"
										placeholder="请输入错误信息"
										:border="true"
								/></view>
							</view>
						</view>
					</scroll-view>
				</template>
				<view class="edit-footer">
					<u-button @click="resetData" type="error" shape="circle">重置</u-button>
					<u-button @click="showEditPopup = false" shape="circle">取消</u-button>
					<u-button @click="saveEditMonthList" type="primary" shape="circle">保存</u-button>
				</view>
			</view>
			<cl-confirm ref="ConfirmRef"></cl-confirm>
		</u-popup>

		<tabbar :isAtTop="isAtTop" />
	</cl-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance, nextTick } from "vue";
import { onLoad, onShow,onReady } from "@dcloudio/uni-app";
import Tabbar from "/@/components/tabbar.vue";
import { dzhStore, MonthList, UserInfo } from "/@/dzh";
import { router } from "/@/cool";
import { isEmpty, throttle } from "lodash";
import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update'


const ConfirmRef = ref();
const { userInfo, tranFlowInfo, tranInfo, originUserData, originMonthList } = dzhStore();
const touchStartY = ref(0);
const currentOffset = ref(0); // 当前偏移
const isAnimating = ref(false);
const UP_THRESHOLD = 5; // 上滑阈值
const DOWN_THRESHOLD = 5; // 下滑阈值
const isAtTop = ref(false); // 是否在顶部位置
const hanLogin = ref(true);
const logoSrc = ref(hanLogin.value ? "/static/3156/img/avtar.png" : "/static/3156/img/avtar.png");
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
const statusBarHeight = ref(0);

let sectionTop = 90; // section-two的初始top值（rpx）
// #ifdef APP
// 根据平台调整高度比例
sectionTop = 145;
// #endif
const viewportWidth = ref(uni.getSystemInfoSync().windowWidth);
// 计算section-two的初始位置到顶部的距离
const INITIAL_TOP_DISTANCE = 760 - sectionTop; // section-two的初始top值（rpx）
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
	zIndex: isAtTop.value ? "8" : "11",
	paddingBottom: `${appBottom}rpx`,
}));
// 屏幕触摸
const handleTouchStart = (e: TouchEvent) => {
	if (isAnimating.value || showEditPopup.value || scrollTop.value > 0) return;
	// console.log("handleTouchStart scrollTop",scrollTop.value);
	touchStartY.value = e.touches[0].clientY;
	isAnimating.value = false;
};
// 屏幕触摸
const handleTouchMove = throttle((e: TouchEvent) => {
	// console.log("handleTouchMove isUpper",isUpper.value);
	if (isAnimating.value || showEditPopup.value || scrollTop.value > 0) return;
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
	if (!isUpper.value && isAtTop.value && deltaY > DOWN_THRESHOLD) {
		// 在顶部下滑超过5px，回到初始位置
		isAnimating.value = true;
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
		setTimeout(() => {
			isAnimating.value = false;
		}, 300);
	}

	touchStartY.value = e.touches[0].clientY;
}, 200);
// 屏幕触摸
const handleTouchEnd = () => {
	if (isAnimating.value || showEditPopup.value || scrollTop.value > 0) return;

	isAnimating.value = true;
	const deltaY = currentOffset.value - INITIAL_POSITION;

	if (isAtTop.value && deltaY > DOWN_THRESHOLD) {
		// 在顶部下滑超过5px，回到初始位置
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
	} else if (!isAtTop.value && Math.abs(deltaY) > UP_THRESHOLD && deltaY < 0) {
		// 上滑超过10px，吸附到顶部
		currentOffset.value = TOP_POSITION;
	} else if (!isAtTop.value) {
		// 未达到阈值，回到初始位置
		currentOffset.value = INITIAL_POSITION;
		isAtTop.value = false;
	}
	isUpper.value = false;
	setTimeout(() => {
		isAnimating.value = false;
	}, 300);
};

//////////////////// 首页下部分滚动相关方法 ////////////////////
const scrollTop = ref(0); //滚动距离
const showTopTile = ref(false); //是否显示顶部标题
const isUpper = ref(false); //是否滚动到顶部

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
const defaultMonthList = ref<MonthList>([]);
// 修改 monthListEditable 的初始化
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

// 首页下部分滚动
let topTitleTop = 0;
// #ifdef APP
topTitleTop = 20;
// #endif
const topTitle = computed(() => {
	return {
		display: isAtTop.value ? "flex" : "none",
		top: Number(statusBarHeight.value - topTitleTop) + "rpx",
	};
});
// 首页第二屏滚动监听开始
const stHandleTouchStart = (e: any) => {
	if (!isAtTop.value || !isUpper.value) return;
	// console.log("stHandleTouchStart");
};
// 首页第二屏滚动监听结束
const stHandleTouchEnd = (e: any) => {
	if (!isAtTop.value || isUpper.value) return;
};

// 添加滚动事件处理函数
const upper = (e: any) => {
	console.log("滚动到顶部");
	isUpper.value = true;
	showTopTile.value = false;
};
const lower = (e: any) => {
	console.log("滚动到底部");
};
const maxIndex = ref(-1);
const stickyStates = ref<boolean[]>([]);
// 判断某个 list-head 是否在顶部
const isSticky = (index: number) => {
	return stickyStates.value[index];
};
// 修改 scroll 函数
const scroll = throttle((e: any) => {
    if (!isAtTop.value) return;
    const currentScrollTop = e.detail.scrollTop;
    scrollTop.value = currentScrollTop;
    isUpper.value = false;
    // 转换为 px
    const stickyThreshold = rpx2px(statusBarHeight.value + 100);
    
    nextTick(() => {
        // 使用 uni.createSelectorQuery 获取元素位置
        const query = uni.createSelectorQuery();
        query
            .selectAll(".list-head")
            .boundingClientRect((rects: any) => {
                if (rects) {
                    // 更新所有元素的 sticky 状态
                    stickyStates.value = rects.map((rect: any) => rect.top <= stickyThreshold);
                    // 找出最后一个吸顶的元素的索引
                    maxIndex.value = stickyStates.value.lastIndexOf(true);
                }
            })
            .exec();
    });

    if (scrollTop.value < rpx2px(70)) {
        showTopTile.value = false;
    }
}, 500);

//////////////////// 首页下部分滚动相关方法 ////////////////////

//////////////////// 水滴效果相关方法 ////////////////////

// 水滴效果按钮圆
const mainButtonStyle = computed(() => {
    if (hanLogin.value) {
        return {
            '--button-x': `${px2rpx(state.currentX) - 60}rpx`,
            '--button-y': `${px2rpx(state.currentY) - 60}rpx`,
            '--button-scale': 'var(--float-scale)',
            transform: 'translate(var(--button-x), var(--button-y)) scale(var(--button-scale))',
            transition: state.isDragging ? 'none' : 'transform 0.3s ease',
        };
    }
    if (!hanLogin.value) {
        return {
            position: 'static' as const,
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
        '--connection-width': `${px2rpx(distance)}rpx`,
        '--connection-x': `${px2rpx(state.originX)}rpx`,
        '--connection-y': `${px2rpx(state.originY - 25)}rpx`,
        '--connection-angle': `${angle}rad`,
        width: 'var(--connection-width)',
        transform: 'translate(var(--connection-x), var(--connection-y)) rotate(var(--connection-angle))',
    };
});
// 水滴长度
const distance = computed(() => {
	return Number(connectionStyle.value['--connection-width'].replace("rpx", ""));
});
// 预定义SVG模板
const SVG_TEMPLATE = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 %width% 50">
    <path fill="#f3d76a" d="M 0 10 L 0 40 Q %halfWidth% 20, %width% 50 L %width% 0 Q %halfWidth% 30, 0 10 Z"></path>
</svg>
`;

// tran 水滴液化svg效果
const connectSvgIcon = computed(() => {
    const width = rpx2px(Math.ceil(distance.value * 100) / 100);
    const halfWidth = width / 2;
    
    // 使用字符串替换而不是模板字符串，减少运算
    const svg = SVG_TEMPLATE
        .replace(/%width%/g, width.toString())
        .replace(/%halfWidth%/g, halfWidth.toString());
        
    return `data:image/svg+xml;base64,${btoa(svg)}`;
});
// tran 按钮svg图标
const tranGuidSvgIcon = computed(() => {
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
			<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				stroke-width="4" d="M42 19H6M30 7l12 12M6.799 29h36m-36 0l12 12" />
		</svg>
		`;
	return `data:image/svg+xml;base64,${btoa(svg)}`;
});
// tran 按钮文字
const tranTextWrapperStyle = computed(() => {
	return {
		opacity: 1 - Math.min(distance.value / 10, 1),
	};
});
// tran 容器样式
const tranOpacity = computed(() => {
	const progress = Math.abs(currentOffset.value) / 20; // 渐变范围
	return Math.max(0, 1 - progress);
});
// tran容器样式
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
// tran 文本样式
const tranTextStyle = computed(() => ({
	opacity: tranTextOpacity.value,
	transition: "opacity 0.3s ease",
}));
// tran 水滴按钮位置初始化
const initPosition = () => {
	const { screenWidth, windowHeight } = uni.getSystemInfoSync();
	state.screenWidth = screenWidth;
	state.originX = (screenWidth / 5) * 4.2;
	let heightRatio = 0.59;

	state.originY = windowHeight * heightRatio;
	state.currentX = state.originX;
	state.currentY = state.originY;
};
// tran 水滴按钮触摸
const onTouchStart = () => {
	state.isDragging = true;
};
// tran 水滴按钮触摸
const onTouchMove = throttle((e: TouchEvent) => {
    if (!state.isDragging) return;
    
    // requestAnimationFrame(() => {
        const touch = e.touches[0];
        let newX = state.originX;
        let newY = touch.clientY;

        // 简化距离计算，使用绝对值
        const dy = Math.abs(newY - state.originY);
        
        if (dy > state.maxDistance) {
            // 简化限制计算
            newY = newY > state.originY 
                ? state.originY + state.maxDistance 
                : state.originY - state.maxDistance;
        }

        state.currentX = newX;
        state.currentY = newY;
    // });
}, 60);
// tran 水滴按钮触摸
const onTouchEnd = () => {
	state.isDragging = false;
	const offset = rpx2px(distance.value);

	if (offset > state.maxDistance - 10) {
		state.completed = true;
		setTimeout(() => {
			uni.navigateTo({
				url: "/pages/index/transfer",
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
//////////////////// 水滴效果相关方法 ////////////////////

//////////////////// 编辑弹窗相关方法 ////////////////////

const tabsList = ref([{ name: "月份" }, { name: "数据" }, { name: "我的" }]);
const tabsIndex = ref(0);
const showEditPopup = ref(false);
const typeRange = ref([
	{ text: "消息", value: "message" },
	{ text: "普通", value: "normal" },
	{ text: "广告", value: "ad" },
	{ text: "交易", value: "money" },
]);
const changeType = (e: any, item: any) => {
	console.log(e, item);
	item.type = e;
};
const switch1Change = (e: any, item: any) => {
	console.log(e, item);
	item.isInterest = e.detail.value;
};

let appTop = 0;
// #ifdef APP
appTop = 40;
// #endif

// 编辑按钮样式
const editStyle = computed(() => ({
	position: "fixed",
	right: "50rpx",
	top: Number(statusBarHeight.value) + appTop + 40 + "rpx",
	zIndex: "999",
}));

//个人资料
const currentEditMonthIndex = ref(0);
const userData = ref<UserInfo>({});
// 个人资料

const editDialogStyle = computed(() => ({
	padding: `${Number(statusBarHeight.value) + 20}rpx 0 0 0`,
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

const selectFile = (e: any, item: any) => {
	item.img = [
		{
			url: e.tempFilePaths[0],
			extname: e.tempFilePaths[0].split(".").pop(),
			name: e.tempFilePaths[0].split("/").pop(),
		},
	];
};

const doSrc = (item: any) => {
	return item.img?.[0]?.url;
};

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
// 跳转登录
const toLogin = () => {
	uni.navigateTo({
		url: "/pages/user/login",
		success: function (res) {
			hanLogin.value = true;
		},
	});
};
// 给默认数据
const setData = () => {
	userInfo.resetData();
	tranFlowInfo.resetData();
	tranInfo.resetData();
	console.log("setData userInfo", userInfo.info);
	// console.log("setData tranFlowInfo", tranFlowInfo.info);
};
// 重置数据
const resetData = () => {
	ConfirmRef.value?.open({
		title: "温馨提示",
		message: "你确定要重置数据吗？",
		callback(action: string) {
			switch (action) {
				case "confirm":
					setData();
					hanLogin.value = false;
					showEditPopup.value = false;
					break;

				default:
					break;
			}
		},
	});
};
//////////////////// 编辑弹窗相关方法 ////////////////////

// 添加存款金额变量
const depositAmount = computed(() => {
	return userInfo.info?.money ?? 0;
});
// 退出
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
onLoad(() => {
	console.log("onLoad");
	if (isEmpty(userInfo.info)) {
		setData();
	}
	const systemInfo = uni.getSystemInfoSync();
	statusBarHeight.value = systemInfo.statusBarHeight || 0;
});

onShow(() => {
	console.log("onShow");

	if (userInfo.info?.password == "") {
		hanLogin.value = false;
		return;
	}
	if (userInfo.info?.password != "") {
		hanLogin.value = true;
		userData.value = JSON.parse(JSON.stringify(userInfo.info));
		if (tranFlowInfo.info) {
			defaultMonthList.value = JSON.parse(JSON.stringify(tranFlowInfo.info));
			// console.log("tranFlowInfo", tranFlowInfo.info);
		}
	}
});

onMounted(() => {
	console.log("onMounted");
	initPosition();
	stickyStates.value = new Array(monthList.value.length).fill(false);
});

onReady(()=>{
	checkUpdate()
})

const rpx2px = (value: number) => {
	return (value * state.screenWidth) / 750;
};

const px2rpx = (value: number) => {
	return (value * 750) / state.screenWidth;
};

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

				// .kf {
				// 	font-weight: bold;
				// }
			}
		}

		.notice-bar {
			width: 100%;
			height: 70rpx;
			background-color: #fbede5;
			border-radius: 25rpx;
			padding: 0 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			
			.notice-bar-text{
				font-size: 26rpx;
				color: #dc9c43;
				font-weight: 400;
				margin-left: 10rpx;
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
				top: 0;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				background-color: #f6f5fa;
				z-index: 9;
				// padding-top: 20rpx;
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
					top: 68rpx;
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
						height: 80rpx;
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
		padding: 0 0 140rpx 0;
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
			padding: 20px 30rpx 20px 30rpx;
			margin-bottom: 20rpx;
			width: 100%;
			border-bottom: 1rpx solid #dcdbdb;
			.item {
				margin-bottom: 10rpx;
				.item-title {
					display: flex;
					flex-direction: column;
					padding: 10rpx 10rpx;
					.item-title-text {
						font-size: 28rpx;
						font-weight: 700;
					}
				}
				.new-img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.edit-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		border-top: 1rpx solid #eee;
		background: #fff;
		z-index: 1;
	}
}
</style>
