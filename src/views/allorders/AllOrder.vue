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
        v-for="(item, index) in allorders"
        :key="index"
        :item="item"
      />
    </scroll>
  </div>
</template>

<script>
import TabControl from "components/content/tabcontrol/TabControl";
import SignalOrder from "./orderchildren/SignalOrder";
import { getorders } from "network/order";
import { mapState } from "vuex";
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
    };
  },
  created() {
    this.ordersdata();
  },
  computed: {
    ...mapState({
      user: "userBaseInfo",
      allorders: "allorders",
    }),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    tabClick(index) {
      console.log(index);
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