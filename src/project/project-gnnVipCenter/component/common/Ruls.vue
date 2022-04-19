<template>
  <!-- 客服弹窗 -->
  <div class="msgPage green">
    <!-- 客服 -->
    <div class="msg">
      <a href="javascript:;" @click="openMsg" class="btn_kf"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "msg",
  props: {
    url: {
      type: String,
    },
  },
  data() {
    return {
      isDialogue: false,
    };
  },
  created() { },
  mounted() { },
  methods: {
    openMsg() {
      window.open(this.url)
    },
    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this[val] = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
// 客服
.msg {
  bottom: 4rem;
  display: block;
  position: fixed;
  left: 50%;
  transform: translate(5.5rem, 0);
  z-index: 900;
  .btn_kf {
    width: 1.66rem;
    height: 1.34rem;
    background: url(https://cdn.upchina.com/front/2022/rules.png)
      no-repeat;
    background-size: 100%;
    display: block;
    margin: 20px auto 0;
  }
}
</style>
