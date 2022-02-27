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
      return {}
    }
  },
  // 已支付的订单
  getpayorders(state) {
    let list = [];
    state.allorders.forEach(item => {
      if (item.state === 3) list.push(item)
    });
    return list
  },

  // 未支付的订单
  getnopayorders(state) {
    let list = [];
    state.allorders.forEach(item => {
      if (item.state === 2) list.push(item)
    });
    return list
  }


}