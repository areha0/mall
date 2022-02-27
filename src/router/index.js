import Vue from "vue";
import Router from "vue-router"
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
    component: () => import("views/home/Home")
  },
  {
    path: "/category",
    component: () => import("views/category/Category")
  },
  {
    path: "/shopcart",
    component: () => import("views/shopcart/Shopcart")
  },
  {
    path: "/profile",
    component: () => import("views/profile/Profile")
  },
  {
    path: "/address",
    component: () => import("views/address/Address")
  },
  {
    path: "/detail/:goodsid",
    component: () => import("../views/detail/Detail")
  },
  {
    path: "/login",
    component: () => import("views/login/Login")
  },
  {
    path: "/register",
    component: () => import("views/register/Register")
  },
  {
    path: "/search",
    component: () => import("views/search/Search")
  },
  {
    path: "/ensureorder",
    component: () => import("views/ensureorder/EnsureOrder")
  },
  {
    path: "/payment",
    component: () => import("views/payment/Payment")
  },
  {
    path: "/allorders",
    component: () => import("views/allorders/AllOrder")
  },
  {
    path: "/payedorder",
    component: () => import("views/payedorder/PayOrder")
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
  let token = JSON.parse(localStorage.getItem("userInfo")).name;
  let disable = ["/login", "/register"]
  if (token && disable.indexOf(to.path) !== -1) {
    // 你要想跳出去就把你返回到首页
    // alert("您已经完成了登录");
    Notify({ type: 'warning', message: '您已经完成了登录' });
    // console.log(from);
    next("/home")
    return
  };
  next()
})

export default router