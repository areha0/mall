<template>
  <div id="shopcart">
    <cart-nav-bar />
    <scroll class="wrapper" ref="cartscroll">
      <cart-list />
    </scroll>
  </div>
</template>

<script>
import CartNavBar from "./cartchildren/CartNavBar";
import CartList from "./cartchildren/CartList";
import Scroll from "components/commen/scroll/Scroll";

export default {
  name: "Shopcart",
  components: {
    CartNavBar,
    CartList,
    Scroll,
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
  height: calc(100% - 44px - 49px);
}
</style>