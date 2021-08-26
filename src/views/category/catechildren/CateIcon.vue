<template>
  <div class="cate-icon" v-if="iconItems">
    <div
      class="cate-icon-items"
      v-for="(item, index) in iconItems"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="iconLoad" />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CateIcon",
  props: {
    iconItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconLoad() {
      this.$emit("iconLoad");
    },
  },
};
</script>

<style scoped>
.cate-icon {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: start;
  padding-bottom: 10px;
}
.cate-icon-items {
  width: 30%;
  margin-top: 20px;
  margin-left: 6px;
}
.cate-icon-items a {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cate-icon-items img {
  width: 50px;
}
.cate-icon-items span {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
</style>