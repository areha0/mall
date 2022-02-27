<template>
  <div class="order-good">
    <van-card
      :num="item.count"
      :price="item.price"
      :desc="item.desc"
      :title="item.title"
      :thumb="item.image"
      class="good-card"
    />
    <div class="order_note">
      <span class="span">订单备注:</span>
      <span class="note">{{ item.note || "无备注" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderGood",
  props: {
    item: Object,
  },
  computed: {},

  methods: {
    editnote() {
      this.$emit("editnote");
    },
  },
};
</script>

<style scoped>
.order-good {
  background-color: #fff;
  margin-top: 10px;
  border-radius: 10px;
}
.good-card {
  border-radius: 10px;
  background-color: #fff;
}
.order_note {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #f0f0f0;
}
.span {
  font-size: 14px;
  margin-right: 10px;
}
.note {
  display: inline-block;
  font-size: 13px;
  color: #999;

  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>