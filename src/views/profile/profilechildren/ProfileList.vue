<template>
  <div class="profile-list">
    <!-- 假装数据都是从profile页面中传过来的 -->
    <div
      class="list-item"
      v-for="(item, index) in list"
      :key="index"
      @click="tonext(index)"
    >
      <i class="icon-item">{{ item.icon }}</i>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileList",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    tonext(index) {
      switch (index) {
        case 0:
          this.$router.push("/address");
          break;
        case 1:
          this.$router.push("/allorders");
      }
    },
  },
};
</script>

<style scoped>
.profile-list {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  border-top: 20px solid #fff;
}
.profile-list div {
  height: 40px;
  display: flex;
}
.list-item i {
  width: 30px;
  font-size: 20px;
  padding: 10px 0;
}
.list-item span {
  flex: 1;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
}
.profile-list div:last-child span {
  border: none;
}
</style>