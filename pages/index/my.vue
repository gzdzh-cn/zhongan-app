<template>
	<cl-page background-color="#f7f7f7">
		<view class="main-content">
			<view class="w-full px-[40rpx] pt-[30rpx] pb-4 bg-gradient-to-r from-blue-500 to-indigo-400">
				<!-- 设置 -->
				<view class="flex-1 h-[30rpx] flex flex-row-reverse" @tap="router.push('/pages/user/set')">
					<uni-icons
						class="relative"
						custom-prefix="iconfont"
						type="icon-shezhi"
						size="20"
						color="#ccc"
					></uni-icons>
				</view>

				<view class="w-10/12 mx-auto flex flex-col justify-center items-center gap-1">
					<!-- 头像 -->
					<view
						class="border-solid border-slate-300 border-[8rpx] rounded-full w-[160rpx] h-[160rpx] flex flex-col justify-center items-center border-opacity-20"
					>
						<cl-avatar :size="160" :src="avatarUrl" class="flex-shrink-0" />
					</view>

					<span class="text-white text-base font-bold mr-1 block overflow-hidden">
						{{ user.info?.nickname }}
					</span>

					<span
						class="text-xs leading-2 text-slate-300"
						@tap="router.push({ path: '/pages/user/userDescribe' })"
						>会员等级: {{ user.info?.levelName }}</span
					>

					<!-- <span class="text-slate-300 text-xs leading-2">积分： 100 </span> -->
				</view>
			</view>

			<view
				class="bg-white w-full flex flex-row justify-around items-center py-2 border-solid border border-slate-200"
			>
				<view class="h-20 flex flex-col justify-center items-center gap-2">
					<uni-icons
						class="relative top-1"
						custom-prefix="iconfont"
						type="icon-gongneng_jifen"
						size="30"
						color="#3b82f6"
					></uni-icons>
					<span class="text-xs text-slate-600">我的积分</span>
				</view>

				<view class="h-20 flex flex-col justify-center items-center gap-2">
					<uni-icons
						class="relative top-1"
						custom-prefix="iconfont"
						type="icon-xiaoxi"
						size="30"
						color="#3b82f6"
					></uni-icons>
					<span class="text-xs text-slate-600">我的消息</span>
				</view>
			</view>

			<u-gap height="20" bg-color="#f3f3f3"></u-gap>

			<view>
				<cl-list-item justify="start" border @tap="showEditDialog">
					<cl-row type="flex" >
						<uni-icons
							custom-prefix="iconfont"
							type="icon-houtaiguanli-huiyuanweihu"
							size="20"
							color="#e18a3b"
						></uni-icons>
						<span class="text-slate-600 text-sm ml-2">会员中心</span>
					</cl-row>
				</cl-list-item>

				<cl-list-item justify="start" border>
					<cl-row type="flex">
						<uni-icons
							custom-prefix="iconfont"
							type="icon-coupon"
							size="20"
							color="#6f89f7"
						></uni-icons>
						<span class="text-slate-600 text-sm ml-2">优惠兑换</span>
					</cl-row>
				</cl-list-item>

				<u-gap height="20" bg-color="#f3f3f3"></u-gap>

				<cl-list-item justify="start" border>
					<cl-row type="flex">
						<uni-icons
							custom-prefix="iconfont"
							type="icon-kefuzhongxin"
							size="20"
							color="#5da39d"
						></uni-icons>
						<span class="text-slate-600 text-sm ml-2">专属客服</span>
					</cl-row>
				</cl-list-item>

				<cl-list-item justify="start" border>
					<cl-row type="flex">
						<uni-icons
							custom-prefix="iconfont"
							type="icon-wenti3"
							size="20"
							color="#ea5514"
						></uni-icons>
						<span class="text-slate-600 text-sm ml-2">常见问题</span>
					</cl-row>
				</cl-list-item>

				<cl-list-item justify="start" border>
					<cl-row type="flex">
						<uni-icons
							custom-prefix="iconfont"
							type="icon-hezuoqiye"
							size="20"
							color="#6f94cd"
						></uni-icons>
						<span class="text-slate-600 text-sm ml-2">商务合作</span>
					</cl-row>
				</cl-list-item>
			</view>
			<!-- 编辑弹窗 -->
			<u-popup v-model="showEdit" mode="center" @close="closeEditDialog">
				<view class="edit-dialog">
					<view class="edit-header">
						<view class="edit-title">编辑个人资料</view>
					</view>
					<scroll-view scroll-y class="scroll-Y">
						<view class="edit-content">
							<view class="edit-item">
								开启编辑:<switch :checked="userData.isIcon" @change="switch1Change($event)" color="#FFCC33" style="transform:scale(0.7)"/>
							</view>
						</view>
					</scroll-view>
					<view class="edit-footer">
						<button class="edit-btn cancel" @click="closeEditDialog">取消</button>
						<button class="edit-btn confirm" @click="saveEdit">保存</button>
					</view>
				</view>
			</u-popup>
		</view>
		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onLoad, onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { service, useCool, useStore } from "/@/cool";
