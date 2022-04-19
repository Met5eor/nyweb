<template>
  <div class="page u-fx-ver u-fx-ac" id="page">
    <div class="head">
      <img style="width:100%" src="./img/pc_head.png" alt="">
      <div class="btn u-fx-ac-jc" v-if="!isReceive" @click="_getCoupon">立即领取</div>
      <div class="btn u-fx-ac-jc" v-else>领取成功</div>
    </div>
    <div class="main u-mar-t50">
      <div v-if="isInGNNPC">
        <img style="width:100%" :src="gnnPng" alt="">
        <div v-for="(item,index) in orderGnnList" :key="index" :style="{top:`${item.top}rem`,height:`${item.heigth}rem`}" @click="openUrl(item)" class="cot_btn btn_2998 "></div>

      </div>
      <div v-else class="u-fx-ver u-fx-ac">
        <p class="text">【春节补送10天权限】春节假期期间，购买的商品将会补送10天权限！</p>
        <img style="width:100%" :src="gptPng" alt="">
        <div v-for="(item,index) in orderGptList" :key="index" :style="{top:`${item.top}rem`,height:`${item.heigth}rem`}" @click="openUrl(item)" class="cot_btn btn_2998 "></div>
      </div>
    </div>

    <div class="footer ">
      <img style="width:100%" :src="isInGNNPC?gnnFooterPng:gptFooterPng" alt="">
      <div class="time ">
        <div>1、活动时间：2022年1月24日-2月6日，活动期间每款产</div>
        <div>品每人仅限购买1次。</div>
      </div>
    </div>

    <Msg />
    <Ruls :url="isInGNNPC?'https://ntgpc.upchina.com/viewpoint/detail.html?id=11707':'https://ptgapp.upchina.com/point/detail?articleId=8301'" top='6rem' />
  </div>
