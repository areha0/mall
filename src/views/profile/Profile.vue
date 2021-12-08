<template>
  <div id="profile">
    <profile-nav-bar />
    <user-info>
      <img alt="" slot="img" v-if="$store.state.userBaseInfo.avator" />
      <span slot="username" v-if="$store.state.userBaseInfo.name">{{
        $store.state.userBaseInfo.name
      }}</span>
      <span slot="phone" v-if="$store.state.userBaseInfo.phone">{{
        $store.state.userBaseInfo.phone
      }}</span>
    </user-info>
    <profile-account />
    <profile-list :list="firstList" />
    <profile-list :list="secondList" />
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
        { icon: "", title: "我的消息" },
        { icon: "", title: "积分商城" },
        { icon: "", title: "会员卡" },
      ],
      secondList: [
        { icon: "", title: "我的购物车" },
        { icon: "", title: "下载购物车APP" },
      ],
    };
  },
};
</script>

<style scoped>
</style>