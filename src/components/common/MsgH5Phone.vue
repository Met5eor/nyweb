<template>
  <!-- 电话客服 -->
  <div class="msgPage" ref="msgPage">
    <div class="msg" :style="{top:top}">
      <a href="javascript:;" @click="phone" class="btn_kf"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgH5Url",
  props: {
    top: {
      type: String,
      default: '8.5rem'
    }
  },
  data() {
    return {
      isDialogue: false,
    };
  },
  created() { },
  mounted() {
    this.moveMsg()
  },
  methods: {
    //弹窗移动
    moveMsg() {
      let dom = this.$refs.msgPage;
      this.$tools.moveDom(dom);
    },
    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this[val] = false;
      }
    },
    phone() {
      window.location.href = 'tel:400-603-1846';
    },
  },
};
</script>

<style scoped lang="less">
// 客服
.msg {
  top: 8.5rem;
  display: block;
  position: fixed;
  right: 0;
  z-index: 900;
  .btn_kf {
    width: 1.66rem;
    height: 1.34rem;
    background: url(https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/doc-img/phone.png)
      no-repeat;
    background-size: 100%;
    display: block;
    margin: 20px auto 0;
  }
}
</style>
