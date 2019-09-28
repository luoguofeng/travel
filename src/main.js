import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick' //解决移动端点击事件有300ms延迟

import './assets/styles/reset.css' //初始化
import './assets/styles/border.css' //解决1像素边框在多倍屏上的差异
Vue.config.productionTip = false

fastClick.attach(document.body) //fastClick配置


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
