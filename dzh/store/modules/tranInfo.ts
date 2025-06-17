import { defineStore } from "pinia";
import { ref } from "vue";
import { storage } from "/@/cool/utils";
import { Contact } from "/@/dzh";
import { originContactList } from "/@/dzh/store/data";


// 本地缓存
const data = storage.info();

const useTranInfotore = defineStore("tranInfo", function () {

	const info = ref(data.tranInfo);

	function resetData() {
		set(originContactList);
	}
	// async function get() {
	//     return
	// }

	// 设置用户信息
	function set(value: Contact[]) {
		info.value = value;
		storage.set("tranInfo", value);
	}

	return {
		info,
		set,
		resetData
	};
});

export { useTranInfotore };
