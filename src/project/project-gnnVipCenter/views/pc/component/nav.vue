<template>
  <div class="nav_bar">
    <div class="nav_main">
      <div class="nav_cnt">
        <div class="nav_item" @click="navTabChange(0)" :class="currentIndex === 0 ? 'active' : ''">股牛牛会员</div>
        <div class="nav_item" @click="navTabChange(1)" :class="currentIndex === 1 ? 'active' : ''">尊享会员</div>
        <div class="nav_item" @click="navTabChange(2)" :class="currentIndex === 2 ? 'active' : ''">实战直播版</div>
        <div class="nav_item" @click="toZn">使用指南</div>
      </div>

      <div class="btn_kf msg" @click="goKf"></div>

      <UserInfo @changshowCard="mouseover">
        <div class="card" v-if="isNewUser" v-show="showCard">
          <div class="card_cnt">
            <div class="left_info">
              <p>您暂未加入股牛牛会员体系！</p>
            </div>
            <div class="fgx"></div>
            <div class="right_info">
              <div class="btn_open" @click="showOrderEvent">立即开通</div>
            </div>
          </div>
          <div class="btn_close" @click="showCard = false"></div>
        </div>
        <div class="card" v-else v-show="showCard">
          <div class="card_cnt">
            <div class="left_info border">
              <p v-if="!initFulesList[0].isVip">股牛牛会员：未开通</p>
              <p v-else-if="!initFulesList[0].isPower">股牛牛会员：已到期</p>
              <p v-else>股牛牛会员：{{ initFulesList[0].vipEndTime | gmtToDate('date')}}到期</p>

              <p v-if="!initFulesList[1].isVip">尊享会员：未开通</p>
              <p v-else-if="!initFulesList[1].isPower">尊享会员：已到期</p>
              <p v-else>尊享会员：{{ initFulesList[1].vipEndTime | gmtToDate('date') }}到期</p>

              <p v-if="!initFulesList[2].isVip">实战直播室：未开通</p>
              <p v-else-if="!initFulesList[2].isPower">实战直播室：已到期</p>
              <p v-else>实战直播室：{{ initFulesList[2].vipEndTime | gmtToDate('date') }}到期</p>
            </div>
            <div class="right_info">
              <!-- v-if="initFulesList.every(v=>v.isPower)" -->
              <div class="btn_open" v-if="!isNewUser" @click="showOrderEvent">立即续费</div>
              <div class="btn_kf" v-if="!initFulesList[2].isVip" @click="goKf">联系客服特惠升级实战直播</div>
            </div>
          </div>
          <div class="btn_close" @click="showCard = false"></div>
        </div>
      </UserInfo>
    </div>
  </div>
</template>

<script>
import UserInfo from "./userInfo.vue";
export default {
  name: "navHead",
  components: { UserInfo },
  inject: ['chageOrder'],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    initFulesList: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      showCard: false,
      avatar: "",
      touristImg:
        "https://cdn.upchina.com/front/gnnvipcenterh5/images/pic_tourist.png",
    };
  },

  watch: {
    showCard(newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.showCard = false;
        }, 5000);
      }
    },
  },
  computed: {
    //是否加入过股牛牛会员
    isNewUser() {
      return !this.initFulesList.every(v => v.isVip)
    },
    currentIndex: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input", false);
      },
    },
  },
  created: function () {

  },
  mounted: function () { },

  methods: {
    navTabChange(item) {
      this.$emit('input', item)
      this.orderCurentIndex = item;
    },
    mouseover() {
      this.showCard = true;
    },
    toZn() {
      window.open('https://cdn.upchina.com/project/gnnhelpcenter20200924/index.html');
    },

    showOrderEvent() {
      this.chageOrder()
    },

    goKf() {
      var urlkf = "https://kf.upchina.com/pc/pcchat/cpjljzbsl?jz=1&sc=$KEFUID$";
      var opt = {
        url: urlkf,
        width: 830,
        height: 455,
        count: 1,
      };
      upNativeComm.exec("open.kfwindow", opt);
    },
  },
};
</script>
<style lang="less" scoped>
.nav_bar {
  background: #222;
  height: 90px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  .nav_main {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .nav_cnt {
      margin-top: 27px;
      flex-shrink: 0;
      .nav_item {
        float: left;
        cursor: pointer;
        font-size: 0.3rem;
        color: #dedede;
        // line-height: 0.4rem;
        margin-right: 60px;
      }
      .nav_item.active {
        color: #fbd8aa;
        font-weight: bold;
        position: relative;
      }
      .nav_item.active:after {
        position: absolute;
        bottom: -11px;
        left: 50%;
        transform: transLateX(-50%);
        -webkit-transform: transLateX(-50%);
        content: "";
        width: 50px;
        height: 4px;
        background: #fbd8aa;
        border-radius: 2px;
      }
    }
    .msg {
      width: 105px;
      height: 36px;
      background: url(../images/btn_kf.png) no-repeat;
      flex-shrink: 0;
      margin-top: 29px;
      cursor: pointer;
    }
    .card {
      .right_info {
        .btn_kf {
          width: 68px;
          height: 55px;
          background: linear-gradient(134deg, #df7373 0%, #dc5050 100%);
          border-radius: 6px;
          font-size: 12px;
          line-height: 14px;
          padding: 6px 10px;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          margin-top: 5px;
        }
      }
    }
  }
  p {
    text-align: left;
  }
}
</style>
