<template>
  <!-- 注释的代码, 可以改变响应时的颜色 -->
  <!-- <div class="tab-bar-items" @click="click" :class="{'item-active': isActive}" :style="activeStyle"> -->
  <div class="tab-bar-items" @click="click" :class="{'item-active': isActive}">
    <slot name="home-icon"></slot>
    <slot name="home-text"></slot>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonTabbaritem",
  data() {
    return {};
  },
  props: {
    // 这里子组件数据就直接是父组件传入的数据(连变量名也不用修改)
    path: {
      type: String
    },
    itemcolor: {
      type: String,
      default: "pink"
    }
  },
  methods: {
    click() {
      //   console.log(this.path);
      this.$router.push(this.path);
      //   console.log(this.$route.path);
    }
  },
  computed: {
    // 这个地方很重要, 判别哪个路径被点击
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    // 如果需要按照传入的颜色进行修改, 就不能够使用动态绑定class属性的方法, 而是使用动态绑定样式的方法
    activeStyle() {
      return this.isActive ? { color: this.itemcolor } : {};
    }
  }
};
</script>

<style scoped>
.tab-bar-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.tab-bar-items i {
  font-size: 20px;
  line-height: 22px;
  margin-top: 3px;
  vertical-align: middle;
  /* color: #444; */
}
.tab-bar-items p {
  padding: 0;
  margin: 0;
}
div.item-active i,
div.item-active p {
  color: pink;
}
</style>