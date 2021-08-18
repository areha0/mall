<template>
  <div class="goods-arrage">
    <img :src="item.show.img" alt="" :title="item.title" @load="imgLoad" />
    <div>
      <p :title="item.title">{{ item.title }}</p>
      <div class="item-infor">
        <span class="price">{{ item.price | toPrice }}</span>
        <span class="collect">{{ item.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    imgLoad() {
      // 事件总线
      this.$bus.$emit("itemImageLoad");
    },
  },
  filters: {
    toPrice(price) {
      return "￥" + price;
    },
  },
};
</script>

<style scoped>
.goods-arrage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-arrage img {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 8px;
}
.goods-arrage p {
  width: 100%;
  font-size: 11px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-infor {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}
.price {
  font-size: 12px;
  color: rgb(247, 150, 166);
  margin-right: 10px;
}
.collect {
  font-size: 12px;
}
.collect::before {
  content: "\eafb";
  font-family: "icomoon" !important;
  font-size: 14px;
}
</style>