<template>
  <!-- 购买弹窗 -->
  <div class="mask mask_order" v-if="statu">
    <div class="pop_box">
      <div class="user_top">
        <UserInfo />
        <div class="order_nav">
          {{curtTabIndex}}
          <div class="order_nav_item" v-for="(item,index) in tabs" :key="index" :class="curtTabIndex===index?'active':''" @click="curtTabIndex = index;">
            <div class="name">{{item.name}}</div>
            <div class="num">{{item.num}}</div>
          </div>
        </div>
      </div>
      <div class="order_box">
        <div class="prev" v-show="tabs[curtTabIndex].prices.length>5" @click="scrollOrder(0)"></div>
        <!-- 会员订单 -->
        <!-- {{isNewUser}}=isNewUser,,{{isOldUser}}=isOldUser,,{{isNoEnd}}=isNoEnd,,{{isEnd}}=isEnd -->
        <div class="order_list" ref="orderCnt">
          <div v-for="(item,index) in tabs[curtTabIndex].prices" :key="index">
            <div class="order_item green" :class="curtOrderIndex===index?'active':''" v-show="getShow(item.show)" @click.stop="getCurtorder(item,index)">
              <div class="type">{{item.txt}}</div>
              <div class="price_box">
                ￥<span>{{item.pricetxt}}</span>
              </div>
              <div class="price_avg" v-if="item.avg"><span class="small">{{item.avg}}</span></div>
              <div class="tips" v-if="item.tips">{{item.tips}}</div>
              <div class="tag" v-if="item.tag">{{item.tag}}</div>
            </div>
          </div>
        </div>

        <div class="btn_buy" @click="openPopBuy(curtorderObj)">
          立即开通
        </div>
        <div class="next" @click="scrollOrder(1)" v-show="tabs[curtTabIndex].prices.length>4"></div>

      </div>

      <div class="btn_close" @click="closePop"></div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'vant';
