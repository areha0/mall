<template>
  <div id="after-payment">支付后的页面</div>
</template>

<script>
import { mapState } from "vuex";
import { postpayment } from "network/payment";
export default {
  name: "Payment",
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      user: "userBaseInfo",
      ordernum: "currentordernum",
    }),
  },
  methods: {
    // 根据支付后页面的url值,获得订单的支付状态
    getData() {
      let query = this.$route.query;
      let { out_trade_no, trade_no } = query;
      let username = this.user.name;
      let ordernum = this.ordernum;
      console.log(this.ordernum);
      //#region 下面是传递的数值
      //app_id: "2021000119623969"
      // auth_app_id: "2021000119623969"
      // charset: "utf-8"
      // method: "alipay.trade.page.pay.return"
      // out_trade_no: "164588054558550241"
      // seller_id: "2088621957934080"
      // sign: "ecaM4P6dNwwDDI2kTaWEjgpb7WJpR5l9LLZiplAfL+hmeENy2OAsO+LTIMroXGkp8jtUpioG0x/ceqOPmAf9dL2ZW0nHIAxDWsE2zqFw3VbrXhhxw8RuwLd3bj4UnwMpY462rkJhJ7cUhaMJ6G+8aXy5ZMYzpeCSPZ8VI4eoJx5DL3EwGQlszqG2CJQ7KaVeRnNbPoUmI4KcOBVHsLg5xrwUgxbpKAwcutesctWPIsH/vXhKL989G3/DR6Yj/CLqkP7tO6dwWCi8uCNTWjnzcwrYFRJ+We+aUp6LyBvGpdvj3zl300nY9S8PN9qP+cO1RCHovYWF8hNkbQdwYlEGOA=="
      // sign_type: "RSA2"
      // timestamp: "2022-02-26 21:02:52"
      // total_amount: "109.00"
      // trade_no: "2022022622001458320501765549"
      // version: "1.0"
      //#endregion
      postpayment({ out_trade_no, trade_no, username, ordernum }).then(
        (res) => {
          console.log(res);
        }
      );
    },
  },
};
</script>

<style scoped>
#after-payment {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 14;
}
</style>