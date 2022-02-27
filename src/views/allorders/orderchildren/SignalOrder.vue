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
      <van-button
        color="#ff6034"
        round
        plain
        class="pay"
        v-if="isshow"
        @click="topay"
        ><span>去支付</span></van-button
      >
      <van-button color="#666" round plain class="delete" @click.stop="toremove"
        ><span>删除订单</span></van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { postOrder } from "network/order";
import { Dialog } from "vant";
export default {
  name: "SignalOrder",
  props: {
    item: Object,
  },
  computed: {
    ...mapState({
      user: "userBaseInfo",
      allorders: "allorders",
    }),
    isshow() {
      return this.item.state === 2;
    },
  },
  methods: {
    topay() {
      console.log(this.item);
      let payurl = this.item.payurl;
      // this.$emit("orderpay", payurl);
      // console.log(payurl);
      window.location.href = payurl;
    },
    toremove() {
      Dialog.confirm({
        message: "是否确定删除该订单",
      })
        .then(() => {
          // on confirm
          let ordernum = this.item.ordernum;
          // 删除订单,状态可能是2,也可能是3,需要传入用户和订单号
          let username = this.user.name;
          let state = 4;
          let params = { username, state, ordernum };
          // 删除vuex中的数据
          this.$store.commit("removeorder", ordernum);

          // 发送请求,删除数据
          postOrder(params).then((res) => {
            console.log(res);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
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
.button_show {
  padding-bottom: 10px;
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