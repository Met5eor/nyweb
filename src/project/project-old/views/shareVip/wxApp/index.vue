<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc sct1 u-fx-ver u-fx-ac">
        <img
          class="sct_img img1"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img1.png"
          alt=""
        />
        <div class="buy_btn" @click="buy2998"></div>
        <div class="cout_box u-fx u-mar-t10">
          <span class="u-mar-l10">距离活动结束仅剩：</span>
          <CountDown :countDown="countDown" />
        </div>
      </div>

      <div class="stc sct2 u-fx-ac-jc">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img3.png"
          alt=""
        />
        <div class="swiper-box">
          <div class="btns">
            <div
              class="btn"
              @click="curSwiperIndex = index"
              v-for="(item, index) in stc2SwiperUrls"
              :class="curSwiperIndex === index ? 'act' : ''"
              :key="index"
            >
              <div class="name">{{ item.name }}</div>
              <div class="up">{{ item.up }}</div>
            </div>
          </div>
          <div class="swiper-cont">
            <Swiper
              :swiperUrls="stc2SwiperUrls"
              v-model="curSwiperIndex"
              isBigImg
            />
          </div>
        </div>
      </div>

      <div class="stc sct3 u-fx-ac-jc">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img4.png"
          alt=""
        />
      </div>

      <div class="stc sct4 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img5.png"
          alt=""
        />
      </div>

      <div class="stc sct5 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img6.png"
          alt=""
        />
      </div>

      <div class="stc sct6 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img7.png"
          alt=""
        />
      </div>

      <div class="stc sct7 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img8.png"
          alt=""
        />
        <div class="cont">
          <p class="row1 row">1、活动时间：2021.12.23-2022.01.07</p>

          <p class="row2 row u-mar-t10">
            2、买半年股牛牛尊享会员直接到手9个月，另外3个月以礼品卡的形式赠送
          </p>

          <p class="row3 row u-mar-t10">3、礼品卡怎么使用？</p>
          <p class="row">
            <span class="color_red">礼品卡分享给好友：</span>
            好友下载股牛牛股票APP激活礼品卡，好友得1个月尊享会员权限，自己也得1个月尊享会员权限，3张礼品卡可分享给三个好友
          </p>

          <p class="row u-mar-t20">
            <span class="color_red">礼品卡不分享：</span
            >直接到手9个月尊享会员权限，活动结束后礼品卡不可分享
          </p>

          <p class="row row4 u-mar-t20">
            4.优惠券将于购买后3个工作日内统一发放
          </p>

          <p class="row row4 u-mar-t20">
            5.开通后可以点击头像在个人中心-我的特权进行查看
          </p>
        </div>
      </div>

      <div class="stc sct8 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/img9.png"
          alt=""
        />
      </div>

      <div class="footer none" v-if="isFooter">
        <img
          class="footer_img sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/footer.png"
          alt=""
        />
        <div class="btn" @click="buy2998"></div>
      </div>
    </div>

    <Msg ref="Msg" />

    <!-- 直播 -->
    <VideoMask
      ref="VideoMask"
      :poster="posterImg"
      src="https://upfv.upchina.com/202112/202112161652-4.mp4"
    />
  </div>
</template>

