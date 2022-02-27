<template>
  <div class="search_panel">
    <!-- 进行搜索的地方 -->
    <nav-bar class="search_aria">
      <span class="search_quit" slot="left" @click="cancel">取消</span>
      <van-search
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        class="search_input"
        autofocus
        v-model="searchContent"
        @change="keyInput"
        clearable
        slot="center"
        background="rgb(247,150,166)"
        shape="round"
      />
      <span class="search_enter" slot="right" @click="enter">搜索</span>
    </nav-bar>
    <!-- 搜索历史 -->

    <div class="search-history">
      <span class="history">搜索历史</span>
      <span
        class="remove"
        @click="changeButton"
        :class="{ removedown: isremove }"
        >删除搜索历史</span
      >
      <div class="history_list">
        <span
          v-for="item in historyList"
          :key="item"
          @click="itemClick(item)"
          :class="{
            active: item == currentItem && isremove == false,
            showremove: isremove == true,
            doremove: item == currentItem && isremove == true,
          }"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/commen/navbar/NavBar";
import { historyKeys } from "network/search";
import { Dialog } from "vant";

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
      isremove: false,
      isfocuse: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("closeSearch");
    },
    enter() {
      if (this.searchContent.trim() !== "") {
        this.$emit("keyInput", this.searchContent);
        // 将添加后的搜索记录发送至服务器
        let username = this.$store.state.userBaseInfo.name;
        // 当前搜索历史中并不包含有改搜索关键字
        // 这里发送状态码1,表示直接添加
        let searchkeys = this.$store.state.searchkeys;
        if (searchkeys.indexOf(this.searchContent) === -1) {
          // let key = this.searchContent;
          let key = searchkeys;
          key.unshift(this.searchContent.trim());
          historyKeys(username, key);
          this.$store.commit("addHistory", this.searchContent.trim());
        }
        this.$store.commit("changeSearchKey", this.searchContent);
        this.$router.push("/search");
      } else {
        Dialog.alert({
          message: "请输入有效关键字",
          theme: "round-button",
          width: 260,
        }).then(() => {
          // on close
        });
      }
    },
    changeButton() {
      this.isremove = !this.isremove;
    },
    keyInput() {
      this.currentItem = this.searchContent;
    },
    itemClick(item) {
      this.currentItem = item;

      if (this.isremove == false) {
        // 如果不是删除的话,就把这个值传给搜索框
        this.searchContent = item;
        this.keyInput();
      }

      // 这里的顺序被改变,那么也要传入数据库
      let username = this.$store.state.userBaseInfo.name;
      let key = this.$store.state.searchkeys;
      let index = key.indexOf(item);
      if (this.isremove == false) {
        key.splice(index, 1);
        key.unshift(item);
        historyKeys(username, key);
        // this.$store.commit("changeKeysOrder", item);
      } else {
        // 删除搜索历史
        Dialog.confirm({
          message: "是否要删除当前搜索历史",
        })
          .then(() => {
            // on confirm
            key.splice(index, 1);
            this.searchContent = "";
            this.currentItem = "";
            historyKeys(username, key).then((res) => {
              console.log(res);
            });
          })
          .catch(() => {
            // on cancel
          });
      }
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

.search_input {
  height: 30px;
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
.remove {
  font-size: 12px;
  color: #666;
  float: right;
  margin-right: 10px;
  border: 1px #ccc solid;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 10px;
}
.removedown {
  background-color: #000;
  color: #fff;
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
.history_list .doremove {
  color: rgb(41, 206, 247);
  border: solid rgb(41, 206, 247) 1px;
}
.history_list .showremove:after {
  content: "\eb2c";
  font-family: icomoon;
  margin-left: 10px;
  color: #aaa;
  font-size: 10px;
}
</style>