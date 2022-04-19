<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  },
  async created() {
  },
}
</script>
<style lang="less" scoped>
.app {
  font-size: 0.16rem;
}
@import "./assets/css/index.less";
// * {
//   outline: solid #f00 1px !important;
//   background: #000 !important;
//   color: #fff !important;
// }
</style>
