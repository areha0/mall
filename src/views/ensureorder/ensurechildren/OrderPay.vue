<template>
  <div class="order-pay">
    <div v-for="(item, index) in paytype" :key="index" class="single-type">
      <span class="span-type">{{ item.title }}</span>
      <van-checkbox
        v-model="item.ischecked"
        checked-color="#ee0a24"
        class="checkbox"
        icon-size="14px"
        @click="changebox(index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderPay",
  data() {
    return {
      paytype: [
        { title: "支付宝支付", ischecked: true, type: "ali" },
        { title: "微信支付", ischecked: false, type: "wx" },
      ],
      currenttype: 0, //当前所选的方式
    };
  },
  methods: {
    changebox(index) {
      let another = index === 0 ? 1 : 0;
      this.paytype[another].ischecked = false;
      this.paytype[index].ischecked = true;
      let type = this.paytype[index].type;
      this.$emit("changebox", type);
    },
  },
};
</script>

<style scoped>
.order-pay {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 10px;
}
.single-type {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.span-type {
  font-size: 14px;
}
</style>