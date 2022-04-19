<template>
  <div class="flex-col page">
    <div class="flex-col">
      <div class="flex-col group_1">
        <div class="flex-col items-center text-wrapper">
          <div class="cont u-fx u-fx-ac">
            <img src="../img/pc/suc_icon.png" alt="" />
            <span class="text u-mar-l20 ">支付成功</span>
          </div>
        </div>
        <div class="flex-col section_1">
          <img src="../img/pc/cbContent.png" alt="" />
        </div>
      </div>
    </div>
    <div class="flex-col items-center button">
      <span class="text" @click="view">我知道了</span>
    </div>
  </div>
</template>

<script>
import "@ass/js/remPc.js";
export default {
  name: "cbPc",
  components: {},
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  methods: {
    view() {
      this.$router.push("/inviteFriendsPc");
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  position: fixed;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .group_1 {
    // height: 7.43rem;
    position: relative;
    .text-wrapper {
      height: 3.11rem;
      color: rgb(255, 255, 255);
      font-size: 0.51rem;
      font-weight: 500;
      line-height: 0.49rem;
      white-space: nowrap;
      background-image: url("../img/pc/cdhead.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .cont{
        margin-top: 0.6rem;
      }
      .text {
        
      }
    }
    .section_1 {
      width: 10.36rem;
      height: 2.63rem;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: 2.15rem;
      transform: translate(-50%, 0);
    }
  }
  .button {
    margin-top: 3rem;
    padding: 0.2rem 0;
    align-self: center;
    color: rgb(255, 255, 255);
    font-size: 0.32rem;
    font-weight: 500;
    line-height: 0.3rem;
    white-space: nowrap;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 0.08rem rgba(0, 0, 0, 0.3);
    background-image: linear-gradient(
      90deg,
      rgb(251, 21, 21) 0%,
      rgb(251, 51, 14) 42%,
      rgb(250, 82, 8) 100%
    );
    border-radius: 0.35rem;
    width: 2.8rem;
  }
  .text {
    text-transform: uppercase;
  }
}
</style>
