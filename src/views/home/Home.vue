<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
export default {
  name: "WorkspaceJsonHome",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.home-nav {
  background-color: Pink;
  color: #ffffff;
  font-size: 18px;
}
</style>