<template>
  <div id="register">
    <background />
    <register-nav @navback="navback" />
    <checked>
      <welcome slot="top" />
      <register-form slot="form" />
    </checked>
  </div>
</template>

<script>
import Background from "components/content/signform/Background";
import RegisterNav from "components/content/signform/LoginNav";
import Checked from "components/content/signform/Check";
import RegisterForm from "./registerchildren/RegisterForm";
import Welcome from "./registerchildren/Welcome.vue";
export default {
  name: "Register",
  components: {
    Background,
    Checked,
    RegisterNav,
    RegisterForm,
    Welcome,
  },
  methods: {
    navback() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
#register {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
</style>