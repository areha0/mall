<template>
  <div id="shopcart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import CartNavBar from "./cartchildren/CartNavBar";
import CartList from "./cartchildren/CartList";

export default {
  name: "Shopcart",
  components: {
    CartNavBar,
    CartList,
  },
};
</script>

<style scoped>
</style>