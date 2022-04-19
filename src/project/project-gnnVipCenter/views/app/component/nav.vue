<template>
  <!-- 头部导航 -->
  <div class="banner ">
    <van-swipe ref="vanSwipe" :width="355" class="my-swipe" @change="onChange" :loop="false" :show-indicators="false" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.name">
        <!-- 会员 -->
        <div class="banner_box " :class="item.class">
          <div class="top_box">
            <div class="avator">
              <img :src="userInfo.head_url||touristImg">
            </div>
            <div class="r_info">
              <p class="status">
                <span class="username">{{userInfo.username||userInfo.nickName||"暂未开通会员"}}</span>
                <span v-if='item.isPower' :class="item.index===2?'icon_sz_vip':'icon_vip'"></span>
              </p>
              <!-- 新人 -->
              <p class="info" v-if="item.isVip" v-html="item.newInfo"></p>
              <!-- 未到期 -->
              <p class="info" v-else-if="item.isPower" v-html="item.noMaturityInfo"></p>
              <!-- 到期 -->
              <p class="info" v-else v-html="item.maturityInfo"></p>
            </div>
          </div>
          <div class="bottom_box u-fx u-fx-ac">
            <div class="time" v-if="item.isVip">
              <p v-if="item.isPower">会员有效期至：{{item.vipEndTime | gmtToDate('date')}}</p>
              <p v-else>会员有效期至:已到期</p>
            </div>
            <!-- 无权限或者未登录展示 -->
            <div class="total_box " v-else>
              <div class="img_box">
                <img src="https://cdn.upchina.com/front/2006newday1/images/weixin/avator1.jpg">
                <img src="https://cdn.upchina.com/front/2006newday1/images/weixin/avator2.jpg">
                <img src="https://cdn.upchina.com/front/2006newday1/images/weixin/avator3.jpg">
                <img src="https://cdn.upchina.com/front/2006newday1/images/weixin/avator4.jpg">
              </div>
              <p class="total"><span class="total_num">210.12万</span>人已开通股牛牛会员</p>
            </div>
            <!-- 有权限展示会员到期时间或已到期 -->
           
            <a href="javascript:;" class="btn_open" v-if="item.isNewUser" @click="goBuy(item.newPrice)">立即开通</a>
            <!-- 续费价(有权限)不分新老用户 -->
            <a href="javascript:;" class="btn_open" v-else-if="item.isPower" @click="goBuy(item.xfPrice)">立即续费</a>
            <!-- 日常价(权限到期)老用户 -->
            <a href="javascript:;" class="btn_open" v-else @click="goBuy(item.price)">立即续费</a>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { appLogin } from '@u/login'
