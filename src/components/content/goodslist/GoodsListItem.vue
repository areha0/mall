<template>
  <div class="goods-arrage" @click="goodsDetail" v-if="Object.keys(item) !== 0">
    <img :src="showImg" alt="" :title="item.title" @load="imgLoad" />
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
      // 事件总线, 之前在演练时, 每次打开详情页返回主页时, 主页就会刷新,其实是事件总线的问题, 根据不同的情况发送不同的事件总线就可以了
      if (this.$route.path.indexOf("home") !== -1) {
        // console.log("home");
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("detail") !== -1) {
        // console.log("detail");
        this.$bus.$emit("detailImageLoad");
      }
    },

    // 监听商品被点击
    goodsDetail() {
      // console.log(this.item.iid);
      if (this.$route.path.indexOf("home") !== -1) {
        this.$router.push("/detail/" + this.item.iid);
      }
    },
  },
  computed: {
    showImg() {
      return this.item.image || this.item.show.img;
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