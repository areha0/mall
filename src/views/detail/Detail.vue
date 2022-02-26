<template>
  <div id="detail" class="main-flow">
    <main-nav-bar
      class="detail-navbar"
      @detailNavbarClick="detailNavbarClick"
      @shareGoods="shareGoods"
      ref="detailNavBar"
    />

    <div class="mask" v-show="isShare" @click="isShare = false"></div>
    <transition
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="share" v-show="isShare">
        <div>分享</div>
        <div class="iconshow">
          <ShareNetwork
            network="facebook"
            url="https://news.vuejs.org/issues/180"
            title="facebook"
          >
            <i class="icon-facebook"></i>
          </ShareNetwork>
          <ShareNetwork
            network="email"
            url="https://news.vuejs.org/issues/180"
            title="email"
          >
            <i class="icon-email"></i>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            url="https://news.vuejs.org/issues/180"
            title="twitter"
          >
            <i class="icon-twitter"></i>
          </ShareNetwork>
        </div>
        <div class="cancel" @click="isShare = false">取消</div>
      </div>
    </transition>
    <scroll ref="detailScroll" @onScroll="onScroll" :myProbType="3">
      <detail-swiper
        :topImage="topImage"
        @detailSwiperImgLoad="detailSwiperImgLoad"
      ></detail-swiper>
      <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-particular-info
        :particular="particular"
        @particularImgLoad="particularImgLoad"
      />
      <detail-params-info :params="params" ref="detailParams" />
      <detail-comment-info
        :comment="comment"
        @commentImgLoad="commentImgLoad"
        ref="detailComment"
      />
      <goods-list :goods="recommend" ref="detailRecommend" />
    </scroll>

    <back-top @click.native="backToP" v-if="isShowBacktop" />
    <detail-bottom-bar @addCart="addCart" @topay="topay" />
  </div>
</template> 

<script>
import MainNavBar from "./detailchildren/MainNavBar";
import DetailSwiper from "./detailchildren/DetailSwiper";
import DetailGoodsInfo from "./detailchildren/DetailGoodsInfo";
import DetailShopInfo from "./detailchildren/DetailShopInfo";
import Scroll from "components/commen/scroll/Scroll";
import DetailParticularInfo from "./detailchildren/DetailParticularInfo";
import DetailParamsInfo from "./detailchildren/DetailParamsInfo";
import DetailCommentInfo from "./detailchildren/DetailCommentInfo";
import GoodsList from "components/content/goodslist/GoodsList";
import BackTop from "components/commen/backtop/BackTop";
import DetailBottomBar from "./detailchildren/DetailBottomBar";
import { postShop } from "network/user/shopcart";
import { mapState } from "vuex";

import {
  detailData,
  GoodsInfo,
  Shop,
  Particular,
  Params,
  Comment,
  recommend,
} from "../../network/detail";
import { cateGoods } from "../../network/category";

