<template>
  <div id="category">
    <cate-nav-bar />
    <div class="cate-content">
      <div class="left-menu">
        <scroll ref="leftscroll">
          <cate-left-menu :list="categoryList" />
        </scroll>
      </div>
      <div class="right-cate"></div>
    </div>
  </div>
</template>

<script>
import CateNavBar from "./catechildren/CateNavBar";
import CateLeftMenu from "./catechildren/CateLeftMenu";
import Scroll from "components/commen/scroll/Scroll";

import { categoryList } from "../../network/category";

export default {
  name: "Category",
  components: {
    CateNavBar,
    CateLeftMenu,
    Scroll,
  },
  data() {
    return {
      categoryList: [],
    };
  },
  created() {
    // 获取左侧列表数据
    this.getCategoryList();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.leftscroll.myScrollRefresh();
    }, 300);
  },
  methods: {
    getCategoryList() {
      categoryList().then((res) => {
        console.log(res);
        this.categoryList = res.data.data.category.list;
      });
    },
  },
};
</script>

<style scoped>
.cate-content {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.left-menu {
  /* background-color: deeppink; */
  flex: 1;
  /* height: 300px; */
}
.right-cate {
  flex: 3;
  background-color: yellowgreen;
  /* height: 600px; */
}

.wrapper {
  height: calc(100% - 49px - 44px);
}
</style>