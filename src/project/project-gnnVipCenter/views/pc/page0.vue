<template>
  <!-- 股牛牛会员 -->
  <div class="page">
    <!-- banner -->
    <Banner :currentIndex="currentIndex" title="股牛牛会员" info="专享3大股池+L2指标" newtxt="新人福利：首次开通仅需30元" v-bind="$attrs">
      <div class="swiper-container swiper_toptq">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="top_tq">
              <Card v-for="(item, index) in vipicon.slice(0, 4)" :key="index" :item="item"></Card>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="top_tq">
              <Card v-for="(item, index) in vipicon.slice(4, 8)" :key="index" :item="item"></Card>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination swiper-pagination2"></div>
      </div>
    </Banner>

    <!-- 会员特权对比-->
    <div class="change_tab">
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
import Swiper from "swiper";
import MaskPoupon from "@c/MaskPoupon.vue";
import Banner from "./banner.vue";
import VipPower from './vipPower.vue';
import VipDiscount from "./vipDiscount.vue";
import AppDownload from "./appDownload.vue";
import Card from "./card.vue";

export default {
  name: "page0",
  provide: {
    currentIndex: 0
  },
  components: { MaskPoupon, Banner, VipPower, VipDiscount, AppDownload, Card },
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
          imgvip: require("./images/icon_vip_wxgpc.png"),
          txt: "五星股票池",
          hasRight: "upchina://market/qngc_gnn_support?caption=擒牛股池",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=1",
          guid: true,
          tips: "智能高胜率五星买卖点</br>潜伏金股",
        },
        {
          img: require("./images/icon_hhbgc.png"),
          imgvip: require("./images/icon_vip_hhbgc.png"),
          txt: "红黄白股池",
          hasRight: "upchina://market/qngc_gnn_support?caption=擒牛股池",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=0",
          guid: true,
          tips: "锁定弱转强</br>趋势加速牛股",
        },
        {
          img: require("./images/icon_gsdgc.png"),
          imgvip: require("./images/icon_vip_gsdgc.png"),
          txt: "攻守道股池",
          hasRight: "upchina://market/qngc_gnn_support?caption=擒牛股池",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=27",
          guid: true,
          tips: "上攻蓄能，防守支撑</br>快速识别主力上攻动作",
        },
        {
          img: require("./images/icon_l2.png"),
          imgvip: require("./images/icon_vip_l2.png"),
          txt: "手机L2指标",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=25",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=25",
          tips: "还原盘口真相</br>跟上主力布局方向",
        },
        {
          img: require("./images/icon_wfz.png"),
          imgvip: require("./images/icon_vip_wfz.png"),
          txt: "核心指标课程",
          hasRight: "https://ntgpc.upchina.com/course/detail.html?courseid=47",
          noRight: "https://ntgpc.upchina.com/course/detail.html?courseid=47",
          tips: "6节课带你快速上手股牛牛股票软件，掌握核心指标",
        },
        {
          img: require("./images/icon_wxfwq.png"),
          imgvip: require("./images/icon_vip_wx.png"),
          txt: "微信服务圈",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=15",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=15",
          tips: "盘中文字解盘</br>高胜率股池微信实时接收",
        },
        {
          img: require("./images/icon_viptips.png"),
          imgvip: require("./images/icon_vip_tips02.png"),
          txt: "会员标识",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=18",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=18",
          tips: "成为会员可获得</br>专属标识",
        },
        {
          img: require("./images/icon_vipzk.png"),
          imgvip: require("./images/icon_vip_zk.png"),
          txt: "会员折扣",
          hasRight: "",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=16",
          fixed: 1850,
          tips: "口碑爆款立省200+",
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
      //会员轮播
      var mySwiper_top = new Swiper(".swiper_toptq", {
        // autoplay: 5000,
        pagination: ".swiper-pagination2",
        paginationClickable: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
      });
    },
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
.page {
  margin-top: 90px;
  .swiper_toptq {
    width: 120%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    // margin-top: 75px;
    background: transparent;
    .swiper-button-next {
      right: 53px;
    }
    .swiper-button-prev {
      left: 0.5rem;
    }
    .swiper-button-next {
    }
  }
  .change_tab {
    padding-top: 180px;
  }
  .state {
    padding-bottom: 0px;
  }
}
</style>
