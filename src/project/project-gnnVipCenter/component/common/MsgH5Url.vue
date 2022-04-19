<template>
  <!-- 客服弹窗 -->
  <div class="msgPage" ref="msgPage">
    <div class="msg">
      <a href="javascript:;" @click="goUrl" class="btn_kf"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgH5Url",
  props: {},
  data() {
    return {
      isDialogue: false,
    };
  },
  created() {},
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
    goUrl() {
      window.open("https://kf.upchina.com/app/chat/cs");
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
  &.hear {
    bottom: 4rem;
    .btn_kf {
      background: url("https://cdn.upchinaproduct.com/acm/202111/20211116/image/hear.png")
        no-repeat;
      background-size: 100%;
    }
  }
  .btn_kf {
    width: 1.66rem;
    height: 1.34rem;
    background: url(https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/acm/202109/aghxzbtyywx/img/btn_kf.png)
      no-repeat;
    background-size: 100%;
    display: block;
    margin: 20px auto 0;
  }
}
</style>
