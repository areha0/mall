<template>
  <div id="category">
    <cate-nav-bar />
    <div class="cate-content">
      <div class="left-menu">
        <scroll ref="leftscroll" class="leftacroll">
          <cate-left-menu
            :list="categoryList"
            ref="menu"
            @itemClick="itemClick"
          />
        </scroll>
      </div>
      <div class="right-cate">
        <tab-control
          :tabtitle="['综合', '新品', '销量']"
          @tabClick="tabItemClick"
          ref="toptabcontrol"
          class="nonetab"
          :class="{ notshow: notShow }"
        />
        <scroll
          ref="rightcate"
          :myProbType="3"
          class="rightscroll"
          @onScroll="onScroll"
          ><cate-icon :iconItems="currentItem.cateIcon" @iconLoad="iconLoad" />
          <tab-control
            :tabtitle="['综合', '新品', '销量']"
            @tabClick="tabItemClick"
            ref="tabcontrol"
          />
          <goods-list :goods="currentGoods" />
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import CateNavBar from "./catechildren/CateNavBar";
import CateLeftMenu from "./catechildren/CateLeftMenu";
import Scroll from "components/commen/scroll/Scroll";
import CateIcon from "./catechildren/CateIcon";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";

import { categoryList, cateSubIcon, cateGoods } from "../../network/category";

export default {
  name: "Category",
  components: {
    CateNavBar,
    CateLeftMenu,
    Scroll,
    CateIcon,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      categoryList: [],
      cateData: [],
      currentIndex: 0,
      currentItem: {},
      refresh: null,
      currentType: "pop",
      currentGoods: [],
      tabTop: 0,
      notShow: true,
      meaturetabTop: null,
    };
  },
  created() {
    // 获取左侧列表数据
    this.getCategoryList();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.leftscroll.myScrollRefresh();
      this.getTargetData();
      this.meaturetabTop();
    }, 300);
    this.refresh = this.debounce(this.$refs.rightcate.myScrollRefresh, 200);
    this.meaturetabTop = this.debounce(() => {
      this.tabTop = this.$refs.tabcontrol.$el.offsetTop;
    }, 200);
    this.$bus.$on("cateImageLoad", () => {
      this.refresh();
    });
  },
  methods: {
    /**
     * 监听
     */
    itemClick(index) {
      this.currentIndex = index;
      this.currentItem = this.cateData[index];
      // 每次点击到下一个项目时, 都要从pop开始展示, 并且TabControl要显示 流行
      this.currentType = "pop";
      this.$refs.toptabcontrol.activeIndex = 0;
      this.$refs.tabcontrol.activeIndex = 0;
      this.getTargetData();
      this.meaturetabTop();
      // 当点击左侧的分类栏时, 这时应该将右侧物品栏升到最高, 并且选中"流行"
      this.$refs.rightcate.myScrollTo(0, 0, 0);
    },
    // iconLoad中的图片加载完毕, 需要舒心Scroll, 需要用到防抖
    iconLoad() {
      this.refresh();
    },
    // tabcontrol 被点击
    tabItemClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log(this.currentIndex);
      this.getTargetData();
      // 监听完TabControl的点击之后, 要将页面拉回TabControl顶部
      this.$refs.rightcate.myScrollTo(0, -this.tabTop, 200);
      // 然后两个TabControl的活跃索引都要相同
      this.$refs.toptabcontrol.activeIndex = index;
      this.$refs.tabcontrol.activeIndex = index;
    },
    // 监听滑轮滚动
    onScroll(position) {
      this.notShow = Math.abs(position.y) < Math.abs(this.tabTop);
    },

    getTargetData() {
      // console.log(this.currentIndex, this.currentType);
      this.currentGoods =
        this.cateData[this.currentIndex].cateGoods[this.currentType];
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
      // 获取展示商品数据
      this.getCateGoods("pop", index);
      this.getCateGoods("new", index);
      this.getCateGoods("sell", index);
    },
    getCateGoods(type, index) {
      const miniWallkey = this.categoryList[index].miniWallkey;
      cateGoods(miniWallkey, type).then((res) => {
        // console.log(res);
        this.cateData[index].cateGoods[type] = res.data;
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
  position: relative;
}

.leftscroll,
.rightscroll {
  height: calc(100% - 49px - 44px);
}
.goodslist {
  width: 273px;
}
/* 为了表现出TabControl的停留效果 */
.nonetab {
  position: absolute;
  z-index: 11;
  width: 100%;
}
.notshow {
  display: none;
}
</style>