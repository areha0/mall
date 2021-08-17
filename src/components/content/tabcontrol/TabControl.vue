<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in tabtitle"
      :key="index"
      class="tab-control-item"
      @click="itemClick(index)"
      :class="{ active: index == activeIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    tabtitle: {
      type: Array,
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.activeIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  position: sticky;
  top: 44px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: rgb(247, 150, 166);
}
.active span {
  padding: 3px;
  border-bottom: 2px solid rgb(247, 150, 166);
}
</style>