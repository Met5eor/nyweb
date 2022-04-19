<template>
  <div class="swiper">
    <div class="title">特色题材-题材深一度</div>
    <div class="sub-title">
      <span>特色题材：</span
      ><span
        >由股牛牛专业研究团队，大量整理行业资料精研而成，深入梳理行业逻辑，识别个股行业地位，结合独家买卖点指标，助你提前挖掘机会，买在起涨前！</span
      >
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide u-fx-ver"
          v-for="(item, index) in SwiperUrls"
          :key="index"
        >
          <img @click="bigImg(item.img)" :src="item.img" />
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      SwiperUrls: [
        { img: require("../img/swiper1.png") },
        { img: require("../img/swiper2.png") },
        { img: require("../img/swiper3.png") },
      ],
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    bigImg(url) {
      var obj = {
        urls: [url],
        current: url,
      };
      previewImage.start(obj);
    },
    init() {
      new Swiper(".swiper-container", {
        loop: true,
        // 如果需要分页器
        pagination: ".swiper-pagination",
        uniqueNavElements: false,
        autoplay: 5000,
      });
    },
  },
};
</script>

<style scoped lang="less">
.swiper {
  padding: 0.38rem 0.2rem 0.58rem;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0.2rem;
  position: relative;
  margin: 0.24rem 0.22rem 0.22rem;
  &::before {
    content: "";
    display: block;
    width: 1.17rem;
    height: 0.47rem;
    background: url("../img/tip.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
  color: #ffe142;
  line-height: 0.4rem;
  background: linear-gradient(0deg, #cc350e 0%, #f55f23 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 0 0.32rem;

  &::before {
    content: "";
    display: block;
    width: 0.36rem;
    height: 0.24rem;
    background: url("../img/icon_title_left.png") no-repeat;
    background-size: 100%;
    margin-right: 0.08rem;
  }
  &::after {
    content: "";
    display: block;
    width: 0.36rem;
    height: 0.24rem;
    background: url("../img/icon_title_right.png") no-repeat;
    background-size: 100%;
    margin-left: 0.08rem;
  }
}
.sub-title {
  font-size: 0.22rem;
  color: #666;
  line-height: 0.3rem;
  padding-bottom: 0.26rem;
  span:first-child {
    color: #333;
    font-weight: bold;
  }
}
.swiper-container {
  width: 100%;
  height: 3.76rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-pagination {
  left: 50%;
  transform: translate(-50%, 0);
}
.swiper /deep/ .swiper-pagination-bullet {
  width: 0.08rem;
  height: 0.04rem;
  background: #f42110;
  opacity: 0.7;
  border-radius: 0.02rem;
  margin-right: 0.04rem;
}
.swiper /deep/ .swiper-pagination-bullet-active {
  width: 0.3rem;
}
</style>
