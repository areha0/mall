<template>
  <div id="user_detail">
    <van-nav-bar title="我的信息" left-arrow @click-left="onClickLeft" />

    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="quit"
      @click="quitaccount"
    >
      退出登录
    </van-button>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "UserDetail",
  methods: {
    onClickLeft() {
      this.$emit("closeshow");
    },
    quitaccount() {
      Dialog.confirm({
        message: "是否确定要退出账号",
      })
        .then(() => {
          // 将所有的localStorag清空
          localStorage.clear();
          this.$emit("closeshow");
          window.location.reload();
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped>
#user_detail {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 16;
}

.quit {
  position: absolute;
  width: 90%;
  height: 30px;
  left: 5%;
  bottom: 15px;
  border-radius: 15px;
}
</style>