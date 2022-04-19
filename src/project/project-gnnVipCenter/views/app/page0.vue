<template>
  <!-- 股牛牛会员 -->
  <div class="page">

    <!-- 会员内容中间不同部分-->
    <div class="change_tab">
      <!-- 股牛牛会员8项权益 -->
      <IconList class="u-mar-t20" :dataList='vipicon'>
        <div slot='title'>
          股牛牛会员<span>8项</span>权益
        </div>
      </IconList>
      <!-- 会员特权对比 -->
      <VipPower :currentIndex="currentIndex"></VipPower>
    </div>

    <!-- 会员专属折扣 -->
    <VipDiscount :currentIndex="currentIndex" v-bind="$attrs" />

    <!-- 软件下载 -->
    <AppDownload v-bind="$attrs" />

    <!-- 说明 -->
    <div class="state">
      <p>
        优品投顾25年
        <span>品质保证</span>，7天无理由退款
      </p>
    </div>
  </div>
</template>

<script>
import IconList from "./iconList";
import VipPower from './vipPower.vue';
// import MaskPoupon from "@c/MaskPoupon.vue";
// import Banner from "./banner.vue";
import VipDiscount from "./vipDiscount.vue";
import AppDownload from "./appDownload.vue";
export default {
  name: "page0",
  provide: {
    currentIndex: 0
  },
  components: { IconList, VipPower,VipDiscount,AppDownload },
  // 继承所有父组件的内容
  inheritAttrs: true,
  props: {
    // rulesObj: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       name: '股牛牛会员',
    //       isVip: false, //是否拥有过权限
    //       isPower: false, //是否有权限
    //       isOldUser: false //是否是老用户
    //     }
    //   }
    // }
  },
  data() {
    return {
      currentIndex: 0, //页面的导航
      vipicon: [
        {
          img: require("./images/icon_wxgpc.png"),
          txt: "五星股票池",
          hasRight: "upchina://market/pool?type=ltjj",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=1"
        },
        {
          img: require("./images/icon_wxgpc.png"),
          txt: "红黄白股池",
          hasRight: "https://hhbstock.upchina.com/stock/",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=0"
        },
        {
          img: require("./images/icon_gsdgc.png"),
          txt: "攻守道股池",
          hasRight: "https://aadpool.upchinaproduct.com/stock",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=27"
        },
        {
          img: require("./images/icon_l2.png"),
          txt: "手机L2指标",
          hasRight: "https://l2stock.upchina.com/index.html",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=25",
          isSend: true
        },
        {
          img: require("./images/icon_lssj.png"),
          txt: "会员标识",
          hasRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=18",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=18",
          isSend: true
        },
        {
          img: require("./images/icon_hyzk.png"),
          txt: "会员折扣",
          hasRight: "",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=16",
          fixed: "discount"
        },
        {
          img: require("./images/icon_wxfwq.png"),
          txt: "微信服务圈",
          hasRight: "upchina://wxapp/mini?userName=gh_95df53bf1888&path=pages%2FguniuniuSVIP%2Findex",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=15"
        },
        {
          img: require("./images/icon_wfz.png"),
          txt: "核心指标课程",
          hasRight: "https://ntgapp.upchina.com/course/index?id=47",
          noRight: "https://ntgapp.upchina.com/course/index?id=47"
        },
      ],
    };
  },
  computed: {

  },
  created: function () { },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
.page {
  .change_tab {
    /deep/ .tq_icon {
      width: 1.68rem;
    }
  }
  .state {
    padding-bottom: 1.3rem;
  }
}
</style>
