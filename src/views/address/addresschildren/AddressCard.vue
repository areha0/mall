<template>
  <div class="address_card">
    <div class="card_show">
      <div class="address_info">
        <div class="base_info">
          <span class="name">{{ list.name }}</span>
          <span class="phone">{{ list.tel }}</span>
          <span :class="{ default: list.isDefault }" v-if="list.isDefault"
            >默认</span
          >
        </div>
        <div class="address">{{ list.address }}</div>
      </div>

      <div class="address_edit" @click="editAddress">
        <i class="icon-edit"></i>
      </div>
    </div>

    <div class="card_hidden" v-show="isEdit">
      <van-checkbox
        v-model="list.isDefault"
        @click="checkedclick"
        checked-color="#ee0a24"
        icon-size="12px"
        class="checkbox"
        >默认地址</van-checkbox
      >
      <!-- <span>{{ list.isDefault }}</span> -->
      <span class="delete" @click="removeCard">删除</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddressCard",
  props: {
    list: {
      type: Object,
      default() {
        return {};
      },
    },
    isEdit: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    ...mapState(["addressList"]),
  },
  methods: {
    editAddress() {
      this.$emit("editAdress");
    },
    removeCard() {
      this.$emit("removeCard");
    },
    checkedclick() {
      this.$emit("checkedclick");
    },
  },
};
</script>

<style scoped>
.address_card {
  margin: 10px 10px;
  padding: 10px 10px 10px 10px;
  background-color: #fff;
  border-radius: 10px;
}
.card_show {
  display: flex;
  height: 70px;
}
.address_info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.base_info {
  flex: 1;
}
.name {
  margin-right: 10px;
}
.phone {
  font-size: 14px;
  color: #aaa;
}
.default {
  margin-left: 5px;
  padding: 1px 2px;
  font-size: 10px;
  color: red;
  border: 1px solid red;
}
.address {
  flex: 1;
  font-size: 14px;
}
.address_edit {
  width: 40px;
}
.address_edit {
  align-self: center;
  margin-left: 15px;
}
.icon-edit {
  font-size: 18px;
  color: #aaa;
}
.card_hidden {
  border-top: 1px solid #eaeaea;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #aaa;
  align-items: center;
}
</style>