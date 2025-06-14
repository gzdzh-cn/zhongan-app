import { router, useStore,storage } from "/@/cool";

const ignoreToken = ["/pages/user/login", "/pages/user/captcha","/pages/index/home","/pages/index/my","/pages/comm/text","/pages/index/pay","/pages/index/tranAfter"];

router.beforeEach((to, next) => {

	const { user } = useStore();
 
	if (ignoreToken.includes(to.path)) {
		next();
	} else {
		if (user.token) {
			next();
			
		} else {
			router.login();
		}
	}
});
