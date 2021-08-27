<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommend" :key="index">
      <a :href="item.link" :title="item.title">
        <img :src="item.image" alt="" @load="recommendLoad" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
    },
  },
  methods: {
    recommendLoad() {
      this.$emit("recommendLoad");
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  justify-content: center;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  padding: 10px 5px 16px;
  text-align: center;
  font-size: 13px;
}
.recommend-item img {
  width: 100%;
  margin-bottom: 5px;
}
</style>