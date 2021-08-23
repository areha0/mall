<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in $store.state.cartList"
      :key="index"
      :product="item"
      :currentIndex="index"
      @load="cartLoad"
    />
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  methods: {
    cartLoad() {
      console.log("我加载好了");
    },
  },
};
</script>

<style scoped>
</style>