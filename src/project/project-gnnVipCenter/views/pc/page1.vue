<template>
  <!-- 尊享会员会员 -->
  <div class="page">
    <Banner :currentIndex="currentIndex" title="尊享会员" info="含股牛牛会员权限+24项独家核心功能权限" newtxt="新人福利：首次开通仅需198元/14天" v-bind="$attrs">
      <div class="top_tq mr">
        <div class="tq_list" v-for="(item, index) in recommendIcon" :key="index" @click="goIcon(item, 1)">
          <img :src="item.img" />
          <p class="name">{{ item.txt }}</p>
          <p class="intro" v-html="item.tips"></p>
        </div>
      </div>
    </Banner>
    <!-- 会员内容中间不同部分 -->
    <div class="change_tab">
      <!-- 股牛牛尊享会员特权-->
      <Svip32Power :currentIndex="currentIndex" v-bind="$attrs">
        <div slot='title' class="title">
          <p>尊享会员32项特权</p>
        </div>
      </Svip32Power>
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
import Swiper from "swiper";
import Banner from "./banner.vue";
import VipPower from './vipPower.vue';
import Svip32Power from './svip32Power.vue';
import AppDownload from "./appDownload.vue";
import VipDiscount from "./vipDiscount.vue";
 import  fun  from '../mixins/fun.js';
export default {
  name: "page1",
  components: { Banner, VipPower, Svip32Power, VipDiscount, AppDownload },
  inheritAttrs: true,
  mixins: [ fun ],
  data() {
    return {
      currentIndex: 1, //页面的导航
      recommendIcon: [
        {
          img: require("./images/icon_qjzgzf.png"),
          txt: "区间最高涨幅",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=30",
          guid: true,
          tips: "快速锁定</br>最强牛股和最强板块",
        },
        {
          img: require("./images/icon_cdfp.png"),
          txt: "超短复盘",
          hasRight: "674B6824-0E42-48A3-A7D5-B97B3BC73296",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=11",
          guid: true,
          tips: "专为短线定制的复盘模式</br>锁定牛股",
        },
        {
          img: require("./images/icon_bxzj.png"),
          txt: "北向追击",
          hasRight:
            "upchina://custom/custom_tab/beixiangzhuiji?caption=北向追击&layout_file_name=beixiangzhuiji.fsl&systempath=true",
          noRight: "https://ntgpc.upchina.com/viewpoint/detail.html?id=9414",
          guid: true,
          tips: "四大模型追踪北向资金</br>关键行为缩小选股范围",
        },
        {
          img: require("./images/icon_sczqt.png"),
          txt: "市场周期图",
          hasRight: "11422452-F26D-447D-BA83-941B9E6000B5",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=9",
          guid: true,
          tips: "独家市场情绪</br>市场第一黄金周期图",
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
  .banner {
    margin-top: 90px;
    height:7rem;
  }
  .top_tq {
    margin-top: 01rem;
  }
  .change_tab {
    padding-top: 0.4em;
  }
}
</style>
