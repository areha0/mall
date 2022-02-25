<template>
  <div id="ensure_order">
    <!-- 导航栏 -->
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    >
      <i slot="left" class="icon-back"></i>
    </van-nav-bar>

    <!-- 地址栏 -->
    <order-address />

    <!-- 商品栏 -->
    <order-good></order-good>

    <!-- 支付方式 -->
    <order-pay />
    <!-- 确认订单 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <span slot="default" class="goods_num">{{ goodsnum }} </span>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderAddress from "./ensurechildren/OrderAddress";
import OrderGood from "./ensurechildren/OrderGood";
import OrderPay from "./ensurechildren/OrderPay";
export default {
  name: "EnsureOrder",
  components: {
    OrderAddress,
    OrderGood,
    OrderPay,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      select: "cartSelect",
    }),
    goodsnum() {
      let num = 0;
      this.select.forEach((item) => {
        num += item.count;
      });
      return `共 ${num} 件`;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSubmit() {
      console.log(123);
    },
  },
};
</script>

<style scoped>
#ensure_order {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  z-index: 13;
}
.nav-bar {
  background-color: #f0f0f0;
}
.goods_num {
  font-size: 14px;
  color: #aaa;
}
</style>