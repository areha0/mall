<template>
  <div class="login-nav">
    <nav-bar class="nav">
      <div slot="left" class="icon-back" @click="navback"></div>
      <!-- <div slot="right" class="right-slot">注册</div> -->
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar.vue";
export default {
  name: "LoginNav",
  components: {
    NavBar,
  },
  methods: {
    navback() {
      this.$emit("navback");
    },
  },
};
</script>

<style scoped>
.login-nav {
  position: relative;
  z-index: 12;
}
.nav {
  font-size: 18px;
}
</style>