<template>
  <!-- 侧边栏 -->
  <div class="sider_box">
    <div class="sider_bar">
      <div class="sider_list" v-if='showDao'>
        <div class="sider_bar_close" @click='showDao = false'></div>
        <ul>
          <li class="cur" @click="mask=true"><a href="javascript:;" class="btn_about">会员特权对比 ></a></li>
          <li><a href="https://cdn.upchina.com/project/gnnhelpcenter20200924/cnt_md/tsgn-hjzqtzmk.html" target="_blank">功能使用指南 ></a></li>
          <li @click="goKf"><a href="javascript:;">联系在线客服 ></a></li>
        </ul>
      </div>
      <div class="to_top" @click="to_top">返回顶部
        <img src="//cdn.upchina.com/front/gnnvipcenterpc/images/btn_top.png">
      </div>
      <!-- 每日抽奖 尊贵会员未到期可以抽 -->
      <img class="flcj btn" alt="" src="../images/pic_mrcj.png" v-if="getsvipPorwer" @click="mrcj()">
    </div>
    <!-- 会员权限对比 -->
    <MaskPoupon v-model="mask">
      <div class="pop popod ">
        <VipPower :currentIndex="0">
          <div class="notext">哦他根据</div>
        </VipPower>
        <div class="pop_close " @click="mask = false"></div>
      </div>
    </MaskPoupon>
  </div>

</template>

<script>
import MaskPoupon from "@c/MaskPoupon.vue";
import VipPower from '../vipPower.vue';
export default {
  name: "Sidebar",
  components: { MaskPoupon, VipPower },
  inject:['getrulesObj'],
  props: {
  },
  data() {
    return {
      showDao: true,
      mask: false, //会员权限对比弹窗
    };
  },
  computed: {
    getsvipPorwer() {
      let obj = this.getrulesObj('尊享会员')
      return obj.isPower
    },
  },
  created: function () {

  },
  mounted: function () { },
  watch: {
  },
  methods: {
    //每日抽奖
    mrcj() {
      var cjUrl = "https://cdn.upchinaproduct.com/acm/202006/gnnvipintrodpc/index.html?tabindex=17";
      window.open(cjUrl);
    },
    to_top() {
      window.scrollTo(0, 0);
    },
    goKf() {
      var urlkf = "https://kf.upchina.com/pc/pcchat/cpjljzbsl?jz=1&sc=$KEFUID$"
      var opt = {
        url: urlkf,
        width: 830,
        height: 455,
        count: 1
      };
      upNativeComm.exec("open.kfwindow", opt);
    },
  },
};
</script>
<style lang="less" scoped>
.sider_bar {
  position: fixed;
  top: 40%;
  right: 5%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  z-index: 999;
  .sider_list {
    ul {
      background-image: linear-gradient(-45deg, #fdf2e6, #e4c6b1);
      background-image: -webkit-linear-gradient(-45deg, #fdf2e6, #e4c6b1);
      padding: 5px 15px;
      border-radius: 10px;
      li {
        line-height: 60px;
        height: 60px;
        border-bottom: 1px solid #dac1aa;
        font-size: 21px;
        color: #653d08;
        font-size: bold;
        a {
          color: #653d08;
        }
        &.cur a {
          color: #e60012;
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
    .sider_bar_close {
      cursor: pointer;
      width: 46px;
      height: 46px;
      background: url(../images/btn_close02_new.png) no-repeat;
      margin: 0 auto 10px;
    }
    .flcj {
      display: block;
      width: 100px;
      margin: 20px auto;
    }
    .to_top {
      width: 176px;
      height: 46px;
      font-size: 20px;
      color: #88582c;
      background-image: linear-gradient(-45deg, #fdf2e6, #e4c6b1);
      background-image: -webkit-linear-gradient(-45deg, #fdf2e6, #e4c6b1);
      margin: 10px auto 0;
      border-radius: 10px;
      line-height: 46px;
      text-align: center;
      cursor: pointer;
      img {
        vertical-align: -2px;
      }
    }
  }
}
.pop {
  width: 9.3rem;
  height: 6.5rem;
  position: relative;
  .pop_close {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    right: -37px;
    top: -38px;
    background: url(../images/btn_close_new.png) no-repeat;
    background-size: 100%;
  }
  .notext {
    height: 0;
    opacity: 0;
  }
  /deep/ .contrast {
    width: 100%;
    height: 100%;
    padding: 0 !important;
    .contrast_wrap {
      width: 100%;
      height: 100%;
      padding: 0px;
      .contrast_top {
        margin-top: 0;
      }
      .contrast_cnt {
        height: 6rem;
      }
    }
  }
}
</style>
