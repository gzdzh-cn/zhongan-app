import { defineStore } from "pinia";
import { ref } from "vue";
import {  storage } from "/@/cool/utils";
import { originUserData } from "/@/dzh/store/data";
 
// 本地缓存
const data = storage.info();
 
const useUserInfotore = defineStore("userInfo", function () {
 
 
	const info = ref(data.userInfo);

	function resetData() {
		console.log("resetData originUserData", originUserData);
		set(originUserData);
	}

	// 设置用户信息
	function set(value: any) {
		info.value = value;
		storage.set("userInfo", value);
	}


	return {
		info,
        set,
		resetData
 
	};
});

export { useUserInfotore };
