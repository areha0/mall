<template>
  <div>
    <swiper>
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
    isImgLoad: false,
  },
  props: {
    banner: {
      type: Array,
    },
  },
  methods: {
    imgLoad() {
      // console.log("图片加载完毕");
      if (!this.isImgLoad) this.$emit("SwiperImgLoad");
      this.isImgLoad = !this.isImgsLoad;
    },
  },
};
</script>
<style scoped>
.slide {
  width: 100%;
  /* flex-shrink为0时, 子元素超出容器时就不会被压缩 */
  flex-shrink: 0;
}
.slide a img {
  width: 100%;
}
</style>