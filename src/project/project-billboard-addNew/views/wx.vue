<template>
  <div>
    <div v-if="isWx === false">请在微信中打开！</div>
    <div v-if="isWx" class="page_wrap" ref="page_wrap">
      <div class="main">
        <div class="stc sct1 u-fx-ver u-fx-ac ">
          <img class="sct_img img1" src="./img/wx/img1.png" alt="" />
          <div class="text-box u-fx u-fx-ac">
            <img class="user" :src="shareUser.head_url||avatar" alt="">
            <div class="txt u-mar-l20">您的好友 <span class="name">{{shareUpName}}</span> 送您1张【龙虎榜上榜】内测礼品卡，
              领取立享30天两大投资实战工具~ </div>
          </div>
        </div>
        <div class="stc sct2 u-fx-ac-jc ">
          <img class="sct_img img1" v-if="!isReceive"   src="./img/wx/img2.png" alt="" />
          <img class="sct_img img1" v-else src="./img/wx/img2_suss.png" alt="" />
          <!-- <div class="succ_text" v-if="isReceive">
            *注：请使用领取权限的微信账号登录（upid：{{ upName }}）
          </div> -->
          <div v-if="!isReceive" class="succ_btn" data-track="龙虎榜-被分享人-领取礼品卡"  @click="getCard"></div>
          <div v-else class="succ_btn" data-track="龙虎榜-被分享人-打开下载app"  @click="download"></div>
        </div>

        <div class="stc illustrate u-fx-ac-jc " v-if="isReceive">
          <img class="sct_img" src="./img/wx/illustrate.png" alt="" />
        </div>

        <div class="stc sct3 u-fx-ac-jc ">
          <img class="sct_img" src="./img/img2.png" alt="" />
        </div>

         <div class="stc sct4 u-fx-ac-jc ">
          <img class="sct_img" src="./img/img3.png" alt="" />
        </div>

         <div class="stc sct5 u-fx-ac-jc ">
          <img class="sct_img" src="./img/img4.png" alt="" />
        </div>
        <Footer @addCard='getCard' :isReceive="isReceive" />
      </div>
    </div>
    <!-- 老用户弹窗 -->
    <MaskPoupon v-model="showMask">
      <div class="pop popod ">
        <div class="pop_close" @click="showMask = false"></div>
        <div class="btn " data-tranck="龙虎榜-被邀请人-打开下载app" @click="download"></div>
      </div>
    </MaskPoupon>
  </div>
</template>

<script>
import Ruls from "@c/Ruls.vue";
import MaskPoupon from "@c/MaskPoupon.vue";
import Footer from '../component/footerWx.vue'
import tools from "@u/tools.js";
import { Tabs, Toast } from "vant";
import { userInfoBatch, checkFollow } from '../api/vipcenter'
const iosStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715325577";
const androidStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715261800&ch=2000000842";
export default {
  components: { Footer, MaskPoupon, Ruls },
  data() {
    return {
      isWx: null,
      shareUser: {
        uid: ''
      },
      isIos: false, // 是否是ios
      downloadUrl: tools.isTerminal("ios") ? iosStore : androidStore, // app下载地址
      isNewUser: false, //是否是新用户
      isOldUser: false,
      isReceive: false, // 是否领取
      showMask:false,
      shareUpName: '', //分享者
      upName: "",
      avatar: 'https://cdn.upchina.com/front/gnnvipcenterh5/images/pic_tourist.png'
    };
  },

  async created() {
    this.isWx = true;
    if (!this.isWx) {
      return;
    }
    //1.拿分享者跟被分享者信息 3,判断是否是老用户 retrun 4.新用户判断否领取过
    let query = window.location.href.split("?")[1];
    this.business = this.$tools.getQueryVariable("business", query);
    let { shareUpName = "", upName = "" } = await this.initshareInfo();
    this.upName = upName;
    this.shareUpName = shareUpName

    // 2.去本地判断是否领取过
    // this.getIsReceive()

    //  3,判断是否是新用户 是否领取过
    this._checkFollow()

    // //获取被分享人头像
    //  this.userInfoBatch(this.shareUpName)
  },
  async mounted() {

  },
  methods: {

    //判断本地是否领取过
    getIsReceive() {
      let obj = JSON.parse(localStorage.getItem('shareDragonTiger'))
      if (!obj) return
      if (this.upName = obj.uid) {
        this.isReceive = obj.isReceive
      }
    },

    initshareInfo() {
      return new Promise((resolve, reject) => {
        shareApi.getShareInfo({
          callback: (data) => {
            console.log(data,'data')
            if (data.ret !== 0) return Toast(data.message);
            resolve(data.data)
          },
        });
      })
    },
    //获取用户形象 包括头像
    async userInfoBatch(id) {
      if (!id) return
      let ids = [id]
      let res = await userInfoBatch({ ids })
      this.shareUser = res[0]
    },
    // 检查当前用户是否领取
    async _checkFollow(username, inviteUser, business) {
      if(!this.shareUpName) return  Toast('分享者shareUpName不能为空')
      if(!this.upName) return  Toast('upName不能为空')
      let req = {
        business: this.business,
        username: this.shareUpName,
        inviteUser: this.upName,
        loginP:'teach_app'
      };
      let res = await checkFollow(req).catch(err => console.log(err));
      let { isFollow = false, message, isNewUser } = res;
      // 1判断是否是为老用户
      this.isOldUser = !isNewUser; // 判断是否是新用户
      if (this.isOldUser) return this.showMask = this.isOldUser
      //2判断是否领取过了
      this.isReceive = isFollow; // 是否领取
      console.log(`${this.isNewUser}新用户,${isFollow}已经领取`);
    },
    download() {
      window.open(this.downloadUrl);
    },
    addCard() { },
    // 领取
    async getCard() {
      if(this.isReceive) return this.download()
      if (this.isOldUser) {
        Toast("该活动仅新用户可领取！");
        return;
      }
      // 缓存点击状态
      let obj = {
        uid: this.upName,
        isReceive: true
      }
      this.isReceive = true;
      Toast("领取成功");
      window.localStorage.setItem("shareDragonTiger", JSON.stringify(obj));
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
    background: #6e0d08;
    background-size: 100%;
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
        margin-top: 0.2rem;
      }
      .text-box {
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        height: 1rem;
        width: 7.1rem;
        padding: 0 0.2rem;
        .user {
          width: 0.52rem;
          height: 0.52rem;
          background: rgba(229, 229, 229, 1);
          border-radius: 50%;
        }
        .txt {
          width: 6rem;
          font-size: 0.26rem;
          color: #000;
          line-height: 0.35rem;
          .name {
            color: #d70616;
          }
        }
      }
    }
    .sct2 {
      .succ_btn {
        position: absolute;
        left: 50%;
        bottom: 0.8rem;
        transform: translate(-50%, 0);
        width: 5rem;
        height: 1rem;
      }
    }
    .sct5{
      padding-bottom: 0.5rem;
    }
  }
}
.pop {
  width: 6.3rem;
  height: 6.5rem;
  background: url(./img/wx/oldMask.png) no-repeat;
  background-size: 100%;
  position: relative;
  .pop_close {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    right: -3px;
    top: -30px;
    background: url(./img/wx/btn_close_new.png) no-repeat;
    background-size: 100%;
  }
  .btn {
    position: absolute;
    width: 4.8rem;
    height: 0.8rem;
    bottom: 0.55rem;
    left: 0.8rem;
  }
}
</style>
