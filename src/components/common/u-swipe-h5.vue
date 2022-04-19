<template>
    <van-swipe ref="mySwiper" v-bind="$attrs" v-on="$listeners"   @change='onChange'  class="my-swipe">
      <van-swipe-item 
      class="" v-for="(el,index) in swipeItems" 
      :key="index">
        <img style="width:100%" :src="el.url" alt="">
      </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  name: "UswipeH5",
  inheritAttrs: false,
  props: {
    swipeItems: {
      type: Array,
      default: () => [
        // { url: require("../img/swiper1.png") },
        // { url: require("../img/swiper2.png") },
        // { url: require("../img/swiper3.png") },
      ],
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
      this.$refs.mySwiper.swipeTo(newVal)
    },

  },
  created() { },
  mounted() {
  },
  methods: {
    onChange(index) {
      this.$emit("input", index);
    }
  },
};
</script>

<style scoped lang="less">
.my-swipe{
  width: 100%;
  height: 100%;
}
</style>
