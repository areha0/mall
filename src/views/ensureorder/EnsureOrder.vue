<template>
  <div id="ensure_order">
    <!-- 导航栏 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    >
      <i slot="left" class="icon-back"></i>
    </van-nav-bar>

    <scroll class="wrapper" ref="scroll" :myPullUpLoad="true">
      <!-- 地址栏 -->
      <order-address @click.native="editAddress" />

      <!-- 商品栏 -->
      <order-good
        v-for="(item, index) in order"
        :key="index"
        :item="item"
        @editnote="editnote(index)"
      ></order-good>
      <!-- 备注弹出层 -->
      <van-popup
        v-model="isnote"
        position="bottom"
        round
        closeable
        :style="{ height: '80%' }"
      >
        <div class="note">
          <span class="note-title">订单备注</span>
          <van-field
            v-model="notemessage"
            rows="2"
            autosize
            clearable
            type="textarea"
            maxlength="200"
            placeholder="选填,请先和商家协商一致,到款后商家可见"
            show-word-limit
            class="note-input"
          />
          <van-button
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            size="large"
            class="note-button"
            @click="noteensure"
            >确定</van-button
          >
        </div>
      </van-popup>
      <!-- 支付方式 -->
      <order-pay class="order-pay" @changebox="changebox" />
    </scroll>
    <!-- 确认订单 -->
    <van-submit-bar
      :price="goodsprice"
      button-text="提交订单"
      @submit="onSubmit"
      class="submit-order"
    >
      <span slot="default" class="goods_num">{{ goodsnum }} </span>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import OrderAddress from "./ensurechildren/OrderAddress";
import OrderGood from "./ensurechildren/OrderGood";
import OrderPay from "./ensurechildren/OrderPay";
import Scroll from "components/commen/scroll/Scroll";
import { postOrder } from "network/order";
import { postShop } from "network/user/shopcart";
import { Toast } from "vant";
export default {
  name: "EnsureOrder",
  components: {
    OrderAddress,
    OrderGood,
    OrderPay,
    Scroll,
  },
  data() {
    return {
      notemessage: "",
      isnote: false, //是否编辑备注
      currentgood: -1, //表示当前点击的商品
      currenttype: "ali", //当前选择的支付方式,默认为支付宝, ali,wx
    };
  },
  computed: {
    ...mapState({
      order: "currentOrder",
      user: "userBaseInfo",
      cart: "cartList",
      uesr: "userBaseInfo",
      ordernum: "currentordernum",
    }),
    ...mapGetters({
      select: "cartSelect",
      address: "defaultAddress",
    }),
    goodsnum() {
      let num = 0;
      this.order.forEach((item) => {
        num += item.count;
      });
      return `共 ${num} 件`;
    },
    goodsprice() {
      let price = 0;
      this.order.forEach((item) => {
        price += item.count * item.price;
      });
      return price * 100;
    },
    goodsname() {
      let arr = [];
      this.order.forEach((item) => {
        arr.push(item.title);
      });
      return arr.join(",");
    },
  },

  created() {
    // 发送第一次请求， 将发送请求放到购买按钮处， 因为选择地址后依旧会生成订单
    // this.orderhttp();
  },
  mounted() {
    console.log(this.order);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    editAddress() {
      this.$router.push("/address");
    },
    editnote(index) {
      console.log(index);
      this.isnote = true;
      this.currentgood = index;
      if (this.order[this.currentgood].note) {
        this.notemessage = this.order[this.currentgood].note;
      }
    },
    // 备注确认
    noteensure() {
      console.log(this.notemessage);
      this.isnote = false;
      console.log();
      if (!this.order[this.currentgood].note) {
        this.$set(this.order[this.currentgood], "note", this.notemessage);
      } else {
        this.order[this.currentgood].note = this.notemessage;
      }

      console.log(this.order);
    },

    orderhttp2() {
      // 提交订单时, 此时的状态为待支付
      let state = 2;
      let ordernum = this.ordernum;
      let username = this.user.name;
      let paytype = this.currenttype;
      let goods = this.goodsname;
      let totleprice = (this.goodsprice / 100).toFixed(2);
      let params = { state, ordernum, username, paytype, totleprice, goods };
      postOrder(params).then((res) => {
        // console.log(res.data.data.url);
        window.location.href = res.data.data.url;
      });
    },

    // 改变支付方式
    changebox(type) {
      console.log(type);
      this.currenttype = type;
    },

    // 提交订单
    // 1. 向后端发送请求,修改订单状态,此时的订单状态为2,表示待支付
    // 2. 删除购物车中的商品
    // ** 关键点在于知道是从详情页直接过来的还是从购物车过来的
    onSubmit() {
      if (!this.address) {
        Toast("请添加地址");
        return;
      }
      // console.log(123);
      // 在这里发送请求, 同时返回支付连接
      this.orderhttp2();
      if (this.order.length === 1 && this.order[0].source === "detail") {
        console.log("不删除购物车数据");
        return;
      } else {
        // 在这里删除购物车中的数据,
        this.$store.commit("removegoods");
        console.log(this.cart);
        //删除数据库中的商品, , 此时的状态码为6, 直接将购物车中被选中的商品删除
        let username = this.user.name;
        let state = 6;
        // let params = { username, state };
        // console.log(params);
        postShop({ username, state }).then((res) => {
          console.log(res);
        });
      }
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
  height: 44px;
}
.goods_num {
  font-size: 14px;
  color: #aaa;
}
.note {
  /* background-color: pink; */
  text-align: center;
  padding: 15px 10px;
}
.note-title {
  display: block;
  margin-bottom: 20px;
}
.note-input {
  background-color: #f0f0f0;
  border-radius: 10px;
}
.note-button {
  position: absolute;
  width: 90%;
  bottom: 15px;
  left: 5%;
  height: 35px;
  border-radius: 30px;
}
.wrapper {
  height: calc(100% - 96px);
  z-index: 11;
}
</style>