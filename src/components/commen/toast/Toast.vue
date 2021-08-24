<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message, delay) {
      this.isShow = true;
      this.message = message;
      //   console.log(this.message, this.isShow);
      let showTimer;
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        this.isShow = false;
      }, delay);
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  z-index: 12;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 6px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  max-width: 300px;
  height: 30px;
  line-height: 30px;
}
</style>