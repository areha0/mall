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
      <detail-comment-info
        :comment="comment"
        @commentImgLoad="commentImgLoad"
      ></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
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
import DetailCommentInfo from "./detailchildren/DetailCommentInfo";
import GoodsList from "components/content/goodslist/GoodsList";

import {
  detailData,
  GoodsInfo,
  Shop,
  Particular,
  Params,
  Comment,
  recommend,
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
      comment: {},
      recommend: [],
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
    DetailCommentInfo,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);

    // 详情页数据
    this.getDetailData(this.$route.params.goodsid);

    // 推荐商品数据
    this.getRecommendData();
  },
  mounted() {
    this.imgRefresh = this.debounce(
      this.$refs.detailScroll.myScrollRefresh,
      200
    );
    this.$bus.$on("detailImageLoad", () => {
      this.imgRefresh();
    });
  },
  methods: {
    /**
     * 监听响应
     */
    detailSwiperImgLoad() {
      // console.log("myScrollRefresh()");
      this.$refs.detailScroll.myScrollRefresh();
    },
    // 详情参数加载
    particularImgLoad() {
      this.imgRefresh();
    },
    // 评论图片加载
    commentImgLoad() {
      this.$refs.detailScroll.myScrollRefresh();
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
        // 详情页评论数据
        if (detailAllData.rate.list) {
          this.comment = new Comment(detailAllData.rate);
        }
      });
    },
    // 推荐数据
    getRecommendData() {
      recommend().then((res) => {
        this.recommend = res.data.data.list;
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