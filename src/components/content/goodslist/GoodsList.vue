<template>
  <div class="goodslist">
    <goods-list-item
      class="good-list-item"
      v-for="(item, index) in goods"
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
    goods: {
      type: Array,
    },
  },
  components: {
    GoodsListItem,
  },
  mounted() {
    // console.log(this.goods);
  },
};
</script>

<style scoped>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: start;
  padding: 10px 4px;
}
.good-list-item {
  flex: 1;
  margin: 0 4px 5px;
  width: 40%;
}
</style>