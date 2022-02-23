<template>
  <div class="user-info" @click="toLogin">
    <!-- 由于现在没有用户数据, 所以先预留插槽, 然后在插槽中插入默认的数据 -->
    <div class="user-logo">
      <slot name="img">
        <img src="~assets/img/common/default-logo.jpg" alt="" />
      </slot>
    </div>

    <div class="user-detail">
      <div class="user-name">
        <slot name="username">
          <span>登录/注册</span>
        </slot>
      </div>
      <div class="user-phone">
        <i class="icon-phone"></i>
        <slot name="phone">
          <span>暂无绑定手机号</span>
        </slot>
      </div>
    </div>
    <div class="user-more">
      <i class="icon-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    toLogin() {
      let userInfo = this.$store.state.userBaseInfo;
      // console.log(userInfo);
      if (!userInfo.name) {
        this.$router.push("/login");
      } else {
        // alert("已登录过了");
        // this.$store.commit("setUser", {});
        // this.$store.commit("setCart", []);
        // this.$store.commit("setSearch", []);
      }
    },
  },
};
</script>

<style scoped>
.user-info {
  padding: 15px 10px;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: rgb(247, 150, 166);
}
.user-logo {
  width: 60px;
}
.user-logo img {
  width: 50px;
  border-radius: 50%;
}
.user-detail {
  flex: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-name {
  font-size: 14px;
}
.user-phone {
  margin-top: 8px;
  font-size: 12px;
}

.user-more {
  color: #fff;
}
</style>