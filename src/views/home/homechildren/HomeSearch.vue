<template>
  <div class="search_panel">
    <!-- 进行搜索的地方 -->
    <nav-bar class="search_aria">
      <span class="search_quit" slot="left" @click="cancel">取消</span>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="search_input"
        autofocus
        v-model="searchContent"
        @change="keyInput"
        aria-placeholder="请输入关键词"
        clearable
        slot="center"
      >
      </el-input>
      <span class="search_enter" slot="right" @click="enter">搜索</span>
    </nav-bar>
    <!-- 搜索历史 -->
    <div class="search-history">
      <span class="history">搜索历史</span>
      <div class="history_list">
        <span
          v-for="item in historyList"
          :key="item"
          @click="itemClick(item)"
          :class="{ active: item == currentItem }"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
export default {
  name: "HomeSearch",
  components: {
    NavBar,
  },
  data() {
    return {
      searchContent: "",
      historyList: this.$store.state.searchkeys,
      currentItem: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("closeSearch");
    },
    enter() {
      if (this.searchContent.trim() !== "") {
        this.$emit("keyInput", this.searchContent);
        this.$store.commit("addHistory", this.searchContent.trim());
        this.$store.commit("changeSearchKey", this.searchContent);
      }
      this.$router.push("/search");
    },
    keyInput() {
      this.currentItem = this.searchContent;
    },
    itemClick(item) {
      this.currentItem = item;
      this.searchContent = item;
      this.keyInput();
    },
  },
};
</script>

<style scoped>
.search_panel {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 13;
}
.search_aria {
  background-color: rgb(247, 150, 166);
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
}

.search_quit,
.search_enter {
  color: #fff;
  font-size: 14px;
}

.search-history {
  padding-top: 20px;
  padding-left: 10px;
}
.history {
  font-weight: 600;
}
.history_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}

.history_list span {
  display: block;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  color: #666;
  border: solid #999 1px;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 5px;
}
.history_list .active {
  color: red;
  border: solid red 1px;
}
</style>