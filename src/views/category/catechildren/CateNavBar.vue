<template>
  <div class="cate-nav-bar">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";

export default {
  name: "CateNavBar",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.cate-nav-bar {
  background-color: rgb(247, 150, 166);
  color: #fff;
  position: relative;
  z-index: 10;
}
</style>