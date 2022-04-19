<template>
  <!-- 新人专享悬浮--优惠购买> -->
  <div class="btn fryh frlryh " v-if='showUserPop'>
    <p class="fryh_img "></p>
    <div class="cd">
      <CountDown :countDown="countDown" returnObj isMillisecond />
    </div>
    <div class="btn_click" @click='sendUserVip'></div>
    <div class="btn_close" @click='showUserPop = false'></div>
  </div>
</template>

<script>
import CountDown from "@c/CountDown.vue";
export default {
  name: "RedEnvelope",
  components: { CountDown },
  props: {
    // showUserPop: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      endDate: new Date("2022/02/15 17:22:59").getTime(),
      showUserPop: true,
    };
  },
  computed: {
    countDown() {
      // let day = 86400000
      // let nowDate = new Date().getTime();
      // return this.endDate - nowDate;
      return 1000*60*60*10;
    },
  },
  created: function () {

  },
  mounted: function () { },
  watch: {
  },
  methods: {
    sendUserVip() {
      window.open('https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=0');
    },
  },
};
</script>
<style lang="less" scoped>
.btn {
  cursor: pointer;
}
.fryh {
  position: fixed;
  z-index: 100;
  top: 60%;
  right: 0.2rem;
  .fryh_img {
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
    background: url("../images/pic_xrzx_free.png") no-repeat;
    background-size: 100% auto;
  }
  .cd {
    position: absolute;
    left: 0;
    right: 0;
    top: 90px;
    font-size: 0.12rem;
    text-align: center;
    color: #fff;
    /deep/ .time_box .time::after {
      top: 0.02rem;
      right: -0.09rem;
    }
  }

  .btn_close {
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
        top: 5px;
    right: 6px;
    background: url(../images/btn_close.png) no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .btn_click {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 25px;
    right: 30px;
    cursor: pointer;
  }
}
</style>
