<template>
  <div id="shopcart">
    <cart-nav-bar></cart-nav-bar>
  </div>
</template>

<script>
import CartNavBar from "./cartchildren/CartNavBar";
export default {
  name: "Shopcart",
  components: {
    CartNavBar,
  },
};
</script>

<style scoped>
</style>