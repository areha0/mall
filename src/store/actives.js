export default {
    ifHave(context, payload) {
        console.log(context.state.cartList);
        if (context.state.cartList.length > 0) {
            for (let i = 0; i < context.state.cartList.length; i++) {
                context.state.isHave = false;
                if (context.state.cartList[i].id != payload.id) {
                    context.state.isHave = true
                }
            }
        } else {
            context.state.isHave = true;
        }
        if (context.state.isHave) {
            this.commit("addTocart", payload);
            console.log("商品已添加至购物车");
        } else {
            console.log("购物车中已有该商品, 去购物车看看吧");
        }
    }

}