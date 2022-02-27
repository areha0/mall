<template>
  <div class="singal_order">
    <!--  -->
    <div
      class="order_card"
      v-for="(list, index) in item.list"
      :key="index"
      :list="list"
    >
      <van-card
        :num="list.count"
        :price="list.price"
        :desc="list.desc"
        :title="list.title"
        :thumb="list.image"
      />
    </div>
    <div class="totle_price">
      <span class="price">￥{{ item.totleprice }}</span>
      <span class="label">总价</span>
    </div>
    <div class="button_show">
      <van-button color="#ff6034" round plain class="pay"
        ><span>去支付</span></van-button
      >
      <van-button color="#666" round plain class="delete"
        ><span>删除订单</span></van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SignalOrder",
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.singal_order {
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 10px;
}
.order_card {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.totle_price,
.button_show {
  background-color: #fff;
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  padding: 5px 10px;
  align-items: center;
}
.label {
  font-size: 14px;
  color: #666;
  margin-right: 5px;
}
.pay,
.delete {
  width: 90px;
  height: 30px;
}
.pay,
.delete span {
  font-size: 14px;
}
.pay {
  margin-left: 5px;
}
</style>