<template>
  <div class="background-img">
    <img src="~assets/img/common/loginbgc.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Background",
};
</script>

<style scoped>
.background-img {
  position: absolute;
  z-index: 10;
  height: 100%;
}
.background-img img {
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
</style>