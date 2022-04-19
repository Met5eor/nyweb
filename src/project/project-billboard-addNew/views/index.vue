
<!-- 龙虎榜活动页面  -->
<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <img class="rule" src="./img/rule.png" @click="showRule=true" alt="">
      <div class="stc sct1 u-fx-ver u-fx-ac">
        <img class="sct_img img1" src="./img/img1.png" alt="" />
        <div class="progressBar ">
          <div class="startIcon">
            <span class="startIcon_txt">已邀请{{userList.length}}人</span>
          </div>
          <div class="fff-bg">
            <!-- :class="index" -->

            <div class='icon u-fx-ac-jc' :class="index===flex_all-1?'icon_bg':''" :style='getLeft(index+1)' v-for="(item,index) in flex_all" :key="index">

              <!-- 奇数的时候有头像 -->
              <div v-if="index % 2 != 0">
                <!-- 天文字 -->
                <div v-if="index===flex_all-1" class="card_txt u-fx-ac-jc">
                  <div>{{getDay(index)}}</div>
                  <div>礼品卡</div>
                </div>
                <div v-else>{{getDay(index)}}</div>

                <!-- 头像一 -->
                <img class="head_url card img1" v-if="userList[index-1]" :src="userList[index-1].head_url||noAvatar" alt="">
                <img class="head_url card img1" v-else :src="noAvatar" alt="">

                <!-- 头像二 -->
                <img class="head_url card img2" v-if="userList[index]" :src="userList[index].head_url||noAvatar" alt="">
                <img class="head_url card img2" v-else :src="noAvatar" alt="">
              </div>

            </div>
            <!-- 黄色进度条 -->
            <div class="yellow-bg" :style='{width:`${flex*(6.58/flex_all)}rem`}'>
            </div>
          </div>
        </div>
        <div class="buy_btn u-fx-ac-jc" data-track="龙虎榜-分享给好友" @click="addCard">{{isClickBtn?'分享给好友':'领取礼品卡'}}</div>
      </div>

      <div class="stc sct2 u-fx-ac-jc">
        <img class="sct_img" src="./img/img2.png" alt="" />
      </div>

      <div class="stc sct3 u-fx-ac-jc ">
        <img class="sct_img" src="./img/img3.png" alt="" />
      </div>

      <div class="stc sct4 u-fx-ac-jc ">
        <img class="sct_img" src="./img/img4.png" alt="" />
      </div>

    </div>

    <!-- <Msg ref="Msg" /> -->
    <Footer @addCard='addCard' />

    <!-- 规则弹窗 -->
    <MaskPoupon v-model="showRule">
      <div class="pop popod ">
        <div class="pop_close" @click="showRule = false"></div>
      </div>
    </MaskPoupon>
  </div>
</template>

