<template>
  <!-- 客服弹窗 -->
  <div class="msgPage green">
    <!-- 客服 -->
    <div class="msg">
      <a href="javascript:;" @click="openMsg" class="btn_kf"></a>
    </div>
    <div class="mask mask_kf u-fx-ac-jc" v-if="isDialogue" @click="(e) => closeMask(e, 'isDialogue')">
      <div class="pop_box">
        <div class="btn_close" @click="isDialogue = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "msg",
  props: {},
  data() {
    return {
      isDialogue: false,
    };
  },
  created() { },
  mounted() { },
  methods: {
    openMsg() {
      var kfopt = {
        url: "https://kf.upchina.com/pc/pcchat/cs",
        width: 830,
        height: 455,
        count: 1,
      };
      upNativeComm.exec("open.kfwindow", kfopt);
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
  bottom: 2rem;
  display: block;
  position: fixed;
  left: 50%;
  transform: translate(5.5rem, 0);
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
  &.mask_kf {
    .pop_box {
      margin-top: 0.5rem;
      width: 6.75rem;
      height: 9.62rem;
      background: url("https://cdn.upchinaproduct.com/acm/202111/20211116/image/onlineUser_mak.png")
        no-repeat;
      background-size: 100%;
      position: relative;
      .btn_close {
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100%;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        cursor: pointer;
      }
    }
  }
}
</style>
