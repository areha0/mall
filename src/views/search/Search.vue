<template>
  <div id="search">
    <nav-bar class="search_nav">
      <div slot="left" class="nav_left" @click="back">
        <i class="icon-back"></i>
      </div>
      <div slot="center" class="nav_center">搜索结果</div>
    </nav-bar>
    <!-- 滑动区域 -->
    <scroll
      class="wrapper"
      ref="scroll"
      :myPullUpLoad="true"
      @onScroll="onScroll"
      @pullingUp="pullingUp"
    >
      <div class="intro">
        搜索关键字:
        <span class="search_key">{{ $store.state.currentSearchKey }}</span>
      </div>
      <goods-list :goods="goods.list" />
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import GoodsList from "components/content/goodslist/GoodsList";
import Scroll from "components/commen/scroll/Scroll";
import { homeSearch } from "network/search";
export default {
  name: "Search",
  components: {
    NavBar,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      goods: { key: "", page: 0, list: [] },
      currentPosition: 0,
    };
  },
  created() {
    this.getSearchGoods();
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.myScrollRefresh, 20);
    this.$bus.$on("searchImageLoad", () => {
      // console.log(123);
      refresh();
      // this.$refs.scroll.myScrollRefresh();
    });
    let position = this.$store.state.searchPosition;
    // console.log(position);
    this.$refs.scroll.myScrollTo(0, position, -position * 0.1);
  },
  beforeDestroy() {
    // console.log(this.currentPosition);
    let position = JSON.parse(JSON.stringify(this.currentPosition));
    // console.log(position);
    this.$store.commit("setCurrentPosition", position.y);
  },
  methods: {
    back() {
      this.$router.back();
    },
    getSearchGoods() {
      let page = this.goods.page + 1;
      this.goods.key = this.$store.state.currentSearchKey;
      let key = this.goods.key;
      homeSearch(key, page).then((res) => {
        // console.log(res.data);
        this.goods.list.push(...res.data);
        this.goods.page++;
        setTimeout(() => {
          this.$refs.scroll.myPullingFinish();
        }, 1000);
      });
    },

    // 关于scroll的方法
    pullingUp() {
      this.getSearchGoods();
    },
    onScroll(position) {
      // console.log(position);
      this.currentPosition = position;
    },
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, delay);
      };
    },
  },
};
</script>

<style scoped>
#search {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 15;
}
.search_nav {
  position: relative;
  background-color: rgb(247, 150, 166);
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
  z-index: 12;
}
.wrapper {
  height: calc(100% - 44px);
  z-index: 11;
}
.intro {
  margin-top: 10px;
  margin-left: 10px;
}
.intro .search_key {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #aaa;
  font-size: 14px;
  color: #666;
  border-radius: 6px;
}
</style>