<script>
import MaskPoupon from "@c/MaskPoupon.vue";
import Footer from '../component/footer.vue'
import Msg from "@c/MsgH5Url.vue";
import { appLogin, appCheckLogin } from '@u/login'
import { getUserRelationInfo, userInfoBatch } from '../api/index'
export default {
  name: 'dragonTigerList',
  components: {
    Footer, Msg, MaskPoupon
  },
  data() {
    return {
      showRule: false,
      isClickBtn: false,
      uid: '',
      upshare: {},
      sussPeople: 5,
      percentageOne: 6,
      btn_txt: '领取礼品卡',
      business: "gnn_700000051",
      flex_all: 2,
      flex: 0,
      noAvatar: require('./img/noAvatar.png'),
      NODE_ENV: process.env.NODE_ENV, //打包环境
      proxy_url: proxy_url,//代理接口环境
      userList: [
        // {
        //   uid: '',
        //   head_url: 'https://cdn.upchina.com/front/2022/rules.png'
        // },
      ]
    }
  },
  async created() {
    console.log(this.proxy_url, 'this.proxy_ur')
    if (process.env.NODE_ENV === 'production') {
      let { uid } = await appCheckLogin()
      this.uid = uid
    } else {
      // this.uid = 'up2618255'
      this.uid = 'csljf05'
    }
    this.isClickBtn = localStorage.getItem('IsClickBtn') || false
    this.getUserRelationInfo()
  },
  methods: {
    getLeft(index) {
      let obj = {
        left: `0rem`
      }
      if (index % 2 == 0) {
        //礼品卡
        // 6.58总长度,0.6礼品卡宽度的3分之二
        obj.left = `${(index * (6.58 / this.flex_all)) - 0.78}rem`
      } else {
        //圆点
        obj.left = `${(index * (6.58 / this.flex_all)) - 0.3}rem`
      }
      return obj
    },
    getDay(index) {
      if (index == 1) {
        return '30天'
      } else if (index == 3) {
        return '60天'
      } else if (index == 5) {
        return '90天'
      }
    },
    addCard() {
      if (!this.uid) return appLogin()
      this.setIsClickBtn()
      this.share()

    },
    setIsClickBtn() {
      // this.isClickBtn = true
      localStorage.setItem('IsClickBtn', true)
    },
    //获取用户拉新的信息
    async getUserRelationInfo() {
      let params = {
        uid: this.uid,
        loginP:'teach_app'
      }
      this.userList = await getUserRelationInfo(params)
      //获取批量用户的头像
      if (!this.userList.length) return console.log('头像为空')
      let ids = this.userList.map(v => v.user)
      if (ids.length) {
        this.userList = await userInfoBatch({ ids })
      }
      this.setFlex_all()
    },
    //设置分母 分子
    setFlex_all() {
      let userNuber = this.userList.length
      switch (userNuber) {
        case 0:
          this.flex_all = 2
          this.flex = 0
          break;
        case 1:
          this.flex_all = 2
          this.flex = 1
          break;
        case 2:
          this.flex_all = 4
          this.flex = 2
          break;
        case 3:
          this.flex_all = 4
          this.flex = 3
          break;
        case 4:
          this.flex_all = 6
          this.flex = 4
          break;
        case 5:
          this.flex_all = 6
          this.flex = 5
          break;
        case 6:
          this.flex_all = 6
          this.flex = 6
          break;
        default:
          this.flex_all = 6
          this.flex = 6
          break;
      }
    },
    share() {
      let linkurl = ''
      if(process.env.NODE_ENV==='development'){
        //本地
        linkurl = `http://dragontiger.dev.test.upchina.com/project-billboard-addNew.html#/wx?business=${this.business}`
      }else{
        // 生产 
        linkurl = this.proxy_url === 'test' ?`https://cdn.upchina.com/front/2022/3/project-billboard-addNew/test/index.html#/wx?business=${this.business}`: 
        `https://cdn.upchina.com/front/2022/3/project-billboard-addNew/prod/index.html#/wx?business=${this.business}`
      }
      let params = {
        gift: true, //是否显示分享得会员的icon
        gifttext:
          '<span><img src="{giftIcon}" alt=""></span>邀好友立得【机构龙虎榜】功能内测礼品卡', //邀请奖励文案
        giftemptytext:
          '<span><img src="{giftIcon}" alt=""></span>邀好友立得【机构龙虎榜】功能内测礼品卡', //未邀请用户时奖励文案
        giftcoefficient: 3, //系数
        desc: "点击下方按钮分享到微信或朋友圈，每邀请2位好友（限新用户）下载登录股牛牛APP，您与好友都可免费获得1个月【机构龙虎榜】内测特权",
        rewardtext: "多邀多得，您最多可邀请6位好友，获得3个月内测特权！特权可通过“个人中心”查看。",
        title: "好友给你分享一张【机构龙虎榜】礼品卡，数量有限先到先得！", //标题
        summary:
          "实时监控大单资金动态，带你跟着机构挖掘潜在牛股~", //描述
        method: "Share.link", // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
        // linkurl: `http://dragontiger.dev.test.upchina.com/project-billboard-addNew.html#/wx?business=${this.business}`, //跳转链接 
        linkurl: linkurl,
        imageurl: "", //图片地址
        authorname: "upchaoyuqi", // 分享内容的作者（文章）
        authornickname: "upchaoyuqi", // 分享内容的作者（文章）
        business: this.business, // 分享业务编号
        id: "2c979422-3304-42d8-98b8-718d36c1e8e9", //必选，业务下要分享内容的唯一标识，例如：观点id
        source: 23500, //渠道号,这个渠道号为被邀请新用户的注册渠道
        // env: "test", // test | product
        env: this.proxy_url === 'test' ? 'test' : "product", // test | product
        plats: ["wechat", "circle"], //显示哪些分享方式
        isStopBodyScroll: false, //是否禁止遮罩滚动
        isCanAnonymousShare: true,
        callback: (code, parms) => {
          this.succeFun(code, parms);
          //分享回调,parms.ret==0时分享成功
        },
      }
      this.upshare = new shareApi.initSharePlugin(params);
      this.upshare.show();
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  .main {
    width: 100%;
    background: #6e0d08 url("./img/head_03.png") no-repeat;
    background-size: 100%;
    .rule {
      position: absolute;
      width: 1.5rem;
      right: 0;
      top: 0.2rem;
      z-index: 10000;
    }
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
        margin-top: 5.2rem;
      }
      .progressBar {
        position: absolute;
        bottom: 2rem;
        left: 0.44rem;
        width: 6.58rem;
        height: 0.7rem;
        .startIcon {
          position: absolute;
          top: -5px;
          left: 0;
          width: 0.26rem;
          height: 0.26rem;
          background: rgba(255, 212, 68, 1);
          border-radius: 50%;
          .startIcon_txt {
            position: absolute;
            bottom: -0.8rem;
            left: 0;
            width: 0.2rem;
            color: #ffd444;
            font-size: 0.24rem;
            width: 0.72rem;
          }
        }
        .icon {
          position: absolute;
          font-family: Source Han Sans CN;
          top: -6px;
          font-size: 0.12rem;
          color: #e02941;
          font-weight: 700;
          &:nth-of-type(odd) {
            // width: 0.26rem;
            // height: 0.26rem;
            // background: transparent;
            // background: rgba(255, 212, 68, 1);
            // border-radius: 50%;
            .head_url {
              position: absolute;
              bottom: -0.66rem;
              left: 1.4rem;
              width: 0.41rem;
              height: 0.41rem;
              border-radius: 50%;
            }
          }
          &:nth-of-type(even) {
            top: -9px;
            width: 0.78rem;
            height: 0.4rem;
            border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
            background: rgba(255, 212, 68, 1);
            &.icon_bg {
              top: -13px;
              width: 1rem;
              height: 0.62rem;
              background: transparent;
              background: url("./img/icon.png") no-repeat;
              background-size: 100%;
              .card_txt {
                width: 0.8rem;
                height: 0.53rem;
                line-height: 0.23rem;
                // text-align: center;
              }
            }
            .head_url {
              position: absolute;
              bottom: -0.5rem;
              left: 0.35rem;
              width: 0.41rem;
              height: 0.41rem;
              border-radius: 50%;
              &.img2 {
                left: 0.1rem;
              }
            }
          }
        }
        .fff-bg {
          width: 100%;
          background-color: #fff;
          height: 0.054rem;
          border-radius: 2.70985px 2.70985px 2.70985px 2.70985px;
          .yellow-bg {
            background-color: #ffd444;
            height: 0.064rem;
          }
        }
      }
      .buy_btn {
        color: #e02941;
        font-weight: Bold;
        width: 3.2rem;
        height: 1rem;
        position: absolute;
        right: 2.2rem;
        bottom: 0.7rem;
        font-size: 0.36rem;
      }
    }
    .sct4 {
      padding-bottom: 30px;
    }
  }
}
.pop {
  width: 7.3rem;
  height: 10.5rem;
  background: url(./img/ruleMask.png) no-repeat;
  background-size: 100%;
  position: relative;
  .pop_close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    right: 0.4rem;
    top: 0.1rem;
    // background: url(./img/wx/btn_close_new.png) no-repeat;
    background-size: 100%;
  }
}
</style>
