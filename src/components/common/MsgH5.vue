<template>
  <!-- 客服微信 -->
  <div class="msgPage">
    <div class="msg">
      <a href="javascript:;" @click="isDialogue = true" class="btn_kf"></a>
    </div>
    <div
      class="mask mask_kf u-fx-ac-jc"
      v-if="isDialogue"
      @click="(e) => closeMask(e, 'isDialogue')"
    >
      <div class="pop_box" :style="{backgroundImage:'url('+maskUrl+')'}">
        <div class="btn_close" @click="isDialogue = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "msg",
  props: {
    maskUrl:{
      type:String,
      default:'https://cdn.upchinaproduct.com/acm/202111/20211116/image/onlineUser_mak.png'
    }
  },
  data() {
    return {
      isDialogue: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
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
  bottom: 2.5rem;
  display: block;
  position: fixed;
  right: 0;
  z-index: 900;
  // &.hear {
  //   bottom: 4rem;
  //   .btn_kf {
  //     background: url("https://cdn.upchinaproduct.com/acm/202111/20211116/image/hear.png")
  //       no-repeat;
  //     background-size: 100%;
  //   }
  // }
  .btn_kf {
    width: 1.66rem;
    height: 1.34rem;
    background: url(https://cdn.upchinaproduct.com/acm/202109/aghxzbtyywx/img/btn_kf.png)
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
      width: 5rem;
      height: 6.62rem;
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
  &.study {
    .popod {
      //  background: rgba(0, 0, 0, 0.7);
      width: 5.2rem;
      height: 9rem;
      position: relative;
      border-radius: 7px;
      overflow: hidden;
      .pop_img {
        width: 100%;
        height: 100%;
      }
      .btn_study {
        cursor: pointer;
        position: absolute;
        left: 50%;
        bottom: 0.64rem;
        transform: translate(-50%, 0%);
        width: 4.09rem;
        height: 0.5rem;
        background: linear-gradient(315deg, #de211e 0%, #ff610c 100%);
        box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(93, 93, 93, 0.4);
        border-radius: 0.45rem;
        font-size: 0.21rem;
        color: #ffffff;
        font-weight: 500;
      }
      .pop_close {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        top: 0.18rem;
        right: 0.15rem;
      }
    }
  }
}
</style>
