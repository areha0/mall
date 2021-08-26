export default {
    addTocart(state, payload) {
        // 注意: 在购物车中添加商品时, 我们要判断一下该商品是否已经存在, 
        // mutations中的方法最好是只处理一件事, 在这里就是只添加对象, 判断商品是否存在就放在actions中
        state.cartList.push(payload)
    },
    decrement(state, index) {
        state.cartList[index].count--
    },
    increment(state, index) {
        state.cartList[index].count++
    },
    checkboxClick(state, payload) {
        state.cartList[payload.index].checked = !payload.checked;
    },
    selectAll(state) {
        state.cartList.forEach(item => { item.checked = true })
    },
    selectNone(state) {
        state.cartList.forEach(item => { item.checked = false })
    }
}