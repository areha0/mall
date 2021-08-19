<template>
  <div>
    <swiper ref="swiper" class="detail-swiper">
      <swiper-item v-for="(item, index) in topImage" :key="index">
        <img :src="item" alt="" @load="imgLoad" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/commen/swiper/Swiper";
import SwiperItem from "components/commen/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImage: {
      type: Array,
    },
  },
  data() {
    return {
      isImgLoad: false,
    };
  },
  methods: {
    imgLoad() {
      if (!this.isImgLoad) {
        this.$refs.swiper.swiperRun();
        this.$emit("detailSwiperImgLoad");
      }
      this.isImgLoad = true;
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>