</template>
<script >
import { Toast } from "vant";
import "@ass/js/remPc.js";
import $tools from "@u/tools";
import { addCoupon, ounponAll } from "../../api/getCoupon";
import { pcCheckLogin, appLogin } from "@u/login";
import gnnPng from "./img/pc_gnnCont.png";
import gptPng from "./img/pc_gptCont.png";
import gnnFooterPng from "./img/footer_pc_gnn.png";
import gptFooterPng from "./img/footer_pc_gpt.png";
import MaskPoupon from "@c/MaskPoupon.vue";
import Msg from "@c/MsgPc.vue";
import Ruls from "@c/Ruls.vue";
import '@u/newYearMergeUrl'
export default {
  name: "pc",
  components: { MaskPoupon, Msg, Ruls },
  data() {
    return {
      gnnPng,
      gptPng,
      gptFooterPng,
      gnnFooterPng,
      isInGNNPC: $tools.isTerminal("isInGNNPC"),
      isInGPTPC: $tools.isTerminal("isInGPTPC"),
      // isInGNNPC: true,
      isReceive: false,
      uid: "",
      orderGnnList: [
        {
          price: "2998",
          url: "https://uppay.upchina.com/unifiedpay/3d5cccc448c3002ca0cd123828adeedc",
          heigth: 1.05,
          top: 0.99
        },
        {
          price: "4998",
          url: "https://uppay.upchina.com/unifiedpay/397dbb102de3e5dfc52034e1b500edfb",
          heigth: 1,
          top: 2.05
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/5e45250a09c08a0fb7e8cabb1ac45ac9",
          heigth: 1.1,
          top: 3.05
        },
        {
          price: "6498",
          url: "https://uppay.upchina.com/unifiedpay/d203a28422e3b7c41ebc52c441cb020a",
          heigth: 1,
          top: 4.15
        },
        {
          price: "11800",
          url: "https://uppay.upchina.com/unifiedpay/e86895fefccb9d47da7309b32dd320a0",
          heigth: 1,
          top: 5.1
        },
        {
          price: "36000",
          url: "https://uppay.upchina.com/unifiedpay/0294adf903ba63fc780e6a8b24103f6f",
          heigth: 1,
          top: 6.1
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/053f4908b59738b054e7b5b5468d6916",
          heigth: 0.9,
          top: 7.18
        },
        {
          price: "5898",
          url: "https://uppay.upchina.com/unifiedpay/8db59ecdbb51359f82ca40416dac611b",
          heigth: 1,
          top: 8.05
        },
        {
          price: "10800",
          url: "https://uppay.upchina.com/unifiedpay/b7e078ce3dbe4fda7cc8e7208ed2e7e7",
          heigth: 1,
          top: 9.05
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/70d700027d4d53025eff0a83a52281e2",
          heigth: 1,
          top: 10.02
        },
        {
          price: "5898",
          url: "https://uppay.upchina.com/unifiedpay/aed7d14ffa9bb5e1bdf3779168c106d1",
          heigth: 1,
          top: 11
        },
        {
          price: "10800",
          url: "https://uppay.upchina.com/unifiedpay/c651b28b92b47fb414cc805f92197543",
          heigth: 1,
          top: 12
        },
      ],
      orderGptList: [
        {
          price: "1598",
          url: "https://uppay.upchina.com/unifiedpay/33570c9f06e09184d8f651211105d703",
          heigth: 1.3,
          top: 1.25,
        },
        {
          price: "998",
          url: "https://uppay.upchina.com/unifiedpay/da150e7f76b77e60ed6055918704036b",
          heigth: 1.3,
          top: 2.58,
        },
        {
          price: "2998",
          url: "https://uppay.upchina.com/unifiedpay/3d5cccc448c3002ca0cd123828adeedc",
          heigth: 1.3,
          top: 3.9,
        },
        {
          price: "4998",
          url: "https://uppay.upchina.com/unifiedpay/397dbb102de3e5dfc52034e1b500edfb",
          heigth: 1.2,
          top: 5.2,
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/5e45250a09c08a0fb7e8cabb1ac45ac9",
          heigth: 1,
          top: 6.4,
        },
        {
          price: "6498",
          url: "https://uppay.upchina.com/unifiedpay/d203a28422e3b7c41ebc52c441cb020a",
          heigth: 0.95,
          top: 7.4,
        },
        {
          price: "11800",
          url: "https://uppay.upchina.com/unifiedpay/e86895fefccb9d47da7309b32dd320a0",
          heigth: 0.95,
          top: 8.35,
        },
        {
          price: "36000",
          url: "https://uppay.upchina.com/unifiedpay/0294adf903ba63fc780e6a8b24103f6f",
          heigth: 0.9,
          top: 9.35,
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/4c239aa348c1b4a87563538c25197b31",
          heigth: 0.9,
          top: 10.35,
        },
        {
          price: "5898",
          url: "https://uppay.upchina.com/unifiedpay/dd3312e106658444a639d4e3952da896",
          heigth: 1,
          top: 11.3,
        },
        {
          price: "10800",
          url: "https://uppay.upchina.com/unifiedpay/39f3e6e65d8b095c8357140f94bb5bd0",
          heigth: 1,
          top: 12.3,
        },
        {
          price: "3298",
          url: "https://uppay.upchina.com/unifiedpay/89525d0e389c6df7496d9d6d498486bb",
          heigth: 1,
          top: 13.3,
        },
        {
          price: "5898",
          url: "https://uppay.upchina.com/unifiedpay/90db983ba8ca274597a403676e2f8848",
          heigth: 1,
          top: 14.3,
        },
        {
          price: "10800",
          url: "https://uppay.upchina.com/unifiedpay/2e65ada50846de31a3ab684075c4c261",
          heigth: 1,
          top: 15.3,
        },
      ]
    }
  },
  async mounted() {
    let url = this.isInGNNPC ?
      'https://cdn.upchinaproduct.com/test/test/webNativeCommunicatePC-1.js' :
      'https://cdn.upchinaproduct.com/assert/jssdk/jssdk-pc-1.0.1.min.js';
    await this.$tools.loadJsSdk(url);
    if (this.isInGPTPC) {
      let obj = sessionStorage.getItem('loginObj')
      this.uid = obj ? JSON.parse(obj).uid : ''
    }
    if (!this.uid) {
      let { uid } = await pcCheckLogin(this.isInGNNPC);
      this.uid = uid;
      console.log('this.uid', this.uid)
    }
    this.isReceive = await this._isReceive(this.uid);
  },
  methods: {
    async _isReceive(uid) {
      //股票通有课模式情况下uid = guest2018
      if (uid === 'guest2018') return upNativeComm.exec("open.regist")
      if (!uid) return false
      let req = {
        uid,
      };
      let { iRet, sMsg, stValue } = await ounponAll({ req: req });
      let flag1 = stValue.find((item) =>
        item.couponid === (this.isInGNNPC ? "C2220120141116RX" : "C2220119163118QH")
      );
      let flag2 = stValue.find((item) =>
        item.couponid === (this.isInGNNPC ? "C2220120141157ZV" : "C2220119163220D2")
      );
      let flag3 = stValue.find((item) =>
        item.couponid === (this.isInGNNPC ? "C2220120141256RQ" : "C2220119163313GC")
      );
      return !!(flag1 && flag2 && flag3);
    },
    openUrl({ url, price }) {
      window.open(url);
    },
    //立即领取
    async _getCoupon() {
      if (!this.uid) return Toast('uid不能为空')
      if (this.uid === 'guest2018') return upNativeComm.exec("open.regist")
      let req1 = {
        uid: this.uid,
        isReceive: false,
        couponid: this.isInGNNPC ? "C2220120141116RX" : "C2220119163118QH", //50满减券
      };
      let req2 = {
        uid: this.uid,
        isReceive: false,
        couponid: this.isInGNNPC ? "C2220120141157ZV" : "C2220119163220D2", //100满减券
      };
      let req3 = {
        uid: this.uid,
        isReceive: false,
        couponid: this.isInGNNPC ? "C2220120141256RQ" : "C2220119163313GC", //200满减券
      };
      let Promise1 = addCoupon({ req: req1 });
      let Promise2 = addCoupon({ req: req2 });
      let Promise3 = addCoupon({ req: req3 });
      Promise.all([Promise1, Promise2, Promise3]).then((val) => {
        let flag = val.every((item) => item.iRet === 0);
        if (flag) {
          Toast("领取成功,您的优惠劵已到账");
          this.isReceive = flag;
        } else {
          console.log('未全部领取成功')
          Toast("抱歉当前领取人数过多，请稍后再试");
        }
      });
    }
  }

}
</script>

