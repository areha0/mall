<template>
  <div class="order_info">
    <span class="title">订单信息</span>
    <div class="order_num">
      <span>订单编号:</span>
      <span>{{ ordernum }}</span>
    </div>
    <div class="order_pay">
      <span>支付方式:</span>
      <span>{{ paytype == "ali" ? "支付宝" : "微信" }}</span>
    </div>
    <div class="order_address" v-show="state === 3">
      <span>收货信息:</span>
      <span class="detail">{{ addressinfo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  props: {
    ordernum: String,
    paytype: String,
    state: Number,
    address: Object,
  },
  computed: {
    addressinfo() {
      return (
        this.address.name + " " + this.address.tel + " " + this.address.address
      );
    },
  },
};
</script>

<style scoped>
.order_info {
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
}
.order_num {
  display: flex;
}
.title {
  display: inline-block;
  margin-bottom: 5px;
  font-size: 16px;
}
div span:first-child {
  margin-right: 20px;
}
div span {
  font-size: 14px;
}
.order_info div {
  margin-top: 10px;
}
.order_address {
  display: flex;
}
.detail {
  font-size: 13px;
  width: 260px;
}
</style>