import UserInfo from "./component/userInfo.vue";
export default {
  name: "orderMask",
  components: { UserInfo },
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ['getCurrentIndex', 'getuid', 'getrulesObj'],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => { }
    },
  },

  data() {
    return {
      avatar: '',
      curtTabIndex: 0, //tab当前索引
      curtOrderIndex: 0, //订单当前索引
      curtorderObj: null,//选中的订单
      isNewUser: false,//是否是新用户
      isOldUser: true,//是否是老用户
      isNoEnd: false,//未到期 有权限 
      isEnd: true,//到期 没有权限 
      touristImg: "https://cdn.upchina.com/front/gnnvipcenterh5/images/pic_tourist.png",
      tabs: [
        {
          name: '股牛牛会员',
          vip: 'vip',
          num: "（含8项特权）",
          prices: [
            {
              order: "https://uppay.upchina.com/unifiedpay/a64f571cb20bc6dbf9b4d9b728a2221f",//新人价"
              txt: "月卡",
              pricetxt: "30",
              tag: "新人专享",
              type: "newPrice",
              show: 'this.isNewUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/8dd126777b0c1f05787deafcb59c2d1c",//老用户未到期续费
              txt: "年卡",
              pricetxt: "488",
              tag: '',
              type: "xfPrice",
              avg: "原价698/年",
              show: 'this.isOldUser&&this.isNoEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/7bf5c53a49a5fd9996f966f0528e785a",//老用户到期续费
              txt: "年卡",
              pricetxt: "698",
              tag: "低至1.9元/日",
              type: "price",
              show: 'this.isOldUser&&this.isEnd'
            },
          ],
        },
        {
          name: '尊享会员',
          num: "（含32项特权）",
          prices: [
            {
              order: "https://uppay.upchina.com/unifiedpay/2b1cbade97bce1e5dffae95b2fef1f04",//新人价
              txt: "月卡",
              pricetxt: "298",
              tag: "新人尝鲜,限购一次",
              type: "newPrice",
              avg: "原价499元/月，加赠训练营",
              show: 'this.isNewUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/297592123fe37dfaa3cb5833f74b96d7",  //老人到期续费
              txt: "月卡",
              pricetxt: "488",
              type: "monthPrice",
              avg: "原价499/月",
              show: 'this.isOldUser&&this.isEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/9da471f7defca1ba00761f112d6636a2",   //老人未到期续费
              txt: "月卡",
              pricetxt: "488",
              type: "monthXfPrice",
              avg: "原价499/月",
              show: 'this.isOldUser&&this.isNoEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/de5842891b2ed3ba23a0ab7c58443b3c",//2598新人价
              txt: "半年卡",
              pricetxt: "2598",
              type: "xfPrice",
              avg: "月均433元",
              show: 'this.isNewUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/ed4ea56e0d6e7883fd09472c7a28a9d1",//2598(老人未到期续费)
              txt: "半年卡",
              pricetxt: "2598",
              type: "xfPrice",
              avg: "月均433元",
              show: 'this.isOldUser&&this.isNoEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/3d5cccc448c3002ca0cd123828adeedc",//老用户(到期)续费
              txt: "半年卡",
              pricetxt: "2998",
              type: "price",
              avg: "月均499元",
              show: 'this.isOldUser&&this.isEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/806d3bab6236d79c76c633ea9b2e05a8",//新用户年卡
              txt: "年卡",
              pricetxt: "4998",
              type: "price",
              avg: "月均416元",
              tips: '最优惠',
              show: 'this.isNewUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/ef614fe140a0495950c9ff87454df0c7",//老用户(未到期续费)
              txt: "年卡",
              pricetxt: "4498",
              type: "xfPrice",
              avg: "月均374元",
              tips: '最优惠',
              show: 'this.isOldUser&&this.isNoEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/b48b00bd1f886604cc5d6ad799f26c1a",//老用户到期续费
              txt: "年卡",
              pricetxt: "4998",
              type: "price",
              avg: "月均416元",
              tips: '最优惠',
              show: 'this.isOldUser&&this.isEnd'
            },
          ],
        },
        {
          name: '尊享会员实战直播版',
          num: "（含35项特权）",
          prices: [
            {
              order: "https://uppay.upchina.com/unifiedpay/592a1ee70f84b1f7507fc5ead94f7e7a",//新人价，新人日常价
              txt: "两周",
              pricetxt: "198",
              type: "newPrice",
              avg: "原价1598元/月",
              tips: '首购特惠',
              show: 'this.isNewUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/8eb6b975c261f169cb20a37640e83795",
              txt: "月卡",
              pricetxt: "1598",
              type: "newNormal",
              avg: "",
              show: 'this.isNewUser||this.isOldUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/8b388a0b573ae6d4cf953118cb480997",//季卡
              txt: "季卡",
              pricetxt: "3998",
              avg: "月均1332元",
              show: 'this.isNewUser||this.isOldUser'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/d203a28422e3b7c41ebc52c441cb020a",//新人，老人未到期
              txt: "半年卡",
              pricetxt: "6498",
              type: "xfPrice",
              avg: "月均1003元",
              show: 'this.isNewUser || (this.isOldUser && this.isNoEnd)'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/e8e34fbb4b37d260c423d46cb35806cd",//老用户到期续费
              txt: "半年卡",
              pricetxt: "6998",
              type: "price",
              avg: "月均1166元",
              show: 'this.isOldUser&&this.isEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/e86895fefccb9d47da7309b32dd320a0",//新人 老人未到期
              txt: "年卡",
              pricetxt: "11800",
              avg: "月均983元",
              tips: '最优惠',
              show: 'this.isOldUser&&this.isNoEnd'
            },
            {
              order: "https://uppay.upchina.com/unifiedpay/e86895fefccb9d47da7309b32dd320a0",//老人到期
              txt: "年卡",
              pricetxt: "12500",
              avg: "月均983元",
              tips: '最优惠',
              show: 'this.isOldUser&&this.isEnd'
            }
          ],
        }
      ],
    };
  },
  computed: {
    currentIndex() {
      return this.getCurrentIndex()
    },
    statu: {
      get() {
        this.curtTabIndex = this.currentIndex
        return this.value;
      },
      set() {
        this.$emit("input", false);
      },
    },
    uid() {
      return this.getuid()
    },
  },
  created: function () {
    
  },
  mounted() {
  },
  watch: {
    tabs(val) {
    },
    curtTabIndex(val) {
      console.log(val)
      this.initData()
      this.initCurtOrderIndex()
    }
  },
  methods: {
    //设置订单当前索引高亮
    initCurtOrderIndex() {
      this.$nextTick(() => {
        let divs = this.$refs.orderCnt.children
        divs = Array.from(divs)
        let index
        for (const [key, value] of divs.entries()) {
          if (!value.innerHTML.includes('display')) {
            console.log(key)
            index = key
            break
          }
        }
        let curtorderObj = this.tabs[this.curtTabIndex].prices[index]
        this.getCurtorder(curtorderObj,index)
      })
    },
    //根据权限过滤价格列表的显示隐藏
    getShow(showStr) {
      return eval(showStr)
      // let arr
      // if (showStr.includes('&&')) {
      //   arr = showStr.split('&&')
      //   return arr.every(v => this[v])
      // } else if (showStr.includes('||')) {
      //   arr = showStr.split('||')
      //   return arr.some(v => this[v])
      // } else {
      //   arr = [showStr]
      //   return arr.some(v => this[v])
      // }
    },
    initData() {
      let { name, prices } = this.tabs[this.curtTabIndex]
      let { isVip, isPower, isOldUser } = this.getrulesObj(name)
      if (!isVip) return
      this.isNewUser = !isOldUser
      this.isOldUser = isOldUser
      this.isNoEnd = isPower
      this.isEnd = !isPower
    },
    scrollOrder(value) {
      if (value == 0) {
        this.$refs.orderCnt.scrollLeft = 0;
      }
      if (value == 1) {
        this.$refs.orderCnt.scrollLeft = this.$refs.orderCnt.clientWidth;
      }
    },
    //选中订单
    getCurtorder(item, index) {
      this.curtOrderIndex = index
      this.curtorderObj = item
    },
    //立即开通
    openPopBuy(item) {
      if (!this.uid) return Toast('请登录')
      if (!item) return Toast('请选中订单卡')
      window.open(item.order)
    },
    closePop() {
      this.$emit("input", false);
    }
  },
};
</script>
<style lang="less" scoped>
.mask_order {
  font-size: 0.16rem;
  .order_nav_item:nth-of-type(1) {
    &.active {
      color: #ffdba9 !important;
      background: url(./images/nav_vip_active.png) no-repeat !important;
    }
  }
  .order_nav_item:nth-of-type(2) {
    &.active {
      color: #884100 !important;
      background: url(./images/nav_svip_active.png) no-repeat !important;
    }
  }
  .order_nav_item:nth-of-type(3) {
    &.active {
      color: #fbd8aa !important;
      background: url(./images/nav_szvip_active.png) no-repeat !important;
    }
  }
}
</style>
