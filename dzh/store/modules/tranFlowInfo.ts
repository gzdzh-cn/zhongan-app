import { defineStore } from "pinia";
import { ref } from "vue";
import { originMonthList } from "/@/dzh/store/data";
import {  storage } from "/@/cool/utils";
 
 
// 本地缓存
const data = storage.info();

const useTranFlowInfotore = defineStore("tranFlowInfo", function () {
 
 
	const info = ref(data.tranFlowInfo);

	function resetData() {
		set(originMonthList);
	}
	// async function get() {
    //     return 
 
	// }

	// 设置用户信息
	function set(value: any) {
		info.value = value;
		storage.set("tranFlowInfo", value);
	}


	return {
 
		info,
        set,
		resetData
 
	};
});

export { useTranFlowInfotore };
