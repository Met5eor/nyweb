<template>
  <div>
    <!-- 卡片-->
    <div class="tq_list" @click="goIcon(item, 1)">
      <img :src="item.img" />
      <p class="name">{{ item.txt }}</p>
      <p class="intro" v-html="item.tips"></p>
    </div>
  </div>

</template>

<script>
import fun from '../mixins/fun.js';
export default {
  name: "card",
  components: {  },
  // 继承所有父组件的内容
  inheritAttrs: false,
  mixins: [fun],
  props: {
    item: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      showWx: true,
    };
  },
  computed: {
  },
  created: function () {
    // console.log(this.rulesObj)
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
</style>
