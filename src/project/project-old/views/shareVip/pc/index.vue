<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc sct1">
        <div class="sct_img">
          <img class="img" src="https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/20211209shareVip/wx/wximg/pc_img1%20(1).png" alt="" />
          <div class="buyBtn cursor" @click="buy2998"></div>
        </div>
        <div class="countDown u-fx u-fx-ac">
          距离活动结束仅剩余：
          <CountDown :countDown="countDown" />
        </div>
      </div>

      <div class="stc sct2 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img2.png" alt="" />
        <div class="btns">
          <!-- @click="curSwiperIndex = index" -->
          <div
            class="btn"
            v-for="(item, index) in stc2SwiperUrls"
            :class="curSwiperIndex === index ? 'act' : ''"
            :key="index"
          >
            <div class="name">{{ item.name }}</div>
            <div class="up">{{ item.up }}</div>
          </div>
        </div>
        <div class="swiper-cont">
          <Swiper :swiperUrls="stc2SwiperUrls" v-model="curSwiperIndex" isBtn />
        </div>
      </div>

      <div class="stc sct3 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img3.png" alt="" />
      </div>

      <div class="stc sct4 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img4.png" alt="" />
      </div>

      <div class="stc sct5 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img5.png" alt="" />
      </div>

      <div class="stc sct6 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img6.png" alt="" />
      </div>

      <div class="stc sct7 u-fx-ac-jc" id="rules">
        <img class="sct_img" src="https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/20211209shareVip/wx/wximg/pc_img7%20(1).png" alt="" />
      </div>

      <div class="stc sct8 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/img8.png" alt="" />
      </div>

      <div class="footer none u-fx-ac-jc" v-if="isFooter">
        <img class="footer_img sct_img" src="https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/20211209shareVip/wx/wximg/pc_footer%20(1).png.jpg" alt="" />
        <div class="btn cursor" @click="buy2998"></div>
      </div>
    </div>
    <!-- 客服 -->
    <div class="msg">
      <div @click="openMsg('onlineUser')" class="onlineUser"></div>
      <div @click="openMsg('rules')" class="rules"></div>
      <div @click="openMsg('helpCenter')" class="helpCenter"></div>
    </div>
    <div
      class="mask mask_kf u-fx-ac-jc"
      v-if="isDialogue"
      @click="(e) => closeMask(e, 'isDialogue')"
    >
      <div class="pop_box">
        <div class="btn_close" @click="isDialogue = false"></div>
      </div>
    </div>

    <!-- 直播 -->
    <div class="frv flex flex_v">
      <div class="frv_hd u-fx u-fx-jsb">
        <div class="frv_state u-fx u-fx-ac">
          <div class="frv_state_icon"></div>
          <div class="frv_state_txt">直播中</div>
        </div>
        <div class="btn frv_close"></div>
      </div>
      <div class="frv_main">
        <img class="video" src="../img/pc/video.png" alt="" />
        <!-- <video
          ref="video"
          class="video green"
          poster="../img/pc/video.png"
          src="https://upfv.upchina.com/202112/202112161652-4.mp4"
        ></video> -->
        <div class="btn">
          <div class="frv_action_txt" @click="openViodeo">去围观</div>
          <div class="frv_like"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@c/swiper.vue";
