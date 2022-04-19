
<!-- 支付成功回调页  -->
<template>
  <div class="page">
    <div class="main">
      <div class="wx-btn " @click="shareWx"></div>
      <div class="img " @click="shareImg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'niuniucb',
  components: {

  },
  data() {
    return {
      showHead: true,
      curIndex: '0',
      proxy_url: proxy_url,//接口环境
    }
  },
  async created() {
  },
  mounted() {
  },
  methods: {
    shareWx() {
      let linkurl = ''
      if (process.env.NODE_ENV === 'development') {
        //本地
        linkurl = `http://dragontiger.dev.test.upchina.com/project-niuniuCard.html#/`
      } else {
        // 生产 
        linkurl =
          `https://cdn.upchina.com/front/2022/4/project-niuniuCard/prod/index.html`
      }
      let params = {
        gift: false, //是否显示分享得会员的icon
        gifttext:
          '<span><img src="{giftIcon}" alt=""></span>邀好友立得【机构龙虎榜】功能内测礼品卡', //邀请奖励文案
        giftemptytext:
          '<span><img src="{giftIcon}" alt=""></span>邀好友立得【机构龙虎榜】功能内测礼品卡', //未邀请用户时奖励文案
        giftcoefficient: 3, //系数
        desc: "",
        rewardtext: "",
        title: "好友邀请你一起参与【霸气牛牛卡】秒杀活动！", //标题
        summary:
          "一卡在手，炒股无忧！六大核心特权，带你锁定主力资金！", //描述
        method: "Share.link", // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
        // linkurl: `http://dragontiger.dev.test.upchina.com/project-billboard-addNew.html#/wx?business=${this.business}`, //跳转链接 
        linkurl: linkurl,
        imageurl: "", //图片地址
        authorname: "upchaoyuqi", // 分享内容的作者（文章）
        authornickname: "upchaoyuqi", // 分享内容的作者（文章）
        business: this.business, // 分享业务编号
        id: "2c979422-3304-42d8-98b8-718d36c1e8e9", //必选，业务下要分享内容的唯一标识，例如：观点id
        source: 23500, //渠道号,这个渠道号为被邀请新用户的注册渠道
        // env: "test", // test | product
        env: this.proxy_url === 'test' ? 'test' : "product", // test | product
        plats: ["wechat", "circle"], //显示哪些分享方式
        isStopBodyScroll: false, //是否禁止遮罩滚动
        isCanAnonymousShare: true,
        callback: (code, parms) => {
          this.succeFun(code, parms);
          //分享回调,parms.ret==0时分享成功
        },
      }
      this.upshare = new shareApi.initSharePlugin(params);
      this.upshare.show();
    },
    shareImg() {
      let params = {
        gift: false, //是否显示分享得会员的icon
        title: "", //标题
        desc: "",
        rewardtext: "",
        summary: "", //描述
        method: "Share.image", // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
        imageurl: "https://cdn.upchina.com/front/2022/4/project-niuniuCard/img/success.png", //图片地址
        plats: ["wechat", "circle"], //显示哪些分享方式
      }
      this.upshare = new shareApi.initSharePlugin(params);
      this.upshare.show();
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.page {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000;
  .main {
    position: relative;
    margin: 2.2rem auto;
    width: 6.53rem;
    height: 6.01rem;
    background: url("./img/success.png");
    background-size: 100%;
    .wx-btn {
      position: absolute;
      width: 0.96rem;
      height: 0.96rem;
      left: 1.5rem;
      bottom: 1.2rem;
    }
    .img {
      position: absolute;
      width: 0.96rem;
      height: 0.96rem;
      right: 1.5rem;
      bottom: 1.2rem;
    }
  }
}
</style>
