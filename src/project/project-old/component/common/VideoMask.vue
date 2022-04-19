<template>
  <!-- 直播弹窗 -->
  <div class="page" v-if="show" ref="videoMask">
    <div class="top u-fx u-fx-jsb u-fx-ac">
      <div class="top_l u-fx u-fx-ac u-fx-jc">
        <div class="frv_state_icon"></div>
        <div class="frv_state_txt">直播中</div>
      </div>
      <div class="top_r" @click="show = false"></div>
    </div>
    <div class="video_box">
      <video
        preload="auto"
        x5-video-player-fullscreen="true"
        x5-video-player-type="h5"
        webkit-playsinline="true"
        width="100%"
        height="60"
        ref="video"
        autoplay
        loop="loop"
        :poster="posterImg"
        :src="src"
        controls
      ></video>
    </div>
    <div class="bottom u-fx-ac-jc">
      <div class="btn u-mar-t10" @click="openUrl">去围观</div>
      <div class="frv_like"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoMask",
  props: {
    posterImg: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isDialogue: false,
      show: true,
    };
  },
  created() {},
  mounted() {
    this.moveVideo();
    this.openViodeo();
  },
  methods: {
    //视频弹窗
    moveVideo() {
      let dom = this.$refs.videoMask;
      this.$tools.moveDom(dom);
    },
    openUrl() {
      location.href = this.src
      // window.open(this.src);
    },
    //关闭弹窗
    close(e, val) {},
    openViodeo() {
      let dom = this.$refs.video;
      // dom.play();
    },
  },
};
</script>

<style scoped lang="less">
.page {
  position: fixed;
  top: 3.4rem;
  right: 0.1rem;
  transform: translate(0, 0);
  z-index: 99;
  width: 1.7rem;
  height: 2.2rem;
  background: rgba(0, 0, 0, 0.6);
  border: 3px solid #ffffff;
  border-radius: 0.1rem;
  overflow: hidden;
  .top {
    color: #fff;
    height: 0.4rem;
    .top_l {
      width: 0.9rem;
      height: 0.3rem;
      background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
      border-radius: 0.18rem;
      font-size: 0.14rem;
      .frv_state_icon {
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_live.gif)
          no-repeat center;
        background-size: cover;
        margin-right: 0.03rem;
      }
      .frv_state_txt {
        font-size: 0.12rem;
      }
    }
    .top_r {
      width: 0.3rem;
      height: 0.3rem;
      background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_close.png)
        center;
      background-size: cover;
    }
  }
  .video_box {
    width: 100%;
    height: 1.2rem;
    background: url('https://cdn.upchina.com/front/20211209shareVip/wx/wximg/video.png') no-repeat;
    background-size: 100%;
    //播放按钮
    video::-webkit-media-controls-play-button {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .bottom {
    position: relative;
    color: #fff;
    .btn {
      padding: 0.05rem 0.2rem;
      font-size: 0.14rem;
      background-image: linear-gradient(-45deg, #f30140 0%, #ff9b8d 100%);
      border-radius: 0.18rem;
      box-shadow: 0 -2px 0 0 #ffec52;
    }
    .frv_like {
      position: absolute;
      right: 0.06rem;
      bottom: 0.2rem;
      width: 0.4rem;
      height: 1rem;
      background: url(https://cdn.upchina.com/front/0817gnn818/h5/images/icon_gift.gif)
        center;
      background-size: cover;
    }
  }
}
</style>
