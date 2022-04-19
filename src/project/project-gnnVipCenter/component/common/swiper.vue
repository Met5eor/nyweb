<template>
  <div class="swiper swiper-container" :class="`${classId}-container`">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide u-fx-ver"
        v-for="(item, index) in swiperUrls"
        :key="index"
      >
        <img style="width:100%" v-if="isBigImg" @click="bigImg(item.img)" :src="item.img" />
        <img style="width:100%" v-else @click="bigImg(item.img)" :src="item.img" />
      </div>
    </div>
    <div
      v-if="isBtn"
      :class="`${classId}-button-prev`"
      class="swiper-button-prev"
    ></div>
    <div
      v-if="isBtn"
      :class="`${classId}-button-next`"
      class="swiper-button-next"
    ></div>
    <div :class="`${classId}-pagination`" class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "swiper",
  props: {
    swiperUrls: {
      type: Array,
      default: () => [
        // { img: require("../img/swiper1.png") },
        // { img: require("../img/swiper2.png") },
        // { img: require("../img/swiper3.png") },
      ],
    },
    isBtn: {
      type: Boolean,
      default: false,
    },
    classId: {
      type: String,
      default: "swiper",
    },
    value: {
      type: Number,
      default: 0,
    },
    isBigImg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mySwiper: null,
      activeIndex: null,
      time: null,
    };
  },
  watch: {
    async value(newVal, oldVal) {
      if (newVal === this.activeIndex) return;
      if (newVal > this.activeIndex) {
        this.time = setInterval(() => {
          if (newVal === this.activeIndex) return clearInterval(this.time);
          this.mySwiper.slideNext();
        }, 10);
      } else {
        this.time = setInterval(() => {
          if (newVal === this.activeIndex) return clearInterval(this.time);
          this.mySwiper.slidePrev();
        }, 10);
      }
      // debugger
      //  gnnapp_gn.swipeTo($index, 10);
      // this.mySwiper.slideTo(3, 1000, false);
      // mySwiper.slidePrev();
      //  mySwiper.slideNext();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    bigImg(url) {
      if (!this.isBigImg) return;
      var obj = {
        urls: [url],
        current: url,
      };
      previewImage.start(obj);
    },
    init() {
      this.mySwiper = new Swiper(`.${this.classId}-container`, {
        loop: true,
        // 如果需要分页器
        pagination: `.${this.classId}-pagination`,
        uniqueNavElements: false,
        autoplay: 4000,
        prevButton: `.${this.classId}-button-prev`,
        nextButton: `.${this.classId}-button-next`,
        onSlideChangeStart: (mySwiper) => {
          console.log();
          this.activeIndex = mySwiper.realIndex;
          this.$emit("input", this.activeIndex);
        },
      });
    },
    checkScroll() {
      // if (this.navCurrentIndex >= 2) {
      //   this.$refs.sz_nav.scrollLeft = this.$refs.sz_nav.clientWidth;
      // } else {
      //   this.$refs.sz_nav.scrollLeft = 0;
      // }
    },
  },
};
</script>

<style scoped lang="less">
.swiper-container {
  height: 100%;
  .swiper-wrapper {
    height: 90%;
  }
  /deep/ .swiper-pagination-bullet {
    width: 0.08rem;
    height: 0.04rem;
    background: #f42110;
    opacity: 0.7;
    border-radius: 0.02rem;
    margin-right: 0.04rem;
  }
  /deep/ .swiper-pagination-bullet-active {
    width: 0.2rem;
  }
}
</style>
