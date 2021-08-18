<template>
  <div>详情页</div>
</template>

<script>
import { detailData } from "../../network/detail";

export default {
  name: "Detail",
  created() {
    this.iid = this.$route.params.goodsid;
    // console.log(this.$route.params.goodsid);
    this.getDetailData(this.$route.params.goodsid);
  },
  methods: {
    getDetailData(id) {
      detailData(id).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
</style>