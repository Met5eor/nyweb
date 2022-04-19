<template>
  <!-- 年月日分买秒倒计时 -->
  <span class="text text_3">
    <!-- {{ countDownTime | gmtToDate("dayAndtime", true) }}秒 -->
    <div v-if="!returnObj">{{ getTime }}</div>
    <div v-else class="u-fx time_box ">
      <div v-if="showDay" class="day time">{{getTime.day||'00'}}</div>
      <div class="hour time">{{getTime.hour||'00'}}</div>
      <div class="min time">{{getTime.min||'00'}}</div>
      <div class="second time">{{getTime.second||'00'}} </div>
      <div v-if="isMillisecond" class="millisecond time">{{millisecond||'00'}} </div>
    </div>
  </span>

</template>

<script>
export default {
  name: "CountDown",
  props: {
    countDown: {
      type: Number,
      default: true,
    },
    returnObj: {
      type: Boolean,
      default: false,
    },
    isMillisecond: {
      type: Boolean,
      default: false,
    },
    showDay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      countDownTime: this.countDown,
      millisecond: 90
    };
  },
  created() { },
  mounted() {
    this.startCountDown();
  },
  computed: {
    getTime() {
      return this.countDownTime > 0 ? this.$tools.timestampToTime(this.countDownTime, this.returnObj) : '00天00小时00分00秒'
    },
  },
  methods: {
    //开启倒计时
    startCountDown() {
      this.timer = setInterval(() => {
        if (this.countDownTime <= 0) {
          clearInterval(this.timer1);
          this.millisecond = 0
          return;
        }
        this.countDownTime = this.countDownTime - 1000;
      }, 1000);
      this.timer1 = setInterval(() => {
        if (this.millisecond == 0) {
          this.millisecond = 90
        }
        this.millisecond = this.millisecond - 3;
      }, 31);
    },
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
};
</script>

<style scoped lang="less">
.text {
  text-transform: uppercase;
}
.time_box {
  .time {
    display: flex;
    height: 0.4rem;
    flex: 1;
    margin: 0 0.05rem;
    align-items: center;
    justify-content: center;
    font-size: 0.2rem;
    position: relative;
    &::after {
      position: absolute;
      content: ":";
      top: 0.05rem;
      right: -0.07rem;
    }
  }
  .time:nth-of-type(4) {
    &::after {
      content: "";
      top: 0.05rem;
      right: -0.07rem;
    }
  }
}
</style>
