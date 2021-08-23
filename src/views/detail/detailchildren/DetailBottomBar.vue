<template>
  <div class="detail-bottombar">
    <div class="bottom-left">
      <div class="bottom-service">
        <i class="icon-service"></i>
        <span>客服</span>
      </div>
      <div class="bottom-shop">
        <i class="icon-shop"></i>
        <span>店铺</span>
      </div>
      <div
        class="bottom-collect"
        @click="collectClick"
        :class="{ collect: isCollect }"
      >
        <i class="icon-collect"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div @click="addCart">加入购物车</div>
      <div>购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      isCollect: false,
    };
  },
  methods: {
    collectClick() {
      this.isCollect = !this.isCollect;
    },
    // 加入购物车操作
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.detail-bottombar {
  height: 49px;
  display: flex;
  position: relative;
  background-color: #fff;
  border-top: 1px solid rgba(200, 200, 200, 0.4);
}
/* 左侧的三个东西 */
.bottom-left,
.bottom-right {
  flex: 1;
  display: flex;
}
.bottom-left {
  justify-content: space-around;
  text-align: center;
  align-items: center;
}
.bottom-left div {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #555;
  font-weight: 400;
}
.bottom-left i {
  font-size: 20px;
}
.bottom-left span {
  font-size: 12px;
  margin-top: 3px;
}
/* 右侧的加入购物车和购买 */
.bottom-right {
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.bottom-right div {
  flex: 1;
  text-align: center;
  height: 100%;
  line-height: 49px;
}
.bottom-right div:first-child {
  background-color: gold;
}
.bottom-right div:last-child {
  background-color: deeppink;
}
/* 收藏变颜色 */
.bottom-left .collect {
  color: rgb(247, 150, 166);
}
</style>