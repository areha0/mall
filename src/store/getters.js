export default {
  cartLength(state) {
    return state.cartList.length || 0
  },

  // 返回购物车中被选中的商品id
  cartSelect(state) {
    let list = [];
    state.cartList.forEach(item => {
      if (item.checked) {
        list.push(item)
      }
    })
    return list
  },
  defaultAddress(state) {
    if (state.addressList.length) {
      return state.addressList[0]
    } else {
      return []
    }
  },


}