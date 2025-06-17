interface Contact {
	id?: number;
	name?: string;
	type?: string;
	colorNum?: number;
	phoneNumber?: string;
	receiveBankName?: string;
	letter?: string;
	receiveBankAccount?: string;
	isIcon?: boolean;
	sort?: number;
	isTop?: boolean;
	errorMsg?: string;
}
interface UserInfo {
	username?: string;
	desc?: string;
	password?: string;
	avatar?: string;
	money?: number;
	isIcon?: boolean;
	errorMsg?: string;
}
// 定义列表项类型
interface ListItem {
	type: "message" | "normal" | "ad" | "money" | "tip";
	title?: string;
	transferType?: string; // 转账类型
	transferName?: string; // 转账名称
	img?: {
		url: string;
		extname: string;
		name: string;
	}[];
	icon?: string;
	content?: string;
	desc?: string;
	time?: string;
	reward?: string;
	rewardImg?: string;
	moneyType?: string;
	money?: string;
	tip?: string;
	tipText?: string;
	autoBtn?: string;
	style?: string;
	isTransfer?: boolean;
	isInterest?: boolean;
	sort?: number;
}

// 定义月份数据类型
interface MonthData {
	month: string;
	list: ListItem[];
}

// 定义月份列表类型
type MonthList = MonthData[];

export type { Contact,UserInfo,ListItem,MonthData,MonthList };