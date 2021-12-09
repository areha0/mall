<template>
  <div class="form">
    <form action="" class="infor">
      <el-input
        v-model="userregister.name"
        placeholder="your name"
        class="name"
        name="name"
        autofocus
      ></el-input>
      <el-input
        v-model="userregister.phone"
        placeholder="your phone"
        class="phone"
        name="phone"
        autofocus
      ></el-input>
      <el-input
        placeholder="your password"
        v-model="userregister.pwd"
        show-password
        class="pwd"
        name="psd"
      ></el-input>
      <el-input
        placeholder="ensure your password"
        v-model="secondpwd"
        show-password
        class="sepwd"
      ></el-input>
      <span class="span"></span>
      <input type="submit" value="sign up" class="submit" @click="submit" />
    </form>
  </div>
</template>

<script>
import { loginData } from "network/user/login";
export default {
  name: "RegisterForm",
  data() {
    return {
      userregister: {
        name: "",
        pwd: "",
        phone: "",
      },
      secondpwd: "",
      message: "",
    };
  },
  computed: {
    isTrue() {},
  },
  methods: {
    submit() {},
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
.name,
.phone {
  margin-bottom: 20px;
}

.pwd {
  margin-bottom: 20px;
}
.sepwd {
  margin-bottom: 10px;
}
.span {
  margin-bottom: 20px;
  color: rgb(250, 33, 33);
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