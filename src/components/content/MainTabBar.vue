<template>
  <div>
    <tab-bar class="main-flow">
      <tab-bar-item path="home" itemcolor="yellowgreen">
        <i slot="home-icon" class="icon-items"></i>
        <p slot="home-text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="category">
        <i slot="home-icon" class="icon-items"></i>
        <p slot="home-text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="shopcart">
        <i slot="home-icon" class="icon-items"></i>
        <p slot="home-text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <i slot="home-icon" class="icon-items"></i>
        <p slot="home-text">我的</p>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/commen/tabbar/TabBar";
import TabBarItem from "components/commen/tabbar/TabBarItem";
export default {
  name: "WorkspaceJsonMaintabbar",

  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>