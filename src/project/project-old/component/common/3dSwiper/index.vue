<template>
  <div class="swiper-container">
    <ul class="swiper-wrap">
      <li>
        <img src="./img/3dBanner1.png" />
      </li>
      <li>
        <img src="./img/3dBanner2.png" />
      </li>
      <li>
        <img src="./img/3dBanner3.png" />
      </li>
      <li>
        <img src="./img/3dBanner4.png" />
      </li>
      <!-- <li>
				<img src="./img/3dBanner5.png">
			</li>
			<li>
				<img src="./img/3dBanner6.png">
			</li> -->
    </ul>
    <ul class="swiper-dots"></ul>
    <ul class="swiper-navigator">
      <li class="swiper-btn-prev">&lt;</li>
      <li class="swiper-btn-next">&gt;</li>
    </ul>
  </div>
</template>

<script>
import Swiper from "./3dSwiper";
export default {
  name: "Swiper3D",
  props: {
    urls: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        pagination: ".swiper-dots",
        navigator: {
          prev: ".swiper-btn-prev",
          next: ".swiper-btn-next",
        },
        delay: 2000,
        autoPlay: true,
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "./3dSwiper.css";
</style>
