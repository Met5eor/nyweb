<template>
  <div
    class="mask study u-fx-ac-jc"
    v-if="status"
    @click="(e) => closeMask(e, 'showOrdermMak')"
  >
    <slot></slot>
    <!-- <div class="pop popod">
      <img class="pop_img" src="./img/h5_mask.png" alt="" />
      <div class="pop_close pointer" @click="showOrdermMak = false"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "MaskPoupon",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    status: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input", false);
      },
    },
  },
  created() {
  },
  mounted() {},
  methods: {
    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this.$emit("input", false);
      }
    },
  },
};
</script>

<style scoped lang="less">
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
</style>
