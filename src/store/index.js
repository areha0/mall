import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actives"
import getters from "./getters"

Vue.use(Vuex)

const state = {
    cartList: [],
    isHave: false
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,

})

export default store