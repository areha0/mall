<template>
  <div id="shopcart">
    <cart-nav-bar />
    <scroll class="wrapper" ref="cartscroll">
      <cart-list />
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartNavBar from "./cartchildren/CartNavBar";
import CartList from "./cartchildren/CartList";
import Scroll from "components/commen/scroll/Scroll";
import CartBottomBar from "./cartchildren/CartBottomBar";
import { postShop } from "network/user/shopcart";

export default {
  name: "Shopcart",
  components: {
    CartNavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  data() {
    return {
      todos: this.$store.state.cartList,
    };
  },
  activated() {
    this.$refs.cartscroll.myScrollRefresh();
  },
};
</script>

<style scoped>
#shopcart {
  height: 100vh;
}
.wrapper {
  height: calc(100% - 44px - 49px - 40px);
}
</style>