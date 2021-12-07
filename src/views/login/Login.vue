<template>
  <div id="login">
    <background-img />
    <login-nav />
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
// import { loginData } from "network/user/login.js";

export default {
  name: "Login",
  components: {
    BackgroundImg,
    LoginNav,
    Check,
    Register,
    FormData,
  },
  methods: {},
  mounted() {
    // this.$axios({
    //   methods: "get",
    //   url: "/",
    // }).then((res) => console.log(res));
    this.$axios.get(this.HOST + "/login").then((result) => {
      console.log(result.data);
    });
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