<template>
  <div class="detail-particular" v-if="Object.keys(particular).length !== 0">
    <div class="detail-particular-desc">
      <div class="desc-start"></div>
      <div class="desc-name">{{ particular.name }}</div>
      <div class="desc-end"></div>
    </div>
    <div class="detail-particular-display" v-if="particular.imgList">
      <div
        class="particular-display-item"
        v-for="(item, index) in particular.imgList"
        :key="index"
      >
        <div class="particlar-key">{{ item.key }}</div>
        <div v-if="item.list" class="img-list">
          <img
            alt=""
            v-for="(img, imgIndex) in item.list"
            :key="imgIndex"
            :src="img"
            class="particular-img"
            @load="particularImgLoad"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParticularInfo",
  props: {
    particular: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    particularImgLoad() {
      this.$emit("particularImgLoad");
    },
  },
};
</script>

<style scoped>
.detail-particular {
  padding-bottom: 20px;
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
}
/* 详情的题头 */
.detail-particular-desc {
  padding: 10px 6px 20px;
  font-size: 15px;
}
/* css样式 */
.desc-name {
  margin: 10px 0;
}
.desc-start,
.desc-end {
  width: 100px;
  height: 2px;
  background-color: #ccc;
  position: relative;
}
.desc-end {
  float: right;
}
.desc-start::before,
.desc-end::after {
  content: "";
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: #000;
  position: absolute;
  bottom: 0;
}
.desc-end::after {
  right: 0px;
}
/* 关键词 */
.particlar-key {
  padding: 3px 6px 6px;
  font-size: 15px;
}
/* 图片 */
.img-list {
  padding: 0 6px;
}
.particular-img {
  width: 100%;
}
</style>