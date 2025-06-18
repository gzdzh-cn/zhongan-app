<template>
	<cl-page backgroundColor="#f6f5fa">
		<view class="main-con">
			<view class="nav" :style="navStyle">
				<view class="head-l" @tap="back">
					<uni-icons type="arrow-left" size="26" class="qrcode"></uni-icons>
				</view>

				<view class="head-m">
					<text>转账</text>
				</view>

				<view class="head-r">
					<image src="/static/3156/img/t_23.png" mode="aspectFit" class="h-r-icon" />
					<uni-icons type="more-filled" size="26" class="qrcode"></uni-icons>
				</view>
			</view>

			<view class="content">
				<scroll-view
					:scroll-top="scrollTop"
					scroll-y="true"
					class="scroll-Y"
					@scrolltoupper="upper"
					@scrolltolower="lower"
					@scroll="scroll"
				>
					<!-- 搜索 -->
					<view class="search">
						<uni-icons type="search" size="26" class="search-icon" color="#b8aeae"></uni-icons>
						<text class="s-t">新增/搜寻名字、手机号码、电邮、FPS ID</text>
					</view>

					<!-- 导航 -->
					<view class="nav-list">
						<template v-for="(item, index) in NAV_LIST" :key="index">
							<view class="nav-item">
								<image :src="item.icon" mode="aspectFit" class="nav-img" />
								<view v-if="item.text === 'QR code 付歌'" style="padding: 0 1ch">
									<text>{{ item.text }}</text>
								</view>
								<text v-else>{{ item.text }}</text>
							</view>
						</template>
					</view>

					<!-- 常用联系人 -->
					<view class="contacts-use">
						<view class="title">
							<text class="title-text">常用收款人</text>
						</view>
						<view class="person-list">
							<view
								class="item"
								v-for="(item, index) in contactSortList.slice(0, 4)"
								:key="index"
								@tap="
									toLink({
										path: '/pages/index/pay',
										query: { id: item.id },
									})
								"
							>
								<view class="circle-btn" :style="circleStyle(item.colorNum)"
									>{{ item.letter }}
									<image
										src="/static/3156/img/icon2.png"
										mode="aspectFit"
										class="circle-icon"
										v-show="item.isIcon"
								/></view>
								<view class="item-name">
									<text class="item-t">{{ item.name }}</text>
								</view>
							</view>
						</view>
					</view>

					<!-- 联系人列表 -->
					<view class="contact-list">
						<view class="title">
							<view class="title-text">
								<text>我的账户(0)</text>
								<uni-icons type="help" size="16" class="help" color="#8c8989"></uni-icons>
							</view>
							<uni-icons type="left" size="16" class="left" color="#8c8989"></uni-icons>
						</view>

						<view class="title p-list">
							<!-- <text class="title-text">收款人({{ contactList.length }})</text> -->
							<text class="title-text">收款人(179)</text>
						</view>

						<view class="clist">
							<view
								class="item"
								v-for="(item, index) in contactList"
								:key="index"
								@tap="
									toLink({
										path: '/pages/index/pay',
										query: { id: item.id },
									})
								"
							>
								<view
									class="zimu"
									v-if="index === 0 || item.letter !== contactList[index - 1].letter"
								>
									<text>{{ item.letter }}</text>
								</view>
								<view class="item-person">
									<view class="circle-btn" :style="circleStyle(item.colorNum)">
										{{ item.letter }}
										<image
											src="/static/3156/img/icon2.png"
											mode="aspectFit"
											class="circle-icon"
											v-show="item.isIcon"
										/>
									</view>
									<view class="item-desc">
										<text>{{ item.name }}</text>
										<text>{{ item.type }} {{ item.phoneNumber }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
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

			<!-- 编辑弹窗 -->
			<u-popup v-model="showEditPopup" mode="center" @close="closeEditDialog">
				<view class="edit-dialog">
					<view class="edit-header">
						<view class="edit-title">编辑联系人</view>
						<view class="edit-actions">
							<u-button
								type="primary"
								size="mini"
								shape="square"
								class="action-btn add"
								@click="addNewContact"
								>新增</u-button
							>
						</view>
					</view>
					<scroll-view
						scroll-y
						class="scroll-Y"
						:scroll-into-view="scrollToId"
						scroll-with-animation
					>
						<view class="edit-content">
							<template v-for="(contact, index) in CONTACTS_DATA" :key="index">
								<view class="edit-item" :id="'contact-' + contact.id">
									<view class="edit-item-header">
										<view class="edit-label">联系人 {{ index + 1 }}</view>
										<view>
											<u-button
												type="error"
												size="mini"
												class="delete-btn"
												shape="square"
												@click="deleteContact(index)"
												>删除</u-button
											>
										</view>
									</view>
									<uni-easyinput
										v-model="contact.name"
										placeholder="请输入姓名"
										class="edit-input"
									/>
									<uni-easyinput
										v-model="contact.type"
										placeholder="请输入类型"
										class="edit-input"
									/>
									<uni-easyinput
										v-model="contact.phoneNumber"
										placeholder="请输入号码"
										class="edit-input"
									/>
									<uni-easyinput
										v-model="contact.receiveBankName"
										placeholder="请输入收款银行"
										class="edit-input"
									/>
									<uni-easyinput
										v-model="contact.receiveBankAccount"
										placeholder="请输入收款银行账号"
										class="edit-input"
									/>
									<uni-easyinput
										v-model="contact.colorNum"
										placeholder="头像色: 粉0,灰1,青2,橙3,绿4"
										type="number"
										class="edit-input"
									/>

									<uni-data-select
										v-model="contact.sort"
										:localdata="contactRange"
										@change="changeSort($event, contact?.id)"
									></uni-data-select>

									小图标：<switch
										:checked="contact.isIcon"
										@change="switch1Change($event, contact.id, 'isIcon')"
										color="#FFCC33"
										style="transform: scale(0.7)"
									/>
									置顶：<switch
										:checked="contact.isTop"
										@change="switch1Change($event, contact.id, 'isTop')"
										color="#FFCC33"
										style="transform: scale(0.7)"
									/>
								</view>
							</template>
						</view>
					</scroll-view>
					<view class="edit-footer">
						<button class="edit-btn cancel" @click="closeEditDialog">取消</button>
						<button class="edit-btn confirm" @click="saveEdit">保存</button>
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
import { computed, onMounted, reactive, ref, nextTick } from "vue";
import { useCool } from "/@/cool";
import { dzhStore, Contact } from "/@/dzh";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { throttle } from "lodash-es";


const { router, storage } = useCool();
const { tranInfo, userInfo, originContactList } = dzhStore();
const state = reactive({
	screenWidth: 0,
	isFixed: false,
});
const hanLogin = ref(false);
const statusBarHeight = ref(0);
let appTop = 0;
// #ifdef APP
appTop = 40;
// #endif
 


const loading = ref(false);
const toLink = (param: any) => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		router.push(param);
	}, 500);
};
// 编辑按钮样式
const editStyle = computed(() => ({
	position: "fixed",
	right: "50rpx",
	top: statusBarHeight.value + appTop + 40 + "rpx",
	zIndex: "999",
}));

