<template>
  <div class="cart-list-item">
    <van-checkbox
      v-model="product.checked"
      checked-color="deeppink"
      icon-size="15px"
      @click="checkboxClick"
      class="select"
    ></van-checkbox>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="info-title">{{ product.title }}</div>
      <div class="info-desc">{{ product.desc }}</div>
      <div class="price-count">
        <div>{{ product.price | showPrice }}</div>
        <div class="count">
          <span class="decrement" @click="decrement" :class="{ disable: isone }"
            >-</span
          >
          <span class="counter">{{ product.count | showCount }}</span>
          <span class="increment" @click="increment">+</span>
          <i class="icon-delete" @click="deletegoods"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postShop } from "network/shopcart";
import { Dialog } from "vant";
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    currentIndex: {
      type: Number,
    },
  },
  data() {
    return {
      datacount: {
        username: this.$store.state.userBaseInfo.name,
        id: this.product.id,
        count: this.product.count,
        state: 2,
      },
      datachecked: {
        username: this.$store.state.userBaseInfo.name,
        id: this.product.id,
        checked: this.product.checked,
        state: 3,
      },
      postcount: null, // 数量改变时进行请求
      postchecked: null, // 是否选择时进行请求
    };
  },
  filters: {
    showPrice(price) {
      return "￥" + price;
    },
    showCount(count) {
      return "x" + count;
    },
  },
  mounted() {
    // 两个都是防抖函数--发送请求
    this.postcount = this.debounce(this.posttoo, 500);
    this.postchecked = this.debounce(this.postthree, 500);
  },

  methods: {
    decrement() {
      this.$store.commit("decrement", this.currentIndex);
      // 在这里修改的是数据的count值
      this.postcount();
    },
    increment() {
      this.$store.commit("increment", this.currentIndex);
      this.postcount();
    },
    deletegoods() {
      // console.log(this.currentIndex);
      Dialog.confirm({
        message: "确定要删除当前商品",
      })
        .then(() => {
          // on confirm
          let list = this.$store.state.cartList;
          let username = this.$store.state.userBaseInfo.name;
          let id = list[this.currentIndex].id;
          let state = 5;
          let params = { username, id, state };

          list.splice(this.currentIndex, 1);
          localStorage.setItem("shopcart", JSON.stringify(list));
          this.postdelete(params);
        })
        .catch(() => {
          // on cancel
        });
    },
    checkboxClick(event) {
      this.product.checked = !this.product.checked;
      this.$store.commit("checkboxClick", {
        checked: this.product.checked,
        index: this.currentIndex,
      });
      this.postchecked();
    },
    // 下面全是post请求相关的函数
    // 发送post请求
    post(value) {
      postShop(value).then((res) => console.log(res));
    },
    postthree() {
      this.datachecked.checked = this.product.checked;
      this.post(this.datachecked);
    },
    posttoo() {
      this.datacount.count = this.product.count;
      this.post(this.datacount);
    },
    postdelete(value) {
      postShop(value).then((res) => {
        console.log(res);
      });
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
  computed: {
    isone() {
      return this.$store.state.cartList[this.currentIndex].count == 1;
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  justify-content: space-between;
  height: 110px;
  padding: 5px 5px;
  align-items: center;
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
}
.checkbox-label {
  position: absolute;
  top: 0;
  left: -1px;
  display: block;
  width: 15px;
  height: 15px;
}

.select {
  margin-right: 10px;
}
.item-img img {
  width: 80px;
  max-height: 100px;
  border-radius: 5px;
}
.item-info {
  margin-left: 10px;
  flex: 1;
  /* height: 100px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.item-info div {
  height: 35px;
  flex: 1;
  overflow: hidden;
  width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 35px;
}
.info-title {
  font-size: 16px;
}
.info-desc {
  font-size: 14px;
  color: #aaa;
}
.price-count {
  display: flex;
  justify-content: space-between;
}
.price-count div:first-child {
  font-weight: 600;
  color: deeppink;
}
.count {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.counter {
  margin: 0 5px;
}
.increment,
.decrement {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border: 1px solid rgba(200, 200, 200, 0.4);
  border-radius: 3px;
}
.disable {
  pointer-events: none;
  color: #aaa;
}
.icon-delete {
  margin-left: 15px;
}
</style>