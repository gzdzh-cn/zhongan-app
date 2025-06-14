import { defineStore } from "pinia";
import { ref } from "vue";
 
import {  storage } from "/@/cool/utils";
 
 
// 本地缓存
const data = storage.info();

const useTranFlowInfotore = defineStore("tranFlowInfo", function () {
 
 
	const info = ref(data.tranFlowInfo);

 
	// async function get() {
    //     return 
 
	// }

	// 设置用户信息
	function set(value: any) {
        console.log("set",value);
		info.value = value;
		storage.set("tranFlowInfo", value);
	}


	return {
 
		info,
        set
 
	};
});

export { useTranFlowInfotore };
