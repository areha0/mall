<template>
  <div class="profile-account">
    <!-- 就只是单纯的把这部分给拿过来, 没有组件化的意义 -->
    <div class="sufficient">
      <span>{{ sufficient | showPrice }}</span>
      <span>我的余额</span>
    </div>
    <div class="discount">
      <span>{{ discount }}</span>
      <span>我的优惠</span>
    </div>
    <div class="integrate">
      <span>{{ integrate }}</span>
      <span>我的积分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAccount",
  data() {
    return {
      sufficient: 0,
      discount: 0,
      integrate: 0,
    };
  },
  filters: {
    showPrice(data) {
      return data.toFixed(2);
    },
  },
};
</script>

<style scoped>
.profile-account {
  height: 50px;
  padding: 10px 0 10px;
  display: flex;
  justify-content: space-around;
}
.profile-account div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile-account div span:first-child {
  font-size: 18px;
  color: deeppink;
  font-weight: 600;
}
.profile-account div span:last-child {
  margin-top: 8px;
  font-size: 14px;
  color: #aaa;
}
</style>