import Tabbar from "/@/components/tabbar.vue";
import { filterPic } from "/@/dzh/utils";
import { dzhStore,UserInfo } from "/@/dzh";
import { originUserData } from "/@/dzh/store/data";
import { isEmpty } from "lodash";

const { router } = useCool();
const { user } = useStore();
const { userInfo } = dzhStore();
// 会员数据
// const userData = ref()
const avatarUrl = ref("/static/avatar.png");

const refresh = async () => {
	// if (user.token) {
	// 	if (user.info?.headImg) avatarUrl.value = filterPic(user.info?.headImg);
	// }
	if(!userInfo.info?.password){
		router.push("/pages/user/login");
		return;
	}
};

onPullDownRefresh(() => {
	refresh();
	uni.stopPullDownRefresh();
});

const userData = ref<UserInfo>({});

// 编辑相关
const showEdit = ref(false);
const showEditDialog = () => {
	showEdit.value = true;
};
const closeEditDialog = () => {
	showEdit.value = false;
};
const switch1Change = (e: any) => {
  userData.value.isIcon = !userData.value.isIcon;
};
const saveEdit = () => {
	if (userData.value?.username == "" || userData.value?.desc == "") {
		uni.showToast({
			title: "请输入数据",
			icon: "none",
		});
		return;
	}
	// 保存编辑后的数据
	userInfo.set(userData.value);
	closeEditDialog();
};
onLoad(() => {
	console.log("onLoad");
	if (isEmpty(userInfo.info)) {
		userInfo.resetData();
	}
});
onShow(() => {
	console.log("onShow userInfo",userInfo.info);
	
	if(userInfo.info?.password != ""){
		userData.value = JSON.parse(JSON.stringify(userInfo.info))
	}
	refresh();
});
onMounted(() => {});
 
</script>

<style lang="scss">
// .avatar {
// 	border: 6rpx solid #f7f7f7;
// 	border-radius: 100%;
// 	height: 130rpx;
// 	width: 130rpx;
// }

.container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;

	.item {
		width: 33%;
		border: 1px solid #3c3c3c;
		position: relative;

		img {
			width: 80%;
			margin-bottom: 10px;
		}

		.item-img {
			width: 100%;
			background-color: #eeeeee;
		}
	}
}

.edit-dialog {
	width: 600rpx;
	background: #fff;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	max-height: 40vh;
	position: relative;
	.scroll-Y {
		height: 100vh;
		-webkit-overflow-scrolling: touch;
		overflow-y: auto;
		position: relative;
		transform: translateZ(0);
		will-change: transform;
	}
	.edit-header {
		padding: 30rpx 30rpx 0;
		flex-shrink: 0;

		.edit-title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			margin-bottom: 30rpx;
		}
	}

	.edit-content {
		padding: 0 30rpx 140rpx 30rpx;
		box-sizing: border-box;
		width: 100%;
		min-height: 100%;

		.edit-item {
			margin-bottom: 20rpx;

			.edit-label {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 10rpx;
			}

			.edit-input {
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
../../util_/common
