import {   Contact, MonthList, UserInfo } from "/@/dzh";
const originUserData: UserInfo = {
	username: "llt888999",
	password: "",
	avatar: "",
	desc: "可用活期余额：HKD 47,434.97,今日可转账限额：HKD200,000.00",
	money: 47434.97,
	isIcon: true,
	errorMsg: "付款账户状态异常，该交易未能处理。请于工作时间内联系我们",
};
const originContactList:Contact[]=([
	{
		id: 1,
		name: "AU-YEUNG Y** C****",
		type: "手机号码",
		colorNum: 0,
		phoneNumber: "+852-54420110",
		receiveBankName: "387 众安银行(ZA Bank)",
		receiveBankAccount: "+852-54420110",
		isIcon: true,
		sort: 0,
		isTop: false,
	},
	{
		id: 2,
		name: "AU-YEUNG K*** H*",
		type: "手机号码",
		colorNum: 1,
		phoneNumber: "jeffreynavy0325@gmal.com",
		receiveBankName: "387 众安银行(ZA Bank)",
		receiveBankAccount: "jeffreynavy0325@gmal.com",
		isIcon: true,
		sort: 0,
		isTop: false,
	},
	{
		id: 3,
		name: "BATALLA E**** M*******",
		type: "手机号码",
		colorNum: 0,
		phoneNumber: "+852-95310588",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "+852-95310588",
		isIcon: false,
		sort: 0,
		isTop: false,
	},
	{
		id: 4,
		name: "CHAN Y* H**",
		type: "手机号码",
		colorNum: 0,
		phoneNumber: "+852-90292318",
		receiveBankName: "387 众安银行(ZA Bank)",
		receiveBankAccount: "+852-90292318",
		isIcon: false,
		sort: 0,
		isTop: false,
	},
	{
		id: 5,
		name: "DON...",
		type: "手机号码",
		colorNum: 4,
		phoneNumber: "+852-84821434",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "852-84821434",
		isIcon: false,
		sort: 1,
		isTop: true,
	},
	{
		id: 6,
		name: "LEUNG W*...",
		type: "手机号码",
		colorNum: 2,
		phoneNumber: "+852-84821434",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "+852-84821434",
		isIcon: false,
		sort: 2,
		isTop: true,
	},
	{
		id: 7,
		name: "WONG T*...",
		type: "手机号码",
		colorNum: 4,
		phoneNumber: "+852-84821434",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "+852-84821434",
		isIcon: false,
		sort: 3,
		isTop: true,
	},
	{
		id: 8,
		name: "LO K*** M***",
		type: "手机号码",
		colorNum: 0,
		phoneNumber: "+852-84821434",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "+852-84821434",
		isIcon: false,
		sort: 4,
		isTop: true,
	},
	{
		id: 9,
		name: "BUNSIT K***M**",
		type: "手机号码",
		colorNum: 0,
		phoneNumber: "+852-84821434",
		receiveBankName: "预设收款银行",
		receiveBankAccount: "+852-84821434",
		isIcon: false,
		sort: 0,
		isTop: false,
	},
]);

// 月份数组改为计算属性
const oringinMonthArray = ["本月", "5月", "4月", "3月"];
const originMonthList: MonthList = [
	{
		month: oringinMonthArray[0],
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
				img: [{
					url: '/static/3156/img/icon1.png',
					extname: 'png',
					name: 'icon1.png'
				}],
				title: "有 2 个新用户专属任务在等你！即刻做任务赚丰富奖...",
				time: "6月15日 13:20",
				reward: "赚奖赏",
				rewardImg: "/static/3156/img/t_27.png",
				sort: 2,
			},
			{
				type: "money",
				img: [{
					url: '/static/3156/img/t_28.png',
					extname: 'png',
					name: 't_28.png'
				}],
				title: "港元- 派息",
				icon: "/static/3156/img/t_29.png",
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
		month: oringinMonthArray[1],
		list: [
			{
				type: "message",
				img: [{
					url: '/static/3156/img/t_31.jpg',
					extname: 'jpg',
					name: 't_31.jpg'
				}],
				title: "消息(+14)",
				icon: "/static/3156/img/t_32.jpg",
				content: "31/5 截止！领高达 HKD 880！",
				desc: "不要错过领高达 HKD 880 的最后机会...",
				sort: 1,
				time: "6月15日 14:30",
			},
			{
				type: "ad",
				img: [{
					url: '/static/3156/img/ad3.png',
					extname: 'png',
					name: 'ad3.png'
				}],
				style: "width: 100%; height: 210rpx",
				sort: 2,
			},
			{
				type: "money",
				img: [{
					url: '/static/3156/img/t_28.png',
					extname: 'png',
					name: 't_28.png'
				}],
				title: "港元- 派息",
				icon: "/static/3156/img/t_29.png",
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
		month: oringinMonthArray[2],
		list: [
			{
				type: "normal",
				img: [{
					url: '/static/3156/img/icon2.png',
					extname: 'png',
					name: 'icon2.png'
				}],
				title: "签到成功",
				time: "4月2日 00:55",
				tipText: "爆肌 Alfle",
				sort: 2,
			},
			{
				type: "normal",
				img: [{
					url: '/static/3156/img/icon2.png',
					extname: 'png',
					name: 'icon2.png'
				}],
				title: "成功用新设备登录",
				time: "4月2日 00:30",
				sort: 1,
			},

			{
				type: "money",
				img: [{
					url: '/static/3156/img/t_28.png',
					extname: 'png',
					name: 't_28.png'
				}],
				title: "港元- 派息",
				icon: "/static/3156/img/t_29.png",
				time: "4月1日 01:28",
				moneyType: "+HKD",
				money: "0.18",
				isInterest: true,
				sort: 3,
			},
			{
				type: "money",
				img: [{
					url: '/static/3156/img/icon2.png',
					extname: 'png',
					name: 'icon2.png'
				}],
				transferType: "转给",
				transferName: "HEN Z******",
				time: "4月1日 00:34",
				moneyType: "-HKD",
				money: "50.00",
				tip: "成功入账",
				isInterest: false,
				sort: 4,
			},
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
	{
		month: oringinMonthArray[3],
		list: [
			{
				type: "normal",
				img: [{
					url: '/static/3156/img/icon2.png',
					extname: 'png',
					name: 'icon2.png'
				}],
				title: "签到成功",
				time: "3月16日 09:05",
				tipText: "爆肌 Alfle",
				sort: 2,
			},
			{
				type: "normal",
				img: [{
					url: '/static/3156/img/icon2.png',
					extname: 'png',
					name: 'icon2.png'
				}],
				title: "成功用新设备登录",
				time: "3月15日 08:10",
				sort: 1,
			},

			{
				type: "money",
				img: [{
					url: '/static/3156/img/t_28.png',
					extname: 'png',
					name: 't_28.png'
				}],
				title: "港元- 派息",
				icon: "/static/3156/img/t_29.png",
				time: "3月1日 01:28",
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
			// 	isInterest: false,
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
	}
];
export { originUserData, originMonthList,oringinMonthArray,originContactList};