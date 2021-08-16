<template>
  <div class="goodslist">
    <goods-list-item
      class="good-list-item"
      v-for="(item, index) in popgoods"
      :key="index"
      :item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    popgoods: {
      type: Array,
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 3px;
}
.good-list-item {
  flex: 1;
  margin: 0 3px 5px;
  width: 40%;
}
</style>