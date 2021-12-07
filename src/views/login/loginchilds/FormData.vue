<template>
  <div class="form">
    <form class="info">
      <!-- <input type="text" name="username" id="name" />
      <input type="text" name="passwork" id="password" /> -->
      <el-input
        v-model="username"
        placeholder="your name"
        class="name"
        autofocus
      ></el-input>
      <el-input
        placeholder="your password"
        v-model="password"
        show-password
        class="pwd"
      ></el-input>
      <input type="submit" value="sign in" class="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "FormData",
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.form {
  height: 150px;
  width: 300px;
  margin: 0 auto;
  margin-top: 40px;
}
.name {
  margin-bottom: 20px;
}

.pwd {
  margin-bottom: 30px;
}
.submit {
  position: relative;
  width: 300px;
  height: 40px;
  margin: 0 auto;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  background-color: orange;
  border: none;
  border-radius: 20px;
}
</style>