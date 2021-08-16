<template>
  <div id="home">
    <nav-bar class="home-nav main-flow">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-feature></home-feature>
    <tab-control :tabtitle="['流行', '新款', '精选']"></tab-control>
    <goods-list :popgoods="goods.pop.list"></goods-list>

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
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";

import { homeMultidata, homegoods } from "network/home";
export default {
  name: "WorkspaceJsonHome",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
  },
  created() {
    this.getHomeMultidata();
    this.getHomegoods("pop");
    this.getHomegoods("sell");
    this.getHomegoods("new");
  },
  methods: {
    // 获取首页轮播图数据
    getHomeMultidata() {
      homeMultidata().then((res) => {
        // console.log(res);
        this.banner = res.data.data.banner.list;
        // console.log(this.banner);
        this.recommend = res.data.data.recommend.list;
      });
    },
    // 获取首页商品数据
    getHomegoods(type) {
      let page = this.goods[type].page + 1;
      homegoods(type, page).then((res) => {
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list);
      });
      this.goods[type].page++;
    },
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0 50px;
}
.home-nav {
  background-color: rgb(247, 150, 166);
  color: #ffffff;
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>