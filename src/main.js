// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

// 字体
import "@/assets/font/iconfont.css"

Vue.config.productionTip = false

// mint-ui
import 'mint-ui/lib/style.css'
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


// 在进入路由之前 每一次都会执行此方法 ，有拦截功能
router.beforeEach(function(to,from,next){
  document.title = to.meta.title;
  //console.log(to)
  next()
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
