<template>
  <div class="order-good">
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      class="good-card"
    />
    <div class="good-note">
      <span>订单备注</span>
      <span class="note">无备注<i class="icon-note"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderGood",
};
</script>

<style scoped>
.order-good {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
}
.good-card {
  border-radius: 10px;
  background-color: #fff;
}
.good-note {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 14px;
}
.note {
  color: #aaa;
}
</style>