<template>
  <div id="all-orders">
    <van-nav-bar
      title="我的订单"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    />
    <tab-control
      :tabtitle="tablist"
      @tabClick="tabClick"
      class="tab-control"
    ></tab-control>
    <scroll class="wrapper" ref="scroll" :myPullUpLoad="true">
      <signal-order
        v-for="(item, index) in noworders"
        :key="index"
        :item="item"
        @click.native="topayedorder(index)"
        :orderpay="topay"
        :orderremove="toremove"
      />
    </scroll>
  </div>
</template>

<script>
import TabControl from "components/content/tabcontrol/TabControl";
import SignalOrder from "./orderchildren/SignalOrder";
import { getorders } from "network/order";
import { mapState, mapGetters } from "vuex";
import { postOrder } from "network/order";
import Scroll from "components/commen/scroll/Scroll";
export default {
  name: "AllOrder",
  components: {
    TabControl,
    SignalOrder,
    Scroll,
  },
  data() {
    return {
      tablist: ["全部", "已付款", "未付款"],
      currentindex: 0,
    };
  },
  created() {
    this.ordersdata();
    this.currentindex = 0;
  },
  computed: {
    ...mapState({
      user: "userBaseInfo",
      allorders: "allorders",
    }),
    ...mapGetters({
      payedorder: "getpayorders",
      nopayorder: "getnopayorders",
    }),
    noworders() {
      if (this.currentindex === 0) return this.allorders;
      else if (this.currentindex === 1) return this.payedorder;
      else if (this.currentindex === 2) return this.nopayorder;
    },
  },
  methods: {
    onClickLeft() {
      // this.$router.back();
      this.$router.push("/profile");
    },
    tabClick(index) {
      // console.log(index);
      this.currentindex = index;
      this.$refs.scroll.myScrollTo(0, 0, 20);
      setTimeout(() => {
        this.$refs.scroll.myScrollRefresh();
      }, 200);
    },
    ordersdata() {
      let username = this.user.name;
      getorders(username).then((res) => {
        // console.log(res);
        let list = res.data;
        this.$store.commit("setallorders", list);
        console.log(this.allorders);
      });
    },
    topayedorder(index) {
      let order = this.allorders[index];
      this.$store.commit("setpayedorder", order);
      this.$router.push("/payedorder");
    },
    topay(payurl) {
      console.log(payurl);
      window.location.href(payurl);
    },
    toremove(ordernum) {
      // 删除订单,状态可能是2,也可能是3,需要传入用户和订单号
      console.log(ordernum);
      let username = this.user.name;
      let state = 3;
      let params = { username, state, ordernum };
      // 删除vuex中的数据
      this.$store.commit("removeorder", ordernum);

      // 发送请求,删除数据
      postOrder(params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
#all-orders {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  z-index: 13;
}
.nav-bar {
  background-color: #f0f0f0;
}
.tab-control {
  font-size: 14px;
  background-color: #f0f0f0;
  position: relative;
  z-index: 14;
}
.wrapper {
  height: calc(100% - 96px);
  z-index: 11;
}
</style>