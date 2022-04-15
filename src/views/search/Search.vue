<template>
  <div id="search">
    <nav-bar class="search_nav">
      <div slot="left" class="nav_left" @click="back">
        <i class="icon-back"></i>
      </div>
      <!-- <div slot="center" class="nav_center">搜索结果</div> -->
      <van-search
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="search_input"
        v-model="searchContent"
        clearable
        slot="center"
        background="rgb(247,150,166)"
        shape="round"
        disabled
      />
      <span class="search_enter" slot="right">搜索</span>
    </nav-bar>
    <!-- 切换排序方式 -->
    <div class="search_tab">
      <div
        class="search_key"
        v-for="(item, index) in tab"
        :key="index"
        @click="clickSort(index)"
      >
        <div class="tab-sort" :class="{ isactive: currentSort == index }">
          {{ item.title }}
        </div>
        <div v-if="index > 0" class="serach_icon">
          <i
            class="icon-up"
            :class="{ isactive: currentSort == index && item.status === 1 }"
            ></i
          >
          <i
            class="icon-down"
            :class="{ isactive: currentSort == index && item.status === 2 }"
            ></i
          >
        </div>
      </div>
    </div>

    <!-- 滑动区域 -->
    <scroll
      class="wrapper"
      ref="scroll"
      :myPullUpLoad="true"
      @onScroll="onScroll"
      @pullingUp="pullingUp"
    >
      <goods-list :goods="goods.list" style="padding-top: 5px" />
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
      searchContent: this.$store.state.currentSearchKey,
      tab: [
        { title: "综合" },
        { title: "销量", status: 0 },
        { title: "价格", status: 0 },
      ],
      currentSort: 0,
    };
  },
  created() {
    this.getSearchGoods();
    this.$nextTick(() => {
      let position = this.$store.state.searchPosition;
      this.$refs.scroll.myScrollTo(0, position, -position * 0.1);
    });
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.myScrollRefresh, 20);
    this.$bus.$on("searchImageLoad", () => {
      // console.log(123);
      refresh();
      // this.$refs.scroll.myScrollRefresh();
    });
    // let position = this.$store.state.searchPosition;
    // console.log(position);
    // this.$refs.scroll.myScrollTo(0, position, -position * 0.1);
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
      let type = this.tab[this.currentSort].title;
      let state = this.tab[this.currentSort].status;
      homeSearch(key, page, type, state).then((res) => {
        // console.log(123);
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

    clickSort(index) {
      this.currentSort = index;
      this.tab[index].status = this.tab[index].status === 1 ? 2 : 1;
      this.goods = { key: "", page: 0, list: [] };
      this.$refs.scroll.myScrollTo(0, 0, 20);
      this.getSearchGoods();
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
.search_enter {
  color: #fff;
  font-size: 14px;
}

.search_input {
  height: 40px;
}
.search_nav {
  position: relative;
  background-color: rgb(247, 150, 166);
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
  z-index: 12;
}
.search_tab {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  position: relative;
  z-index: 12;
}
.search_key {
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.serach_icon {
  display: flex;
  margin-left: 3px;
  flex-direction: column;
}
.serach_icon i {
  font-size: 4px;
  margin-bottom: -5px;
}
.wrapper {
  height: calc(100% - 84px);
  z-index: 11;
}
.isactive {
  color: rgb(247, 150, 166);
}
</style>