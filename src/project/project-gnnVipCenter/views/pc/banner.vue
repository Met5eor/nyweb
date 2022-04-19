<template>
  <!-- banner -->
  <div class="banner">
    <div class="banner_box" :class="currentIndex===0?'vip':currentIndex===1?'svip':'zbvip'">
      <div class="banner_cnt">
        <div class="title">
          {{title}}
        </div>
        <div class="title padding_zero">
          {{info}}
        </div>
        <!-- <span style="color:red"> {{rulesObj}}</span> -->
        <div class="btn_open" v-if="!rulesObj.isOldUser" @click="showOrderEvent">立即开通</div>
        <div class="btn_open" v-else @click="showOrderEvent">立即续费</div>
        <div class="new_user" v-if="!rulesObj.isOldUser" :style="{color:rulesObj.name==='尊享会员'?'#884100':'#fff'}">
          {{newtxt}}
        </div>
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "banner",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ['chageOrder'],
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    rulesObj: {
      type: Object,
      default: () => {
        return {
          // name: '股牛牛会员',
          // isVip: false, //是否拥有过权限
          // isPower: false, //是否有权限
          // isOldUser: false //是否是老用户
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    newtxt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    };
  },
  computed: {
  },
  created: function () {
  },
  mounted() {
  },
  methods: {
    showOrderEvent() {
      this.chageOrder()
    }
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
.banner {
  display: inline-block !important;
  background: #d8d8d8 !important;
  opacity: 1 !important;
  height: 7rem;
  width: 100%;
  .banner_box {
    &.vip {
      height: 100%;
      background: url(./images/vip_header.png) no-repeat center center;
      background-size: 100% 100%;
      .banner_cnt {
        width: 12rem;
        margin: 0 auto;
        position: relative;
        .title {
          line-height: 80px;
          text-shadow: 0px 3px 0px #151620;
          font-weight: bold;
          color: #fff;
          font-size: 61px;
          text-align: center;
          padding-top: 58px;
        }
        .new_user {
          top: 4.1rem;
        }
        .btn_open {
          // font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
        }
      }
    }
    &.svip {
      height: 100%;
      width: 100%;
      background: url("./images/zx_header.png") no-repeat;
      background-size: 100% 100%;
      .banner_cnt {
        .new_user {
          font-size: 18px;
          color: #fff;
          line-height: 26px;
          position: absolute;
          top: 5rem;
          left: 50%;
          transform: transLateX(-50%);
        }
        .title {
          text-shadow: 0px 2px 4px #ffdb9e;
          color: #884100;
          line-height: 80px;
          font-weight: bold;
          font-size: 61px;
          text-align: center;
          padding-top: 58px;
        }
      }
    }
    &.zbvip {
      height: 100%;
      width: 100%;
      background: url("./images/szzbzx_header.png") no-repeat;
      background-size: 100% 100%;
      .banner_cnt {
        // width: 12rem;
        // margin: 0 auto;
        // position: relative;
        // height: 5.5rem;
        .new_user {
          font-size: 18px;
          color: #fff;
          line-height: 26px;
          position: absolute;
          top: 5rem;
          left: 50%;
          transform: transLateX(-50%);
        }
        .title {
          line-height: 80px;
          font-weight: bold;
          font-size: 0.61rem;
          text-align: center;
          padding-top: 58px;
        }
      }
    }
  }
}
</style>
