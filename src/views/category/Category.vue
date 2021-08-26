<template>
  <div id="category">
    <cate-nav-bar />
    <div class="cate-content">
      <div class="left-menu">
        <scroll ref="leftscroll">
          <cate-left-menu
            :list="categoryList"
            ref="menu"
            @itemClick="itemClick"
          />
        </scroll>
      </div>
      <div class="right-cate">
        <scroll ref="rightcate"
          ><cate-icon :iconItems="currentItem.cateIcon" @iconLoad="iconLoad"
        /></scroll>
      </div>
    </div>
  </div>
</template>

<script>
import CateNavBar from "./catechildren/CateNavBar";
import CateLeftMenu from "./catechildren/CateLeftMenu";
import Scroll from "components/commen/scroll/Scroll";
import CateIcon from "./catechildren/CateIcon";

import { categoryList, cateSubIcon } from "../../network/category";

export default {
  name: "Category",
  components: {
    CateNavBar,
    CateLeftMenu,
    Scroll,
    CateIcon,
  },
  data() {
    return {
      categoryList: [],
      cateData: [],
      currentIndex: 0,
      currentItem: {},
      refresh: null,
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
    this.refresh = this.debounce(this.$refs.rightcate.myScrollRefresh, 200);
  },
  methods: {
    /**
     * 监听
     */
    itemClick(index) {
      this.currentItem = this.cateData[index];
    },
    // iconLoad中的图片加载完毕, 需要舒心Scroll, 需要用到防抖
    iconLoad() {
      this.refresh();
    },
    // 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, delay);
      };
    },

    getCategoryList() {
      categoryList().then((res) => {
        // console.log(res);
        this.categoryList = res.data.data.category.list;
        // 对应目录的所有数据 cateData
        for (let i = 0; i < this.categoryList.length; i++) {
          this.cateData[i] = {
            // 图标数据
            cateIcon: [],
            // 商品数据
            cateGoods: {
              pop: [],
              new: [],
              sell: [],
            },
          };
          // 获取对应的数据
          this.getCateDeta(i);
        }
        // console.log(this.cateData[this.$refs.menu.currentIndex]);
        this.currentItem = this.cateData[0];
      });
    },

    getCateDeta(index) {
      // 先获取图标数据
      const cateItems = this.categoryList[index].maitKey;
      cateSubIcon(cateItems).then((res) => {
        // console.log(res);
        this.cateData[index].cateIcon = res.data.data.list;
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
  flex: 1;
}
.right-cate {
  flex: 3;
}

.wrapper {
  height: calc(100% - 49px - 44px);
}
</style>