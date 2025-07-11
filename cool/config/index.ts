import dev from "./dev";
import prod from "./prod";

// 是否开发模式
export const isDev = import.meta.env.MODE === "development";

// 配置
export const config = {
	// 项目信息
	app: {
		name: "领南",
		desc: "",
		// 页面配置
		pages: {
			login: "/pages/user/login",
		},
		// 微信配置
		wx: {
			// 小程序
			mini: {
				appid: "",
			},
			// 公众号
			mp: {
				appid: "wx915c18282f055d55",
				debug: false,
			},
			// App
			app: {
				appid: "",
			},
		},
	},

	// 调试
	test: {
		token: "",
		mock: false,
		eps: false,
	},

	// 忽略
	ignore: {
		token: ["/app/user/login/wxMiniLogin"],
	},

	// 当前环境
	...(isDev ? dev : prod),
};

export * from "./proxy";