<script>
import Swiper from "@c/swiper.vue";
import CountDown from "@c/CountDown.vue";
import Msg from "@c/MsgH5Url.vue";
import VideoMask from "@c/VideoMask.vue";
import { getOrderInfo } from "@u/orderSearch";
import { appCheckLogin } from "@u/login";
import "@ass/js/rem.js";
export default {
  name: "Mobile",
  components: { Swiper, CountDown, Msg, VideoMask },
  data() {
    return {
      posterImg:
        "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/video.png",
      endDate: new Date("2022/01/07 23:59:59").getTime(),
      cutIndex: 1,
      stc2SwiperUrls: [
        {
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/swiper1.png",
          name: "大金重工",
          up: "+380.59%",
        },
        {
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/swiper2.png",
          name: "西藏矿业",
          up: "+205.03%",
        },
        {
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/swiper3.png",
          name: "全志科技",
          up: "+199.82%",
        },
        {
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/swiper4.png",
          name: "爱康科技",
          up: "168.66%",
        },
      ],
      curSwiperIndex: 0,
      isFooter: true,
      buyUrl2998:
        "https://uppay.upchina.com/unifiedpay/4de00e13c27b37dba3d4e02e6f9fe445",
      // buyUrl2998:
      //   "https://uppay.test.upchina.com/unifiedpay/c41ba1a75ab9b2f48b22006277c9173c?t=0",
    };
  },
  computed: {
    countDown() {
      // let day = 86400000
      let nowDate = new Date().getTime();
      return this.endDate - nowDate;
    },
  },
  async created() {
    // let { uid } = await appCheckLogin();
    let  uid  = "{{uid}}"
    let flag = await getOrderInfo(uid, "UPCFZH_20211214144404");
    if (flag) return this.$router.push("/inviteFriends");
    //改wx_160625120079270971的用戶权限
    if(uid==='wx_160625120079270971'||uid==='up2826668') return this.$router.push("/inviteFriends");
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      window.addEventListener("scroll", this.showFooter, true);
    },
    //开始播放
    openViodeo() {
      window.open("https://upfv.upchina.com/202112/202112161652-4.mp4");
    },
    //弹窗移动
    moveMsg() {
      let dom = this.$refs.Msg;
      this.$tools.moveDom(dom);
    },

    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this[val] = false;
      }
    },
    //滚动第二屏展示footer
    showFooter() {
      var scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFooter = scrollY > 800;
    },
    buy2998() {
      let isParmas = this.$tools.getChUrl(this.buyUrl2998).includes("?");
      // let cbUrl =
      //   "https://cdn.upchina.com/front/20211209shareVip/alibeta/index.html#/cb";
      let cbUrl =
        "https://cdn.upchina.com/front/20211209shareVip/production/index.html#/cb";
      // let cbUrl = "http://192.168.8.212:8080/#/cb";
      window.open(
        `${this.$tools.getChUrl(this.buyUrl2998)}${
          isParmas ? "&" : "?"
        }callback=${encodeURIComponent(cbUrl)}`
      );
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.showFooter);
  },
};
</script>
<style lang="less" scoped>
.green {
  border: 1px solid green;
}
.bg {
  background-color: #d41423;
}
.color_red {
  color: #ce0823;
}
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  // overflow-y: auto !important;
  // height: 13.34rem !important;
  .main {
    width: 100%;
    background: #d41423
      url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/head_bg.png")
      no-repeat;
    background-size: 100%;
    // height: 10rem;
    // padding: 0 0.2rem;
  }
  .stc {
    width: 100%;
    position: relative;
    overflow: hidden;
    .sct_img {
      width: 100%;
    }
  }
  .sct1 {
    position: relative;
    padding: 0px;
    width: 100%;
    color: #fff;
    .img1 {
      margin-top: 4.8rem;
      padding: 0 0.2rem;
    }
    .buy_btn {
      width: 2.2rem;
      height: 0.65rem;
      position: absolute;
      right: 0.4rem;
      bottom: 0.61rem;
    }
  }
  .sct2 {
    padding: 0.2rem;
    position: relative;
    .swiper-box {
      position: absolute;
      bottom: 0.5rem;
      width: 6.71rem;
      height: 5.12rem;
      background: #d41423
        url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/stc3_3.png")
        no-repeat;
      border-radius: 0.13rem;
      background-size: 100%;
      padding: 0 0.1rem;
      .btns {
        margin-top: 0.8rem;
        margin-bottom: 0.3rem;
        display: flex;
        justify-content: space-around;
        .btn {
          width: 1.4rem;
          height: 0.7rem;
          border: 1px solid #ce0823;
          border-radius: 0.1rem;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          font-size: 0.24rem;
          &.act {
            background: #ce0823;
            color: #fff;
          }
        }
      }
      .swiper-cont {
        width: 100%;
        height: 3.24rem;
      }
    }
  }
  .sct3 {
    padding: 0.2rem;
  }
  .sct4 {
    padding: 0.2rem;
  }
  .sct5 {
    padding: 0.2rem;
  }
  .sct6 {
    padding: 0.2rem;
  }
  .sct7 {
    padding: 0.2rem;
    position: relative;
    .cont {
      position: absolute;
      width: 6.8rem;
      height: 4.4rem;
      bottom: 0.3rem;
      background: #fff;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: bold;
      color: #333333;
      // line-height: 30px;
      .row {
        text-align: left;
        // border: 1px solid green;
      }
    }
  }
  .sct8 {
    padding-bottom: 1rem;
  }
  .footer {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.2rem;
    .sct_img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .btn {
      position: absolute;
      right: 0.52rem;
      bottom: 0.05rem;
      width: 2.3rem;
      height: 0.87rem;
    }
  }
}
.frv {
  width: 1.7rem;
  height: 2.2rem;
  position: fixed;
  top: 3.4rem;
  right: 0.1rem;
  transform: translate(0, 0);
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  border: 3px solid #ffffff;
  border-radius: 0.1rem;
  overflow: hidden;
  .frv_hd {
    padding: 0.06rem;
    .frv_state {
      width: 0.8rem;
      height: 0.3rem;
      background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
      border-radius: 0.18rem;
      overflow: hidden;
      display: flex;
      .frv_state_icon {
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_live.gif)
          no-repeat center;
        background-size: cover;
        margin-right: 0.03rem;
      }
      .frv_state_txt {
        font-size: 0.12rem;
        color: #fff;
        line-height: 0.2rem;
      }
    }
    .frv_close {
      width: 0.22rem;
      height: 0.22rem;
      background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_close.png)
        center;
      background-size: cover;
    }
  }
  .frv_main {
    margin-top: 0.05rem;
    width: 100%;
    .video {
      width: 100%;
      height: 100%;
    }
    .btn {
      position: absolute;
      bottom: 0.05rem;
      width: 100%;
      .frv_like {
        position: absolute;
        right: 0.04rem;
        bottom: 0.3rem;
        width: 0.4rem;
        height: 0.9rem;
        background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_gift.gif)
          center;
        background-size: cover;
      }
      .frv_action_txt {
        margin: 0 auto;
        width: 0.8rem;
        height: 0.3rem;
        color: #fff;
        line-height: 0.3rem;
        font-size: 0.12rem;
        text-align: center;
        background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
        border-radius: 0.18rem;
        box-shadow: 0 -2px 0 0 #ffec52;
      }
    }
  }
}
</style>
