<template>
  <div class="form">
    <form action="" class="infor">
      <el-input
        v-model="name"
        placeholder="your name"
        class="name"
        autofocus
      ></el-input>
      <el-input
        placeholder="your password"
        v-model="pwd"
        show-password
        class="pwd"
      ></el-input>
      <el-input
        placeholder="ensure your password"
        v-model="secondpwd"
        show-password
        class="sepwd"
      ></el-input>
      <input type="submit" value="sign up" class="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      pwd: "",
      secondpwd: "",
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
  margin-bottom: 20px;
}
.sepwd {
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