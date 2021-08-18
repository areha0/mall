<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem",
};
</script>

<style scoped>
.slide {
  width: 100%;
  /* flex-shrink为0时, 子元素超出容器时就不会被压缩 */
  flex-shrink: 0;
}
.slide img {
  width: 100%;
}
</style>