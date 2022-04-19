<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc sct1">
        <img class="sct_img" src="./img/h5/head.png" alt="" />
        <div class="swiper-container stc1_content swiper-container1">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide u-fx-ver"
              v-for="(item, index) in stc1SwiperUrls"
              :key="index"
            >
              <img @click="bigImg('https://cdn.upchng')" :src="item.img" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination1"></div>
        </div>
      </div>

      <div class="stc sct2 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img2.png" alt="" />
      </div>

      <div class="stc sct3 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img3.png" alt="" />
      </div>

      <div class="stc sct4 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img4.png" alt="" />
      </div>

      <div class="stc sct5 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img5.png" alt="" />
      </div>

      <div class="stc sct6 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img6.png" alt="" />
      </div>

      <div class="stc sct7 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img7.png" alt="" />
      </div>

      <div class="stc sct8 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img8.png" alt="" />
      </div>

      <div class="stc sct9 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img9.png" alt="" />
      </div>

      <div class="stc sct10 u-fx-ac-jc">
        <img class="sct_img" src="./img/h5/img10.png" alt="" />
      </div>

      <div class="footer none" v-if="isFooter">
        <img class="footer_img sct_img" src="./img/h5/footer.png" alt="" />
        <div class="btn" @click="go68"></div>
      </div>
    </div>

    <!-- 客服 -->
    <div class="msg">
      <a href="javascript:;" @click="openMsg" class="btn_kf"></a>
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

    <!-- 68权限弹窗 -->
    <div
      class="mask study u-fx-ac-jc"
      v-if="showOrdermMak"
      @click="(e) => closeMask(e, 'showOrdermMak')"
    >
      <div class="pop popod">
        <img class="pop_img" src="./img/h5_mask.png" alt="" />
        <div class="pop_close pointer" @click="showOrdermMak = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { getOrderInfo } from "@u/orderSearch";
import { appCheckLogin } from "@u/login";
import "@ass/js/rem.js";
export default {
  name: "Mobile",
  components: {},
  data() {
    return {
      stc1SwiperUrls: [
        {
          img: require("./img/swiper1.png"),
        },
        {
          img: require("./img/swiper2.png"),
        },
        {
          img: require("./img/swiper3.png"),
        },
        {
          img: require("./img/swiper4.png"),
        },
      ],
      showOrdermMak: false,
      isFooter: false,
      buyUrl: "",
      productId: "",
      isDialogue: false,
      box: null,
    };
  },
  async created() {
    await this.loadJsSdk();
    let { uid } = await appCheckLogin();
    this.uid = uid;
    this.isBuy68();
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      new Swiper(".swiper-container1", {
        loop: true,
        // 如果需要分页器
        pagination: ".swiper-pagination1",
        autoplay: 4000,
      });
      if (this.$tools.isTerminal("isInGNNApp")) {
        this.buyUrl =
          "https://uppay.upchina.com/unifiedpay/80a4b61d126df6fdef2fb800efa0adbd";
        this.productId = "UPCFJC_20211122154352";
      } else {
        this.buyUrl =
          "https://uppay.upchina.com/unifiedpay/89f12bb0bfc0f3b26caa59588047d84b";
        this.productId = "UPCFJC_20211122154510";
      }
      window.addEventListener("scroll", this.showFooter, true);
    },
    async isBuy68() {
      if (!this.uid) return;
      let res = await getOrderInfo(this.uid, this.productId);
      this.showOrdermMak = res || false;
    },
    openMsg() {
      this.isDialogue = true;
    },
    //加载脚本
    loadJsSdk() {
      return new Promise((resolve) => {
        var target = document.getElementsByTagName("script")[0];
        var js = document.createElement("script");
        js.src = "https://cdn.upchina.com/activitypage/plugin/uphybrid.js";
        target.parentNode.insertBefore(js, target);
        js.onload = () => {
          resolve(true);
        };
      });
    },
    //关闭弹窗
    closeMask(e, val) {
      if (e.target._prevClass && e.target._prevClass.includes("mask")) {
        this[val] = false;
      }
    },
    //滚动第二屏展示footer
    showFooter() {
      // var scrollY =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;
      // console.log("scrollY", scrollY);
      let scrollY = this.$refs.page_wrap.scrollTop;
      this.isFooter = scrollY > 800;
    },
    go68() {
      let isParmas = this.$tools.getChUrl(this.buyUrl).includes("?");
      let cbUrl = window.location.href;
      window.open(
        `${this.$tools.getChUrl(this.buyUrl)}${
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
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  overflow-y: auto !important;
  height: 14.54rem !important;
  .main {
    width: 100%;
    overflow: auto;
    // height: 100%;
  }
  .stc {
    width: 100%;
    position: relative;
    padding: 0.1rem;
    background: #6e130c;
    overflow: hidden;
    .sct_img {
      width: 100%;
    }
    .swiper-container {
      overflow: visible;
      // overflow: hidden;
      .swiper-slide {
        padding: 0.2rem;
      }
      .wiper-pagination {
        width: 100%;
        .swiper-pagination-bullet-active {
          z-index: 100;
          background: #fff !important;
          opacity: 1;
        }
      }
      .swiper-pagination {
        bottom: -0.3rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .sct1 {
    position: relative;
    padding: 0px;
    width: 100%;
    height: 7.2rem;

    .stc1_content {
      width: 100%;
      height: 4.27rem;
      position: absolute;
      left: 50%;
      bottom: 0.22rem;
      transform: translate(-50%, 0%);
    }
  }
  .sct2 {
    padding: 0.2rem;
  }
  .sct3 {
  }
  .sct4 {
  }
  .sct5 {
  }
  .sct6 {
  }
  .sct7 {
  }
  .sct8 {
  }
  .sct9 {
  }
  .sct10 {
    margin-bottom: 0.6rem;
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
      right: 0.32rem;
      bottom: -1px;
      width: 1.62rem;
      height: 0.49rem;
    }
  }
}
// 客服
.msg {
  bottom: 2rem;
  display: block;
  position: fixed;
  right: 0;
  z-index: 900;
  &.hear {
    bottom: 4rem;
    .btn_kf {
      background: url("https://cdn.upchinaproduct.com/acm/202111/20211116/image/hear.png")
        no-repeat;
      background-size: 100%;
    }
  }
  .btn_kf {
    width: 1.66rem;
    height: 1.34rem;
    background: url(https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/acm/202109/aghxzbtyywx/img/btn_kf.png)
      no-repeat;
    background-size: 100%;
    display: block;
    margin: 20px auto 0;
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
      width: 5rem;
      height: 6.62rem;
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
  &.study {
    .popod {
      //  background: rgba(0, 0, 0, 0.7);
      width: 5.2rem;
      height: 9rem;
      position: relative;
      border-radius: 7px;
      overflow: hidden;
      .pop_img {
        width: 100%;
        height: 100%;
      }
      .btn_study {
        cursor: pointer;
        position: absolute;
        left: 50%;
        bottom: 0.64rem;
        transform: translate(-50%, 0%);
        width: 4.09rem;
        height: 0.5rem;
        background: linear-gradient(315deg, #de211e 0%, #ff610c 100%);
        box-shadow: 0rem 0.02rem 0.06rem 0rem rgba(93, 93, 93, 0.4);
        border-radius: 0.45rem;
        font-size: 0.21rem;
        color: #ffffff;
        font-weight: 500;
      }
      .pop_close {
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        top: 0.18rem;
        right: 0.15rem;
      }
    }
  }
}
</style>
