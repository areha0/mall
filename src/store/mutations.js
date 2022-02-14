export default {
    // 每次在修改vuex时都需要对localStorage进行操作, 以保存当前的状态
    addTocart(state, payload) {
        // 注意: 在购物车中添加商品时, 我们要判断一下该商品是否已经存在, 
        // mutations中的方法最好是只处理一件事, 在这里就是只添加对象, 判断商品是否存在就放在actions中
        state.cartList.push(payload);
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    decrement(state, index) {
        state.cartList[index].count--;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    increment(state, index) {
        state.cartList[index].count++;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    checkboxClick(state, payload) {
        state.cartList[payload.index].checked = !payload.checked;
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    selectAll(state) {
        state.cartList.forEach(item => { item.checked = true });
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    selectNone(state) {
        state.cartList.forEach(item => { item.checked = false });
        localStorage.setItem("shopcart", JSON.stringify(state.cartList));
    },
    setUser(state, user) {
        // 将user存入到locaStorage中
        localStorage.setItem("userInfo", JSON.stringify(user));
        // 将信息存到vuex中
        state.userBaseInfo = user
    },
    setCart(state, shopcart) {
        localStorage.setItem("shopcart", JSON.stringify(shopcart));
        state.cartList = shopcart
    },

    // 搜索历史
    addHistory(state, key) {
        // console.log(key);
        if (state.searchkeys.indexOf(key) === -1) {
            state.searchkeys.unshift(key);
            localStorage.setItem("searchkeys", JSON.stringify(state.searchkeys));
        }
    }
}