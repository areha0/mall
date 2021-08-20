<template>
  <div class="goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="goods-info-title">{{ goodsInfo.title }}</div>
    <div class="goods-info-price">
      <span class="n-price">{{ goodsInfo.price }}</span>
      <span class="o-price">{{ goodsInfo.oldPrice }}</span>
      <span
        class="discountDesc"
        v-if="goodsInfo.discountDesc"
        :style="{ 'background-color': goodsInfo.discountBgColor }"
        >{{ goodsInfo.discountDesc }}</span
      >
    </div>
    <div class="goods-info-sell" v-if="goodsInfo.columns">
      <span>{{ goodsInfo.columns[0] }}</span>
      <span class="sell-center">{{ goodsInfo.columns[1] }}</span>
      <span v-if="goodsInfo.services" class="sell-right">{{
        goodsInfo.services[goodsInfo.services.length - 1].name
      }}</span>
    </div>
    <div class="goods-info-services" v-if="goodsInfo.services">
      <div v-for="index in goodsInfo.services.length - 1" :key="index">
        <i class="icon-img"></i>
        <span>{{ goodsInfo.services[index - 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      goods: ["nihao", "shabi"],
    };
  },
};
</script>

<style scoped>
.goods-info {
  padding: 0 6px;
  margin: 8px 0 10px;
}
.goods-info-title {
  font-size: 15px;
}
.goods-info-price {
  margin-top: 10px;
}
.n-price {
  font-weight: 500;
  color: rgb(247, 150, 166);
  margin-right: 5px;
}
.o-price {
  font-size: 12px;
  color: #ccc;
  text-decoration: line-through;
  margin-right: 5px;
}
.discountDesc {
  font-size: 12px;
  padding: 1px 4px;
  color: #fff;
  vertical-align: top;
  border-radius: 6px;
}
.goods-info-sell {
  margin-top: 13px;
  display: flex;
  color: #ccc;
  font-size: 12px;
  justify-content: space-evenly;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.2);
}
.goods-info-sell span {
  flex: 1;
  text-align: center;
}
.goods-info-sell span:first-child {
  text-align: left;
}
.goods-info-sell span:last-child {
  text-align: right;
}

.goods-info-services {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  height: 30px;
  padding-bottom: 8px;
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
}
.goods-info-services div {
  flex: 1;
  text-align: center;
}
.goods-info-services div:first-child {
  text-align: left;
}
.goods-info-services div:last-child {
  text-align: right;
}
.goods-info-services div i {
  font-size: 13px;
  line-height: 30px;
  color: #aaa;
  margin-right: 1px;
}
.goods-info-services div span {
  font-size: 13px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>