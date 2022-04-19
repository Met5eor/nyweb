<template>
  <div class="share" v-if="showShare">
    <img
      @click="showShare = false"
      src="https://project-user-resource-1256085488.cos.ap-guangzhou.myqcloud.com/61a0b5b0dc329c00111088ca/61a4325adc329c001110c3b1/16389511942122814494.png"
      class="icon_1"
    />
    <div class="share-item">
      <img
        @click="appShareHandle('wechat')"
        src="https://cdn.upchinaproduct.com/zhangniu/images/share/share_wx.png"
      />
      微信
    </div>
    <div class="share-item">
      <img
        @click="appShareHandle('circle')"
        src="https://cdn.upchinaproduct.com/zhangniu/images/share/share_pyq.png"
      />
      朋友圈
    </div>
  </div>
</template>

<script>
export default {
  name: "appShare",
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
    classId: {
      type: String,
      default: "swiper",
    },
  },
  data() {
    return {
      showShare: false,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    //分享
    appShareHandle(type) {
      //点击菜单触发事件
      upNativeComm.exec("Share.link", {
        title: "邀请好友",
        message: "好友邀请您拿会员",
        linkurl: "http://192.168.8.212:8080/#/wx",
        type: type,
        //type类型：qq  wechat circle(微信朋友圈)
      });
    },
  },
};
</script>

<style scoped lang="less">
.share {
  position: fixed;
  background: #fff;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: 0.5rem 0 0.3rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0.18rem rgba(122, 32, 8, 0.24);
  border-radius: 0.4rem 0.4rem 0px 0px;
  .icon_1 {
    width: 0.24rem;
    height: 0.25rem;
    position: absolute;
    left: 7.06rem;
    top: 0.19rem;
  }
  .share-item {
    width: 50%;
    text-align: center;
  }
  img {
    display: block;
    margin: 0 auto 20px;
    width: 1rem;
  }
}
</style>
