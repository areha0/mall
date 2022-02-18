import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

const state = {
    cartList: JSON.parse(localStorage.getItem("shopcart")) || [],
    isHave: false,
    userBaseInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    searchkeys: JSON.parse(localStorage.getItem("searchkeys")) || [],
    currentSearchKey: "",//存储当前的搜索关键字,用于在展示搜索页面进行展示
    searchPosition: 0,//离开搜索页面时的位置
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

})

export default store