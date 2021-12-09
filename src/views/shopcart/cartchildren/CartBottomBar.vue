<template>
  <div class="cart-bottombar">
    <div class="select-all">
      <div class="bottom-select">
        <input
          type="checkbox"
          id="bottom-checkbox"
          :checked="isSelectall"
          @click="selectAll"
        />
        <label for="bottom-checkbox" class="bottom-label"></label>
      </div>
      <span>全选</span>
    </div>
    <div class="totle-price">合计: ￥{{ totlePrice }}</div>
    <div class="pay-all" @click="topay">去结算({{ totlegoods }})</div>
  </div>
</template>

<script>
import { postShop } from "network/user/shopcart";
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
    isSelectall() {
      // const list = JSON.stringify(this.$store.state.cartList);
      // console.log(list);
      let list = this.$store.state.cartList;
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
  },
  mounted() {
    // 发送post请求
    // 使用这两个方法时, 会有两个防抖函数的效果
    // this.postfalse = this.debounce(this.posttoo, 500);
    // this.posttrue = this.debounce(this.postthree, 500);
    this.postall = this.debounce(this.postfour, 500);
  },
  methods: {
    // 点击全选按钮
    selectAll() {
      if (this.isSelectall) {
        // console.log(123);
        this.$store.commit("selectNone");
        // this.postfalse();
      } else {
        this.$store.commit("selectAll");
        // this.posttrue();
      }
      this.postall();
    },
    topay() {
      if (!this.isSelectall) {
        // console.log("你什么商品都没选择");
        // console.log(this.$toast.show);
        this.$toast.show("你什么商品都没选择", 2000);
      }
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
/* 开始多选框的样式 */
.bottom-select {
  margin-right: 5px;
  width: 13px;
  height: 13px;
  border: 1px solid rgba(200, 200, 200, 0.4);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
#bottom-checkbox {
  visibility: hidden;
}
.bottom-label {
  display: block;
  width: 13px;
  height: 13px;
  background-color: #fff;
  position: absolute;
  top: 0px;
  left: 0px;
}
#bottom-checkbox:checked + label::before {
  content: "\ea45";
  font-family: "icomoon" !important;
  display: block;
  width: 13px;
  height: 13px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: deeppink;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  font-weight: 600;
  color: #fff;
}
/* 最右侧 */
</style>