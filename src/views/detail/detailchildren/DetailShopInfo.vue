<template>
  <div v-if="Object.keys(shop) !== 0" class="shop">
    <div class="innerShop">
      <div class="shopName" v-if="shop.logo">
        <img :src="shop.logo" alt="" />
        <span>{{ shop.name }}</span>
      </div>
      <div class="all-info">
        <div class="all-sell">
          <div class="csells">
            <span>{{ shop.cSells | totleSells() }}</span>
            <span class="sell-tag">总销量</span>
          </div>
          <div class="cgoods">
            <span>{{ shop.cGoods }}</span>
            <span class="sell-tag">全部宝贝</span>
          </div>
        </div>
        <div class="all-score" v-if="shop.score">
          <div
            v-for="(item, index) in shop.score"
            :key="index"
            class="single-score"
          >
            <span>{{ item.name }}</span>
            <span :class="{ 'score-color': item.isBetter }">{{
              item.score
            }}</span>
            <span :class="{ 'score-bgc': item.isBetter }">{{
              item.isBetter | isBetter()
            }}</span>
          </div>
        </div>
      </div>
      <a class="enter-shop" :href="shop.shopUrl">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    isBetter(better) {
      return better ? "高" : "低";
    },
    totleSells(number) {
      if (number > 10000) {
        return parseFloat(number / 10000).toFixed(1) + "万";
      } else {
        return number;
      }
    },
  },
};
</script>

<style scoped>
.shop {
  padding: 0 6px;
}
.innerShop {
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
}
/* 商铺logo和名字 */
.shopName {
  display: flex;
  height: 60px;
  align-items: center;
}
.shopName img {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 20px;
  margin-right: 5px;
}
.shopName span {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
}
/* 商铺总销量, 全部宝贝和打分 */
.all-info {
  display: flex;
  height: 70px;
  justify-content: center;
}
.all-sell {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 10px 0;
  border-right: 1px solid rgba(200, 200, 200, 0.8);
}
.csells {
  margin-right: 20px;
}
.csells,
.cgoods {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.sell-tag {
  font-size: 13px;
  margin-top: 3px;
}
/* 打分 */
.all-score {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.single-score {
  display: flex;
  flex-direction: row;
  font-size: 13px;
}
.single-score span:first-child {
  margin-right: 10px;
}
.single-score span:nth-child(2) {
  width: 36px;
  color: yellowgreen;
}
.single-score span:last-child {
  background-color: yellowgreen;
  color: #fff;
}
.score-color {
  color: rgb(218, 28, 28) !important;
}
.score-bgc {
  background-color: rgb(218, 28, 28) !important;
}

/* 商铺入口 */
.enter-shop {
  display: block;
  margin: 10px auto 20px;
  width: 60px;
  padding: 5px 40px;
  background-color: rgba(200, 200, 200, 0.2);
  font-size: 14px;
  border-radius: 10px;
}
</style>