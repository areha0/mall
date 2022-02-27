<template>
  <div id="app" class="main-flow">
    <keep-alive exclude="Detail,Search,EnsureOrder,AllOrder,PayOrder">
      <router-view />
    </keep-alive>
    <main-tab-bar class="tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("./assets/css/base");
</style>
