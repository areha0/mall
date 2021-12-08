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
      <span class="alert">{{ message }}</span>
      <input
        type="submit"
        value="sign in"
        class="submit"
        @click.prevent="submit"
      />
    </form>
  </div>
</template>

<script>
import { loginData } from "network/user/login.js";
export default {
  name: "FormData",
  data() {
    return {
      username: "",
      password: "",
      message: " ",
    };
  },
  methods: {
    submit() {
      let params = { username: this.username, password: this.password };
      loginData(params).then((res) => {
        let state = res.data.state;
        let userInfo = res.data.result[0];
        console.log(res.data);
        switch (state) {
          case 1:
            this.message = "* 用户名不存在";
            break;
          case 2:
            this.message = "* 密码错误";
            break;
          case 3:
            this.message = "";
            // console.log(res.data.result);
            this.$store.state.userBaseInfo = {
              name: userInfo.name,
              phone: userInfo.phone,
            };
            this.$store.state.cartList = userInfo.shopcart;
            this.$router.back();
            console.log(this.$store.state.userBaseInfo);
            console.log(this.$store.state.cartList);
        }

        // 在用户登录成功后,我们还需要获取使用聚合管道生成的数据
      });
    },
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
  margin-bottom: 10px;
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
.alert {
  display: block;
  color: rgb(252, 50, 50);
  margin-bottom: 20px;
  padding-left: 5px;
  line-height: 20px;
  height: 20px;
}
</style>