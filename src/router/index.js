import Vue from "vue";
import Router from "vue-router";
import { Notify } from 'vant';

Vue.use(Router);

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "home"*/ "views/home/Home")
  },
  {
    path: "/category",
    component: () => import(/* webpackChunkName: "category"*/ "views/category/Category")
  },
  {
    path: "/shopcart",
    component: () => import(/* webpackChunkName: "shopcart"*/ "views/shopcart/Shopcart")
  },
  {
    path: "/profile",
    component: () => import(/* webpackChunkName: "profile"*/ "views/profile/Profile")
  },
  {
    path: "/address",
    component: () => import(/* webpackChunkName: "address"*/ "views/address/Address")
  },
  {
    path: "/detail/:goodsid",
    component: () => import(/* webpackChunkName: "detail"*/ "../views/detail/Detail")
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "login"*/ "views/login/Login")
  },
  {
    path: "/register",
    component: () => import(/* webpackChunkName: "register"*/ "views/register/Register")
  },
  {
    path: "/search",
    component: () => import(/* webpackChunkName: "search"*/ "views/search/Search")
  },
  {
    path: "/ensureorder",
    component: () => import(/* webpackChunkName: "ensureorder"*/ "views/ensureorder/EnsureOrder")
  },
  {
    path: "/payment",
    component: () => import(/* webpackChunkName: "payname"*/ "views/payment/Payment")
  },
  {
    path: "/allorders",
    component: () => import(/* webpackChunkName: "allorders"*/ "views/allorders/AllOrder")
  },
  {
    path: "/payedorder",
    component: () => import(/* webpackChunkName: "payedorder"*/ "views/payedorder/PayOrder")
  }
]

const router = new Router({
  routes,
  mode: "history"
})

// 前置导航守卫, 如果在已经登录的状态下, 再跳转到登录/注册界面就不允许
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("userInfo")) {
    localStorage.setItem("userInfo", "{}")
  };
  let token = JSON.parse(localStorage.getItem("userInfo")).token;
  let disable = ["/login", "/register"]
  // 如果已经登陆
  if (token && disable.indexOf(to.path) !== -1) {
    Notify({ type: 'warning', message: '您已经完成了登录' });
    next("/home")
    return
  };
  // 如果没有登录,不能进入地址管理,订单管理,生成订单,订单支付完成页面
  let autoRequired = ["/address", "/ensureorder", "/payment", "/allorders", "/payedorder"];
  if (!token && autoRequired.indexOf(to.path) !== -1) {
    Notify({ type: "warning", message: "请您先登录" });
    next("/login");
    return
  }
  next()
})

export default router