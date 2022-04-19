<template>
  <div class="page" >
    <Pc v-if="isPc" />
    <Weixin v-else-if="isWeixi" />
    <Mobile v-else />
  </div>
</template>
<script>

import Mobile from "./Mobile.vue";
import Pc from "./pc.vue";
import Weixin from "./wxH5.vue";
export default {
  data() {
    return {
      isPc: false,
      isWeixi: false,
    };
  },
  components: {
    Pc,
    Mobile,
    Weixin,
  },
  created() {
    this.isPc = this.$tools.isTerminal("isPc");
    this.isWeixi = this.$tools.isTerminal("weixin");
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less">
</style>
