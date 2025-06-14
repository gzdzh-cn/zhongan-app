import { useSettingStore } from "/@/dzh/store/modules/setting";
import { useUserInfotore } from "/@/dzh/store/modules/userInfo";
import { useTranInfotore } from "/@/dzh/store/modules/tranInfo";
import { useTranFlowInfotore } from "/@/dzh/store/modules/tranFlowInfo";

export function dzhStore() {
	return {
		setting: useSettingStore(),
		userInfo: useUserInfotore(), // 用户信息
		tranInfo: useTranInfotore(), // 交易信息
		tranFlowInfo: useTranFlowInfotore(), // 交易流水信息
	};
}
