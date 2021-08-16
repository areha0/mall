<template>
  <div id="home">
    <nav-bar class="home-nav main-flow">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-feature></home-feature>
    <ul>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
      <li>liebiao</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import HomeSwiper from "./homechildren/HomeSwiper";
import HomeRecommend from "./homechildren/HomeRecommend";
import HomeFeature from "./homechildren/HomeFeature";

import { homeMultidata } from "network/home";
import HomeRecommendVue from "./homechildren/HomeRecommend.vue";
export default {
  name: "WorkspaceJsonHome",
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  created() {
    homeMultidata().then((res) => {
      // console.log(res);
      this.banner = res.data.data.banner.list;
      // console.log(this.banner);
      this.recommend = res.data.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0 50px;
}
.home-nav {
  background-color: Pink;
  color: #ffffff;
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>