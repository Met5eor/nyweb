<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc sct1 u-fx-ver u-fx-ac">
        <img
          class="sct_img img1"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/img1.png"
          alt=""
        />
        <div class="btn" @click="buy998"></div>
      </div>

      <div class="stc sct2 u-fx-ac-jc">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/img2.png"
          alt=""
        />
        <div class="card-box">
          <Cardchage>
            <div
              class="swiper-slide u-fx-ac-jc card"
              v-for="(item, index) in cards"
              :key="index"
            >
              <div class="img_box">
                <img
                  class="img"
                  v-if="item.receive"
                  src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/card_suc.png"
                />
                <img
                  class="img"
                  v-else
                  src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/card.png"
                  alt=""
                />
                <div class="number">卡{{ index + 1 }}</div>
                <div
                  v-if="!item.receive"
                  class="btn"
                  @click="share(item.business)"
                ></div>
              </div>
            </div>
          </Cardchage>
        </div>
      </div>

      <div class="stc sct3 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/img3.png"
          alt=""
        />
      </div>

      <div class="stc sct4 u-fx-ac-jc bg">
        <img
          class="sct_img"
          src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/img4.png"
          alt=""
        />
      </div>

      <div class="coupon" ref="coupon" v-if="isCoupon">
        <div class="use" @click="mask = true"></div>
        <div class="close pop_close" @click="isCoupon = false"></div>
      </div>

      <MaskPoupon v-model="mask">
        <div class="pop popod">
          <img
            class="pop_img"
            src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/mask.png"
            alt=""
          />
          <div class="pop_close" @click="mask = false"></div>
          <div class="buy_btn" @click="buy998"></div>
        </div>
      </MaskPoupon>
    </div>
  </div>
</template>

