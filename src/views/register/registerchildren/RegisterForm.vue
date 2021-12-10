<template>
  <div class="form">
    <form class="infor">
      <el-input
        v-model="userregister.name"
        placeholder="your name"
        class="name"
        autofocus
      ></el-input>
      <el-input
        placeholder="your password"
        v-model="userregister.password"
        show-password
        class="pwd"
      ></el-input>

      <el-input
        placeholder="ensure your password"
        v-model="secondpwd"
        show-password
        class="sepwd"
      ></el-input>
      <el-input
        v-model="userregister.phone"
        placeholder="your phone"
        class="phone"
      ></el-input>

      <span :class="{ span: true, green: isgreen }">{{ message }}</span>
      <input
        type="submit"
        value="sign up"
        class="submit"
        @click.prevent="submit"
      />
    </form>
  </div>
</template>

<script>
import { registerData } from "network/user/register";
export default {
  name: "RegisterForm",
  data() {
    return {
      userregister: {
        name: "",
        password: "",
        phone: "",
      },
      secondpwd: "",
      message: "",
      isgreen: false,
    };
  },
  methods: {
    // 1. 判断两次密码是否相同

    submit() {
      // console.log(JSON.stringify(this.userregister));
      if (this.userregister.name === "") {
        this.message = "** 请设置您的用户名";
        return;
      }
      if (this.userregister.password === "") {
        this.message = "** 请设置您的密码";
        return;
      }
      if (this.userregister.phone == "") {
        this.message = "** 请输入您的手机号码";
        return;
      }
      if (this.userregister.password !== this.secondpwd) {
        this.message = "** 请确认您的密码";
        return;
      }
      let regExp =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!regExp.test(this.userregister.phone)) {
        this.message = "** 手机号输入不正规";
        return;
      }
      let str = JSON.stringify(this.userregister);
      let data = JSON.parse(str);
      console.log(data);
      registerData(data).then((res) => {
        console.log(res.data);
        if (res.data.state === 0) {
          this.message = "** 该用户名已被注册";
        } else {
          this.message = "** 注册成功";
          this.isgreen = true;
          // 注册成功之后,我们需要直接返回首页
          this.$router.replace("/home");
          // 在localStorage中存储用户信息
          let userInfo = {
            name: this.userregister.name,
            phone: this.userregister.phone,
          };
          this.$store.commit("setUser", userInfo);
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
  margin-bottom: 20px;
}
.sepwd {
  margin-bottom: 20px;
}
.phone {
  margin-bottom: 10px;
}
.span {
  display: block;
  color: rgb(252, 50, 50);
  margin-bottom: 20px;
  padding-left: 5px;
  line-height: 20px;
  height: 20px;
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
.green {
  color: green;
}
</style>