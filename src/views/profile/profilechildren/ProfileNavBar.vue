<template>
  <div class="profile-nav-bar">
    <nav-bar>
      <div slot="center">个人中心</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";

export default {
  name: "ProfileNavBar",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.profile-nav-bar {
  background-color: rgb(247, 150, 166);
  color: #fff;
}
</style>