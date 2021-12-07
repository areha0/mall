import Vue from "vue";
import Router from "vue-router"

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
    }
]

const router = new Router({
    routes,
    mode: "history"
})

export default router