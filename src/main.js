import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import toast from "components/commen/toast/index"
import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
// import Mint from 'mint-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import "animate.css"
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);
Vue.use(Vant);
Vue.use(ElementUI);
FastClick.attach(document.body)
Vue.use(toast)
// Vue.use(Mint);
console.log('nihaoa, 我只是来试验一下分支的拉取和合并');
console.log("nihaoa, 我是挂在feature_im下的");

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

// 将路由与公共数据在实例中进行挂载
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


// 加载图片时有一个等待图片
Vue.use(LazyLoad, {
  loading: require("./assets/img/common/shuosuo.jpg")
})