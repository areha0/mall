<template>
  <div class="check">
    <slot name="top" class="top"></slot>
    <slot name="form" class="form"></slot>
  </div>
</template>

<script>
export default {
  name: "Check",
};
</script>

<style scoped>
.check {
  position: absolute;
  z-index: 12;
  height: 75%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>