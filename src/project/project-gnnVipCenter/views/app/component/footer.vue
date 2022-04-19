<template>
  <!-- 悬浮底部 -->
  <div class="footer_box">
    <div class="new_user" v-if="!curtObj.isVip" @click="goBuy(curtObj.zxNewPrice)">
      <div class="price">首购特惠仅需<span>{{curtObj.price_txt}}</span></div>
      <div class="btn_lq">去领取&gt&gt</div>
    </div>
    <div class="normal_user   ">
      <div class="price ">
        <div class="price_num" v-html="curtObj.price_num"></div>
        <div class="price_cnt">{{curtObj.price_cnt}}</div>
      </div>
      <div class="btn_buy" v-if="curtObj.isNewUser" @click="goBuy(curtObj.price)">
        立即开通</div>
      <div class="btn_buy" v-else-if="curtObj.isPower" @click="goBuy(curtObj.price)">立即续费</div>
      <div class="btn_buy" v-else @click="goBuy(curtObj.xfPrice)">立即续费</div>
    </div>
  </div>
</template>

<script>
import { orderSplice } from '@u/orderSearch'
export default {
  name: "FooterBar",
  inject: ['getuid'],
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
    initFulesList: {
      type: Array,
      default: () => []
    },

  },
  data() {
    return {
      showFlag: false,
      footerList: [
        {
          name: '股牛牛会员',
          currentIndex: 0,
          price_txt: '￥30/月',
          price_num: '低至<span class="price_num_sp">30</span>元/月',
          price_cnt: '专享3大股池+手机Level-2指标',
          isVip: false,
          isPower: false,
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/a64f571cb20bc6dbf9b4d9b728a2221f",//新人专享底部悬浮价
          newPrice: "https://uppay.upchina.com/unifiedpay/0fcd3e598be112311f03a426015b6b58",//新人价，新人日常价
          price: "https://uppay.upchina.com/unifiedpay/7bf5c53a49a5fd9996f966f0528e785a",//日常价(权限到期)老用户
          xfPrice: "https://uppay.upchina.com/unifiedpay/8dd126777b0c1f05787deafcb59c2d1c",//续费价(有权限)不分新老用户
        },
        {
          name: '尊享会员',
          currentIndex: 1,
          price_txt: '￥198/14天',
          price_num: '<span class="price_num_sp">488</span>元/月',
          price_cnt: '尊享特色题材、智能亮点等33项特权',
          isVip: false,
          isPower: false,
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162",//新人专享底部悬浮价
          newPrice: "https://uppay.upchina.com/unifiedpay/2168f09b64433ee7ae9199d1484027e5",//新人价，新人日常价
          price: "https://uppay.upchina.com/unifiedpay/f65856f98f33581803bc24e78371cfe3",//日常价(权限到期)老用户
          xfPrice: "https://uppay.upchina.com/unifiedpay/f000de12428e321a05088e3c716a43b4",//续费价(有权限)不分新老用户
        },
        {
          name: '尊享会员实战直播版',
          formatName:'实战直播版',
          currentIndex: 2,
          price_txt: '￥198元/14天',
          price_num: '<span class="price_num_sp">1598</span>元/月',
          price_cnt: '含35项尊享会员特权+实战直播+超级L2',
          isVip: false,
          isPower: false,
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/1af8b238517b51fc6f9e323462b44b36",//新人专享底部悬浮价
          newPriceIos: "https://uppay.upchina.com/unifiedpay/9ca0216bc5fd5fb5dc2d0f030e6b7b8b",//新人价，新人日常价--ios
          newPriceAn: "https://uppay.upchina.com/unifiedpay/9ca0216bc5fd5fb5dc2d0f030e6b7b8b",//新人价，新人日常价--安卓
          priceIos: "https://uppay.upchina.com/unifiedpay/8b388a0b573ae6d4cf953118cb480997",//日常价(权限到期)老用户--ios
          priceAn: "https://uppay.upchina.com/unifiedpay/21c781c3fa19990108f99b97b167817e",//日常价(权限到期)老用户--安卓
          xfPriceIos: "https://uppay.upchina.com/unifiedpay/3c6f27f3147700f11302f38c217eb559",//续费价(有权限)不分新老用户--ios
          xfPriceAn: "https://uppay.upchina.com/unifiedpay/3c6f27f3147700f11302f38c217eb559",//续费价(有权限)不分新老用户--安卓
        },
      ]
    };
  },
  computed: {
    uid() {
      return this.getuid()
    },
    curtObj() {
      return this.footerList[this.currentIndex]
    }
  },
  created: function () {
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    initFulesList(val) {
      // console.log(val)
      if (!val) return
      this.initfooterList(val)
    }
  },
  methods: {
    //初始化数据获取每个会员的权限
    initfooterList(val) {
      this.footerList.forEach(el => {
        let obj = val.find(v => v.name === el.name)
        if (!obj) return
        el.isVip = obj.isVip
        el.isNewUser = !obj.isOldUser
        el.isPower = obj.isPower
      });
    },
    goBuy(url) {
      if (!this.uid) return appLogin()
      orderSplice(url, 1)
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 348) {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
    },
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="less" scoped>
.footer_box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  color: #fff;
  .new_user {
    height: 0.74rem;
    line-height: 0.74rem;
    background: #fff0dc;
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: #333;
    .price {
      span {
        color: #cfb796;
        font-weight: bold;
        margin-left: 0.1rem;
      }
    }
  }
  .normal_user {
    margin: 0 auto;
    height: 1.2rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn_buy {
      width: 2.4rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      background: linear-gradient(141deg, #ffe2c1 0%, #f9d29e 100%);
      -webkit-background: linear-gradient(141deg, #ffe2c1 0%, #f9d29e 100%);
      border-radius: 0.44rem;
      color: #303242;
      font-weight: bold;
      font-size: 0.32rem;
      margin-right: 0.2rem;
    }
    img {
      vertical-align: -0.1rem;
    }
    .price_num {
      font-size: 0.28rem;
      font-weight: bold;
    }
    .price_num_sp {
      font-size: 1.25em;
    }
    .price {
      font-size: 0.24rem;
      color: #fff;
      line-height: 0.48rem;
    }
  }
}
</style>
