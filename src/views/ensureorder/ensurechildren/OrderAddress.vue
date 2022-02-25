<template>
  <div class="order_address">
    <div class="localed">
      <i class="icon-local"></i>
      <div class="address_info">
        <span class="address">{{ address.addressDetail || "请添加地址" }}</span>
        <div class="userinfo">
          <span class="name">{{ address.name || "姓名" }}</span>
          <span class="phone">{{ address.tel || "电话" }}</span>
        </div>
      </div>
    </div>

    <div class="address_change">
      <i class="icon-next"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "OrderAddress",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      address: "defaultAddress",
    }),
  },
  mounted() {
    // console.log(this.address);
  },
};
</script>

<style scoped>
.order_address {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
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
  margin-bottom: 5px;
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
[class^="icon-"] {
  color: #aaa;
}
</style>