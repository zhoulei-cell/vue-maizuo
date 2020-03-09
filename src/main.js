import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './assets/css/reset.css'
import Loading from './plugins/Loading'

// 引入自己实现的rem布局代码
import Rem from './assets/rem/rem'

// 引入自己实现的移动端tap等自定义事件
import Touch from './library/touch'

Vue.use(Loading) // 安装loading

// eslint-disable-next-line no-new
new Rem({ scale: false }) // 初始化
// eslint-disable-next-line no-new
new Touch(document.body) // 初始化

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