import CountDown from "@c/CountDown.vue";
import { getOrderInfo } from "@u/orderSearch";
import { pcCheckLogin } from "@u/login";
import Swiper3d from "@c/3dSwiper";
import "@ass/js/remPc.js";
export default {
  name: "pcVipShare",
  components: { Swiper, Swiper3d, CountDown },
  data() {
    return {
      endDate: new Date("2022/01/07 23:59:59").getTime(),
      stc2SwiperUrls: [
        {
          img: require("../img/swiper1.png"),
          name: "大金重工",
          up: "+380.59%",
        },
        {
          img: require("../img/swiper2.png"),
          name: "西藏矿业",
          up: "+205.03%",
        },
        {
          img: require("../img/swiper3.png"),
          name: "全志科技",
          up: "+199.82%",
        },
        { img: require("../img/swiper4.png"), name: "爱康科技", up: "168.66%" },
      ],
      curSwiperIndex: 0,
      showOrdermMak: false,
      isBuy: false,
      isFooter: true,
      buyUrl2998:
        "https://uppay.upchina.com/unifiedpay/4de00e13c27b37dba3d4e02e6f9fe445",
      productId: "",
      isDialogue: false,
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
    await this.$tools.loadJsSdk(
      "https://cdn.upchina.com/activitypage/plugin/webNativeCommunicate.pc.min.js"
    );
    let { uid } = await pcCheckLogin();
    this.uid = uid;
    let flag = await getOrderInfo(this.uid,"UPCFZH_20211214144404");
    if(flag) return this.$router.push('/inviteFriendsPc')
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      window.addEventListener("scroll", this.showFooter, true);
    },
    openMsg(type) {
      if (type === "onlineUser") {
        //pc打开在线客服
        var kfopt = {
          url: "https://kf.upchina.com/pc/pcchat/cs",
          width: 830,
          height: 455,
          count: 1,
        };
        upNativeComm.exec("open.kfwindow", kfopt);
      } else if (type === "rules") {
        // console.log(window.pageYOffset)
        window.pageYOffset = 5400;
        document.body.scrollTop = 5400;
      } else if (type === "helpCenter") {
        window.open("https://ntgpc.upchina.com/viewpoint/detail.html?id=11339");
      }
    },
    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this[val] = false;
      }
    },
    //滚动第二屏展示footer
    showFooter(e) {
      var scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(window.pageYOffset, "pageYOffset");
      // console.log(
      //   document.documentElement.scrollTop,
      //   "document.documentElement.scrollTop"
      // );
      // console.log(document.body.scrollTop, "document.body.scrollTop");
      this.isFooter = scrollY > 800;
    },
    buy2998() {
      let isParmas = this.$tools.getChUrl(this.buyUrl2998).includes("?");
      // let cbUrl =
      //   "https://cdn.upchina.com/front/20211209shareVip/alibeta/index.html#/cbPc";
       let cbUrl =
        "https://cdn.upchina.com/front/20211209shareVip/production/index.html#/cbPc";
      window.open(
        `${this.$tools.getChUrl(this.buyUrl2998)}${
          isParmas ? "&" : "?"
        }callback=${encodeURIComponent(cbUrl)}`
      );
    },
    //开始播放
    openViodeo() {
      window.open("https://upfv.upchina.com/202112/202112161652-4.mp4");
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.showFooter);
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 1200px;
  height: 500px;
}
.green {
  border: 1px solid green;
}
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  .main {
    width: 100%;
    background-size: 100% auto;
  }
  .stc {
    width: 100%;
    position: relative;
    .sct_img {
      width: 100%;
    }
  }
  .sct1 {
    color: #fff;
    position: relative;
    padding: 0px;
    background: #f7dbe0 url("../img/pc/pc_head.png") no-repeat top;
    background-size: 100%;
    height: 8.37rem;
    .sct_img {
      position: absolute;
      bottom: 0rem;
      left: 50%;
      transform: translate(-50%, -20%);
      width: 9.85rem;
      .img {
        width: 100%;
      }
      .buyBtn {
        position: absolute;
        width: 3rem;
        height: 1rem;
        bottom: 0.32rem;
        right: 0.52rem;
      }
    }
    .countDown {
      position: absolute;
      bottom: 0.2rem;
      left: 50%;
      font-size: 0.24rem;
      transform: translate(-50%, -20%);
    }
    .stc1_content {
      // background: #6e130c;
      width: 11rem;
      height: 4.58rem;
      position: absolute;
      bottom: -2.9rem;
      .swiper-slide {
        background-position: center;
        background-size: 130% 120%;
        width: 60%;
        height: 4.58rem;
        img {
          display: block;
          width: 100%;
          height: 4.5rem;
        }
      }
    }
  }
  .sct2 {
    position: relative;
    .btns {
      position: absolute;
      width: 8.46rem;
      height: 0.83rem;
      top: 8.85rem;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      justify-content: space-around;
      .btn {
        width: 1.7rem;
        height: 0.83rem;
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
      position: absolute;
      width: 10.46rem;
      height: 5.6rem;
      bottom: 0.45rem;
      left: 50%;
      transform: translate(-50%, 0);
      overflow: hidden;
      /deep/ .swiper-container {
        background: black !important;
        .swiper-wrapper {
          width: 80% !important;
        }
      }
      /deep/ .swiper-button-prev,
      .swiper-button-next {
        background: url("../img/pc/left.png");
        width: 36px;
        height: 57px;
      }
      /deep/ .swiper-button-next {
        background: url("../img/pc/rigth.png");
        width: 36px;
        height: 57px;
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
    height: 1rem;
    .footer_img {
      width: 100%;
    }
    .btn {
      position: absolute;
      right: 50%;
      transform: translate(4.7rem, 0%);
      bottom: 0.1rem;
      width: 2.3rem;
      height: 0.79rem;
    }
  }
}
// 客服p
.msg {
  display: block;
  position: fixed;
  background: url("../img/pc/msg.png") no-repeat;
  background-size: 100%;
  border-radius: 0.1rem;
  left: 50%;
  bottom: 1.6rem;
  transform: translate(5.5rem, 0);
  z-index: 900;
  height: 2.7rem;
  width: 1.5rem;
  .onlineUser,
  .rules,
  .helpCenter {
    display: block;
    width: 100%;
    height: 0.4rem;
    margin-top: 1.1rem;
  }
  .rules {
    height: 0.6rem;
    margin-top: 0.1rem;
  }
  .helpCenter {
    height: 0.54rem;
    margin-top: 0.01rem;
  }
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  &.mask_kf {
    .pop_box {
      margin-top: 0.5rem;
      width: 6.75rem;
      height: 9.62rem;
      background: url("https://cdn.upchinaproduct.com/acm/202111/20211116/image/onlineUser_mak.png")
        no-repeat;
      background-size: 100%;
      position: relative;
      .btn_close {
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100%;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        cursor: pointer;
      }
    }
  }
}

.frv {
  width: 1.5rem;
  height: 1.8rem;
  position: fixed;
  left: 50%;
  transform: translate(5.5rem, 0);
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  border: 3px solid #ffffff;
  border-radius: 0.1rem;
  overflow: hidden;
  top: 3.4rem;
  .frv_hd {
    padding: 6px;
    .frv_state {
      width: 0.54rem;
      height: 18px;
      background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      .frv_state_icon {
        display: block;
        width: 10px;
        height: 10px;
        background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_live.gif)
          no-repeat center;
        background-size: cover;
        margin-right: 3px;
      }
      .frv_state_txt {
        font-size: 10px;
        color: #fff;
        line-height: 18px;
      }
    }
    .frv_close {
      width: 18px;
      height: 18px;
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
    }
    .btn {
      position: absolute;
      bottom: 0.05rem;
      width: 100%;
      .frv_like {
        position: absolute;
        right: 4px;
        bottom: 30px;
        width: 30px;
        height: 62px;
        background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_gift.gif)
          center;
        background-size: cover;
      }
      .frv_action_txt {
        margin: 0 auto;
        width: 68px;
        height: 22px;
        color: #fff;
        line-height: 18px;
        font-size: 10px;
        text-align: center;
        background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
        border-radius: 18px;
        box-shadow: 0 -2px 0 0 #ffec52;
      }
    }
  }
}
</style>
