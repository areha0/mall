<template>
  <div id="profile">
    <profile-nav-bar />
    <user-info>
      <img alt="" slot="img" v-if="userInfo && userInfo.avator" />
      <span slot="username" v-if="userInfo && userInfo.name">{{
        userInfo.name
      }}</span>
      <span slot="phone" v-if="userInfo && userInfo.phone">{{
        userInfo.phone
      }}</span>
    </user-info>
    <profile-account />
    <profile-list :list="firstList" />
  </div>
</template>

<script>
import ProfileNavBar from "./profilechildren/ProfileNavBar";
import UserInfo from "./profilechildren/UserInfo";
import ProfileAccount from "./profilechildren/ProfileAccount";
import ProfileList from "./profilechildren/ProfileList";

export default {
  name: "Profile",
  components: {
    ProfileNavBar,
    UserInfo,
    ProfileAccount,
    ProfileList,
  },
  data() {
    return {
      firstList: [
        { icon: "", title: "我的地址" },
        { icon: "", title: "我的订单" },
        { icon: "", title: "会员卡" },
        { icon: "", title: "我的购物车" },
        { icon: "", title: "下载购物车APP" },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userBaseInfo;
    },
  },
};
</script>

<style scoped>
</style>