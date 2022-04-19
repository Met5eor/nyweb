<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot>
        <div
          class="swiper-slide u-fx-ver"
          v-for="(item, index) in stc1SwiperUrls"
          :key="index"
        >
          <img src="./img/3dBanner1.png" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardchage",
  components: {},
  props: {
    swiperUrls: {
      type: Array,
      default: () => [],
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
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  data() {
    return {
      stc1SwiperUrls: [],
    };
  },
  created() {},
  async mounted() {
    await this.$tools.loadJsSdk(
      "https://upcdnfiles.oss-cn-hangzhou.aliyuncs.com/front/20211209shareVip/swiper6.js"
    );
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
      // console.log(Swiper)
      var swiper = new Swiper(".swiper-container", {
        watchSlidesProgress: true, //查看slide的progress
        resistanceRatio: 0, //禁止边缘移动
        on: {
          init: function (e) {
            let slides = this.slides;
            let slide;
            for (let i = 0; i < slides.length; i++) {
              slide = slides.eq(i);
              slide.css("zIndex", 100 - i); //设置slide的z-index层级
            }
          },

          resize: function (swiper) {
            swiper.update();
          },

          setTranslate: function () {
            let slides = this.slides;
            let slide, offsetAfter, progress;
            offsetAfter = this.width * 0.93; //每个slide的位移值
            for (let i = 0; i < slides.length; i++) {
              slide = slides.eq(i);
              progress = slides[i].progress;

              if (progress <= 0) {
                //右边slide位移
                slide.transform(
                  "translate3d(" +
                    progress * offsetAfter +
                    "px, 0, 0) scale(" +
                    (1 - Math.abs(progress) / 20) +
                    ")"
                );
                slide.css("opacity", progress + 3); //最右边slide透明
              }

              if (progress > 0) {
                slide.transform("rotate(" + -progress * 5 + "deg)"); //左边slide旋转
                slide.css("opacity", 1 - progress); //左边slide透明
              }
            }
          },
          setTransition: function (swiper, transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./b.css";
.swiper-container {
  width: 100%;
}
.swiper-slide {
  text-align: center;
}

.swiper-slide div {
  width: 86%;
  border-radius: 7px;
  margin: 10px 0 10px 4%;
}

.swiper-slide div img {
  width: 100%;
  display: block;
  border-radius: 7px;
}
</style>
