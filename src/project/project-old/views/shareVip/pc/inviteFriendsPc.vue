<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="main">
      <div class="stc sct1 u-fx-ver u-fx-ac">
        <img class="sct_img img1" src="../img/pc/inviteF_img1.png" alt="" />
        <div class="buy_btn cursor" @click="buy998"></div>
      </div>
      <div class="stc sct2 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/inviteF_img2.png" alt="" />
        <div class="card-box">
          <Swiper3d :stretch="181">
            <div
              class="swiper-slide u-fx-ac-jc card"
              v-for="(item, index) in cards"
              :key="item.business"
            >
              <img
                class="img"
                v-if="item.receive"
                src="../img/card_suc.png"
                alt=""
              />

              <div v-else class="img_box">
                <img class="img" src="../img/card.png" alt="" />
                <div class="number">卡{{ index + 1 }}</div>
                <div class="btn cursor" @click.stop="mask_text = true"></div>
              </div>
            </div>
          </Swiper3d>
        </div>
      </div>

      <div class="stc sct3 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/inviteF_img3.png" alt="" />
      </div>

      <div class="stc sct4 u-fx-ac-jc">
        <img class="sct_img" src="../img/pc/inviteF_img4.png" alt="" />
      </div>

      <div class="coupon" ref="coupon" v-if="isCoupon">
        <div class="btn" @click="mask = true"></div>
      </div>
    </div>
    <MaskPoupon v-model="mask">
      <div class="pop popod">
        <img class="pop_img" src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/mask.png" alt="" />
        <div class="btn_close cursor" @click="mask = false"></div>
        <div class="buy_btn cursor" @click="buy998"></div>
      </div>
    </MaskPoupon>

    <MaskPoupon v-model="mask_text">
      <div class="pop popod test">
        <img class="pop_img" src="../img/pc/mask_text.png" alt="" />
        <div class="btn_close cursor" @click="mask_text = false"></div>
        <div class="buy_btn cursor" @click="mask_text = false"></div>
      </div>
    </MaskPoupon>
  </div>
</template>

<script>
import { pcCheckLogin } from "@u/login";
import MaskPoupon from "@c/MaskPoupon.vue";
import { checkFollow } from "../../../network/wxh5.js";
import Swiper3d from "@c/Swiper3d.vue";
import "@ass/js/remPc.js";
export default {
  name: "inviteFriendsPc",
  components: {
    MaskPoupon,
    Swiper3d,
  },
  data() {
    return {
      mask: false,
      cards: [
        {
          business: "gnn_lpkszxhy",
          receive: false,
        },
        {
          business: "gnn_lpkszxhya",
          receive: false,
        },
        {
          business: "gnn_lpkszxhyb",
          receive: false,
        },
      ],
      buy998Url:
        "https://uppay.upchina.com/unifiedpay/42210120ef1c938c7ed7e89154511fe8",
      isCoupon: true,
      mask_text: false,
    };
  },
  async created() {
    await this.$tools.loadJsSdk(
      "https://cdn.upchina.com/activitypage/plugin/webNativeCommunicate.pc.min.js"
    );
    let { uid } = await pcCheckLogin();
    this.uid = uid;
    //是否领取过会员
    this.getUserShareSuc(this.uid);
  },
  mounted() {
    this.moveCounpon();
  },
  methods: {
    //移动红包的方法
    moveCounpon() {
      let dom = this.$refs.coupon;
      this.$tools.moveDom(dom);
    },
    //获取用户是否领取过
    async getUserShareSuc(uid, businessId) {
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
      } catch (error) {
        console.log("error", error);
      }
    },
    buy998() {
      let isParmas = this.$tools.getChUrl(this.buy998Url).includes("?");
      window.open(
        `${this.$tools.getChUrl(this.buy998Url)}${isParmas ? "&" : "?"}`
      );
    },
  },
};
</script>
<style lang="less" scoped>
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
    background: #f42210 url("../img/pc/inviteF_head_bg.png") no-repeat;
    background-size: 100% auto;
    .stc {
      width: 100%;
      position: relative;
      overflow: hidden;
      .sct_img {
        width: 11.41rem;
      }
    }
    .sct1 {
      position: relative;
      padding: 0px;
      width: 100%;
      padding-top: 3.6rem;
      .buy_btn {
        width: 2.32rem;
        height: 0.8rem;
        position: absolute;
        right: 50%;
        transform: translate(224%, 0);
        bottom: 0.53rem;
      }
    }
    .sct2 {
      padding: 0.2rem;
      padding-bottom: 0;
      position: relative;
      .card-box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0.5rem;
        width: 10.75rem;
        height: 3.6rem;
        .card {
          width: 100%;
          .img_box {
            position: relative;
            .btn {
              width: 1.57rem;
              height: 0.61rem;
              position: absolute;
              bottom: 0.25rem;
              right: 0.2rem;
            }
            .number {
              position: absolute;
              top: 0.09rem;
              left: 50%;
              transform: translate(-50%, 0);
              width: 0.68rem;
              height: 0.28rem;
              background: #fff;
              border-radius: 0px 0px 10px 10px;
              font-size: 0.24rem;
              font-weight: 400;
              color: #dfad82;
            }
          }
          img {
            // width: 80%;
          }
        }
      }
    }
    .sct3 {
      padding: 0.2rem;
    }
    .sct4 {
      padding-bottom: 0.5rem;
    }
  }
}

.coupon {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(6rem, 0);
  width: 1.87rem;
  height: 2.4rem;
  border-radius: 0.1rem;
  background: url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/inviteFriendImg/coupon.png") no-repeat;
  background-size: 100% auto;
  z-index: 100000;
  .btn {
    position: absolute;
    width: 1.77rem;
    height: 1.86rem;
    bottom: 0.53rem;
    right: 0.05rem;
  }
}

.popod {
  //  background: rgba(0, 0, 0, 0.7);
  width: 6rem;
  height: 7.6rem;
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  .pop_img {
    width: 100%;
    height: 100%;
  }
  .btn_close {
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    top: 0.18rem;
    right: 0.15rem;
  }
  .buy_btn {
    position: absolute;
    bottom: 0.71rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 3.65rem;
    height: 0.92rem;
  }
  &.test {
    height: 4rem;
    .pop_img {
      width: 5.11rem;
      height: 3.72rem;
    }
    .btn_close {
      top: 0.08rem;
      right: 0.53rem;
    }
  }
}
</style>
