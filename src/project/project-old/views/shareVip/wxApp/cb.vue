<template>
  <div class="page">
    <div class="cont u-fx u-fx-ac u-fx-jc">
      <img class="img_icon" src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/suc_icon.png" alt="" />
      <span class="text">支付成功</span>
    </div>
    <img class="cont_img" src="https://cdn.upchina.com/front/20211209shareVip/wx/wximg/cbContent.png" alt="" />
    <div class="button">
      <span class="text" @click="view">我知道了</span>
    </div>
  </div>
</template>

<script>
import "@ass/js/rem.js";
export default {
  name: "cb",
  components: {},
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  methods: {
    view() {
      this.$router.push("/inviteFriends");
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("https://cdn.upchina.com/front/20211209shareVip/wx/wximg/cbHead.png") no-repeat ;
  background-position:center -1rem;
  background-size: 100%,4rem;
  color: #fff;
  .cont {
    margin-top: 1.3rem;
    font-size: 0.51rem;
    .img_icon {
      width: 0.65rem;
      height: 0.65rem;
      margin-right: 0.2rem;
    }
    // margin-top: 0.6rem;
  }
  .cont_img {
    margin-top: 1rem;
    width: 6.01rem;
    height: 3.53rem;
  }
  .button {
    margin: 0 auto;
    margin-top: 0.99rem;
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
}
</style>
