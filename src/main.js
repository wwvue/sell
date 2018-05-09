// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Header from './components/Header'
import Goods from './components/Goods'
import Ratings from './components/Ratings'
import Seller from './components/Seller'
Vue.config.productionTip = false
Vue.use(VueRouter)
var router = new VueRouter({
	mode: 'history',
	linkActiveClass:'active',
	routes:[
		{
			path: '/',
			redirect: '/goods'
		},
		{
			path: '/goods',
			component: Goods
		},
		{
			path: '/ratings',
			component: Ratings
		},
		{
			path: '/seller',
			component: Seller
		}
	]
})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
