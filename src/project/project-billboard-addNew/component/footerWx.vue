<template>
  <!-- 悬浮底部 -->
  <div class="footer_box" :class="isReceive?'isReceive':''" v-if="showFlag">
    <div class="number ">
      <CountDown :countDown="countDown" returnObj showDay />
    </div>
    <div class="btn_buy" v-if="isReceive" data-track="龙虎榜-被分享人-打开下载app" @click="goBuy"></div>
    <div class="btn_buy" v-else data-track="龙虎榜-被分享人-领取礼品卡" @click="goBuy"></div>
  </div>
</template>

<script>
import { orderSplice } from '@u/orderSearch'
import CountDown from "@c/CountDown.vue";
export default {
  name: "FooterBar",
  components: {
    CountDown
  },
  props: {
    isReceive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFlag: false,
      endDate: new Date("2022/04/27 23:59:59").getTime(),
       nowDate: new Date().getTime()
    };
  },
  computed: {
    countDown() {
      // let day = 86400000
      // let nowDate = new Date().getTime();
       return this.endDate - this.nowDate;
      // return 1000 * 60 * 60 * 24 * 30;
    },
  },
  created: function () {
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
     showFlag(flag) {
     if(flag){
       this.nowDate =  new Date().getTime()
     }
    }
  },
  methods: {
    goBuy() {
      this.$emit('addCard')
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
  height: 1.09rem;
  line-height: 1.09rem;
  background: url("../assets/images/footer.png") no-repeat center;
  background-size: cover;
  &.isReceive {
    background: url("../assets/images/footerisReceive.png") no-repeat center;
    background-size: cover;
    .number {
    position: absolute;
    left: 0rem;
    top: 0.7rem;
    width: 2.8rem;
    /deep/ .time_box .time::after {
      content: "" !important;
    }
    /deep/ .time {
      color: #e02941;
    }
  }
  }
  .number {
    position: absolute;
    left: 1.74rem;
    top: 0.52rem;
    width: 2.8rem;
    /deep/ .time_box .time::after {
      content: "" !important;
    }
    /deep/ .time {
      color: #e02941;
    }
  }
  .btn_buy {
    position: absolute;
    width: 2.6rem;
    height: 1.08rem;
    top: 0px;
    right: 0px;
  }
}
</style>
