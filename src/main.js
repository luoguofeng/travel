import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick' //解决移动端点击事件有300ms延迟
import VueAwesomeSwiper from 'vue-awesome-swiper' //基于 Swiper4、适用于 Vue 的轮播组件，支持服务端渲染和单页应用。
import store from './store'

import 'styles/reset.css' //初始化
import 'styles/border.css' //解决1像素边框在多倍屏上的差异
import 'styles/iconfont.css' //导入字体图标
import 'swiper/dist/css/swiper.css' 
Vue.config.productionTip = false

fastClick.attach(document.body) //fastClick配置
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 整合axios 
import axios from 'axios'
// 把axios设置给Vue的原型
Vue.prototype.$axios = axios 

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
