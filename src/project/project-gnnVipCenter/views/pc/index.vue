<template>
  <div class="content" id="app" v-cloak>
    <!-- 导航 -->

    <Nav v-model="currentIndex" :uid="uid" :initFulesList='initFulesList' />
    <!-- 中间的内容页 -->
    <Page0 v-if="currentIndex===0" :rulesObj="getrulesObj('股牛牛会员')" />
    <Page1 v-if="currentIndex===1" :rulesObj="getrulesObj('尊享会员')" />
    <Page2 v-if="currentIndex===2" :rulesObj="getrulesObj('尊享会员实战直播版')" />

    <FooterBar :currentIndex="currentIndex" :initFulesList='initFulesList' @change="buy" />

    <!-- 侧边栏 -->
    <Sidebar />

    <!-- 红包 -->
    <RedEnvelope v-if="showRedEnvelope" />

    <!-- 弹窗 -->
    <OrderMask v-model="showOrederMask" v-if="showOrederMask"></OrderMask>

    <!-- 微信弹窗 -->
    <MaskPoupon v-model="showWx">
      <div class="pop_box">
        <img src="./images/pop_pic_wx.png">
        <div class="pop_close " @click="showWx=false"></div>
      </div>
    </MaskPoupon>
  </div>
</template>

<script>
import Nav from './component/nav.vue'
import Sidebar from './component/Sidebar.vue'
import RedEnvelope from './component/redEnvelope.vue'
import FooterBar from './component/footer.vue'
import MaskPoupon from "@c/MaskPoupon.vue";
import "@ass/js/remPc.js";
import Page0 from "./page0.vue";
import Page1 from "./page1.vue";
import Page2 from "./page2.vue";
import OrderMask from './orderMask.vue'
import { allmodule } from '../../api/vipCenter'
import { pcCheckLogin } from "@u/login";
import { Toast } from 'vant';
export default {
  name: "pcVipShare",
  components: { Nav, Sidebar, MaskPoupon, RedEnvelope, FooterBar, Page0, Page1, Page2, OrderMask },
  provide: function () {
    return {
      currentIndex: this.currentIndex,
      getCurrentIndex: () => this.currentIndex,
      getuid: () => this.uid,
      getrulesList: () => this.rulesList,
      chageOrder: this.chageOrderMask,
      getrulesObj: this.getrulesObj,
      changeShowWx:this.changeShowWx
    }
  },
  data() {
    return {
      // uid: '2972375223',//新人价账号 asdf1234
      // uid: 'tyra4',//股牛牛新会员 222222
      // uid: 'tyra2',//尊享会员,实战会员过期
      // uid: 'up2913729',//股牛牛过期
      // uid: "zsht5", //000000 尊享会员到期且有股牛牛会员
      // uid: "zsht1", //222222 有尊享会员权限
      // uid: "zsht3", //111111 尊享会员到期用户
      // uid: "zsht2", //111111 实战直播会员

      // uid: "up3133630", //a950813ffca46475cd36d1ba337b5b22
      uid: "",
      showWx: false,
      showOrederMask: false,
      currentIndex: 0, //页面的导航
      showRedEnvelope: false,
      rulesList: [  //权限列表
        {
          name: '股牛牛会员',
          mid: 6057,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
        {
          name: '尊享会员',
          mid: 2116,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
        {
          name: '实战直播版',
          mid: 6094,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
      ],
      initFulesList: [ //权限覆盖后的角色列表
        {
          name: '股牛牛会员',
          mid: 6057,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
        {
          name: '尊享会员',
          mid: 2116,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
        {
          name: '实战直播版',
          mid: 6094,
          isVip: false,
          isOldUser: false,
          isPower: false,
          vipEndTime: '', //到期时间
        },
      ],
    };
  },
  computed: {
    countDown() {
      return
    },
  },
  async created() {
    let url = 'https://cdn.upchinaproduct.com/test/test/webNativeCommunicatePC-1.js'
    await this.$tools.loadJsSdk(url);
    let { uid } = await pcCheckLogin()
    if (uid) {
      this.uid = uid
    }
    this.initRole()
  },
  async mounted() {
  },
  methods: {
    //显示微信二维码弹窗
    changeShowWx() {
      this.showWx = true
     },
    //购买弹窗
    chageOrderMask(show) {
      this.showOrederMask = true
    },
    //回去角色权限1,6094实战直播版权限，2116尊享会员权限，6057股牛牛会员 高阶权限包含低阶权限
    // 权限等级： 6094>2116=2118>6057
    async initRole() {
      if (!this.uid) return Toast('请登录')
      let req = {
        uid: this.uid
      }
      let authorityList = await allmodule(req)
      this.rulesList.forEach((item, index) => {
        let obj = authorityList.find(v => v.mid === item.mid)
        if (!obj) return
        item.isVip = true
        item.isOldUser = this.timediff(obj)
        item.isPower = Number(obj.endtime) - new Date().getTime() > 0
        item.vipEndTime = obj.endtime
      })
      this.showRedEnvelope = !this.rulesList.some(v => v.isOldUser)
      this.$set(this.initFulesList, 0, this.getrulesObj('股牛牛会员'))
      this.$set(this.initFulesList, 1, this.getrulesObj('尊享会员'))
      this.$set(this.initFulesList, 2, this.getrulesObj('尊享会员实战直播版'))
      //翻转了重最后开始查找有权限的索引
      let index = this.initFulesList.reverse().findIndex(v => v.isPower)
      this.initFulesList.reverse()
      if (index === -1) return
      //因为翻转了索引为2的时候是0 股牛牛会员,为0的时候是实战直播会员
      this.currentIndex = index === 2 ? 0 : index === 1 ? 1 : 2
    },
    getrulesObj(name) {
      let obj = {
        name: name,
        isVip: false,
        isPower: false,
        isOldUser: false
      }
      if (name === '股牛牛会员') {
        obj.isPower = this.rulesList.some(v => v.isPower)
        obj.isOldUser = this.rulesList.some(v => v.isOldUser)
        obj.isVip = this.rulesList.some(v => v.isVip)
        obj.vipEndTime = Math.max(...this.rulesList.map(v => v.vipEndTime))
      } else if (name === '尊享会员') {
        obj.isPower = this.rulesList.filter((v, index) => index > 0).some(v => v.isPower)
        obj.isOldUser = this.rulesList.filter((v, index) => index > 0).some(v => v.isOldUser)
        obj.isVip = this.rulesList.filter((v, index) => index > 0).some(v => v.isVip)
        obj.vipEndTime = Math.max(...this.rulesList.filter((v, index) => index > 0).map(v => v.vipEndTime))
      } else if (name === '尊享会员实战直播版') {
        obj.isPower = this.rulesList.filter((v, index) => index > 1).some(v => v.isPower)
        obj.isOldUser = this.rulesList.filter((v, index) => index > 1).some(v => v.isOldUser)
        obj.isVip = this.rulesList.filter((v, index) => index > 1).some(v => v.isVip)
        obj.vipEndTime = Math.max(...this.rulesList.filter((v, index) => index > 1).map(v => v.vipEndTime))
      }
      return obj
    },
    //计算时差是否大于10天
    timediff({ endtime, starttime }) {
      if (!endtime || !starttime) return
      let oneday = 24 * 60 * 60 * 1000
      let time = endtime - starttime
      return time / oneday > 10
    },
    buy() { }
  },
};
</script>
<style lang="less" scoped>
@import url("./css/style.css");
.green {
  border: 1px solid green;
}
.red {
  border: 1px solid red;
}
.swiper-container {
  width: 100%;
  background: red !important;
}
.swiper-container .swiper-slide {
  width: 100%;
  height: 100%;
}
.swiper-slide .img_box img {
  width: 1033px;
  display: block;
  margin: 0 auto;
}
.swiper_tq .tq_box {
  padding: 0px 34px;
}
.swiper_tq .tq_box .tq_list {
  width: 100%;
}
.swiper_box .swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  font-size: 0;
  bottom: 0px;
}
.swiper_box .swiper-pagination-bullet-active {
  background: #ffe2c1;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background: url(./images/btn_next.png) no-repeat;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background: url(./images/btn_prev.png) no-repeat;
}
.pop_box {
  position: relative;
  .pop_close {
    width: 30px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 25px;
  }
}
</style>
