<template>
  <div class="content" id="app" v-cloak>
    <!-- 导航 -->

    <NavHead v-model="currentIndex" :uid="uid" :initFulesList='initFulesList' />

    <!-- 导航 -->
    <van-tabs @click="changeCurrentIndex" class="tabs" v-model="currentIndex" animated title-active-color="#333" title-inactive-color="#999" color="#E6C699" line-width="30px" line-height="4px">
      <van-tab title="股牛牛会员"></van-tab>
      <van-tab title="尊享会员"></van-tab>
      <van-tab title="实战直播版"></van-tab>
    </van-tabs>
    <!-- 中间的内容页 -->
    <Page0 v-if="currentIndex===0" :rulesObj="getrulesObj('股牛牛会员')" />
    <Page1 v-if="currentIndex===1" :rulesObj="getrulesObj('尊享会员')" />
    <Page2 v-if="currentIndex===2" :rulesObj="getrulesObj('尊享会员实战直播版')" />

    <FooterBar :currentIndex="currentIndex" :initFulesList='initFulesList' @change="buy" />

    <!-- 侧边栏 -->
    <!-- <Sidebar /> -->

    <!-- 红包 -->
    <RedEnvelope v-if="showRedEnvelope" />
  </div>
</template>

<script>
import NavHead from './component/nav.vue'
import { Tab, Tabs } from 'vant';
import RedEnvelope from './component/redEnvelope.vue'
import FooterBar from './component/footer.vue'

import "@ass/js/rem.js";
import Page0 from "./page0.vue";
import Page1 from "./page1.vue";
import Page2 from "./page2.vue";
import { allmodule, getUserInfo } from '../../api/vipCenter'
import { appCheckLogin } from "@u/login";
import { Toast } from 'vant';
export default {
  name: "h5VipCenter",
  components: {
    NavHead,
    FooterBar,
    RedEnvelope,
    Page0,
    Page1,
    Page2,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  provide: function () {
    return {
      currentIndex: this.currentIndex,
      getCurrentIndex: () => this.currentIndex,
      getuid: () => this.uid,
      getrulesList: () => this.rulesList,
      chageOrder: this.chageOrderMask,
      getrulesObj: this.getrulesObj,
      getUserIfo: () =>this.userInfo,
      changeCurrentIndex:this.changeCurrentIndex
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
      uid: "zsht2", //111111 实战直播会员

      // uid: "up3133630", //a950813ffca46475cd36d1ba337b5b22
      // uid: "up2851063",
      // uid: "uptest_wcj1",
      showOrederMask: false,
      currentIndex: 0, //页面的导航
      showRedEnvelope: false,
      userInfo:{},
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
          name: '尊享会员实战直播版',
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
    // let url = 'https://cdn.upchina.com/activitypage/plugin/uphybrid.min.js'
    // await this.$tools.loadJsSdk(url);
    // let { uid } = await appCheckLogin()
    // if (uid) {
    //   this.uid = uid
    // }
    this.initRole()
    // console.log(this.uid)
    // setTimeout(() => {
    //   this.uid = '2972375223'
    //    this.initRole()
    // }, 500);
   
  },
  async mounted() {
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index
    },
    //购买弹窗
    chageOrderMask(show) {
      this.showOrederMask = true
    },
    //角色权限1,6094实战直播版权限，2116尊享会员权限，6057股牛牛会员 高阶权限包含低阶权限
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
      this.showRedEnvelope = !this.rulesList.some(v => v.isVip)
      this.$set(this.initFulesList, 0, this.getrulesObj('股牛牛会员'))
      this.$set(this.initFulesList, 1, this.getrulesObj('尊享会员'))
      this.$set(this.initFulesList, 2, this.getrulesObj('尊享会员实战直播版'))
      //翻转了重最后开始查找有权限的索引
      let index = this.initFulesList.reverse().findIndex(v => v.isPower)
      this.initFulesList.reverse()
      if (index === -1) return
      //因为翻转了索引为2的时候是0 股牛牛会员,为0的时候是实战直播会员
      this.currentIndex = index === 2 ? 0 : index === 1 ? 1 : 2
      //获取用户信息
      this.getUserInfo()
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
    //获取用户信息
    async getUserInfo() {
      let req = {
        uid: this.uid
      }
      let res = await getUserInfo(req)
      this.userInfo = res
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
.tabs {
  align-items: center;
  justify-content: center;
  -webkit-display: flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  background: #fff;
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 0.16rem 0.5rem 0.2rem 0.5rem;
  position: relative;
  margin-top: -0.5rem;
  z-index: 2;
  /deep/ .van-tab--active {
    font-weight: 700 !important;
  }
}
</style>
