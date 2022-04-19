<template>
  <!-- 会员特权对比-->
  <div class="contrast" v-show="currentIndex==1||currentIndex==0">
    <div class="title">会员特权对比</div>
    <div class="contrast_top">
      <div class="grade">
        会员等级
      </div>
      <div class="vip">
        <p>股牛牛会员</p>
        <p class="counts">8项特权</p>
      </div>
      <div class="svip">
        <p><span class="vip_tips"></span>尊享会员</p>
        <p class="counts">32项特权</p>
      </div>
      <div class="szvip">
        <p><span class="vip_tips"></span>实战直播版</p>
        <p class="counts">35项特权</p>
      </div>
    </div>
    <div class="contrast_cnt">
      <div class="category" v-for="(item,index) in contrast" :key="index">
        <div class="sub_title">
          {{item.txt}}
        </div>
        <div class="category_box">
          <div class="category_item" v-for="(items,indexs) in item.cnt" :key="indexs">
            <div class="grade">{{items.product}}<span :class="items.new?'new':''" v-if="items.new">{{items.new?'NEW':''}}</span><span :class="items.hot?'hot':''" v-if="items.hot">{{items.hot?'HOT':''}}</span><span :class="items.only?'only':''" v-if="items.only">{{items.only?'独家':''}}</span></div>
            <div class="vip"><span class="judge" :class="items.vip?'right':'wrong'"></span></div>
            <div class="svip"><span class="judge" :class="items.svip?'v_right':'wrong'"></span></div>
            <div class="szvip"><span class="judge" :class="items.zbvip?'v_right':'wrong'"></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "vipPower",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
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

  },
  data() {
    return {
      contrast: [
        {
          txt: "股池/指标",
          cnt: [
            { product: "五星股票池", vip: true, svip: true, zbvip: true },
            { product: "红黄白股池(特色)", vip: true, svip: true, zbvip: true },
            { product: "攻守道股池", vip: true, svip: true, zbvip: true },
            { product: "手机Level2指标", vip: true, svip: true, zbvip: true },
          ]
        },
        {
          txt: "实战直播版专享",
          cnt: [
            { product: "实战直播", vip: false, svip: false, zbvip: true },
            { product: "直播室交流圈", vip: false, svip: false, zbvip: true },
            { product: "超级Level2(PC)", vsip: false, svip: false, zbvip: true },
          ]
        },
        {
          txt: "核心功能",
          cnt: [
            { product: "市场情绪", vip: false, svip: true, zbvip: true, only: true },
            { product: "特色题材/个股题材亮点", vip: false, svip: true, zbvip: true, new: true },
            { product: "题材投资线索", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头启动", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头攀升", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头加速", vip: false, svip: true, zbvip: true, new: true },
            { product: "龙头主升", vip: false, svip: true, zbvip: true, new: true },
            { product: "超级复盘", vip: false, svip: true, zbvip: true },
            { product: "高级盯盘", vip: false, svip: true, zbvip: true },
            { product: "历史数据", vsip: false, svip: true, zbvip: true },
            { product: " 趋势盯盘", vip: false, svip: true, zbvip: true },
            { product: "北向追击", vip: false, svip: true, zbvip: true, new: true },
            { product: "区间最高涨幅", vip: false, svip: true, zbvip: true, new: true },
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
            { product: "核心指标课程", vip: true, svip: true, zbvip: true },
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
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
</style>
