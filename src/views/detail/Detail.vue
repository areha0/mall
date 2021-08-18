<template>
  <div id="detail">
    <main-nav-bar></main-nav-bar>
    <detail-swiper :topImage="topImage"></detail-swiper>
  </div>
</template>

<script>
import MainNavBar from "./detailchildren/MainNavBar";
import DetailSwiper from "./detailchildren/DetailSwiper";

import { detailData } from "../../network/detail";

export default {
  name: "Detail",
  data() {
    return {
      topImage: [],
    };
  },
  components: {
    MainNavBar,
    DetailSwiper,
  },
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);
    this.getDetailData(this.$route.params.goodsid);
  },
  methods: {
    getDetailData(id) {
      detailData(id).then((res) => {
        // console.log(res.data.result.itemInfo.topImages);
        this.topImage = res.data.result.itemInfo.topImages;
      });
    },
  },
};
</script>

<style scoped>
</style>