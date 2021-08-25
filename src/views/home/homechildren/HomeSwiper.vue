<template>
  <div>
    <swiper ref="swiper">
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link" :title="item.title">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/commen/swiper/Swiper";
import SwiperItem from "components/commen/swiper/SwiperItem";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isImgLoad: false,
      totleImgLoad: 0,
    };
  },
  props: {
    banner: {
      type: Array,
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.$refs.swiper.totleWidth = document.documentElement.clientWidth;
    });
  },
  methods: {
    imgLoad() {
      // console.log("图片加载完毕");
      if (!this.isImgLoad) {
        this.$emit("SwiperImgLoad");
        this.$refs.swiper.swiperRun();
      }
      this.isImgLoad = true;
    },
  },
};
</script>  
<style scoped>
</style>