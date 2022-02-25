<template>
  <div class="order_address">
    <div class="localed">
      <i class="icon-local"></i>
      <div class="address_info">
        <span class="address">钱江新村一区52幢</span>
        <div class="userinfo">
          <span class="name">王硕</span>
          <span class="phone">13032925332</span>
        </div>
      </div>
    </div>

    <div class="address_change">
      <i class="icon-next"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderAddress",
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