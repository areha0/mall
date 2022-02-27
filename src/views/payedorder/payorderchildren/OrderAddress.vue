<template>
  <div class="order_address">
    <div v-if="state === 2" class="show_address">
      <div class="localed">
        <i class="icon-local"></i>
        <div class="address_info">
          <div class="userinfo">
            <span class="name">{{ address.name }}</span>
            <span class="phone">{{ address.tel }}</span>
          </div>
          <span class="address">{{ address.address }}</span>
        </div>
      </div>

      <div class="address_change">
        <button class="button_change">修改</button>
      </div>
    </div>
    <div v-else class="finish_pay">
      <i class="icon-shop"></i>
      <div class="recommend">
        <span class="first_span">交易已完毕</span>
        <span class="sec_span">再逛逛,下一件一定是有缘分的宝贝</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "OrderAddress",
  props: {
    state: Number,
    address: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    // console.log(this.address);
  },
};
</script>

<style scoped>
.order_address {
  background-color: #fff;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px;
}
.show_address {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.localed {
  display: flex;
}
.icon-local {
  align-self: center;
  margin-right: 10px;
}
.address_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.address {
  margin-top: 5px;
  font-size: 12px;
  color: #aaa;
  display: inline-block;
  width: 260px;
  line-height: 20px;
}
.address_change {
  align-self: center;
}
.name,
.phone {
  font-size: 14px;
}
.phone {
  margin-left: 5px;
  color: #aaa;
}
.button_change {
  background-color: inherit;
  font-size: 12px;
  color: #666;
  border: 1px #aaa solid;
  padding: 5px 10px;
  border-radius: 20px;
}
[class^="icon-"] {
  color: #aaa;
}
.finish_pay {
  display: flex;
}
.icon-shop {
  margin-right: 10px;
  align-self: center;
  font-size: 20px;
}
.recommend {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.first_span {
  font-size: 18px;
  margin-bottom: 8px;
}
.sec_span {
  font-size: 12px;
  color: #999;
}
</style>