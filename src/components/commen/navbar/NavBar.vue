<template>
  <div class="nav-bar">
    <div class="slot-left">
      <slot name="left"></slot>
    </div>
    <div class="slot-center">
      <slot name="center"></slot>
    </div>
    <div class="slot-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  align-items: center;
}
.slot-left,
.slot-right {
  width: 60px;
}
.slot-center {
  flex: 1;
}
</style>