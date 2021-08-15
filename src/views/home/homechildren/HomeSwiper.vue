<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
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
  props: {
    banner: {
      type: Array,
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