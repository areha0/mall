<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import HomeSwiper from "./homechildren/HomeSwiper";
import HomeRecommend from "./homechildren/HomeRecommend";

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
.home-nav {
  background-color: Pink;
  color: #ffffff;
  font-size: 18px;
}
</style>