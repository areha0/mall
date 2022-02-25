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
    <div class="good-note" @click="editnote">
      <span>订单备注</span>
      <div class="note">
        <span class="span-note">{{ item.note || "无备注" }}</span>
        <i class="icon-note"></i>
      </div>
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
.good-note {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-size: 14px;
}
.note {
  color: #aaa;
}
.span-note {
  display: inline-block;
  text-align: right;
  font-size: 14px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>