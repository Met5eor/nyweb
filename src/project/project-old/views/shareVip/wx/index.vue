<template>
  <div>
    <div v-if="isWx === false">请在微信中打开！</div>
    <div v-if="isWx" class="page_wrap" ref="page_wrap">
      <div class="main">
        <div class="stc sct1 u-fx-ver u-fx-ac">
          <img
            class="sct_img img1"
            v-if="!isReceive"
            @click="getCard"
            src="../img/wx/img1.png"
            alt=""
          />
          <img
            class="sct_img img1"
            v-else
            src="../img/wx/img1_suss.png"
            alt=""
          />
          <div class="succ_text" v-if="isReceive">
            *注：请使用领取权限的微信账号登录（upid：{{ upName }}）
          </div>
          <div v-if="isReceive" class="succ_btn" @click="download"></div>
        </div>

        <div class="stc sct2 u-fx-ac-jc bg">
          <img class="sct_img" src="../img/wx/img2.png" alt="" />
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

        <div class="stc sct3 u-fx-ac-jc bg">
          <img class="sct_img" src="../img/wx/img3.png" alt="" />
        </div>

        <div class="stc sct4 u-fx-ac-jc bg">
          <img class="sct_img" src="../img/wx/img4.png" alt="" />
        </div>

        <div class="stc sct5 u-fx-ac-jc bg">
          <img class="sct_img" src="../img/wx/img5.png" alt="" />
        </div>

        <div class="stc sct6 u-fx-ac-jc bg">
          <img class="sct_img" src="../img/wx/img6.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@c/swiper.vue";
import { checkFollow } from "../../../network/wxh5.js";
import tools from "@u/tools.js";
import { Toast } from "vant";
import "@ass/js/rem.js";
const iosStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715325577";
const androidStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715261800&ch=2000000842";
export default {
  components: { Swiper },
  data() {
    return {
      isWx: null,
      isIos: false, // 是否是ios
      downloadUrl: "", // app下载地址
      isNewUser: true, //是否是新用户
      isReceive: false, // 是否领取
      upName: "",
      curSwiperIndex: 0,
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
    };
  },

  async created() {
    // this.isWx = tools.isTerminal("weixin");
    this.isWx = true;
    if (!this.isWx) {
      return;
    }
    let isIos = tools.isTerminal("ios");
    this.downloadUrl = isIos ? iosStore : androidStore;
  },
  mounted() {
    // let isClickBtn = window.localStorage.getItem("getVipByAppShare");
    // if (isClickBtn) {
    //   this.isReceive = true;
    //   return;
    // }
    let query = window.location.href.split("?")[1];
    this.business = this.$tools.getQueryVariable("business", query);
    this.initPage();
  },
  methods: {
    initPage() {
      shareApi.getShareInfo({
        callback: (data) => {
          // console.log(data);
          if (data.ret !== 0) return Toast(data.message);
          // appId: "wx6f82760851fcc245"
          // img: "https://cdn.upchina.com/CRM/%E8%82%A1%E7%89%9B%E7%89%9B/Icon_60@2x.png"
          // nonceStr: "kwimw4ffpv68y4e"
          // shareUpName: "up0196571"
          // signature: "ba7400cdeb5a348906cc2fa77761c995a4aee3ec"
          // summary: "沪指回补缺口后延续震荡上扬态势，创业板指今日表现强势，收盘劲升逾1%。行业板块多"
          // timestamp: "1639042359"
          // title: "分享两者都送权限"
          // upName: "up0190272"
          // url: "https://sharetest.upchina.com/shorturl_f3c4fa2e35c5adef26381efb1981efaa"
          // data.shareUpName = 'up0188735';
          // data.upName = 'up0196579';
          // 1.检查是否是分享者自己点击
          let { shareUpName = "", upName = "" } = data.data;
          this.upName = upName;
          //校验分享者跟被分享者是否是同一人
          if (shareUpName === upName) {
            this.isNewUser = false;
            return;
          }
          // 2.检查是否领取
          this._checkFollow(shareUpName, upName, this.business);
        },
      });
    },
    // 检查当前用户是否领取
    async _checkFollow(username, inviteUser, business) {
      let req = {
        business,
        inviteUser,
        username,
      };
      try {
        let res = await checkFollow(req);
        let { ret, isFollow = false, message, isNewUser } = res.data;
        if (ret !== 0) return Toast(message);
        //1判断是否是新用户
        // isFollow为true;
        this.isNewUser = isNewUser; // 判断是否是新用户
        if (!this.isNewUser) return 
        //2判断是否领取过了
        this.isReceive = isFollow; // 是否领取
        console.log(`${this.isNewUser}新用户,${this.isFollow}已经领取`);
      } catch (error) {
        console.log(error);
      }
    },
    download() {
      window.open(this.downloadUrl);
    },
    // 领取
    async getCard() {
      if (!this.isNewUser) {
        Toast("该活动仅新用户可领取！");
        return;
      }
      // // 缓存点击状态
      // window.localStorage.setItem("getVipByAppShare", true);
      Toast("领取成功");
      this.isReceive = true;
    },
  },
};
</script>

<style scoped lang="less">
.bg {
  background-color: #ce0823;
}
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  .main {
    width: 100%;
    background: #ce0823 url("../img/wx/head_bg_02.png") no-repeat;
    background-size: 100% auto;
    height: 16.2rem;
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
      padding-top: 3.9rem;
      color: #fff;
      .img1 {
        padding: 0 0.2rem;
      }
      .succ_btn {
        position: absolute;
        right: 1.7rem;
        bottom: 0.82rem;
        width: 4.2rem;
        height: 0.8rem;
      }
      .succ_text {
        width: 100%;
        position: absolute;
        right: 0rem;
        bottom: 1.26rem;
        height: 0.8rem;
        font-size: 0.24rem;
        font-family: OPPOSans;
        font-weight: 700;
        color: #ffffff;
      }
    }
    .sct2 {
      padding: 0.2rem;
      padding-bottom: 0;
      position: relative;
      position: relative;
      .swiper-box {
        position: absolute;
        bottom: 0.3rem;
        width: 6.71rem;
        height: 5.12rem;
        // background: #d41423 url("../img/wx/stc3_3.png") no-repeat;
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
    .sct3,
    .sct4,
    .sct5 {
      padding: 0.2rem;
    }
  }
}
</style>
