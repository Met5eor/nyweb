<template>
  <!-- 会员特权对比-->
  <div class="contrast" :class="currentIndex==1?'svip':'vip contrast_vip'">
    <div class="contrast_wrap">
      <slot>
        <div class="title">
          <p>会员特权对比</p>
        </div>
      </slot>
      <div class="contrast_top">
        <div class="grade">会员等级</div>
        <div class="vip">
          <p>股牛牛会员</p>
          <p class="counts">8项特权</p>
        </div>
        <div class="svip">
          <p>
            <span class="vip_tips"></span>尊享会员
          </p>
          <p class="counts">32项特权</p>
        </div>
        <div class="szvip">
          <p>
            <span class="vip_tips"></span>实战直播版
          </p>
          <p class="counts">35项特权</p>
        </div>
      </div>
      <div class="contrast_cnt">
        <div class="category" v-for="(item, index) in contrast" :key="index">
          <div class="sub_title">{{ item.txt }}</div>
          <div class="category_box">
            <div class="category_item" v-for="(items, indexs) in item.cnt" :key="indexs">
              <div class="grade">
                {{
                      items.product
                    }}
                <span :class="items.new ? 'new' : ''" v-if="items.new">
                  {{
                        items.new ? "NEW" : ""
                      }}
                </span>
                <span :class="items.hot ? 'hot' : ''" v-if="items.hot">
                  {{
                        items.hot ? "HOT" : ""
                      }}
                </span>
                <span :class="items.only ? 'only' : ''" v-if="items.only">{{ items.only ? "独家" : "" }}</span>
              </div>
              <div class="vip">
                <span class="judge" :class="items.vip ? 'right' : 'wrong'"></span>
              </div>
              <div class="svip">
                <span class="judge" :class="items.svip ? 'v_right' : 'wrong'"></span>
              </div>
              <div class="szvip">
                <span class="judge" :class="items.zbvip ? 'v_right' : 'wrong'"></span>
              </div>
            </div>
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
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
.contrast {
  height: 1016px;
  padding: 55px 0 50px;
  background: url(./images/bg_contrast.png) no-repeat;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.contrast_vip {
  background: none !important;
}
.contrast_box {
  width: 1200px;
  margin: 0 auto;
}
.contrast.svip {
  background: linear-gradient(180deg, #f6dfb4 0%, #d7a96d 100%);
}
.contrast_wrap {
  width: 1200px;
  margin: 0 auto;
  padding: 0 135px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.contrast_top {
  background: #fff6ea;
  font-size: 24px;
  line-height: 32px;
  padding: 22px 0 0 0;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px 4px 8px 0px #f2f2f2;
}
.contrast .contrast_top > div {
  float: left;
}
.contrast .grade {
  width: 300px;
  padding-left: 34px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.contrast .counts {
  font-size: 16px;
  font-weight: 400;
  color: #8b8b8b;
  text-align: center;
  margin: 5px 0 16px;
}
.contrast .vip {
  width: 120px;
  font-weight: bold;
  margin-right: 6.7%;
}
.contrast .svip {
  width: 125px;
  margin-right: 80px;
  color: #bc9663;
}
.contrast .szvip {
  width: 150px;
  color: #bc9663;
}
.contrast .vip_tips {
  display: inline-block;
  margin-right: 7px;
  width: 20px;
  height: 22px;
  background: url(./images/icon_vip_tips.png) no-repeat;
  background-size: 100% 100%;
}
.sub_title {
  padding-left: 34px;
  font-size: 20px;
  color: #999;
  border-left: 4px solid #999;
  line-height: 20px;
  margin: 13px 0 13px 0;
}
.contrast_cnt {
  height: 760px;
  overflow: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-radius: 0px 0px 20px 20px;
  background: #fff;
}
</style>
