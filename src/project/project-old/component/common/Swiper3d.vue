<template>
  <div class="swiper-container stc1_content swiper-container1">
    <div class="swiper-wrapper">
      <slot>
        <div
          class="swiper-slide u-fx-ver"
          v-for="(item, index) in stc1SwiperUrls"
          :key="index"
        >
          <img :src="item.img" />
        </div>
      </slot>
    </div>
    <div class="swiper-pagination swiper-pagination1"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Swiper3d",
  props: {
    swiperUrls: {
      type: Array,
      default: () => [
        // { img: require("../img/swiper1.png") },
        // { img: require("../img/swiper2.png") },
        // { img: require("../img/swiper3.png") },
      ],
    },
    isBigImg: {
      type: Boolean,
      default: true,
    },
    stretch: {
      type: Number,
      default: 68,
    },
    classId: {
      type: String,
      default: "swiper",
    },
  },
  data() {
    return {
      stc1SwiperUrls: [],
    };
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
      new Swiper(`.${this.classId}-container`, {
        // preventClicksPropagation : false,
        // preventClicks : false,//默认true
        // shortSwipes:false,
        loop: true,
        // direction: "vertical",
        effect: "coverflow",
        // 如果需要分页器
        pagination: `.${this.classId}-pagination`,
        uniqueNavElements: false,
        autoplay: 3000,
        slidesPerView: "auto",
        // slidesPerView: 1,
        coverflow: {
          // rotate: 0, // 旋转的角度
          // stretch: 6, // 拉伸   图片间左右的间距和密集度
          // depth: 100, // 深度   切换图片间上下的间距和密集度
          // modifier: 1, // 修正值 该值越大前面的效果越明显
          // slideShadows: false, // 页面阴影效果
          rotate: 0, // 旋转的角度
          stretch: this.stretch, // 拉伸   图片间左右的间距和密集度
          depth: 50, // 深度   切换图片间上下的间距和密集度
          modifier: 4, // 修正值 该值越大前面的效果越明显
          slideShadows: false, // 页面阴影效果
          // slidesPerView: 3,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.swiper-container {
  // overflow: visible;
  width: 100%;
  // height: 100%;
  .swiper-wrapper {
    // overflow: hidden;
    .swiper-slide {
      padding: 0.05rem;
    }
    .wiper-pagination {
      // overflow: visible;
      width: 100%;
      .swiper-pagination-bullet-active {
        z-index: 10;
        background: #fff !important;
        opacity: 1;
      }
    }
    .swiper-pagination {
      bottom: 0rem;
    }
    img {
      // width: 100%;
      // height: 100%;
    }
  }
}
</style>
