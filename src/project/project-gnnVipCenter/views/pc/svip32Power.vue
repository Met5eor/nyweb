<template>
  <!-- 股牛牛尊享会员特权-->
  <div class="tab_vip" :style="{width:`${width}rem`,heigth:`${heigth}rem`}">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="tq_box svip_tq clear">
      <div class="tq_list">
        <div class="tq_icon" v-for="item in vipicon" :key="item.txt" :class="rulesObj.isVip ? '' : 'nopowers'" @click="goIcon(item, 1)">
          <img :src="item.imgvip" />
          <p class="txt">{{ item.txt }}</p>
        </div>
        <div class="tq_icon" v-for="item in svipicon" :key="item.txt" :class="rulesObj.isVip ? '' : 'nopowers'" @click="goIcon(item, 2)">
          <img :src="item.img" />
          <p class="txt">{{ item.txt }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import fun from '../mixins/fun.js';
export default {
  name: "svip32Power",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
  mixins: [fun],
  props: {
    width: {
      type: Number,
      default: 10
    },
    heigth: {
      type: Number,
      default: 12
    },
    rulesObj: {
      type: Object,
      default: () => {
        return {
          // name: '股牛牛会员',
          // isVip: false, //是否拥有过权限
          // isPower: false, //是否有权限
          // isOldUser: false //是否是老用户
        }
      }
    },
  },
  data() {
    return {
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
          fixed: 3000,
          tips: "口碑爆款立省200+",
        },
      ],
      svipicon: [
        {
          img: require("./images/icon_sczqt.png"),
          txt: "市场周期图",
          hasRight: "11422452-F26D-447D-BA83-941B9E6000B5",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=9",
          guid: true,
        },
        {
          img: require("./images/icon_tstc.png"),
          txt: "特色题材",
          hasRight:
            "upchina://custom/custom_tab/rmbk?caption=特色题材&layout_file_name=remenbankuai.fsl&systempath=true&option_type=1",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=31",
          guid: true,
        },
        {
          img: require("./images/icon_tctzxs.png"),
          txt: "题材投资线索",
          hasRight: "https://ntgpc.upchina.com/viewpoint/detail.html?id=11443",
          noRight: "https://ntgpc.upchina.com/viewpoint/detail.html?id=11443",
        },
        {
          img: require("./images/icon_ltqd.png"),
          txt: "龙头启动",
          hasRight:
            "upchina://market/tendency?caption=趋势盯盘&pool_type_id=14",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=19",
          guid: true,
        },
        {
          img: require("./images/icon_ltps.png"),
          txt: "龙头攀升",
          hasRight:
            "upchina://market/tendency?caption=趋势盯盘&pool_type_id=14",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=19",
          guid: true,
        },
        {
          img: require("./images/icon_ltjs.png"),
          txt: "龙头加速",
          hasRight:
            "upchina://market/tendency?caption=趋势盯盘&pool_type_id=14",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=19",
          guid: true,
        },
        {
          img: require("./images/icon_ltzs.png"),
          txt: "龙头主升",
          hasRight:
            "upchina://market/tendency?caption=趋势盯盘&pool_type_id=14",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=19",
          guid: true,
        },
        {
          img: require("./images/icon_cdfp.png"),
          txt: "超级复盘",
          hasRight: "674B6824-0E42-48A3-A7D5-B97B3BC73296",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=11",
          guid: true,
        },
        {
          img: require("./images/icon_cddp.png"),
          txt: "高级盯盘",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=4",
          guid: true,
        },
        {
          img: require("./images/icon_dxlssj.png"),
          txt: "短线历史数据",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=8",
          guid: true,
        },
        {
          img: require("./images/icon_qsdp.png"),
          txt: "趋势盯盘",
          hasRight:
            "upchina://market/tendency?caption=趋势盯盘&pool_type_id=14",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=19",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_bxzj.png"),
          txt: "北向追击",
          hasRight:
            "upchina://custom/custom_tab/beixiangzhuiji?caption=北向追击&layout_file_name=beixiangzhuiji.fsl&systempath=true",
          noRight: "https://ntgpc.upchina.com/viewpoint/detail.html?id=9414",
          guid: true,
        },
        {
          img: require("./images/icon_qjzgzf.png"),
          txt: "区间最高涨幅",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=30",
          guid: true,
        },
        {
          img: require("./images/icon_ztwj.png"),
          txt: "涨停挖掘",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=20",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=20",
        },
        {
          img: require("./images/icon_ztfx.png"),
          txt: "涨停分析",
          hasRight: "B1705ACB-5B97-429A-8490-2A1AC85484B7",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=10",
          guid: true,
        },
        {
          img: require("./images/icon_ztyz.png"),
          txt: "涨停因子",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=5",
          guid: true,
        },
        {
          img: require("./images/icon_zzlyb.png"),
          txt: "自选琅琊榜",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=26",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=26",
        },
        {
          img: require("./images/icon_gglyb.png"),
          txt: "个股琅琊榜",
          hasRight: "8640F986-C132-4DB7-8026-4E5927B8930A",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=6",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_tclyb.png"),
          txt: "题材琅琊榜",
          hasRight:
            "upchina://custom/custom_tab/rmbk?caption=热门板块&layout_file_name=remenbankuai.fsl&systempath=true",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=7",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_jjxj.png"),
          txt: "竞价先机",
          hasRight: "4E9D3F43-CD67-4B50-B892-9EFF6D42333D",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=2",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_bkxj.png"),
          txt: "板块先机",
          hasRight: "4E9D3F43-CD67-4B50-B892-9EFF6D42333D",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=3",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_smcd.png"),
          txt: "神秘C点股池",
          hasRight: "upchina://market/qngc_gnn_support?caption=擒牛股池",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=22",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_smcdzb.png"),
          txt: "神秘C点指标",
          hasRight: "upchina://market/qngc_gnn_support?caption=擒牛股池",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=23",
          guid: true,
          isSend: true,
        },
        {
          img: require("./images/icon_hycj.png"),
          txt: "尊享会员抽奖",
          hasRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=17",
          noRight:
            "https://cdn.upchinaproduct.com/acm/202012/1223/gnnxrhyqx/index.html?tabindex=17",
        },
      ],
    };
  },
  computed: {
  },
  created: function () {
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
.tab_vip {
  display: flex;
  flex-flow: column;
  .title {
    height: 0.8rem;
  }
  .tq_box {
    width: 100%;
    height: 100%;
  }
}
</style>
