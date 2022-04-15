<template>
  <div class="cart-bottombar">
    <div class="select-all">
      <van-checkbox
        checked-color="deeppink"
        icon-size="14px"
        class="select"
        v-model="isSelectall"
      ></van-checkbox>
      <span>全选</span>
    </div>
    <div class="totle-price">合计: ￥{{ totlePrice }}</div>
    <div class="pay-all" @click="topay">去结算({{ totlegoods }})</div>
  </div>
</template>

<script>
import { postShop } from "network/shopcart";
import { mapGetters, mapState } from "vuex";
import { postOrder } from "network/order";
import { Toast } from "vant";
export default {
  name: "CartBottomBar",
  data() {
    return {
      datafalse: {
        state: 4,
        checked: false,
        username: this.$store.state.userBaseInfo.name,
      },
      datatrue: {
        state: 4,
        checked: true,
        username: this.$store.state.userBaseInfo.name,
      },
      postfalse: null,
      posttrue: null,
      postall: null,
    };
  },
  computed: {
    ...mapGetters({
      select: "cartSelect",
    }),
    ...mapState({
      order: "currentOrder",
      user: "userBaseInfo",
    }),
    totlePrice() {
      let list = this.$store.state.cartList;
      if (JSON.stringify(list) === "{}") list = [];
      return list
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    totlegoods() {
      let list = this.$store.state.cartList;
      if (JSON.stringify(list) === "{}") list = [];
      return list
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    // 判断全选按钮是否应该被选中
    isSelectall: {
      get() {
        let list = this.$store.state.cartList;
        // console.log(list);
        if (JSON.stringify(list) === "{}") list = [];
        if (list.length == 0) {
          return false;
        } else {
          if (
            list.find((item) => {
              return !item.checked;
            })
          ) {
            return false;
          } else {
            return true;
          }
        }
      },
      set(value) {
        // 注意,由于 isSelectall是一个计算属性,所以不能够直接修改(v-model会 直接修改),所以需要设置一个setter属性
        if (value) {
          this.$store.commit("selectAll");
        } else {
          this.$store.commit("selectNone");
        }
        this.postall();
      },
    },
  },
  mounted() {
    // 发送post请求
    // 使用这两个方法时, 会有两个防抖函数的效果
    // this.postfalse = this.debounce(this.posttoo, 500);
    // this.posttrue = this.debounce(this.postthree, 500);
    this.postall = this.debounce(this.postfour, 500);
  },
  methods: {
    // 进入确认订单页面, 首先要保证至少有一个被选中,还要知道选中的是哪些
    topay() {
      // this.$store.commit("setOrder");
      // console.log(this.$store.state.currentOrder);
      if (!this.select.length) {
        Toast("请至少选择一件商品");
        return;
      }
      this.$store.commit("ressetorder");
      this.select.forEach((item) => {
        this.order.push(item);
      });
      console.log(this.order);
      localStorage.setItem("currentOrder", JSON.stringify(this.order));
      this.orderhttp();
      this.$router.push("/ensureorder");
    },

    // 订单请求
    orderhttp() {
      // 发送第一次请求, 此时的状态为1, 表示未支付
      let list = this.order;
      let state = 1;
      let username = this.user.name;
      let params = { list, state, username };
      postOrder(params).then((res) => {
        console.log(res.data.ordernum);
        // this.ordernum = res.data.ordernum;
        this.$store.commit("setordernum", res.data.ordernum);
      });
    },

    post(value) {
      postShop(value).then((res) => console.log(res));
    },
    posttoo() {
      this.post(this.datafalse);
    },
    postthree() {
      this.post(this.datatrue);
    },
    postfour() {
      if (!this.isSelectall) {
        this.posttoo();
      } else {
        this.postthree();
      }
    },

    // 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, delay);
      };
    },
  },
};
</script>

<style scoped>
.cart-bottombar {
  height: 40px;
  /* position: relative; */
  position: absolute;
  z-index: 11;
  bottom: 49px;
  left: 0;
  right: 0;
  /* background-color: rgba(200, 200, 200); */
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.totle-price {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.pay-all {
  height: 40px;
  width: 100px;
  background-color: rgb(247, 150, 166);
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.select-all {
  width: 80px;
  display: flex;
  padding-left: 5px;
}
.select-all span {
  font-size: 14px;
  color: #666;
}
.select {
  margin-right: 10px;
}
</style>