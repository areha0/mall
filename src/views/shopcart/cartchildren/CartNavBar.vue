<template>
  <nav-bar class="detail-navbar">
    <div slot="center">购物车({{ cartLength }})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";

import { mapGetters } from "vuex";
export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    // 使用mapGetters直接使用getters中的方法
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.detail-navbar {
  background-color: rgb(247, 150, 166);
  color: #fff;
  position: relative;
  z-index: 10;
}
</style>