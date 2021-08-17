<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      message: "我是scroll",
    };
  },
  props: {
    myProbType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // probeType: this.myProbType,
        // probeType: 0,
        pullUpLoad: true,
        startY: true,
        click: true,
      });
      console.log(this.scroll);
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("onScroll", position);
      });
    }, 1000);
  },
  methods: {
    myScrollTo(positionX, positionY, duration) {
      this.scroll.scrollTo(positionX, positionY, duration);
    },
  },
};
</script>

<style scoped>
</style>