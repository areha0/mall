<template>
  <nav-bar>
    <div slot="left" class="icon-back" @click="navBackClick"></div>
    <div slot="center" class="main-nav-bar">
      <div
        v-for="(item, index) in centerSlot"
        :key="index"
        class="main-nav-bar-item"
        @click="barClick(index)"
        :class="{ active: index == currentIndex }"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
export default {
  name: "MainNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      centerSlot: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    barClick(index) {
      this.currentIndex = index;
      this.$emit("detailNavbarClick", index);
    },
    navBackClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.main-nav-bar {
  display: flex;
}
.main-nav-bar-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: rgb(247, 150, 166);
}
.icon-back {
  font-size: 22px;
  text-align: center;
  line-height: 44px;
}
</style>