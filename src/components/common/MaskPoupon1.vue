<template>
  <div class="mask study u-fx-ac-jc" v-show="status" @click="(e) => closeMask(e, 'showOrdermMak')">
    <slot></slot>
    <div v-if="isClose" class="pop_close pointer" :style="closeStyle" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: "MaskPoupon1",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      show: false,
      closeStyle: {
        top: '0px',
        right: '10px'
      }
    };
  },
  computed: {
    status: {
      get() {
        if (this.value) {
          this.setColseObj()
        }
        return this.value;
      },
      set() {
        this.$emit("input", false);
      },
    },
  },
  created() {
  },
  mounted() { },
  methods: {
    setColseObj() {
      this.$nextTick(() => {
        let top = this.$slots.default[0].elm.offsetTop
        console.log(top,'toptop') 
        let rigth = this.$slots.default[0].elm.offsetLeft
        this.closeStyle.top = (top - 30) + 'px'
        this.closeStyle.right = (rigth - 25) + 'px'
      })
    },
    close() {
      this.$emit("input", false);
    },
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
.pop_close {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0.2rem;
  background: url(./img/btn_close.png) no-repeat;
  background-size: 100%;
}
</style>
