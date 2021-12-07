<template>
  <div class="register" @click="toRegister">
    <div class="hello">
      <span class="span1">Hello,</span>
      <span class="span2">you can create a free account here</span>
    </div>
    <div class="icon-next"></div>
  </div>
</template>

<script>
export default {
  name: "Register",
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.register {
  margin-top: 60px;
  display: flex;
  text-align: center;
  align-items: center;
  height: 80px;
}
.hello {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding-left: 10px;
}
.span1 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 7px;
}
.span2 {
  color: #777;
}
.icon-next {
  width: 50px;
  font-size: 26px;
}
</style>