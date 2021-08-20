<template>
  <div id="detail" class="main-flow">
    <main-nav-bar class="detail-navbar"></main-nav-bar>

    <scroll ref="detailScroll">
      <detail-swiper
        :topImage="topImage"
        @detailSwiperImgLoad="detailSwiperImgLoad"
      ></detail-swiper>
      <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-particular-info
        :particular="particular"
        @particularImgLoad="particularImgLoad"
      ></detail-particular-info>
      <detail-params-info :params="params"></detail-params-info>
    </scroll>
  </div>
</template> 

<script>
import MainNavBar from "./detailchildren/MainNavBar";
import DetailSwiper from "./detailchildren/DetailSwiper";
import DetailGoodsInfo from "./detailchildren/DetailGoodsInfo";
import DetailShopInfo from "./detailchildren/DetailShopInfo";
import Scroll from "components/commen/scroll/Scroll";
import DetailParticularInfo from "./detailchildren/DetailParticularInfo";
import DetailParamsInfo from "./detailchildren/DetailParamsInfo";

import {
  detailData,
  GoodsInfo,
  Shop,
  Particular,
  Params,
} from "../../network/detail";

export default {
  name: "Detail",
  data() {
    return {
      topImage: [],
      goodsInfo: {},
      shop: {},
      particular: {},
      imgRefresh: null,
      params: {},
    };
  },
  components: {
    MainNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailParticularInfo,
    DetailParamsInfo,
  },
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);

    this.getDetailData(this.$route.params.goodsid);
  },
  mounted() {
    this.imgRefresh = this.debounce(
      this.$refs.detailScroll.myScrollRefresh,
      200
    );
  },
  methods: {
    /**
     * 监听响应
     */
    detailSwiperImgLoad() {
      // console.log("myScrollRefresh()");
      this.$refs.detailScroll.myScrollRefresh();
    },
    particularImgLoad() {
      this.imgRefresh();
    },

    /**
     * 防抖函数
     */
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, delay);
      };
    },

    /**
     * 获取数据
     */
    getDetailData(id) {
      detailData(id).then((res) => {
        const detailAllData = res.data.result;
        console.log(detailAllData);
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
        // 详情页详情信息
        this.particular = new Particular(detailAllData.detailInfo);
        //  详情页参数数据
        this.params = new Params(
          detailAllData.itemParams.info,
          detailAllData.itemParams.rule
        );
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
.detail-navbar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.wrapper {
  height: calc(100% - 44px);
}
</style>