import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "/@/cool/utils";
import { Contact } from "/@/dzh";

// 本地缓存
const data = storage.info();

const useTranInfotore = defineStore("tranInfo", function () {
	const info = ref(data.tranInfo);

	// async function get() {
	//     return
	// }

	// 设置用户信息
	function set(value: Contact[]) {
		console.log("set", value);
		info.value = value;
		storage.set("tranInfo", value);
	}

	return {
		info,
		set,
	};
});

export { useTranInfotore };
