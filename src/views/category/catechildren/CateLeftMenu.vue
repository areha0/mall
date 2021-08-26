<template>
  <div class="cate-left-menu">
    <div
      class="menu-item"
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: index == currentIndex }"
      @click="itemClick(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CateLeftMenu",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.cate-left-menu {
  display: flex;
  flex-direction: column;
}
.menu-item {
  padding: 15px 10px;
  background-color: #f2f2f2;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.active {
  background-color: #fff;
  color: deeppink;
  font-weight: 600;
  border-left: deeppink 4px solid;
  padding-left: 6px;
}
</style>