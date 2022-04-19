<template>
  <!-- 尊享会员会员 -->
  <div class="page">
    <!-- banner -->

    <!-- 会员内容中间不同部分 -->
    <div class="change_tab">
      <!-- 股牛牛实战直播会员特权-->
      <div class="sub_tit">
        实战直播版<span>35项</span>权益
      </div>
      <div class="sz_nav" ref="sz_nav">
        <div class="nav_item" v-for="(item,index) in nav_items" :key="index" @click="changeNavCurt(index)" :class="navCurrentIndex==index?'active':''">
          <div class="vip_icon zxvip"></div>
          <div class="r_info">
            <h3>尊享会员</h3>
            <p>32项特权</p>
            <p>价值4980元/年</p>
          </div>
        </div>
      </div>
      <!-- 直播版本导航 -->
      <van-swipe ref="vanSwipe" @change="onChange" class="my-swipe swiper_box" :autoplay="5000" indicator-color="#72441a">
        <van-swipe-item>
          <div class="img_box ">
            <IconList :dataList='vipicons'></IconList>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="img_box ">
            <img src="./images/pic_zb_list_new.png" style="margin-top:0.3rem;width:100%">
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="img_box ">
            <img style="width:100%" src="./images/pic_l2.png">
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="img_box">
            <img style="width:100%" src="./images/pic_szzb.png">
          </div>
        </van-swipe-item>
      </van-swipe>
      <!-- 广告位 -->
      <div class="adsense_box" v-if="adPic&&adLink">
        <p @click="submitOrExposure(1)">
          <img :src="adPic">
        </p>
      </div>
      <!-- 直播版本跟尊享会员特权对比 -->
      <div class="contrast">
        <div class="title">会员特权对比</div>
        <div class="privilege_box">
          <div class="privilege_l">
            <div class="vip_title">
              <span class="zxvip"></span>实战直播版
            </div>
            <div class="info_box">
              <p class="bold">· 专享六大主题直播</p>
              <p class="bold">· 实战直播交流圈</p>
              <p class="bold">· 超级Level-2行情</p>
              <p v-for='(item,index) in contrast[0].cnt' :key="item.product">. {{item.product}}</p>
              <p v-for='(item,index) in contrast[2].cnt' :key="item.product">. {{item.product}}</p>
            </div>
            <div class="suit">
              <h3>适合人群</h3>
              <p>1、没有自己的方法，需要老师对着盘面实战讲解</p>
              <p>2、想和股友交流学习</p>
              <p>3、不知道怎么盯盘、复盘或者使用软件</p>
            </div>
            <div class="price_box">
              <h3>季卡特惠</h3>
              <div class="buy_box">
                <p>￥<span>3998</span></p>
                <a href="javascript:;" class="btn_buy" @click="goBuy('zbvip')">购买</a>
              </div>
              <div class="old_price">原价:￥4794</div>
            </div>
          </div>
          <div class="privilege_r">
            <div class="vip_title">
              尊享会员
            </div>
            <div class="info_box">
              <p class="noValid">· 专享六大主题直播</p>
              <p class="noValid">· 实战直播交流圈</p>
              <p class="noValid">· 超级Level-2行情</p>
              <p v-for='(item,index) in contrast[0].cnt' :key="item.product">. {{item.product}}</p>
              <p v-for='(item,index) in contrast[2].cnt' :key="item.product">. {{item.product}}</p>
            </div>
            <div class="suit">
              <h3>适合人群</h3>
              <p>1、有一定炒股经验和方法</p>
              <p>2、系统学习过若风体系</p>
              <p>3、经常盯盘、复盘</p>
            </div>
            <div class="price_box">
              <h3>半年卡特惠</h3>
              <div class="buy_box">
                <p>￥<span>2998</span></p>
                <a href="javascript:;" class="btn_buy" @click="goBuy('svip')">购买</a>
              </div>
              <div class="old_price">原价:￥4998</div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- 会员折扣专享 -->
    <VipDiscount class="u-mar-t40" :currentIndex="currentIndex" />

    <!-- 软件下载 -->
    <AppDownload v-bind="$attrs" />
    <!-- 说明 -->
    <div class="state">
      <p>优品投顾25年 <span>品质保证</span>，7天无理由退款</p>
    </div>
  </div>

