<template>
  <div class="order-pay">
    <div v-for="item in paytype" :key="item" class="single-type">
      <span class="span-type">{{ item }}</span>
      <van-checkbox
        v-model="checked"
        checked-color="#ee0a24"
        class="checkbox"
        icon-size="14px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderPay",
  data() {
    return {
      checked: false,
      paytype: ["支付宝支付", "微信支付"],
    };
  },
};
</script>

<style scoped>
.order-pay {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 10px;
}
.single-type {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.span-type {
  font-size: 14px;
}
</style>