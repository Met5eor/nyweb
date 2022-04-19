<template>
  <!-- 软件下载-->
  <div class="download_box" :class="currentIndex==1?'svip':currentIndex==2?'szvip':''">
    <div class="download_wrap " :class="currentIndex==0?'vip_padding':''">
      <div class="title" :class="currentIndex==2?'white':''">
        <p>软件下载</p>
      </div>
      <div class="download_cnt">
        <div class="download_list pc">
          <div class="down_icon"></div>
          <h3>股牛牛股票APP</h3>
          <a href="javascript:;" @click="appFlag = true">立即下载</a>
        </div>
        <div class="download_list wx">
          <div class="down_icon"></div>
          <h3>微信服务圈</h3>
          <a href="javascript:;" @click="showWx = true">立即加入</a>
        </div>
      </div>
    </div>

    <!-- 微信服务圈立即加入 -->
    <MaskPoupon v-model="showWx">
      <div class="pop_box">
        <img src="./images/pop_pic_wx.png">
        <div class="pop_close " @click="showWx=false"></div>
      </div>
    </MaskPoupon>

    <!-- 立即下载股牛牛app -->
    <MaskPoupon v-model="appFlag">
      <div class="pop_box">
        <img src="//cdn.upchina.com/front/gnnvipcenterpc/images/pic_code02.png">
        <div class="pop_close" @click="appFlag=false"></div>
      </div>
    </MaskPoupon>
  </div>

</template>

<script>
import MaskPoupon from "@c/MaskPoupon.vue";
export default {
  name: "appDownload",
  components: { MaskPoupon },
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ['getCurrentIndex'],
  props: {
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

  },
  data() {
    return {
      showWx: false,
      appFlag: false
    };
  },
  computed: {
    currentIndex() {
      return this.getCurrentIndex()
    },
  },
  created: function () {
    // console.log(this.rulesObj)
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
.pop_box {
  position: relative;
  .pop_close {
    width: 30px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: 25px;
  }
}
.download_box {
  .download_list {
    width: 501px;
  }
}
</style>
