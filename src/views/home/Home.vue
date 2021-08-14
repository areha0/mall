<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import { homeMultidata } from "network/home";
export default {
  name: "WorkspaceJsonHome",
  data() {
    return {
      banner: [],
      recommend: []
    };
  },
  components: {
    NavBar
  },
  created() {
    homeMultidata().then(res => {
      // console.log(res);
      this.banner = res.data.data.banner.list;
      this.recommend = res.data.data.recommend.list;
    });
  }
};
</script>

<style scoped>
.home-nav {
  background-color: Pink;
  color: #ffffff;
  font-size: 18px;
}
</style>