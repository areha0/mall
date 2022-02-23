<template>
  <div class="edit_address">
    <van-nav-bar
      title="添加收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { mapState } from "vuex";
export default {
  name: "EditAddress",
  props: {
    addressInfo: Object,
    currentIndex: {
      type: Number,
      default() {
        return -1;
      },
    },
  },
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  computed: {
    ...mapState(["addressList"]),
  },
  methods: {
    onClickLeft() {
      this.$emit("closeShow");
    },
    onSave(content) {
      // console.log("保存");
      // console.log(content);
      // console.log(this.currentIndex);
      let { province, city, county, addressDetail, isDefault } = content;
      let address = `${province} ${city} ${county} ${addressDetail}`;
      content["address"] = address;
      if (this.currentIndex === -1) {
        // 表示是从头添加的
        // 如果这是的设置为默认属性,那么其他的默认值设为false
        if (isDefault) {
          this.$store.commit("editDefault", -1);
          this.$store.commit("addAddressFirst", content);
        } else {
          this.$store.commit("addAddress", content);
        }
      } else {
        // 表示是来修改的,
        let index = this.currentIndex;
        // 修改时将不是默认值该为默认值,将其他的默认值情空
        if ((isDefault = true && !this.addressList[index].isDefault)) {
          this.$store.commit("editDefault", index);
          this.$store.commit("orderAddress", index);
          index = 0;
        }
        this.$store.commit("editAddress", { content, index });
      }

      // console.log(this.addressList);
      // 添加数据之后,关闭编页面
      this.$emit("afterSave");
    },
    onDelete() {
      console.log("删除");
    },
    onChangeDetail() {
      console.log("修改");
    },
  },
};
</script>

<style scoped>
.edit_address {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 14;
}
</style>
