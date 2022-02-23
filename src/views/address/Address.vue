<template>
  <!-- 收货地址 -->
  <div id="address">
    <!-- 编辑地址页面,打开时隐藏其他 -->
    <edit-address
      v-show="isShow"
      @closeShow="closeShow"
      @afterSave="closeShow"
      :addressInfo="addressInfo"
      :currentIndex="currentIndex"
    />
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav_bar"
      title="我的收货地址"
      left-text="返回"
      :right-text="isEdit ? '完成' : '管理'"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 地址卡片 -->
    <div v-for="(item, index) in addressList" :key="index">
      <address-card
        :list="item"
        :isEdit="isEdit"
        @editAdress="editAdress(index)"
        @removeCard="removeCard(index)"
        @checkedclick="checkedclick(index)"
      />
    </div>
    <!-- 新增地址按钮 -->
    <div class="add_address">
      <van-button
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        round
        icon="plus"
        size="large"
        class="add_button"
        @click="addnew"
      >
        添加收货地址
      </van-button>
    </div>
  </div>
</template>

<script>
import AddressCard from "./addresschildren/AddressCard.vue";
import EditAddress from "./addresschildren/EditAddress.vue";
import { mapState } from "vuex";
export default {
  name: "Address",
  components: {
    AddressCard,
    EditAddress,
  },
  data() {
    return {
      chosenAddressId: 2,
      isEdit: false, //是否进行管理
      isShow: false, //是否对地址进行编辑
      addressInfo: {}, //编辑地址时的初始数据
      currentIndex: -1, //当前修改的地址是哪一个
    };
  },
  computed: {
    ...mapState(["addressList"]), // 地址列表
  },
  methods: {
    // 关闭地址的编辑页
    closeShow() {
      // console.log(12);
      this.isShow = false;
      this.currentIndex = -1;
      this.addressInfo = {};
    },
    // 对指定地址进行修改
    editAdress(index) {
      // console.log(index);
      this.currentIndex = index;
      this.addressInfo = this.addressList[index];
      this.isShow = true;
      // console.log(this.addressList);
    },
    // 删除地址
    removeCard(index) {
      this.$store.commit("removeAddress", index);
    },
    // 选中为默认地址
    checkedclick(index) {
      this.$store.commit("editDefault", index);
      this.$store.commit("orderAddress", index);
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      console.log("管理收货地址");
      this.isEdit = !this.isEdit;
    },
    addnew() {
      this.isShow = true;
    },
  },
};
</script>

<style scoped>
#address {
  position: relative;
  background-color: #f0f0f0;

  width: 100%;
  height: 100vh;
  z-index: 13;
}

.add_address {
  position: absolute;
  background-color: #fff;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0;
}
.add_button {
  position: relative;
  width: 90%;
  left: 5%;
  height: 40px;
  margin-top: 8px;
}
</style>