import { orderSplice } from '@u/orderSearch'
export default {
  name: "navHead",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  inject: ['getUserIfo', 'getrulesObj', 'getuid'],
  props: {
    value: {
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
      bannerList: [
        {
          index: 0,
          class: "vip",
          name: '股牛牛会员',
          username: '暂未开通会员',
          isVip: false,
          isPower: false,
          vipEndTime: '',
          newInfo: '开通股牛牛会员,享3大股池+L2指标等特权',
          maturityInfo: '续费股牛牛会员,享3大股池+L2指标等特权',
          noMaturityInfo: '升级为 <span class="red">尊享会员</span>，享20+项专属特权',
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/a64f571cb20bc6dbf9b4d9b728a2221f",//新人专享底部悬浮价
          newPrice: "https://uppay.upchina.com/unifiedpay/0fcd3e598be112311f03a426015b6b58",//新人价，新人日常价
          price: "https://uppay.upchina.com/unifiedpay/7bf5c53a49a5fd9996f966f0528e785a",//日常价(权限到期)老用户
          xfPrice: "https://uppay.upchina.com/unifiedpay/8dd126777b0c1f05787deafcb59c2d1c",//续费价(有权限)不分新老用户
        },
        {
          index: 1,
          class: "svip",
          name: '尊享会员',
          username: '暂未开通尊享会员',
          isVip: false,
          isPower: false,
          vipEndTime: '',
          newInfo: '开通 <span>尊享会员</span>，享20+项专属特权',
          maturityInfo: '续费 <span>尊享会员</span>，享20+项专属特权',
          noMaturityInfo: '升级为 <span>尊享会员实战直播版</span>，六大主题直播助你擒牛捉妖',
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162",//新人专享底部悬浮价
          newPrice: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162",//新人价，新人日常价
          price: "https://uppay.upchina.com/unifiedpay/f65856f98f33581803bc24e78371cfe3",//日常价(权限到期)老用户
          xfPrice: "https://uppay.upchina.com/unifiedpay/f000de12428e321a05088e3c716a43b4",//续费价(有权限)不分新老用户
        },
        {
          index: 2,
          class: "zbvip",
          name: '尊享会员实战直播版',
          username: '暂未开通尊享会员实战直播版',
          isVip: false,
          isPower: false,
          vipEndTime: '',
          newInfo: '开通 <span>尊享会员实战直播版</span>,享六大主题直播',
          maturityInfo: '续费 <span>尊享会员实战直播版</span>,享六大主题直播',
          noMaturityInfo: '尊贵的实战直播版会员，享全部专属特权',
          zxNewPrice: "https://uppay.upchina.com/unifiedpay/1af8b238517b51fc6f9e323462b44b36",//新人专享底部悬浮价
          newPrice: this.$tools.isTerminal('ios') ? 'https://uppay.upchina.com/unifiedpay/9ca0216bc5fd5fb5dc2d0f030e6b7b8b' : 'https://uppay.upchina.com/unifiedpay/9ca0216bc5fd5fb5dc2d0f030e6b7b8b',//新人价
          xfPrice: this.$tools.isTerminal('ios') ? "https://uppay.upchina.com/unifiedpay/3c6f27f3147700f11302f38c217eb559" : 'https://uppay.upchina.com/unifiedpay/3c6f27f3147700f11302f38c217eb559', //续费价
          price: this.$tools.isTerminal('ios') ? "https://uppay.upchina.com/unifiedpay/8b388a0b573ae6d4cf953118cb480997" : 'https://uppay.upchina.com/unifiedpay/21c781c3fa19990108f99b97b167817e',//日常价
        }
      ],
      touristImg:
        "https://cdn.upchina.com/front/gnnvipcenterh5/images/pic_tourist.png",
    };
  },

  watch: {
    currentIndex(val) {
      this.$refs.vanSwipe.swipeTo(val)
    },
    uid(val) {
      this.initData()
    },
    initFulesList(val) {
      this.initData()
    }
  },
  computed: {
    uid() {
      return this.getuid()
    },
    userInfo() {
      return this.getUserIfo()
    },
    isIos() {
      return this.$tools.isTerminal('ios')
    },
    currentIndex: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input", false);
      },
    },
  },
  created: function () {
  },
  mounted: function () { },

  methods: {
    onChange(index) {
      this.$emit('input', index)
    },
    //初始化数据每一项会员是否有权限，到期时间
    initData() {
      this.bannerList.forEach(el => {
        let { isVip, isPower, isOldUser, vipEndTime = '' } = this.initFulesList.find(v => v.name === el.name)
        el.isVip = isVip
        el.isOldUser = isOldUser
        el.isNewUser = !isOldUser
        el.isPower = isPower
        el.vipEndTime = vipEndTime
      });
    },
    goBuy(url) {
      if (!this.uid) return appLogin()
      orderSplice(url, 1)
    }

  },
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 170px;
  line-height: 170px;
  text-align: left;
  .banner_box {
    margin-top: 0.4rem;

    width: 100%;
    .bottom_box {
      .time {
        line-height: 0.5rem;
      }
    }
  }
  .vip {
    // margin-left: 0.2rem;
  }
  .svip {
    // margin-left: 0.2rem;
  }
  .zbvip {
    // margin-left: 0.2rem;
  }
}
</style>
