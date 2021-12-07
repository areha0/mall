<template>
  <div id="home">
    <nav-bar class="home-nav main-flow">
      <div slot="center" class="home-nav-center">购物街</div>
    </nav-bar>

    <!-- 页面下滑到一定程度时显示此tab-control -->
    <tab-control
      :tabtitle="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="FixedtabControl"
      class="tab-control-fixed"
      v-show="isTabControlFixed"
    ></tab-control>

    <scroll
      class="wrapper"
      ref="scroll"
      @onScroll="onScroll"
      :myPullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <home-swiper
        :banner="banner"
        @SwiperImgLoad="SwiperImgLoad"
      ></home-swiper>
      <home-recommend :recommend="recommend" @recommendLoad="recommendLoad" />
      <home-feature></home-feature>
      <tab-control
        :tabtitle="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="goods[currentType].list" :key="currentType">
      </goods-list>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import HomeSwiper from "./homechildren/HomeSwiper";
import HomeRecommend from "./homechildren/HomeRecommend";
import HomeFeature from "./homechildren/HomeFeature";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";
import Scroll from "components/commen/scroll/Scroll";
import BackTop from "../../components/commen/backtop/BackTop";

import { homeMultidata, homegoods } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabContrlTop: 0,
      isTabControlFixed: false,
      meatureOffsetTop: null,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.getHomeMultidata();
    this.getHomegoods("pop");
    this.getHomegoods("sell");
    this.getHomegoods("new");
  },
  mounted() {
    // 更新better-scroll
    const refresh = this.debounce(this.$refs.scroll.myScrollRefresh, 200);
    this.meatureOffsetTop = this.debounce(() => {
      this.tabContrlTop = this.$refs.tabControl.$el.offsetTop;
    }, 200);
    this.$bus.$on("itemImageLoad", () => {
      // this.$refs.scroll.myScrollRefresh();
      refresh();
    });
    // 监测页面大小改变,要跟着更新tabContrlTop的高度
    window.addEventListener("resize", () => {
      this.meatureOffsetTop();
    });
  },

  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
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
      this.$refs.FixedtabControl.activeIndex = index;
      this.$refs.tabControl.activeIndex = index;
      this.$refs.scroll.myScrollTo(0, -this.tabContrlTop, 200);
    },

    backTopClick() {
      // 监听backTo按钮的点击, 然后调用子组件Scroll中的scrollTo()方法, 将坐标调至 (0,0) 点
      // console.log("可以听见吗");
      // console.log(this.$refs.scroll.message);
      this.$refs.scroll.myScrollTo(0, 0, 500);
    },
    // 监听滚动
    onScroll(position) {
      // 判断是否显示回到顶部控件
      this.isShowBackTop = Math.abs(position.y) > 1200;
      // 判断tab-control是否吸顶
      this.isTabControlFixed =
        Math.abs(position.y) > Math.abs(this.tabContrlTop);
    },
    // 监听上啦更新
    pullingUp() {
      // console.log(this.currentType);
      this.getHomegoods(this.currentType);
    },
    // 监听轮播图片是否加载完成
    SwiperImgLoad() {
      // 2.测量tab-control距离父元素的高度, 由于拿到的是一个组件, 所以并没有offsetTop属性, 所以需要使用属性$el
      this.meatureOffsetTop();
    },
    // 监听推荐图片的加载
    recommendLoad() {
      this.meatureOffsetTop();
    },

    // better-scroll更新refresh()方法的防抖动操作封装
    debounce(func, delay) {
      let timer = null;
      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, delay);
      };
    },

    /**
     * 网络请求相关方法
     */
    // 获取首页轮播图数据
    getHomeMultidata() {
      homeMultidata().then((res) => {
        // console.log(res);
        this.banner = res.data.data.banner.list;
        // console.log(this.banner);
        this.recommend = res.data.data.recommend.list;
      });
    },
    // 获取首页商品数据
    getHomegoods(type) {
      let page = this.goods[type].page + 1;
      homegoods(type, page).then((res) => {
        // console.log(res.data.data.list);
        this.goods[type].list.push(...res.data.data.list);
      });
      this.goods[type].page++;
      // 下拉刷新结束
      setTimeout(() => {
        this.$refs.scroll.myPullingFinish();
      }, 1000);
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: rgb(247, 150, 166);
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
}
.home-nav-center {
  text-align: center;
}
.tab-control-fixed {
  position: relative;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 50px;
}
</style>