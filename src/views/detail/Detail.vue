<template>
  <div id="detail">
    <main-nav-bar></main-nav-bar>

    <scroll ref="detailScroll">
      <detail-swiper
        :topImage="topImage"
        @detailSwiperImgLoad="detailSwiperImgLoad"
      ></detail-swiper>
      <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <ul>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
        <li>nihao</li>
      </ul>
    </scroll>
  </div>
</template> 

<script>
import MainNavBar from "./detailchildren/MainNavBar";
import DetailSwiper from "./detailchildren/DetailSwiper";
import DetailGoodsInfo from "./detailchildren/DetailGoodsInfo";
import DetailShopInfo from "./detailchildren/DetailShopInfo";
import Scroll from "components/commen/scroll/Scroll";

import { detailData, GoodsInfo, Shop } from "../../network/detail";

export default {
  name: "Detail",
  data() {
    return {
      topImage: [],
      goodsInfo: {},
      shop: {},
    };
  },
  components: {
    MainNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
  },
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);

    this.getDetailData(this.$route.params.goodsid);
  },
  methods: {
    /**
     * 监听响应
     */
    detailSwiperImgLoad() {
      // console.log("myScrollRefresh()");
      this.$refs.detailScroll.myScrollRefresh();
    },

    /**
     * 获取数据
     */
    getDetailData(id) {
      detailData(id).then((res) => {
        const detailAllData = res.data.result;
        // console.log(detailAllData);
        // 详情页轮播图数据
        this.topImage = detailAllData.itemInfo.topImages;
        // 详情页商品基本数据
        this.goodsInfo = new GoodsInfo(
          detailAllData.itemInfo,
          detailAllData.shopInfo,
          detailAllData.columns
        );
        // 详情页店铺信息
        this.shop = new Shop(detailAllData.shopInfo);
      });
    },
  },
};
</script>

<style scoped>
/* 掩盖下方的导航栏 */
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  position: relative;
  height: 100vh;
}
/* 详情页面的scroll */
.wrapper {
  height: calc(100% - 44px);
}
</style>