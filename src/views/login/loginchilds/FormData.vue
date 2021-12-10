<template>
  <div class="form">
    <form class="info">
      <!-- <input type="text" name="username" id="name" />
      <input type="text" name="passwork" id="password" /> -->
      <el-input
        v-model="username"
        placeholder="your name"
        class="name"
        key="name"
        autofocus
      ></el-input>
      <el-input
        placeholder="your password"
        v-model="password"
        show-password
        key="pwd"
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
        console.log(res.data);
        switch (state) {
          case 1:
            this.message = "* 用户名不存在";
            break;
          case 2:
            this.message = "* 密码错误";
            break;
          case 3:
            // 登陆成功后的一系列操作: 不报错, 向vuex中添加用户信息(用户在个人用户页面进行展示), 保存用户的购物车信息
            this.message = "";
            let userInfo = res.data.result[0];
            // console.log(res.data.result);
            // this.$store.state.userBaseInfo = {
            //   name: userInfo.name,
            //   phone: userInfo.phone,
            // };
            let shopcart = userInfo.shopcart;
            // console.log(this.$store.state.userBaseInfo);
            // console.log(this.$store.state.cartList);

            // ** 这里我们使用localStorage来保存我们的用户登录状态, 保证刷新之后不改变用户登录状态
            let user = {
              name: userInfo.name,
              phone: userInfo.phone,
            };
            this.$store.commit("setUser", user);
            // ** localStorage来保存我们的购物车, 保证刷新之后不会改变购物车列表
            // 为了实时监测购物车状态, 需要多次修改localStorage
            this.$store.commit("setCart", shopcart);
            this.$router.back();
        }
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