// 首个字母转大写
const getTransferInitial = (name: string): string => {
	if (!name) return "";
	return name.charAt(0).toUpperCase();
};

// 粉色，灰白色，灰青白，橙色，绿色
const colorArr = ref(["#f6ebef", "#e5eef7", "#eff2e9", "#faf2e7", "#e0fbf2"]);
const contactRange = ref([
	{
		text: "横版收款人序号:1",
		value: 0,
	},
	{
		text: "横版收款人序号:2",
		value: 1,
	},
	{
		text: "横版收款人序号:3",
		value: 2,
	},
	{
		text: "横版收款人序号:4",
		value: 3,
	},
	{
		text: "横版收款人序号:5",
		value: 4,
	},
]);
const circleStyle = (index: number) => {
	return {
		backgroundColor: colorArr.value[index],
	};
};

// 定义联系人数据
const CONTACTS_DATA = ref<Contact[]>(originContactList);

// 定义导航数据
const NAV_LIST = ref([
	{
		icon: "/static/3156/img/t_03.png",
		text: "银行账号",
	},
	{
		icon: "/static/3156/img/t_05.png",
		text: "自动增值",
	},
	{
		icon: "/static/3156/img/t_07.png",
		text: "利是",
	},
	{
		icon: "/static/3156/img/t_09.png",
		text: "海外汇款",
	},
	{
		icon: "/static/3156/img/t_19.png",
		text: "信用卡还款",
	},
	{
		icon: "/static/3156/img/t_16.png",
		text: "货币兌換",
	},
	{
		icon: "/static/3156/img/t_22.png",
		text: "扫一扫",
	},
]);

