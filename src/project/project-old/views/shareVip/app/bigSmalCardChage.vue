<template>
  <div class="stc5-cont">
    <img
      :class="cutIndex === index ? 'big' : 'small'"
      @click="cutIndex = index"
      v-for="(item, index) in imglist"
      :key="index"
      src="./img/card_big.png"
      alt=""
    />
    <div class="act-btn u-fx u-fx-jc">
      <div
        class="btn"
        v-for="(item, count) in 2"
        :key="item"
        :class="cutIndex === count ? 'act' : ''"
      ></div>
    </div>
  </div>
</template>

<script>
import Swiper from "@c/swiper.vue";
import Msg from "@c/MsgH5.vue";
import { getOrderInfo } from "@u/orderSearch";
import { appCheckLogin } from "@u/login";
import "@ass/js/rem.js";
export default {
  name: "Mobile",
  components: { Swiper, Msg },
  data() {
    return {
      cutIndex: 1,
      imglist: [
        {
          url: require("./img/card_big.png"),
          id: 1,
        },
        {
          url: require("./img/card_big.png"),
          id: 2,
        },
      ],
    };
  },
  mounted() {
    this.cardChage();
  },
  methods: {
    //礼品卡切换
    cardChage() {
      this.time1 = setInterval(() => {
        this.cutIndex = this.cutIndex === 1 ? 0 : 1;
      }, 4000);
    },
  },
  destroyed() {
    clearInterval(this.time1);
  },
};
</script>
<style lang="less" scoped>
.green {
  border: 1px solid green;
}
.stc5-cont {
  padding-top: 0.3rem;
  position: absolute;
  bottom: 0.3rem;
  width: 6.69rem;
  height: 2.6rem;
  img {
    width: 3rem;
    &.big {
      // animation: pulseBig 1s ease;
      transform: scale(1.25, 1.25);
      transition: transform 1s;
    }
    &.small {
      // animation: pulsesmall 1s ease;
      transform: scale(0.75, 0.75);
      transition: transform 1s;
    }
  }
  .act-btn {
    margin-top: 0.4rem;
    .btn {
      margin-right: 0.1rem;
      width: 0.08rem;
      height: 0.04rem;
      background: #f42110;
      border-radius: 0.02rem;
      &.act {
        width: 0.3rem;
      }
    }
  }
}
</style>
