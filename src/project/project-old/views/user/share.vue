<!-- 微信分享测试页面 -->
<template>
  <div>
    <div class="btn" @click="onSubmit()">Share</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      upshare: {},
    };
  },
  created() {
    this.upshare = new shareApi.initSharePlugin({
      gift: false, //是否显示分享得会员的icon
      gifttext:
        '<span><img src="{giftIcon}" alt=""></span>您已邀请 <span class="invite_num">{inviteNum}</span> 位用户，获得 <span class="invite_num">{giveNum}</span> 个月免费权限', //邀请奖励文案
      giftemptytext:
        '<span><img src="{giftIcon}" alt=""></span>您已邀请 <span class="invite_num">{inviteNum}</span> 位用户', //未邀请用户时奖励文案
      giftcoefficient: 1, //系数
      desc: "即日起登录后分享到微信、朋友圈,邀请新用户加入,在新用户完成首次微信登录app后，您将获取会员权限。",
      rewardtext:
        "奖励规则：邀请好友注册并登录APP，得1个月会员特权，好友得10天会员！",
      title: "分享两者都送权限", //标题
      summary:
        "沪指回补缺口后延续震荡上扬态势，创业板指今日表现强势，收盘劲升逾1%。行业板块多数收涨，医疗板块掀起涨停潮！", //描述
      method: "Share.link", // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
      linkurl: "http://mini.test.upchina.com/", //跳转链接 收费：4652  音频：5236  多文字：5271
      imageurl: "", //图片地址
      authorname: "upchaoyuqi", // 分享内容的作者（文章）
      authornickname: "upchaoyuqi", // 分享内容的作者（文章）
      business: "share_free", // 分享业务编号
      id: "2c979422-3304-42d8-98b8-718d36c1e8e9", //必选，业务下要分享内容的唯一标识，例如：观点id
      source: 23500, //渠道号,这个渠道号为被邀请新用户的注册渠道
      env: "test", // test | product
      plats: ["wechat", "circle"], //显示哪些分享方式
      isStopBodyScroll: false, //是否禁止遮罩滚动
      isCanAnonymousShare: true,
      callback: function (code, parms) {
        //分享回调,parms.ret==0时分享成功
      },
    });
  },
  methods: {
    onSubmit() {
      this.upshare.show();
    },
  },
};
</script>

<style lang="less" scope>
.btn {
  margin: 20px auto;
  cursor: pointer;
  padding: 10px 20px;
  border: 1px solid green;
  color: green;
  display: inline-block;
  border-radius: 30px;
  box-shadow: 1px 2px 2px #eee, -1px 2px 2px #eee;
}
</style>
