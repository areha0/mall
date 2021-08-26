import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import toast from "components/commen/toast/index"
import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"


FastClick.attach(document.body)
Vue.use(toast)


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


Vue.use(LazyLoad, {
  loading: require("./assets/img/common/shuosuo.jpg")
})