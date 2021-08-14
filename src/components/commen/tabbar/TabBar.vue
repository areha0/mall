<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonTabbar",

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 49px;
  background-color: #f2f2f2;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0 -2px 4px rgba(100, 100, 100, 0.2);
}
#tab-bar div {
  flex: 1;
  text-align: center;
}
</style>