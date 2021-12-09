<template>
  <div class="cart-list-item">
    <div class="select">
      <input
        type="checkbox"
        name="products"
        :id="'checkbox' + currentIndex"
        :checked="product.checked"
      />
      <label
        :for="'checkbox' + currentIndex"
        class="checkbox-label"
        @click="checkboxClick"
      ></label>
    </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postShop } from "network/user/shopcart";
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
        id: this.product.id,
        count: this.product.count,
        state: 2,
      },
      datachecked: {
        id: this.product.id,
        checked: this.product.checked,
        state: 3,
      },
      postcount: null,
      postchecked: null,
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
    checkboxClick(event) {
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
.select {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #666;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-right: 5px;
  position: relative;
}
.checkbox-label {
  position: absolute;
  top: 0;
  left: -1px;
  display: block;
  width: 15px;
  height: 15px;
}
input[type="checkbox"]:checked + label::before {
  display: block;
  content: "\ea45";
  font-family: "icomoon" !important;
  font-size: 12px;
  width: 15px;
  height: 15px;
  line-height: 13px;
  font-weight: 600;
  text-align: center;
  background-color: deeppink;
  color: #fff;
  position: absolute;
  top: 0;
  left: -1px;
  display: block;
}

input[type="checkbox"] {
  visibility: hidden;
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
</style>