export default {
  name: "Detail",
  data() {
    return {
      topImage: [],
      goodsInfo: {},
      shop: {},
      particular: {},
      imgRefresh: null,
      params: {},
      comment: {},
      recommend: [],
      isShowBacktop: false,
      detailTemplateTop: [],
      getTemplateTop: null,
      navIndex: 0,
      detailIndex: 0,
      isShare: false, // 是否弹出分享动画
    };
  },
  components: {
    MainNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    Scroll,
    DetailParticularInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,
  },
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);

    // 详情页数据
    this.getDetailData(this.$route.params.goodsid);

    // 推荐商品数据
    this.getRecommendData();
  },
  computed: {
    ...mapState({
      order: "currentOrder",
    }),
  },
  mounted() {
    this.imgRefresh = this.debounce(
      this.$refs.detailScroll.myScrollRefresh,
      200
    );
    this.getTemplateTop = this.debounce(() => {
      this.detailTemplateTop = [];
      this.detailTemplateTop.push(0);
      this.detailTemplateTop.push(this.$refs.detailParams.$el.offsetTop);
      this.detailTemplateTop.push(this.$refs.detailComment.$el.offsetTop);
      this.detailTemplateTop.push(this.$refs.detailRecommend.$el.offsetTop);
      this.detailTemplateTop.push(Number.MAX_VALUE);
      // console.log(this.detailTemplateTop);
    }, 200);
    this.$bus.$on("detailImageLoad", () => {
      this.imgRefresh();
    });
  },
  methods: {
    /**
     * 监听响应
     */
    detailSwiperImgLoad() {
      // console.log("myScrollRefresh()");
      this.$refs.detailScroll.myScrollRefresh();
    },
    // 详情参数加载
    particularImgLoad() {
      this.imgRefresh();
      // 获取各模块的offset高度
      this.getTemplateTop();
    },
    // 评论图片加载
    commentImgLoad() {
      this.$refs.detailScroll.myScrollRefresh();
    },
    // 回到顶部
    backToP() {
      this.$refs.detailScroll.myScrollTo(0, 0, 300);
    },
    // 监听下拉位置
    onScroll(position) {
      this.isShowBacktop = Math.abs(position.y) > 1200;
      // 根据下拉位置控制导航栏的样式, 这个是个土方法, 可以使用for循环
      // if (Math.abs(position.y) < this.detailTemplateTop[1]) {
      //   this.$refs.detailNavBar.currentIndex = 0;
      // } else if (Math.abs(position.y) < this.detailTemplateTop[2]) {
      //   this.$refs.detailNavBar.currentIndex = 1;
      // } else if (Math.abs(position.y) < this.detailTemplateTop[3]) {
      //   this.$refs.detailNavBar.currentIndex = 2;
      // } else {
      //   this.$refs.detailNavBar.currentIndex = 3;
      // }

      // 总之是可以使用这种方式, 首先是之前的数组中在最后添加一个最大值 Number.MAX_VALUE
      // 另外if条件判断语句的第一个条件是为了防止 NavBar 中的currentIndex被多次重复赋值

      for (let i = 0; i < this.detailTemplateTop.length - 1; i++) {
        if (
          this.detailIndex !== i &&
          this.detailTemplateTop[i] <= Math.abs(position.y) &&
          Math.abs(position.y) < this.detailTemplateTop[i + 1]
        ) {
          this.detailIndex = i;
          this.$refs.detailNavBar.currentIndex = i;
          // console.log(this.$refs.detailNavBar.currentIndex);
        }
      }
    },
    // 监听导航栏的点击
    detailNavbarClick(index) {
      this.$refs.detailScroll.myScrollTo(
        0,
        -this.detailTemplateTop[index],
        300
      );
    },

    shareGoods() {
      this.isShare = true;
    },
    // 将购物车信息发送数据库

    // 监听加入购物车操作
    addCart() {
      let name = this.$store.state.userBaseInfo.name;
      if (!name) {
        this.$router.push("/login");
        return;
      }
      const product = {};
      product.id = this.iid;
      product.image = this.topImage[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.lowNowPrice;
      product.count = 1;
      // console.log(product);
      // 这里要获得 isHave中返回的结果, 所以actions中的方法要返回一个promise
      this.$store.dispatch("ifHave", product).then((res) => {
        // console.log(this.$toast);
        this.$toast.show(res.message, 2000);
        product.username = name;
        product.state = 1;
        res.state && this.post(product);
      });
      // console.log(this.$store.state.cartList);

      // 这里传输的数据都是需要插入的数据 state=1
      // 这里有一个小bug, 添加过的数据, 依然会添加
    },
    // 购买
    topay() {
      // console.log(12);
      this.$store.commit("ressetorder");
      // 商品的基本信息
      const product = {};
      product.id = this.iid;
      product.image = this.topImage[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.lowNowPrice;
      product.count = 1;
      product.source = "detail";

      this.$store.commit("setOrder", product);
      this.$router.push("/ensureorder");
    },
    post(value) {
      postShop(value).then((res) => console.log(res));
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

    /**
     * 获取数据
     */
    getDetailData(id) {
      detailData(id).then((res) => {
        // console.log(res);
        const detailAllData = res.data[0].result;
        // console.log(detailAllData);
        // 详情页轮播图数据
        this.topImage = detailAllData.itemInfo.topImages;
        // 详情页商品基本数据
        this.goodsInfo = new GoodsInfo(
          detailAllData.itemInfo,
          detailAllData.shopInfo,
          detailAllData.columns
        );
        // 详情页店铺信息
        this.shop = new Shop(detailAllData.shopInfo);
        // 详情页详情信息
        this.particular = new Particular(detailAllData.detailInfo);
        //  详情页参数数据
        this.params = new Params(
          detailAllData.itemParams.info,
          detailAllData.itemParams.rule
        );
        // 详情页评论数据
        if (detailAllData.rate.list) {
          this.comment = new Comment(detailAllData.rate);
        }
      });
    },
    // 推荐数据
    getRecommendData() {
      recommend().then((res) => {
        this.recommend = res.data[0].data.list;
      });
    },
  },
};
</script>

<style scoped>
/* 掩盖下方的导航栏 */
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  position: relative;
  height: 100vh;
}
/* 详情页面的scroll */
.detail-navbar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.wrapper {
  height: calc(100% - 44px - 49px);
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 13;
}
.share {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 150px;
  flex-direction: column;
  z-index: 14;
  background-color: #fff;
  justify-content: space-around;
}
.share div {
  flex: 1;
  text-align: center;
  line-height: 50px;
}
.iconshow i {
  margin-left: 10px;
  font-size: 18px;
}
</style>