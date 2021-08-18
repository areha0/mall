<template>
  <div id="my-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>

    <div class="indicator" v-if="showIndicator && slideCount > 1">
      <slot name="indicator">
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{ 'indi-active': index == currentIndex - 1 }"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // 图片显示时间: 默认3s
    interval: {
      type: Number,
      default: 3000,
    },
    // 图片改变动画时间: 默认0.3s
    animDuration: {
      type: Number,
      default: 300,
    },
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, // 图片个数
      totleWidth: 0, // 显示区域的大小
      swiperStyle: {}, // 其实就是区域样式
      currentIndex: 1, // 当前检索
      scrolling: false, // 是否滚动
    };
  },
  methods: {
    // 将原有的图片列表分别在前后加上两张图片, 实现图片序列的无缝切换
    handleDom() {
      const swiperEl = document.querySelector(".swiper");
      let slidesList = swiperEl.getElementsByClassName("slide");
      this.slideCount = slidesList.length;
      console.log(this.slideCount);
      if (this.slideCount > 1) {
        let cloneFirst = slidesList[0].cloneNode(true);
        let cloneLast = slidesList[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesList[0]);
        swiperEl.appendChild(cloneFirst);
        // 显示区域的宽度
        this.totleWidth = swiperEl.offsetWidth;
        // swiperStyle其实就是swiperEl的内联样式
        this.swiperStyle = swiperEl.style;
      }
      // 将初始显示的图片是第一张
      this.setTransform(-this.totleWidth);
    },

    // 开启定时器, 让图片序列动起来
    startTimer() {
      this.playTimer = setInterval(() => {
        // 1. 索引加一
        this.currentIndex++;
        // 2. 图片进行滚动
        this.scrollContent(-this.currentIndex * this.totleWidth);
      }, this.interval);
    },

    // 关闭定时器
    stopTimer() {
      // ** 注意这里的全局
      window.clearInterval(this.playTimer);
    },

    // 图片滚动
    scrollContent(currentPosition) {
      // 开启滚动
      this.scrolling = true;
      // 动画过渡时间
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      // 动画水平移动
      this.setTransform(currentPosition);
      // 检验是否移动后处于最首或最末
      this.checkTransform();
      // 关闭滚动
      this.scrolling = false;
    },

    setTransform(position) {
      this.swiperStyle.transform = `translate(${position}px, 0)`;
    },

    checkTransform() {
      // ** 注意是全局的定时器, 在完成过度动画之后检验是否处于最首或最末, 并在0ms转移到相应位置
      window.setTimeout(() => {
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          // console.log(123);
        } else if (this.currentIndex < 1) {
          this.currentIndex = this.slideCount;
        }
        this.setTransform(-this.currentIndex * this.totleWidth);
      }, this.animDuration);
    },

    // 触摸开始, 确定触摸开始的水平位置
    touchStart(event) {
      // 如果正在滚动, 则触摸动作失效
      if (this.scrolling) {
        return;
      }
      // 触摸开始时, 停止计时器
      this.stopTimer();
      this.startX = event.touches[0].clientX;
      // console.log(this.startX);
    },
    // 移动时, 记录移动距离, 并在一移动过程中使图片随之移动
    touchMove(event) {
      this.currentX = event.touches[0].clientX;
      this.distanceX = this.currentX - this.startX;
      // console.log(this.moveX);
      let currentPosition = -this.currentIndex * this.totleWidth;
      let currentMove = this.distanceX + currentPosition;
      this.setTransform(currentMove);
    },
    // 触摸结束
    touchEnd(event) {
      // 判定触摸的方向以及大小, 决定图片序列移动的方向
      let absDistance = Math.abs(this.distanceX);
      if (this.distanceX == 0) {
        return;
      } else if (
        this.distanceX < 0 &&
        absDistance > this.totleWidth * this.moveRatio
      ) {
        this.currentIndex++;
      } else if (
        this.distanceX > 0 &&
        absDistance > this.totleWidth * this.moveRatio
      ) {
        this.currentIndex--;
      }
      // 对图片序列进行滚动
      this.scrollContent(-this.currentIndex * this.totleWidth);
      // 开启定时器
      this.startTimer();
    },
    swiperRun() {
      this.startTimer();
      this.handleDom();
    },
  },
};
</script>

<style scoped>
#my-swiper {
  overflow: hidden;
  position: relative;
}
.swiper {
  display: flex;
}
.indicator {
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
.indi-active {
  background-color: rgb(212, 38, 90);
}
</style>