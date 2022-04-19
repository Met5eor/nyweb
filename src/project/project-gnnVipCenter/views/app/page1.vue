<template>
  <!-- 尊享会员会员 -->
  <div class="page">
    <!-- 会员内容中间不同部分 -->
    <div class="change_tab">
      <!-- 股牛牛会员8项权益 -->
      <IconList class="u-mar-t20" :dataList='svipicon' >
        <div slot='title'>
          尊享会员<span>32项</span>权益
        </div>
      </IconList>
      <!-- 会员特权对比 -->
      <VipPower :currentIndex="currentIndex"></VipPower>
    </div>
    <!-- 会员专属折扣 -->
    <VipDiscount :currentIndex="currentIndex" />

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
import AppDownload from "./appDownload.vue";
import VipDiscount from "./vipDiscount.vue";
export default {
  name: "page1",
  components: { IconList, VipPower, VipDiscount,AppDownload },
  inheritAttrs: true,
  data() {
    return {
      currentIndex: 1, //页面的导航
      svipicon: [
        {
          img: require("./images/icon_vipall.png"),
          txt: "会员VIP",
          hasRight: "upchina://catch/main?tab=period",
          noRight: "会员vip",
        },
        {
          img: require("./images/icon_sczqt.png"),
          txt: "市场周期图",
          hasRight: "upchina://catch/main?tab=period",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=9",
        },
        {
          img: require("./images/icon_tstc.png"),
          txt: "特色题材",
          hasRight: "upchina://market/main?type=special",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=31",
        },
        {
          img: require("./images/icon_tctzxs.png"),
          txt: "题材投资线索",
          hasRight: "https://ntgapp.upchina.com/column/detail?articleid=11443",
          noRight: "https://ntgapp.upchina.com/column/detail?articleid=11443",
        },
        {
          img: require("./images/icon_ltqd.png"),
          txt: "龙头启动",
          hasRight: "upchina://catch/main?tab=trend",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=19",
        },
        {
          img: require("./images/icon_ltps.png"),
          txt: "龙头攀升",
          hasRight: "upchina://catch/main?tab=trend",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=19",
        },
        {
          img: require("./images/icon_ltjs.png"),
          txt: "龙头加速",
          hasRight: "upchina://catch/main?tab=trend",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=19",
        },
        {
          img: require("./images/icon_ltzs.png"),
          txt: "龙头主升",
          hasRight: "upchina://catch/main?tab=trend",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=19",
        },
        {
          img: require("./images/icon_cjfp.png"),
          txt: "超级复盘",
          hasRight: "upchina://catch/main?tab=fupan",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=11",
        },
        {
          img: require("./images/icon_gjdp.png"),
          txt: "高级盯盘",
          hasRight: "upchina://catch/main?tab=pool",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=4",
        },
        {
          img: require("./images/icon_lssj.png"),
          txt: "历史数据",
          hasRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=8",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=8",
        },
        {
          img: require("./images/icon_qsdp.png"),
          txt: "趋势盯盘",
          hasRight: "upchina://catch/main?tab=trend",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=19",
          isSend: true
        },
        {
          img: require("./images/icon_bxzj.png"),
          txt: "北向追击",
          hasRight: "https://ntgapp.upchina.com/column/detail?articleid=9414",
          noRight: "https://ntgapp.upchina.com/column/detail?articleid=9414",
        },
        {
          img: require("./images/icon_qjzgzf.png"),
          txt: "区间最高涨幅",
          hasRight: "https://cdn.upchinaproduct.com/acm/202006/newsecond/index.html?tabindex=qjzgzf",
          noRight: "https://cdn.upchinaproduct.com/acm/202006/newsecond/index.html?tabindex=qjzgzf",
        },
        {
          img: require("./images/icon_ztwj.png"),
          txt: "涨停挖掘",
          hasRight: "https://ztwjstock.upchinaproduct.com/ztwj/",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=20",
          isSend: true
        },
        {
          img: require("./images/icon_ztfx.png"),
          txt: "涨停分析",
          hasRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=10",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=10",
          isSend: true
        },
        {
          img: require("./images/icon_ztyz.png"),
          txt: "涨停因子",
          hasRight: "upchina://catch/main?tab=pool",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=5",
        },
        {
          img: require("./images/icon_zzlyb.png"),
          txt: "自选琅琊榜",
          hasRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=26",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=26",
        },
        {
          img: require("./images/icon_gglyb.png"),
          txt: "个股琅琊榜",
          hasRight: "upchina://catch/main?tab=pool",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=6",
          isSend: true
        },
        {
          img: require("./images/icon_tclyb.png"),
          txt: "题材琅琊榜",
          hasRight: "upchina://market/main?type=block",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=7",
          isSend: true
        },
        {
          img: require("./images/icon_jjxj.png"),
          txt: "竞价先机",
          hasRight: "upchina://market/main?type=bid&subtype=chance",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=2",
          isSend: true
        },
        {
          img: require("./images/icon_bkxj.png"),
          txt: "板块先机",
          hasRight: "upchina://market/main?type=bid&subtype=block",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=3",
          isSend: true
        },
        {
          img: require("./images/icon_smcd.png"),
          txt: "神秘C点股池",
          hasRight: "https://mcppool.upchinaproduct.com/stock",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=22",
        },
        {
          img: require("./images/icon_smcdzb.png"),
          txt: "神秘C点指标",
          hasRight: "https://mcppool.upchinaproduct.com/stock",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=23",
        },
        {
          img: require("./images/icon_hycj.png"),
          txt: "尊享会员抽奖",
          hasRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=17",
          noRight: "https://cdn.upchinaproduct.com/acm/202101/newsecondtqlq/index.html?tabindex=17",
          isSend: true
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
    padding-top: 0.4em;
  }
    .state {
    padding-bottom: 1.3rem;
  }
}
</style>
