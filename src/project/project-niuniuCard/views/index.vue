
<!-- 龙虎榜活动页面  -->
<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc head_cont u-fx-ver u-fx-ac">
        <img class="sct_img img1" src="./img/head_cont.png" alt="" />
        <div class="down_txt ">{{number}}人已购买</div>
        <div class="cont ">
          <van-swipe style="height: 2rem;" :autoplay="3000" :show-indicators="false" vertical>
            <van-swipe-item v-for="(item,index) in head_cont_swipes" :key="index">
              <div class="list u-fx u-fx-ac" v-for="(el,index) in item.swipe_item" :key="index">
                <img class="img u-mar-r10" :src="el.url" alt="">
                <div class="name">{{el.name}}</div>
                <div class="des">{{el.cont}}</div>
                <div v-if="time>=0" class="btn u-fx-ac-jc" @click="goBuy('2998','cbTuan')">我要拼团</div>
                <div v-else class="btn u-fx-ac-jc" @click="goBuy('showLock')">咨询客服</div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="down u-fx-ac-jc">
          *今日购买额外赠送1个月尊享会员
          <div class="u-fx">
            拼团活动倒计时
            <van-count-down :time="time" format=" DD 天 HH 时 mm 分 ss 秒" />
          </div>
        </div>
      </div>

      <div class="stc sct1 u-fx-ac-jc">
        <img class="sct_img" src="./img/sct1.png" alt="" />
        <div class="cont">
          <div class="btns">
            <div class="btn" @click="curSwiperIndex_sct1 = index" v-for="(item, index) in stc1Swipers" :class="curSwiperIndex_sct1 === index ? 'act' : ''" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="up">{{ item.up }}</div>
            </div>
          </div>
          <div class="swiper-cont">
            <Uswipeh5 :autoplay="4000" :indicator-color="indicatorColor" v-model="curSwiperIndex_sct1" :swipeItems='stc1Swipers'>
            </Uswipeh5>
          </div>
        </div>
      </div>

      <div class="stc sct2 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct2.png" alt="" />
        <div class="cont">
          <van-swipe style="height: 6.8rem;" :autoplay="3000" :indicator-color="indicatorColor">
            <van-swipe-item>
              <img style="width:100%" src="./img/sct2_swiper1.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
              <img style="width:100%" src="./img/sct2_swiper2.png" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="stc sct3 u-fx-ac-jc">
        <img class="sct_img" src="./img/sct3.png" alt="" />
        <div class="cont">
          <van-swipe style="height: 4.6rem;" :autoplay="3000" :indicator-color="indicatorColor">
            <van-swipe-item>
              <img style="width:100%" src="./img/sct3_swiper1.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
              <img style="width:100%" src="./img/sct3_swiper2.png" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="stc sct4 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct4.png" alt="" />

      </div>

      <div class="stc sct5 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct5.png" alt="" />
        <div class="cont " style="height:3.3rem">
          <van-swipe style="height: 3.3rem;" :autoplay="3000" :indicator-color="indicatorColor">
            <van-swipe-item>
              <img style="width:100%" src="./img/sct5_swiper1.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
              <img style="width:100%" src="./img/sct5_swiper2.png" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="stc sct6 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct6.png" alt="" />
        <div class="cont" style="height:5.8rem">
          <van-swipe style="height: 6rem;" :autoplay="3000" :indicator-color="indicatorColor">
            <van-swipe-item>
              <img style="width:100%" src="./img/sct6_swiper1.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
              <img style="width:100%" src="./img/sct6_swiper2.png" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="stc sct7 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct7.png" alt="" />
      </div>

      <div class="stc sct8 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct8.png" alt="" />
      </div>

      <div class="stc sct9 u-fx-ac-jc ">
        <img class="sct_img" src="./img/sct9.png" alt="" />
      </div>

    </div>

    <!-- <Msg ref="Msg" /> -->
    <!-- <Footer @buy="(str)=>buy(str,'cb')" :time="time" > -->
    <Footer @goBuy="goBuy" :time="time">
      <van-count-down :time="time" format="DD天HH时mm分ss秒" />
    </Footer>

    <!-- 解锁弹窗 -->
    <MaskPoupon v-model="showLock" :isClose="false">
      <img src="./img/openLock.png" style="width:5rem" alt="">
      <div class="colse_btn" @click="showLock=false"></div>
    </MaskPoupon>

    <Msg ref="msg" maskUrl='https://cdn.upchinaproduct.com/front/2022/doc-img/msg.png' />

    <MsgH5Phone top='6.5rem' />
  </div>
</template>

