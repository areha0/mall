<template>
  <div class="detail-comment" v-if="Object.keys(comment).length !== 0">
    <div class="comment-title">
      <span>用户评价</span>
      <a href="javaScrip:;">
        <span class="more">更多</span>
        <i class="icon-comment"></i>
      </a>
    </div>
    <div class="comment-main">
      <div class="comment-user" v-if="comment.userImg">
        <img :src="comment.userImg" alt="" />
        <span>{{ comment.name }}</span>
      </div>
      <div class="comment-content">
        {{ comment.content }}
      </div>
      <div class="comment-params">
        <span>{{ comment.time | showDate }}</span>
        <span>{{ comment.style }}</span>
      </div>
      <div class="comment-imgs" v-if="comment.imgs">
        <img
          v-for="(item, index) in comment.imgs"
          :key="index"
          :src="item"
          alt=""
          class="img-item"
          @load="commentImgLoad"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isimgLoad: false,
    };
  },
  methods: {
    commentImgLoad() {
      if (!this.isimgLoad) this.$emit("commentImgLoad");
      this.isimgLoad = true;
    },
  },
  filters: {
    showDate(date) {
      // 这个也太牛比了
      return new Date(parseInt(date) * 1000).toLocaleString().split(" ")[0];
    },
  },
};
</script>

<style scoped>
.detail-comment {
  padding: 10px 6px 30px;
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
  margin-bottom: 10px;
}
/* 评论区头部标题 */
.comment-title {
  padding: 0px 0 15px;
  font-size: 15px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
}
.comment-title a {
  float: right;
}
.icon-comment {
  font-size: 16px;
  margin-left: 3px;
}
/* 评论区用户 */
.comment-user {
  display: flex;
  margin-top: 8px;
  height: 50px;
  align-items: center;
}
.comment-user img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.comment-user span {
  margin-left: 10px;
  height: 50px;
  line-height: 50px;
}
/* 内容 */
.comment-content {
  padding: 10px 6px;
  font-size: 15px;
  color: #666;
}
/* 发送时间 */
.comment-params {
  padding: 0 6px;
  font-size: 10px;
  color: #ccc;
}
.comment-params span:first-child {
  margin-right: 10px;
}
/* 评论图片 */
.comment-imgs {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.img-item {
  width: 30%;
  margin-right: 8px;
}
</style>