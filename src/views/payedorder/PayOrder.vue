<template>
  <div id="payed_order">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="showtitle"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    ></van-nav-bar>
    <!-- 地址栏 -->
    <order-address
      :address="currentpayed.address"
      :state="currentpayed.state"
    />

    <!-- 商品栏 -->
    <order-good
      v-for="(item, index) in currentpayed.list"
      :key="index"
      :item="item"
      @editnote="editnote(index)"
    ></order-good>

    <!-- 订单信息 -->
    <order-info
      :ordernum="currentpayed.ordernum"
      :paytype="currentpayed.paytype"
      :state="currentpayed.state"
      :address="currentpayed.address"
    />

    <!-- 支付按钮 -->
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="topay"
      v-if="currentpayed.state === 2"
      @click="topay"
    >
      去付款
    </van-button>
  </div>
</template>

<script>
import OrderAddress from "./payorderchildren/OrderAddress";
import OrderGood from "./payorderchildren/OrderGood";
import OrderInfo from "./payorderchildren/OrderInfo.vue";
import { mapState } from "vuex";
export default {
  name: "PayOrder",
  components: {
    OrderAddress,
    OrderGood,
    OrderInfo,
  },
  created() {
    console.log(this.currentpayed);
  },
  computed: {
    ...mapState({
      currentpayed: "currentpayedorder",
    }),
    showtitle() {
      return this.currentpayed.state === 2 ? "等待商家付款" : "交易完成";
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    editAddress() {
      this.$router.push("/address");
    },
    topay() {
      window.location.href = this.currentpayed.payurl;
    },
  },
};
</script>

<style scoped>
#payed_order {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  z-index: 14;
}
.nav-bar {
  background-color: #f3f3f3;
  height: 44px;
}
.topay {
  position: absolute;
  bottom: 20px;
  height: 30px;
  width: 90%;
  left: 5%;
  border-radius: 15px;
}
</style>