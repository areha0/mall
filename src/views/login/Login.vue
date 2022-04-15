<template>
  <div id="login">
    <background-img />
    <login-nav @navback="navback" />
    <check>
      <register slot="top"></register>
      <form-data slot="form"></form-data>
    </check>
  </div>
</template>

<script>
import BackgroundImg from "components/content/signform/Background.vue";
import LoginNav from "components/content/signform/LoginNav.vue";
import Check from "components/content/signform/Check.vue";
import Register from "views/login/loginchilds/Register.vue";
import FormData from "views/login/loginchilds/FormData.vue";
import { loginData } from "network/login.js";

export default {
  name: "Login",
  components: {
    BackgroundImg,
    LoginNav,
    Check,
    Register,
    FormData,
  },
  methods: {
    navback() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
#login {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
</style>