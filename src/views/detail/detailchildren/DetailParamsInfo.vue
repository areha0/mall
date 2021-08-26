<template>
  <div class="detail-params">
    <div class="params-table" v-if="Object.keys(params).length !== 0">
      <table class="table" v-if="params.table">
        <tr v-for="(itemtr, indextr) in params.table[0]" :key="indextr">
          <th v-for="(itemth, indexth) in itemtr" :key="indexth">
            {{ itemth }}
          </th>
        </tr>
        <tr v-for="itemSetTr in params.set" :key="itemSetTr.key">
          <th>{{ itemSetTr.key }}</th>
          <th :colspan="params.table[0][0].length - 1" class="redColor">
            {{ itemSetTr.value }}
          </th>
        </tr>
      </table>

      <img :src="params.image" alt="" class="params-img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.detail-params {
  padding: 10px 6px;
  border-bottom: 3px solid rgba(200, 200, 200, 0.4);
}
.table {
  border-collapse: collapse;
  width: 100%;
}
.table th,
.table tr {
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
  font-size: 14px;
  font-weight: 400;
  padding: 10px 0;
  text-align: center;
}
.table tr :first-child {
  width: 50px;
}
.redColor {
  color: rgb(224, 86, 86);
}
.params-img {
  width: 360px;
  margin: 0 auto;
}
</style>