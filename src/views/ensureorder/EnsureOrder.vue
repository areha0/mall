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
      <order-pay class="order-pay" />
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
    };
  },
  computed: {
    ...mapState({
      order: "currentOrder",
    }),
    ...mapGetters({
      select: "cartSelect",
    }),
    goodsnum() {
      let num = 0;
      this.select.forEach((item) => {
        num += item.count;
      });
      return `共 ${num} 件`;
    },
    goodsprice() {
      let price = 0;
      this.select.forEach((item) => {
        price += item.count * item.price;
      });
      return price * 100;
    },
  },
  mounted() {
    console.log(this.order);
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSubmit() {
      console.log(123);
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