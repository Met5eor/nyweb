<template>
  <!-- 尊享会员会员 -->
  <div class="page">
    <!-- banner -->
    <Banner :currentIndex="currentIndex" title="股牛牛会员" info="专享3大股池+L2指标" newtxt="新人福利：首次开通仅需30元" v-bind="$attrs">
      <div class="top_tq mr zb_top">
        <div class="tq_list" v-for="(item,index) in zbrecommendIcon" :key="index" :class="tabCurtIndex==index?'active':''" @click="navChange(index)">
          <img :src="item.showImg">
          <p class="name">{{item.txt}}</p>
          <p class="info">{{item.info}}</p>
          <p class="intro" v-html="item.tips"></p>
        </div>
      </div>
    </Banner>

    <!-- 会员内容中间不同部分 -->
    <div class="change_tab">
      <!-- 股牛牛实战直播会员特权-->
      <div class="tab_vip">
        <!-- 直播版本导航 -->
        <div class="swiper_box">
          <div class="swiper-container swiper_tq">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Svip32Power :currentIndex="currentIndex" :width="13" :heigth="10" v-bind="$attrs">
                  <div slot='title' class="sub_tit">
                    尊享会员特权
                  </div>
                </Svip32Power>
              </div>
              <div class="swiper-slide">
                <div class="img_box">
                  <!-- <div class="sub_tit">实战直播安排表</div> -->
                  <img src="./images/pic_zb_list_new.png" style="margin-top:40px;">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="img_box">
                  <div class="sub_tit">
                    优品超级Level-2
                  </div>
                  <img src="./images/pic_l2.png">
                </div>
              </div>
              <div class="swiper-slide">
                <div class="img_box">
                  <div class="sub_tit">
                    实战直播交流圈
                  </div>
                  <img src="./images/pic_szzb.png">
                </div>
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination1"></div>
          </div>
        </div>

        <!-- 直播版本跟尊享会员特权对比 -->
        <SvipVsZsvip />
      </div>

    </div>

    <!-- 会员专属折扣 -->
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
import Swiper from "swiper";
import Banner from "./banner.vue";
import AppDownload from "./appDownload.vue";
import Svip32Power from './svip32Power.vue';
import SvipVsZsvip from './svipVsZsvip.vue';
import VipDiscount from "./vipDiscount.vue";
export default {
  name: "page1",
  components: { Banner, AppDownload, Svip32Power, SvipVsZsvip, VipDiscount, AppDownload },
  data() {
    return {
      currentIndex: 2, //页面的导航
      tabCurtIndex: 0,//tab导航
      autoIndex: 0,
      zbrecommendIcon: [
        {
          img: require("./images/icon_zxhy.png"),
          activeimg: require("./images/icon_zxhy_active.png"),
          txt: "尊享会员",
          info: "32项特权",
          showImg: require('./images/icon_zxhy_active.png')
        },
        {
          img: require("./images/icon_szzb.png"),
          activeimg: require("./images/icon_szzb_active.png"),
          txt: "实战直播",
          info: "6大主题",
          showImg: require('./images/icon_szzb.png')
        },
        {
          img: require("./images/icon_pcl2.png"),
          activeimg: require("./images/icon_pcl2_active.png"),
          txt: "超级Level-2",
          info: "抓主力神器",
          showImg: require('./images/icon_pcl2.png')
        },
        {
          img: require("./images/icon_szzb02.png"),
          activeimg: require("./images/icon_szzb02_active.png"),
          txt: "实战直播",
          info: "交流圈",
          showImg: require('./images/icon_szzb02.png')
        },
      ],
      mySwiper: {},
    };
  },
  computed: {

  },
  created: function () {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //会员轮播
      var mySwiper = new Swiper(".swiper_tq", {
        // autoplay: 5000,
        pagination: '.swiper-pagination1',
        paginationClickable: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        initialSlide: 1,
        onSlideChangeStart: (mySwiper) => {
          var activeIndex = mySwiper.realIndex;
          this.tabCurtIndex = activeIndex;
        },
        onAutoplayStart: (mySwiper) => {
          var activeIndex = mySwiper.realIndex;
          this.tabCurtIndex = activeIndex;
        },
      });
      this.mySwiper = mySwiper;
    },
    navChange(item) {
      this.mySwiper.slideTo(item, 300, true);
      this.mySwiper.startAutoplay();
      this.zbrecommendIcon[this.autoIndex].showImg = this.zbrecommendIcon[this.autoIndex].img;
      this.autoIndex = item
      this.zbrecommendIcon[item].showImg = this.zbrecommendIcon[item].activeimg;
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
      background: url("./images/szzbzx_header.png") no-repeat;
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
      padding-left: 1.4rem;
      padding-top: 0.2rem;
      text-align: left;
      height: 0.7rem;
    }
    /deep/ .tab_vip {
      padding-bottom: 0px !important;
      .swiper_box {
        width: 1200px;
        height: 1000px;
        background: #fff;
        box-shadow: 0px 2px 15px 0px rgb(0 0 0 / 10%);
        border-radius: 20px !important;
        border: 1px solid #f4e1c6;
        margin: 0 auto 55px;
        overflow: hidden;
      }
      .tq_icon {
        width: 157px;
        text-align: center;
        margin: 10px 15px 0 !important;
        float: left;
      }
      .tq_box{
        padding: 0;
      }
    }
  }
  .state {
    padding-bottom: 0rem;
  }
}
</style>