</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import IconList from "./iconList";
import AppDownload from "./appDownload.vue";
// import Svip32Power from './svip32Power.vue';
// import SvipVsZsvip from './svipVsZsvip.vue';
import VipDiscount from "./vipDiscount.vue";
export default {
  name: "page1",
  components: {
    IconList,
    VipDiscount,
    AppDownload,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      currentIndex: 2, //页面的导航
      navCurrentIndex: 0,
      adLink: "",
      adPic: "",
      nav_items: [
        {
          name: '尊享会员',
          info: '32项特权',
          price: '价值4980元/年'
        },
        {
          name: '实战直播',
          info: '6大主题',
          price: '价值2998元/年'
        },
        {
          name: '超级Level-2',
          info: '抓主力神器',
          price: '价值1298元/年'
        },
        {
          name: '实战直播',
          info: '交流圈',
          price: '价值1298元/年'
        }
      ],
      vipicons: [
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
      contrast: [
        {
          txt: "股池/指标",
          cnt: [
            { product: "五星股票池", vip: true, svip: true, zbvip: true },
            { product: "红黄白股池(特色)", vip: true, svip: true, zbvip: true },
            { product: "攻守道股池", vip: true, svip: true, zbvip: true },
            { product: "手机Level2指标", vip: true, svip: true, zbvip: true },
          ]
        },
        {
          txt: "实战直播版专享",
          cnt: [
            { product: "实战直播", vip: false, svip: false, zbvip: true },
            { product: "直播室交流圈", vip: false, svip: false, zbvip: true },
            { product: "超级Level2(PC)", vsip: false, svip: false, zbvip: true },
          ]
        },
        {
          txt: "核心功能",
          cnt: [
            { product: "市场情绪", vip: false, svip: true, zbvip: true, only: true },
            { product: "特色题材/个股题材亮点", vip: false, svip: true, zbvip: true, new: true },
            { product: "题材投资线索", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头启动", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头攀升", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头加速", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头主升", vip: false, svip: true, zbvip: true, new: true },
            { product: "超级复盘", vip: false, svip: true, zbvip: true },
            { product: "高级盯盘", vip: false, svip: true, zbvip: true },
            { product: "历史数据", vsip: false, svip: true, zbvip: true },
            { product: " 趋势盯盘", vip: false, svip: true, zbvip: true },
            { product: "北向追击", vip: false, svip: true, zbvip: true, new: true },
            { product: "区间最高涨幅", vip: false, svip: true, zbvip: true, new: true },
            { product: "涨停挖掘", vip: false, svip: true, zbvip: true },
            { product: "涨停分析", vip: false, svip: true, zbvip: true },
            { product: "涨停因子", vip: false, svip: true, zbvip: true },
            { product: "自选琅琊榜排行", vip: false, svip: true, zbvip: true },
            { product: "个股琅琊榜", vip: false, svip: true, zbvip: true },
            { product: "题材琅琊榜", vip: false, svip: true, zbvip: true },
            { product: "竞价先机", vip: false, svip: true, zbvip: true },
            { product: "板块先机", vip: false, svip: true, zbvip: true },
            { product: "神秘C点股池", vip: false, svip: true, zbvip: true },
            { product: "神秘C点指标", vip: false, svip: true, zbvip: true },
          ]
        },
        {
          txt: "特权福利",
          cnt: [
            { product: "核心指标课程", vip: true, svip: true, zbvip: true },
            { product: "会员每日抽奖", vip: false, svip: true, zbvip: true },
            { product: "会员折扣", vip: true, svip: true, zbvip: true },
            { product: "会员专享服务圈", vip: true, svip: true, zbvip: true },
            { product: "会员标识", vip: true, svip: true, zbvip: true },
          ]
        },
      ],
    };
  },
  computed: {

  },
  created: function () {
    this.showBanner();
  },
  mounted() {
  },
  methods: {
    //购买
    goBuy(falg){
      if(falg==='svip'){
        window.open('https://uppay.upchina.com/unifiedpay/f65856f98f33581803bc24e78371cfe3')
      }else{
        //实战直播版
        let url = this.$tools.isTerminal('ios')?'https://uppay.upchina.com/unifiedpay/8b388a0b573ae6d4cf953118cb480997':'https://uppay.upchina.com/unifiedpay/21c781c3fa19990108f99b97b167817e'
         window.open(url)
      }
    },
    changeNavCurt(index) {
      this.navCurrentIndex = index
      this.$refs.vanSwipe.swipeTo(index)
    },
    onChange(index) {
      this.navCurrentIndex = index
    },
    showBanner() {
      $.ajax({
        url: "https://adpub.upchinaproduct.com/getAds?position=757&platform=32&type=",
        async: false,
        success: (msg) => {
          //console.log(msg);
          if (msg && msg.ads && msg.ads.length) {
            var data = msg.ads[0].materials[0].info;
            var dataJson = JSON.parse(data).list[0];
            this.adLink = dataJson.link;
            this.adPic = dataJson.picUrl;
            this.adData = msg.ads[0];
            this.action = 0;
            this.submitOrExposure(0);
          }
        },
        error: function (err) {
          console.log(err)
        }
      });
    },
    submitOrExposure(num) {
      this.action = num;
      console.log(`接口开始${this.action == 0 ? '曝光' : '上传'}`, this.adData);
      let url = `https://adpub.upchinaproduct.com/report?adId=${this.adData.id}&position=757&material=${this.adData.materials[0].id}&action=${this.action}&userId=${this.uid}&platform=32`;
      var that = this;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'reportCb',
        async: false,
        success: function (msg) {
          if (msg) {
            console.log(msg)
            if (num) {
              location.href = that.adLink
            }
          }
        },
        error: function (err) {
          console.log(err)
        }
      });
    },

    navChange(item) {
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
    height: 7rem;
    .zbvip {
      height: 100%;
      width: 100%;
      background-size: 100% 100%;
      .banner_cnt {
        // width: 12rem;
        // margin: 0 auto;
        // position: relative;
        // height: 5.5rem;
        .new_user {
          font-size: 18px;
          color: #fff;
          line-height: 26px;
          position: absolute;
          top: 5rem;
          left: 50%;
          transform: transLateX(-50%);
        }
        .title {
          line-height: 80px;
          font-weight: bold;
          font-size: 0.61rem;
          text-align: center;
          padding-top: 58px;
        }
      }
    }
  }
  .change_tab {
    padding-top: 0px;
    .sub_tit {
      padding: 0;
      padding-left: 0.3rem;
      padding-top: 0.2rem;
      text-align: left;
      height: 0.7rem;
    }
    .swiper_box {
      /deep/ .tq_box {
        padding-left: 0rem;
      }
      /deep/ .tab_vip {
        margin-top: 0;
      }
      .img_box {
        width: 6.9rem;
        height: 8.2rem;
        overflow: auto;
      }
    }
  }
  .state {
    padding-bottom: 2.2rem;
  }
}
</style>