<script>
import { appCheckLogin } from "@u/login";
import MaskPoupon from "@c/MaskPoupon.vue";
import Cardchage from "@c/cardchage";
import { checkFollow } from "../../../network/wxh5.js";
import "@ass/js/rem.js";
export default {
  name: "inviteFriends",
  components: {
    MaskPoupon,
    Cardchage,
  },
  data() {
    return {
      mask: false,
      cards: [
        {
          business: "gnn_lpkszxhy",
          receive: false,
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/card_suc.png",
        },
        {
          business: "gnn_lpkszxhya",
          receive: false,
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/card_suc.png",
        },
        {
          business: "gnn_lpkszxhyb",
          receive: false,
          img: "https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/card_suc.png",
        },
      ],
      buy998Url:
        "https://uppay.upchina.com/unifiedpay/42210120ef1c938c7ed7e89154511fe8",
      // buy998Url:
      //   "https://uppay.test.upchina.com/unifiedpay/79eafc2ecb322b7c928a2e9db1c83803?t=0",
      isCoupon: true,
      upshare: {},
    };
  },
  async created() {
    let { uid } = await appCheckLogin(uid);
    this.uid = uid;
    // this.uid = "{{uid}}";
    //是否领取过会员
    this.getUserShareSuc(this.uid);
  },
  mounted() {
    this.moveCounpon();
  },
  methods: {
    buy998() {
      let isParmas = this.$tools.getChUrl(this.buy998Url).includes("?");
      window.open(this.$tools.getChUrl(this.buy998Url));
    },
    //移动红包的方法
    moveCounpon() {
      let dom = this.$refs.coupon;
      this.$tools.moveDom(dom);
    },
    //获取用户是否领取过
    async getUserShareSuc(uid, businessId, index) {
      let req = {
        username: uid,
      };
      try {
        let res = await checkFollow(req);
        let { ret, isFollow = false, busData = [] } = res.data;
        if (ret !== 0) return;
        this.cards[0].receive = busData[this.cards[0].business];
        this.cards[1].receive = busData[this.cards[1].business];
        this.cards[2].receive = busData[this.cards[2].business];
        // this.cards[index].receive = isFollow;
      } catch (error) {
        console.log("error", error);
      }
      // return new Promise((resolve, reject) => {
      //   fetch(
      //     `http://upcenter.test.upchina.com/check/userShareSuc?username=${uid}&business=${businessId}`
      //     // `https://a.upchina.com/vipcenter/check/userShareSuc?username=${uid}&business=${businessId}`
      //   )
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       // data就是我们请求的repos
      //       if (!data) return;
      //       let { ret, isFollow = false } = data;
      //       if (ret !== 0) return;
      //       resolve(isFollow);
      //     })
      //     .catch((error) => reject(error));
      // });
    },
    share(business) {
      this.upshare = new shareApi.initSharePlugin({
        gift: false, //是否显示分享得会员的icon
        gifttext:
          '<span><img src="{giftIcon}" alt=""></span>您已邀请 <span class="invite_num">{inviteNum}</span> 位用户，获得 <span class="invite_num">{giveNum}</span> 个月免费权限', //邀请奖励文案
        giftemptytext:
          '<span><img src="{giftIcon}" alt=""></span>您已邀请 <span class="invite_num">{inviteNum}</span> 位用户', //未邀请用户时奖励文案
        giftcoefficient: 1, //系数
        desc: "",
        rewardtext: "",
        title: "送您一个热点挖掘神器，3秒定位行业龙头！", //标题
        summary:
          "可免费领取1个月【特色题材】功能，精选热点题材，产业链上下游全梳理，3秒定位行业龙头", //描述
        method: "Share.link", // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
        linkurl: `https://cdn.upchina.com/front/20211209shareVip/production/index.html#/wxVipShare?business=${business}`, //跳转链接 收费：4652  音频：5236  多文字：5271
        // linkurl: `http://192.168.8.212:8080/#/wxVipShare?business=${business}`, //跳转链接 收费：4652  音频：5236  多文字：5271
        imageurl: "", //图片地址
        authorname: "upchaoyuqi", // 分享内容的作者（文章）
        authornickname: "upchaoyuqi", // 分享内容的作者（文章）
        business: business, // 分享业务编号
        id: "2c979422-3304-42d8-98b8-718d36c1e8e9", //必选，业务下要分享内容的唯一标识，例如：观点id
        source: 23500, //渠道号,这个渠道号为被邀请新用户的注册渠道
        // env: "test", // test | product
        env: "product", // test | product
        plats: ["wechat", "circle"], //显示哪些分享方式
        isStopBodyScroll: false, //是否禁止遮罩滚动
        isCanAnonymousShare: true,
        callback: (code, parms) => {
          this.succeFun(code, parms);
          //分享回调,parms.ret==0时分享成功
        },
      });
      this.upshare.show();
    },
    //分享成功的回调
    succeFun(code, parms) {
      console.log("code", code);
      console.log("parms", parms);
    },
    //使用优惠劵
    use() {
      window.open(
        "https://uppay.upchina.com/unifiedpay/7bf5c53a49a5fd9996f966f0528e785a?t=0"
      );
    },
  },
};
</script>
<style lang="less" scoped>
.cardChage {
  position: relative;
  .btn {
    position: absolute;
    bottom: 0.22rem;
    right: 0.84rem;
    width: 1.44rem;
    height: 0.56rem;
  }
}
.green {
  border: 1px solid green;
}
.bg {
  background-color: #ed392a;
}
.page_wrap {
  margin: 0 auto;
  position: relative;
  font-size: 0.28rem;
  .main {
    width: 100%;
    background: #ed392a
      url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/head_bg.png")
      no-repeat;
    background-size: 100% auto;
    height: 16.2rem;
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
      padding-top: 4.8rem;
      .img1 {
        padding: 0 0.2rem;
      }
      .btn {
        position: absolute;
        right: 0.64rem;
        bottom: 0.42rem;
        width: 1.9rem;
        height: 0.6rem;
      }
    }
    .sct2 {
      padding: 0.2rem;
      padding-bottom: 0;
      position: relative;
      .card-box {
        position: absolute;
        bottom: 0rem;
        width: 6.71rem;
        height: 3.4rem;
        .card {
          width: 100%;
          .img_box {
            position: relative;
            .btn {
              width: 1.37rem;
              height: 0.61rem;
              position: absolute;
              bottom: -0.1rem;
              right: 0.8rem;
            }
            .number {
              position: absolute;
              top: 0.08rem;
              left: 50%;
              transform: translate(-100%, -0.22rem);
              background: linear-gradient(90deg, #be8958 0%, #e9b891 100%);
              width: 0.78rem;
              height: 0.38rem;
              background: #fff;
              border-radius: 0px 0px 0.1rem 0.1rem;
              font-size: 0.24rem;
              font-weight: 400;
              color: #dfad82;
            }
          }
          .btn {
            width: 1.27rem;
            height: 0.61rem;
            position: absolute;
            bottom: 0.15rem;
            right: 0.2rem;
          }
          img {
            width: 90%;
          }
        }
      }
    }
    .sct3,
    .sct4 {
      padding: 0.2rem;
    }
  }
}

.coupon {
  position: fixed;
  z-index: 10;
  right: 0.1rem;
  top: 60%;
  width: 1.87rem;
  height: 2rem;
  border-radius: 0.1rem;
  background: url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/coupon.png")
    no-repeat;
  background-size: 100% auto;
  .use {
    position: absolute;
    bottom: 0.08rem;
    width: 80%;
    height: 90%;
    left: 0.2rem;
  }
  .close {
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    right: 0;
    top: 0.06rem;
    right: 0.06rem;
  }
}

.popod {
  //  background: rgba(0, 0, 0, 0.7);
  width: 5.2rem;
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  .pop_img {
    width: 100%;
    height: 100%;
  }
  .buy_btn {
    position: absolute;
    bottom: 0.61rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 3.25rem;
    height: 0.82rem;
  }
}
.pop_close {
  background: url(https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/gptxrflh5/images/close_icon.png)
    no-repeat;
  background-size: 100%;
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.18rem;
  right: 0.15rem;
}
</style>
