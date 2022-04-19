<template>
  <!-- 悬浮底部 -->
  <div class="footer_box u-fx u-fx-ac" v-show="showFlag">
    <div class="countDown u-fx-ac-jc">
      <div v-if="time<=0">
        拼团活动已截止
      </div>
      <div v-else class="countDown u-fx-ac-jc">
        <div class="txt">拼团活动即将截止</div>
        <slot></slot>
      </div>
    </div>
    <img class="btn_15008"  src="../views/img/15088_btn.png" @click="goBuy('10588',null)" alt="">
    <img v-if="time<=0" class="btn_2998" src="../views/img/end_btn2.png" @click="goBuy('showLock')" alt="">
    <img v-else class="btn_2998" @click="goBuy('2998','cb')"  src="../views/img/2998_btn.png" alt="">
  </div>
</template>

<script>
import CountDown from "@c/CountDown.vue";
export default {
  name: "FooterBar",
  components: {
    CountDown
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showFlag: false,
    };
  },
  computed: {
  },
  created: function () {
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    showFlag(flag) {
      if (flag) {
      
      }
    }
  },
  methods: {
    goBuy(str,cb) {
      console
      this.$emit('goBuy', str,cb)
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 348) {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
    },
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="less" scoped>
.footer_box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  font-size: 0.24rem;
  color: #333;
  width: 100%;
  height: 1.21rem;
  background-size: cover;
  background: #fff;
  .countDown {
    // padding: 0.1rem;
    width:2.45rem;
    .txt {
      height: 0.4rem;
    }
    .van-count-down {
      font-size: 0.24rem;
    }
  }
  .btn_15008{
    height: 100%;
  }
  .btn_2998{
    height: 100%;
   
  }
}
</style>
