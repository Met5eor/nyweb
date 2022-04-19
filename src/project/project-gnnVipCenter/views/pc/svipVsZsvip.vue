<template>
  <!-- 直播版本跟尊享会员特权对比 -->
  <div class="contrast">
    <div class="contrast_box">
      <div class="title white">
        <p>会员特权对比</p>
      </div>
      <div class="privilege_box">
        <div class="privilege_l">
          <div class="vip_title">
            实战直播版<span>（35项）</span>
          </div>
          <div class="info_box">
            <p class="bold">· 专享六大主题直播</p>
            <p class="bold">· 实战直播交流圈</p>
            <p class="bold">· 超级Level-2行情</p>
            <p v-for='(item) in contrast[0].cnt' :key="item.product">. {{item.product}}</p>
            <p v-for='(item) in contrast[2].cnt' :key="item.product">. {{item.product}}</p>
          </div>
          <div class="suit">
            <h3>适合人群</h3>
            <p>1、没有自己的方法，需要老师对着盘面实战讲解</p>
            <p>2、想和股友交流学习</p>
            <p>3、不知道怎么盯盘、复盘或者使用软件</p>
          </div>
          <div class="price_box">
            <h3>季卡特惠:</h3>
            <div class="buy_box">
              <p>￥<span>3998</span></p>
            </div>
            <div class="old_price">原价:￥4794</div>
          </div>
        </div>
        <div class="privilege_r">
          <div class="vip_title">
            尊享会员<span>（32项）</span>
          </div>
          <div class="info_box">
            <p class="noValid">· 专享六大主题直播</p>
            <p class="noValid">· 实战直播交流圈</p>
            <p class="noValid">· 超级Level-2行情</p>
            <p v-for='(item) in contrast[0].cnt' :key="item.product">. {{item.product}}</p>
            <p v-for='(item) in contrast[2].cnt' :key="item.product">. {{item.product}}</p>
          </div>
          <div class="suit">
            <h3>适合人群</h3>
            <p>1、有一定炒股经验和方法</p>
            <p>2、系统学习过若风体系</p>
            <p>3、经常盯盘、复盘</p>
          </div>
          <div class="price_box">
            <h3>半年卡特惠:</h3>
            <div class="buy_box">
              <p>￥<span>2980</span></p>
            </div>
            <div class="old_price">原价:￥4998</div>
          </div>
        </div>

      </div>
      <a href="javascript:;" class="btn_buy" @click="showOrderEvent">立即开通实战直播版</a>
    </div>
  </div>

</template>

<script>
export default {
  name: "svipVsZsvip",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ['chageOrder'],
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
      contrast: [
        {
          txt: "股池/指标",
          cnt: [
            { product: "五星股票池", vip: true, svip: true, zbvip: true },
            { product: "红黄白股池", vip: true, svip: true, zbvip: true },
            { product: "手机Level-2攻守道股池", vip: true, svip: true, zbvip: true },
            { product: "手机Level-2指标", vip: true, svip: true, zbvip: true },
          ]
        },
        {
          txt: "实战直播版专享",
          cnt: [
            { product: "实战直播室", vip: false, svip: false, zbvip: true },
            { product: "直播室交流圈", vip: false, svip: false, zbvip: true },
            { product: "超级Level-2", vsip: false, svip: false, zbvip: true },
          ]
        },
        {
          txt: "核心功能",
          cnt: [
            { product: "市场情绪", vip: false, svip: true, zbvip: true, only: true },
            { product: "特色题材&个股题材亮点", vip: false, svip: true, zbvip: true, new: true },
            { product: "题材投资线索", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头启动", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头攀升", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头加速", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头主升", vip: false, svip: true, zbvip: true, new: true },
            { product: "超级复盘(短线+趋势)", vip: false, svip: true, zbvip: true },
            { product: "高级盯盘", vip: false, svip: true, zbvip: true },
            { product: "历史数据", vsip: false, svip: true, zbvip: true },
            { product: " 趋势盯盘", vip: false, svip: true, zbvip: true },
            { product: "北向追击盘", vip: false, svip: true, zbvip: true, },
            { product: "区间最高涨幅", vip: false, svip: true, zbvip: true, },
            { product: "涨停挖掘", vip: false, svip: true, zbvip: true },
            { product: "涨停分析", vip: false, svip: true, zbvip: true },
            { product: "涨停因子", vip: false, svip: true, zbvip: true },
            { product: "自选琅琊榜排行", vip: false, svip: true, zbvip: true },
            { product: "个股琅琊榜", vip: false, svip: true, zbvip: true },
            { product: "题材琅琊榜", vip: false, svip: true, zbvip: true },
            { product: "竞价先机", vip: false, svip: true, zbvip: true },
            { product: "板块先机", vip: false, svip: true, zbvip: true },
            { product: "神秘C点股池", vip: false, svip: true, zbvip: true },
            { product: "神秘C点指标", vip: false, svip: true, zbvip: true },
          ]
        },
        {
          txt: "特权福利",
          cnt: [
            { product: "A股核心指标训练营课程", vip: true, svip: true, zbvip: true },
            { product: "会员每日抽奖", vip: false, svip: true, zbvip: true },
            { product: "会员折扣", vip: true, svip: true, zbvip: true },
            { product: "会员专享服务圈", vip: true, svip: true, zbvip: true },
            { product: "会员标识", vip: true, svip: true, zbvip: true },
          ]
        },
      ],
    };
  },
  computed: {
  },
  created: function () {
    // console.log(this.rulesObj)
  },
  mounted() {
  },
  methods: {
    showOrderEvent() {
      this.chageOrder()
    }
  },
};
</script>
<style lang="less" scoped>
.contrast{
  
}
</style>