const contactList = computed(() =>
	CONTACTS_DATA.value
		.map((contact) => ({
			id: contact.id ?? "",
			letter: getTransferInitial(contact.name ?? ""),
			name: contact.name ?? "",
			type: contact.type ?? "",
			colorNum: contact.colorNum ?? 0,
			phoneNumber: contact.phoneNumber ?? "",
			receiveBankName: contact.receiveBankName ?? "",
			receiveBankAccount: contact.receiveBankAccount ?? "",
			isIcon: contact.isIcon,
			sort: contact.sort ?? 0,
			isTop: contact.isTop ?? false,
		}))
		.sort((a, b) => {
			// 将字母转换为大写进行比较，确保排序一致性
			const letterA = a.letter.toUpperCase();
			const letterB = b.letter.toUpperCase();

			// 按字母顺序排序
			if (letterA < letterB) {
				return -1;
			}
			if (letterA > letterB) {
				return 1;
			}
			return 0; // 如果字母相同，则保持原有顺序
		})
);

const contactSortList = computed(() => {
	return contactList.value
		.filter((contact) => contact.isTop)
		.sort((a, b) => {
			const sortA = a.sort ?? 0;
			const sortB = b.sort ?? 0;
			return sortA - sortB;
		});
});

// 编辑相关

const showEditPopup = ref(false);
const closeEditDialog = () => {
	showEditPopup.value = false;
};
const switch1Change = (e: any, checkedId?: number, type?: string) => {
	//   const checkedId = e.detail.value;
	CONTACTS_DATA.value.forEach((contact) => {
		if (contact.id === checkedId) {
			if (type === "isIcon") {
				contact.isIcon = !contact.isIcon;
			} else if (type === "isTop") {
				contact.isTop = !contact.isTop;
			}
		}
	});
};
const changeSort = (e?: any, id?: number) => {
	console.log(id, e);
	CONTACTS_DATA.value.forEach((contact) => {
		if (contact.id === id) {
			contact.sort = Number(e);
		}
	});
};

// 保存编辑
const saveEdit = () => {
	console.log("saveEdit", CONTACTS_DATA.value);
	closeEditDialog();
	// 保存编辑后的数据
	tranInfo.set(CONTACTS_DATA.value);
};

// 导航栏样式
const navStyle = computed(() => ({
	backgroundColor: state.isFixed ? "#fff" : "transparent",
	top: statusBarHeight.value + appTop -15 + "rpx",
}));
const back = () => {
	router.back();
};

const scrollTop = ref(0);
 
// 添加滚动事件处理函数
const upper = (e: any) => {
	console.log("滚动到顶部");
};

const lower = (e: any) => {
	console.log("滚动到底部");
};

const scroll = throttle((e: any) => {
	const currentScrollTop = e.detail.scrollTop;
	scrollTop.value = currentScrollTop;
	if (scrollTop.value > 0) {
		state.isFixed = true;
	} else {
		state.isFixed = false;
	}
}, 200);


const scrollToId = ref("");

const addNewContact = () => {
	const newId = Math.max(...CONTACTS_DATA.value.map((c) => c.id || 0), 0) + 1;
	CONTACTS_DATA.value.push({
		id: newId,
		name: "",
		type: "手机号码",
		phoneNumber: "",
		receiveBankName: "",
		receiveBankAccount: "",
		isIcon: false,
	});

	// 使用nextTick确保DOM更新后再滚动
	nextTick(() => {
		scrollToId.value = "contact-" + newId;
	});
};

const deleteContact = (index: number) => {
	uni.showModal({
		title: "确认删除",
		content: "确定要删除这个联系人吗？",
		success: (res) => {
			if (res.confirm) {
				CONTACTS_DATA.value.splice(index, 1);
			}
		},
	});
};


onLoad(() => {
	const systemInfo = uni.getSystemInfoSync();
	statusBarHeight.value = systemInfo.statusBarHeight || 0;
});
onMounted(() => {});
onShow(() => {
	console.log("onShow");
 
	if (userInfo.info?.password != "") {
		hanLogin.value = true;
	}
	if (tranInfo?.info?.length > 0) {
		CONTACTS_DATA.value = tranInfo.info;
	} else {
		tranInfo.set(CONTACTS_DATA.value);
	}
});

</script>

