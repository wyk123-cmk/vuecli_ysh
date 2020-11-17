import 'babel-core/register'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import routes from './routes'
import './assets/css/my-mintui.scss'

//Mock.bootstrap();
import ysdContext from './common/js/YsdContext'
import util from './common/js/util'
import * as filters from './common/js/filter'
import 'swiper/dist/css/swiper.css'

import './assets/css/ysd.css'
import './assets/css/iconfont.css'
import './assets/css/jiarui.css'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true

// 全局注册过滤器
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
});


Vue.prototype.$Context = ysdContext
Vue.prototype.$util = util;

Vue.use(MintUI);
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueClipboard)

const router = new VueRouter({
	mode: 'history',
	routes
})

import {
	getMyWalletAmount
} from "./api/api";
import {
	MessageBox
} from "mint-ui";

router.beforeEach((to, from, next) => {
	// if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
	//   window.entryUrl = location.href.split('#')[0];
	// }
	// chrome
	// document.body.scrollTop = 0
	// firefox
	// document.documentElement.scrollTop = 0
	// safari
	// window.pageYOffset = 0
	// next()
	let pagepath = ['/jkd', '/ckd', '/yfgs', '/me', '/logisticsInfo']
	if (pagepath.indexOf(to.path) > -1) {
		store.state.menuroute = to.path.substring(1);
	}
	ysdContext.delScrollLoad();
	if (to.name) {
		document.title = to.name + '-仪商汇快运'
	}
	let token = store.state.token;
	if (token === "") {
		localStorage.removeItem('token');
		store.state.token = undefined;
	} else if (!token) {
		token = localStorage.getItem('token');
	} else {
		//刷新localstorage值
		localStorage.setItem('token', token);
		store.state.token = undefined;
		getMyWalletAmount().then(data => {
			if (data && data.amount < 0) {
				MessageBox.confirm("您已欠费，请及时充值").then(
					action => {
						next({
							path: "/myRefill",
							query: {
								redirect: to.fullPath
							}
						})
					}
				);
			}
		});
	}
	if (to.meta.anonymous) {
		next()
	} else if (!token && to.path.indexOf('/login') != 0) {
		next({
			path: '/login',
			query: {
				redirect: to.fullPath
			}
		})
	} else {
		next()
	}
})

router.afterEach(transition => {

});

window._this = new Vue({
	//el: '#app',
	//template: '<App/>',
	router,
	store,
	//components: { App }
	render: h => h(App)
}).$mount('#app')

export default router;
