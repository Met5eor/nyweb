<template>
  <!-- 悬浮底部 -->
  <div class="footer_box" v-show="showFlag">
    <div class="normal_user ">
      <div class="price">
        <img v-if="footerList[currentIndex].icon" src="../images/footer_vip.png">
        <span class="icon_price">{{footerList[currentIndex].formatName||footerList[currentIndex].name}}:</span>
        <span class="price_txt">{{footerList[currentIndex].price_txt}}</span>
        <span class="time">元/日</span>
        <span class="info" :class="currentIndex===2?'font-28':''">{{footerList[currentIndex].info}}</span>
      </div>
      <div class="btn_buy" v-if="footerList[currentIndex].isNewUser" @click="showOrderEvent('立即开通')">立即开通
      </div>
      <div class="btn_buy" v-else @click="showOrderEvent">立即续费</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  inject: ['chageOrder'],
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
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      showFlag: false,
      footerList: [
        {
          name: '股牛牛会员',
          currentIndex: 0,
          price_txt: '1.9',
          info: '专享3大股池+L2指标',
          isNewUser: true,
          icon: true
        },
        {
          name: '尊享会员',
          currentIndex: 1,
          price_txt: '16.5',
          info: '尊享32项专属特权',
          isNewUser: true,
          icon: true
        },
        {
          name: '尊享会员实战直播版',
          formatName:'实战直播版',
          currentIndex: 2,
          price_txt: '44.4',
          info: '尊享32项特权和6大主题直播',
          isNewUser: true,
          icon: false
        },
      ]
    };
  },
  computed: {
  },
  created: function () {
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    initFulesList(val) {
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
        el.isNewUser = !obj.isOldUser
      });
    },
    showOrderEvent() {
      this.chageOrder()
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
  background: #222;
  font-size: 0.48rem;
  .new_user {
    height: 0.74rem;
    line-height: 0.74rem;
    background: #fff0dc;
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: #333;
  }
  .new_user .price {
    float: left;
    line-height: 0.66rem;
  }
  .new_user .price span {
    color: #cfb796;
    font-weight: bold;
    margin-left: 0.1rem;
  }
  .new_user .btn_lq {
    float: right;
  }
}
.normal_user {
  width: 12rem;
  margin: 0 auto;
  height: 1.2rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  img {
    vertical-align: -0.1rem;
  }
  .price {
    float: left;
    color: #fbd8aa;
    margin-top: 0.28rem;
    line-height: 0.48rem;
  }
  .price .price_txt {
    font-size: 0.48rem;
    font-weight: bold;
  }
  .price .icon_price {
    margin-top: 0.36rem;
    margin-left: 0.2rem;
    font-size: 0.36rem;
    font-weight: bold;
  }
  .price .time {
    font-size: 0.28rem;
    color: #fbd8aa;
  }
  .price .info {
    margin-left: 0.4rem;
    font-size: 0.32rem;
    &.font-28 {
      font-size: 0.28rem;
    }
  }
  .price .info.sub {
    font-size: 0.24rem;
  }
  .btn_buy {
    float: right;
    width: 3.98rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: linear-gradient(141deg, #ffe2c1 0%, #f9d29e 100%);
    -webkit-background: linear-gradient(141deg, #ffe2c1 0%, #f9d29e 100%);
    border-radius: 0.2rem;
    color: #303242;
    font-weight: bold;
    font-size: 0.4rem;
    margin-top: 0.15rem;
    cursor: pointer;
  }
  .btn_buy:hover {
    opacity: 0.9;
  }
}
</style>
