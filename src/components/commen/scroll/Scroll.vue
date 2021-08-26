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
    myPullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType: this.myProbType,
      probeType: this.myProbType,
      pullUpLoad: this.myPullUpLoad,
      // startY: true,
      scrollY: true,
      click: true,
      disableMouse: true,
      disableTouch: false,
    });
    console.log(this.scroll);
    // 监测滚动
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("onScroll", position);
    });
    // 监测下拉更新
    if (this.myPullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("下拉更新");
        this.$emit("pullingUp");
      });
    }
  },

  methods: {
    myScrollTo(positionX, positionY, duration) {
      this.scroll && this.scroll.scrollTo(positionX, positionY, duration);
    },
    myPullingFinish() {
      this.scroll && this.scroll.finishPullUp();
    },
    myScrollRefresh() {
      // console.log(this.scroll.refresh);
      this.scroll && this.scroll.refresh();
      // console.log("nihaoa");
    },
  },
};
</script>

<style scoped>
</style>