<style lang="less" scoped>
.main-con {
	width: 100%;
	height: 100vh;
	background: url("/static/3156/img/b2.png") no-repeat center -50rpx;
	background-size: contain;
	padding-top: 68rpx;
	.nav {
		width: 100%;
		height: 88rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: 0;
		z-index: 999;
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
	.scroll-Y {
		height: 100vh;
		-webkit-overflow-scrolling: touch;
		overflow-y: auto;
		position: relative;
		transform: translateZ(0);
		will-change: transform;
	}
	.content {
		.search {
			width: 95%;
			margin: auto;
			background-color: #fff;
			border-radius: 15px;
			height: 100rpx;
			padding-left: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 5rpx;
			/* #ifndef APP */
			margin-top: 100rpx;
			/* #endif */
			/* #ifdef APP */
			margin-top: 100rpx;
			/* #endif */
			.s-t {
				color: #b8aeae;
			}
		}
		.nav-list {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 20rpx;
			padding: 60rpx 0 30rpx 0;
			.nav-item {
				width: 25%;
				height: 150rpx;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 6rpx;
				.nav-img {
					width: 50rpx;
					height: 50rpx;
				}

				span {
					font-size: 26rpx;
				}
			}
		}
		.contacts-use {
			width: 100%;
			padding: 0 30rpx;
			.title {
				width: 100%;
				height: 55rpx;

				.title-text {
					font-weight: 800;
					font-size: 28rpx;
				}
			}
			.person-list {
				width: 110%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				gap: 15rpx;
				.item {
					width: 100px;
					height: 170rpx;
					background-color: #fff;
					border-radius: 15rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 5rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 20rpx;
					.circle-btn {
						width: 85rpx;
						height: 85rpx;
						// background-color: #e5edf7;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
						position: relative;
						.circle-icon {
							width: 30rpx;
							height: 30rpx;
							position: absolute;
							right: 0;
							bottom: 0;
						}
					}
					.item-name {
						width: 100%;
						overflow: hidden;
						text-align: center;
					}
					.item-t {
						width: 100%;
						font-size: 26rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.contact-list {
			width: 100%;
			margin-top: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			// height: 1000rpx;
			.title {
				width: 100%;
				height: 100rpx;
				padding: 0 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				.title-text {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					gap: 5rpx;
					font-weight: 800;
					font-size: 28rpx;
				}
				.left {
					transform: rotate(-90deg);
					color: #8c8989;
				}
			}
			.p-list {
				height: 60rpx;
				margin-bottom: 0;
			}
			.clist {
				width: 100%;
				// padding: 0px 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 10rpx;
				.item {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 20rpx;
					padding: 0 50rpx;
					padding-bottom: 20rpx;
					border-bottom: 1px solid #f4f4f4;
					.zimu {
						font-size: 26rpx;
						color: #666;
						padding-left: 20rpx;
					}
					.item-person {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						gap: 15rpx;
						.circle-btn {
							width: 85rpx;
							height: 85rpx;
							// background-color: #e5edf7;
							border-radius: 50%;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
							position: relative;
							.circle-icon {
								width: 30rpx;
								height: 30rpx;
								position: absolute;
								right: 0;
								bottom: 0;
							}
						}
						.item-desc {
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							gap: 5rpx;
							text:nth-child(1) {
								font-size: 32rpx;
								font-weight: 400;
							}
							text:nth-child(2) {
								font-size: 26rpx;
								color: #666;
							}
						}
					}
				}
			}
		}
	}
	.edit-dialog {
		width: 600rpx;
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		max-height: 80vh;
		position: relative;

		.edit-header {
			padding: 30rpx 30rpx 0;
			flex-shrink: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.edit-title {
				font-size: 32rpx;
				font-weight: bold;
			}

			.edit-actions {
				.action-btn {
					font-size: 24rpx;
					padding: 10rpx 20rpx;
					background: #007aff;
					color: #fff;
					border-radius: 30rpx;
					border: none;

					&.add {
						background: #007aff;
					}
				}
			}
		}

		.edit-content {
			padding: 0 30rpx 140rpx 30rpx;
			box-sizing: border-box;
			width: 100%;
			min-height: 100%;

			.edit-item {
				margin-bottom: 20rpx;
				border-bottom: 1px solid #eee;
				border-radius: 10rpx;
				padding: 20rpx;

				.edit-item-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 15rpx;

					.edit-label {
						font-size: 28rpx;
						color: #666;
					}
					// .delete-btn{
					// 	border-radius: 30rpx;
					// }
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
}
</style>
