<template>
  <div id="profile">
    <user-detail v-show="isshow" @closeshow="closeshow" />
    <profile-nav-bar />
    <user-info @changepage="changepage">
      <img alt="" slot="img" v-if="userInfo && userInfo.avator" />
      <span slot="username" v-if="userInfo && userInfo.name">{{
        userInfo.name
      }}</span>
      <span slot="phone" v-if="userInfo && userInfo.phone">{{
        userInfo.phone
      }}</span>
    </user-info>
    <!-- <profile-account /> -->
    <profile-list :list="firstList" />
  </div>
</template>

<script>
import ProfileNavBar from "./profilechildren/ProfileNavBar";
import UserInfo from "./profilechildren/UserInfo";
import ProfileAccount from "./profilechildren/ProfileAccount";
import ProfileList from "./profilechildren/ProfileList";
import UserDetail from "./profilechildren/UserDetail";

export default {
  name: "Profile",
  components: {
    ProfileNavBar,
    UserInfo,
    ProfileAccount,
    ProfileList,
    UserDetail,
  },
  data() {
    return {
      firstList: [
        { icon: "", title: "我的地址" },
        { icon: "", title: "我的订单" },
      ],
      isshow: false, // 是否显示用户详细信息
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userBaseInfo;
    },
  },
  methods: {
    changepage() {
      this.isshow = true;
    },
    closeshow() {
      this.isshow = false;
    },
  },
};
</script>

<style scoped>
</style>