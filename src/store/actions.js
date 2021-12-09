export default {
  ifHave(context, payload) {
    // console.log(context.state.cartList);
    return new Promise((resolve, reject) => {
      if (context.state.cartList.length > 0) {
        for (let i = 0; i < context.state.cartList.length; i++) {
          context.state.isHave = true;
          if (context.state.cartList[i].id == payload.id) {
            context.state.isHave = false
            break
          }
        }
      } else {
        // 这个是购物车没有商品的情况下
        context.state.isHave = true;
      }

      if (context.state.isHave) {
        payload.index = context.state.cartList.length
        payload.checked = true;
        this.commit("addTocart", payload);
        resolve({
          state: true,
          message: "已添加至购物车"
        })
        // console.log("商品已添加至购物车");
      } else {
        resolve({
          state: false,
          message: "购物车中已有该商品"
        })
        // console.log("购物车中已有该商品, 去购物车看看吧");
      }
    })

  },

}