<script>
import Uswipeh5 from "@c/u-swipe-h5.vue";
import MaskPoupon from "@c/MaskPoupon1.vue";
import Footer from '../component/footer.vue'
import Msg from "@c/MsgH5.vue";
import MsgH5Phone from "@c/MsgH5Phone.vue";
import { appLogin, appCheckLogin } from '@u/login'
import { getUserRelationInfo, userInfoBatch } from '../api/index'
import { orderSplice } from '@u/orderSearch'
export default {
  name: 'dragonTigerList',
  components: {
    Footer, Msg, MaskPoupon, Uswipeh5, MsgH5Phone
  },
  data() {
    return {
      uid: '',
      number: 484,
      timer: null,
      isIos: this.$tools.isTerminal('ios'),
      isWx: this.$tools.isTerminal('weixin'),
      showLock: false,//解锁弹窗
      time: new Date("2022/04/11 23:59:59").getTime() - new Date().getTime(),
      indicatorColor: '#FF1500',
      curSwiperIndex_sct1: 0,
      head_cont_swipes: [
        {
          swipe_item: [
            {
              url: 'https://cdn.upchina.com/front/2022/4/project-niuniuCard/img/%E4%BD%A9%E4%BD%A9.jpg',
              name: '佩佩',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%85%89%E6%98%8E.jpg',
              name: '光明',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%87%AF.jpg',
              name: '凯',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%8F%8D%E6%8C%87%E4%B8%80%E5%8F%B7.jpg',
              name: '反指一号',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%9F%BA%E5%81%B6.jpg',
              name: '基偶',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%A4%9C%E7%A9%BA%E4%B8%AD%E7%9A%84%E6%98%9F.jpg',
              name: '夜空中的星',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%A4%AA%E9%98%B3.jpg',
              name: '太阳',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%B0%8F%E4%BC%9F.jpg',
              name: '小伟',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%B0%8F%E8%8D%89.jpg',
              name: '小草',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E5%BC%80%E5%BF%83.jpg',
              name: '开心',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E6%96%B0%E9%9F%AD%E8%8F%9C.jpg',
              name: '新韭菜',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E6%9C%88%E4%B8%8B%E8%BF%AA.jpg',
              name: '月下迪',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E7%95%99%E4%B8%80%E6%89%8B.jpg',
              name: '留一手',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E7%9F%A5%E7%A7%8B%E4%B8%80%E5%8F%B6.jpeg',
              name: '知秋一叶',
              cont: '买了一件'
            }
          ]
        },
        {
          swipe_item: [
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E7%9F%A5%E8%A1%8C%E5%90%88%E4%B8%80.jpeg',
              name: '知行合一',
              cont: '买了一件'
            },
            {
              url: 'https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/2022/4/project-niuniuCard/img/%E7%A0%96%E7%9F%B3.jpg',
              name: '砖石',
              cont: '买了一件'
            }
          ]
        }
      ],
      stc1Swipers: [
        {
          url: require('./img/sct1_swiper1.png'),
          name: "市场情绪",
        },
        {
          url: require('./img/sct1_swiper2.png'),
          name: "特色题材",
        },
        {
          url: require('./img/sct1_swiper3.png'),
          name: "红黄白K线",
        },
        {
          url: require('./img/sct1_swiper4.png'),
          name: "五星买卖点",
        },
        {
          url: require('./img/sct1_swiper5.png'),
          name: "超短盯盘",
        },
        {
          url: require('./img/sct1_swiper6.png'),
          name: "全功能一览",
        },
      ],
      ordUrl_15088: 'https://uppay.upchina.com/unifiedpay/1f27459d03766e429828184955dce4b2',
      ordUrl_2998: 'https://uppay.upchina.com/unifiedpay/00c0d0d08f096cf1f1551fdd97b862f1',
      ordUrl_2998_wx: 'https://uppay.upchina.com/unifiedpay/00c0d0d08f096cf1f1551fdd97b862f1',
      cbSuccUrl: ''
    }
  },
  async created() {
    // //有cb值的情况需要跳转到回调页
    let cbVal = this.$tools.getQueryVariable('cb')
    if (cbVal) {
      this.$router.push(`/${cbVal}`)
    }
    //微信中掉統一登录
    if (this.isWx) {
      this.uid = await this.findUserInfo()
    } else if (process.env.NODE_ENV === 'production') {
      let { uid } = await appCheckLogin()
      this.uid = uid
    } else {
      this.uid = 'csljf05'
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.number++
    }, 3000);
  },
  methods: {
    //跳统一登录
    goLogin() {
      // window.location.href = `https://clogin.test.upchina.com/new?unique_id=${new Date().getTime()}&callback=${encodeURIComponent(
      window.location.href = `https://clogin.upchina.com/new?unique_id=${new Date().getTime()}&callback=${encodeURIComponent(
        location.href
      )}`;
    },
    //获取用户信息
    findUserInfo() {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: "GET",
          // url: 'https://clogin.test.upchina.com/getUserInfo',
          url: 'https://clogin.upchina.com/getUserInfo',
          xhrFields: {
            withCredentials: true
          },
          success: (res) => {
            console.log(res)
            console.log(res);
            if (res.ret === 0) {
              let { head_url, username, nickname } = res.user
              this.head_url = head_url
              resolve(username);
            } else {
              resolve('')
            }
          }
        })
      });
    },
    goBuy(str, cb) {
      //1.倒计时结束底部2998弹在线客服
      if (str == 'showLock') return this.showLock = true
      //没有登录调登录
      if (!this.uid) {
        if (this.isWx) {
          this.goLogin()
        } else {
          appLogin()
        }
        return
      }
      //2在10588没有回调页
      //2.1在wx中正常支付
      if (str == '10588' && this.isWx) return this.$tools.orderSplice(this.ordUrl_15088, 1)
      //2.2在app中ios弹在线客服
      if (str == '10588' && this.isIos) return this.$refs.msg.isDialogue = true
      //2.3在app中不是ios
      if (str == '10588') return this.$tools.orderSplice(this.ordUrl_15088, 1)
      //3.2998
      //3.1 2998在微信中没有回调页，加ch
      if (str == '2998' && this.isWx) return this.$tools.orderSplice(this.ordUrl_2998_wx, 1)
      //3.2 在app中 我要拼团按钮回调cbTuan界面 底部按钮回调cb界面
      if (str == '2998') {
        //订单界面无法返回hash模式的路由所以只能用？标识 页面初始化的时候自己跳转
        // let cbUrl = `http://dragontiger.dev.test.upchina.com/project-niuniuCard.html?cb=${cb}`
        let cbUrl = `https://cdn.upchina.com/front/2022/4/project-niuniuCard/prod/index.html?cb=${cb}`
        this.$tools.orderSplice(this.ordUrl_2998_wx, 1, cbUrl)
      }
    },
  },
  destroyed() {
    clearInterval(this.timer)
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
    background: #9c0212 url("./img/head.png") no-repeat;
    background-size: 100%;
    color: #000000;
    .stc {
      width: 100%;
      position: relative;
      // overflow: hidden;
      padding: 0.2rem;
      .sct_img {
        width: 100%;
      }
      .cont {
        position: absolute;
        bottom: 0;
        width: 6.49rem;
        left: 0.5rem;
        bottom: 0.5rem;
        /deep/ .van-swipe__indicator {
          background: #aaaaaa;
        }
      }
    }
    .head_cont {
      position: relative;
      padding: 0px;
      width: 100%;

      .img1 {
        margin-top: 6.2rem;
      }
      .cont {
        font-weight: Bold;
        width: 6.49rem;
        height: 2rem;
        position: absolute;
        left: 0.5rem;
        bottom: 0.5rem;
        .list {
          width: 100%;
          height: 0.8rem;
          margin-top: 0.1rem;
          margin-bottom: 0.2rem;
          .img {
            width: 0.59rem;
            height: 0.59rem;
            border-radius: 50%;
            border: 0.005rem solid #ff0000;
            margin-right: 0.2rem;
          }
          .name {
            margin-left: 0.2rem;
            width: 1.5rem;
          }
          .des {
            margin-right: 1rem;
          }
          .btn {
            font-family: OPPOSans;
            font-weight: Bold;
            font-size: 0.3rem;
            color: #fff;
            width: 1.8rem;
            height: 0.7rem;
            border-radius: 0.35rem 0.35rem 0.35rem 0.35rem;
            background: linear-gradient(to bottom, #ff7709 0%, #f01124 100%);
          }
        }
      }
      .down_txt {
        position: absolute;
        left: 0.5rem;
        bottom: 2.6rem;
        color: #666e7a;
        font-family: OPPOSans;
        font-size: 0.24rem;
      }
      .down {
        color: #fff;
        position: absolute;
        width: 6rem;
        left: 0.5rem;
        bottom: -0.6rem;
        font-size: 0.28rem;
        /deep/ .van-count-down {
          color: #fff;
          font-size: 0.24rem;
        }
      }
    }

    .sct1 {
      position: relative;
      margin-top: 0.5rem;
      .cont {
        height: 5.2rem;
        width: 6.5rem;
        left: 0.45rem;
        .btns {
          position: absolute;
          width: 6.8rem;
          height: 0.83rem;
          top: 0.05rem;
          left: 50%;
          transform: translate(-50%, 0);
          display: flex;
          justify-content: space-around;
          .btn {
            width: 0.948rem;
            height: 0.74rem;
            border: 1px solid #ce0823;
            border-radius: 0.1rem;
            display: flex;
            flex-flow: column;
            justify-content: center;
            font-size: 0.24rem;
            color: #ff2222;
            padding-left: 0.025rem;
            text-align: center;
            &.act {
              background: #ce0823;
              color: #fff;
            }
          }
        }
        .swiper-cont {
          position: absolute;
          width: 6.6rem;
          height: 4.1rem;
          left: 50%;
          bottom: 0rem;
          transform: translate(-50%, 0);
          /deep/ .van-swipe__indicator {
            background: #aaaaaa;
          }
        }
      }
    }
    .sct2 {
      .cont {
        position: absolute;
        bottom: 0;
        width: 6.49rem;
        height: 6.5rem;
        left: 0.5rem;
        bottom: 0.5rem;
      }
    }
    .sct3 {
      .cont {
        background: ;
        position: absolute;
        bottom: 0;
        width: 6.49rem;
        height: 4.5rem;
        left: 0.5rem;
        bottom: 0.5rem;
      }
    }
    .sct9 {
      padding: 0;
      padding-bottom: 30px;
    }
  }
  .colse_btn {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    right: 1.3rem;
    top: 3.7rem;
  }
}
</style>