<style lang="less" scoped>
.red-color {
  color: #ed0007;
}
.page {
  background: #e70000 url("./img/pc_bg.png") no-repeat;
  background-size: 100% auto;
  .head {
    margin-top: 2.4rem;
    width: 8rem;
    position: relative;
    .btn {
      background: url("./img/btn.png") no-repeat;
      background-size: 100% auto;
      -webkit-animation: pulse 1s ease infinite;
      animation: pulse 1.35s ease infinite;
      position: absolute;
      bottom: -6%;
      left: 28%;
      width: 3.33rem;
      height: 0.92rem;
      font-weight: Bold;
      font-size: 0.36rem;
      color: #e02941;
    }
  }
  .main {
    width: 8rem;
    margin-top: 0.4rem;
    background-size: 100% auto;
    position: relative;
    .cot_btn {
      right: 0.2rem;
      position: absolute;
      width: 1.5rem;
      height: 1.02rem;
    }
    .text {
      color: #fff;
      font-size: 0.24rem;
      text-align: left;
      // letter-spacing: -25px;
    }
  }
  .footer {
    width: 8rem;
    position: relative;
    .time {
      width: 96%;
      height: 0.75rem;
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      position: absolute;
      top: 0.65rem;
      left: 0.12rem;
      font-weight: 600;
      font-size: 0.3rem;
      background: #e70000;
      color: #fff;
    }
  }
}

.pop {
  width: 6.5rem;
  position: relative;
  .pop_img {
    width: 100%;
  }
  .pop_close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 2.08rem;
    right: 0.54rem;
  }
}
@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
  50% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  to {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
  50% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  to {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
}
</style>
