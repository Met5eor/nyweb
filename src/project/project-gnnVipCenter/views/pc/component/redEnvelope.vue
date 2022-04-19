<template>
  <!-- 新人专享悬浮--优惠购买> -->
  <div class="btn fryh frxryh" v-if='showUserPop'>
    <p class="fryh_img"></p>
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
      endDate: new Date("2022/01/28 17:59:59").getTime(),
      showDao: true,
      pop: false,
      showUserPop: true
    };
  },
  computed: {
    countDown() {
      // let day = 86400000
      // let nowDate = new Date().getTime();
      // return this.endDate - nowDate;
      return 1000*60*60*8;
    },
  },
  created: function () {

  },
  mounted: function () { },
  watch: {
  },
  methods: {
    sendUserVip() {
      window.open('https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=0');
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
  right: 5%;
  .fryh_img {
    display: block;
    width: 176px;
    height: 221px;
    border-radius: 17px;
    background-size: cover !important;
    background: url("../images/pic_xrzx_free.png") no-repeat;
  }
  .cd {
    position: absolute;
    left: 0;
    right: 0;
    top: 170px;
    font-size: 0.12rem;
    text-align: center;
    color: #fff;
  }

  .btn_close {
    width: 13px;
    height: 13px;
    position: absolute;
    top: 5px;
    right: 12px;
    background: url(../images/btn_close.png) no-repeat;
    background-size: cover;
    cursor: pointer;
  }

   .btn_click {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 45px;
    right: 56px;
    cursor: pointer;
  }
}
</style>
