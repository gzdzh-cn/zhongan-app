import { useSettingStore } from "/@/dzh/store/modules/setting";
import { useUserInfotore } from "/@/dzh/store/modules/userInfo";
import { useTranInfotore } from "/@/dzh/store/modules/tranInfo";
import { useTranFlowInfotore } from "/@/dzh/store/modules/tranFlowInfo";
import { originUserData, originMonthList,oringinMonthArray,originContactList } from "/@/dzh/store/data";
export function dzhStore() {
	return {
		setting: useSettingStore(),
		userInfo: useUserInfotore(), // 用户信息
		tranInfo: useTranInfotore(), // 交易信息
		tranFlowInfo: useTranFlowInfotore(), // 交易流水信息
		originUserData: originUserData, // 原始用户信息
		originMonthList: originMonthList, // 原始月份列表
		oringinMonthArray: oringinMonthArray, // 原始月份数组
		originContactList: originContactList, // 原始联系人列表
	};
}
