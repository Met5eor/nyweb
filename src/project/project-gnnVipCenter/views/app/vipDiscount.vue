<template>
  <!-- 会员专属折扣-->
  <div class="discount" ref="discount">
    <div class="title fontwight">会员专属折扣</div>
    <div class="discount_box">
      <div class="discount_list" v-for="(item,index) in vipDate" :key="index" @click="vipBuy(item)">
        <div class="avator">
          <img :src="item.img">
        </div>
        <div class="info_box">
          <h3>{{item.name}}</h3>
          <p>{{item.info}}</p>
          <div class="type_box" v-if="item.tips.length">
            <span class="type" v-for="(items,indexs) in item.tips" :key="indexs">{{items}}</span>
          </div>
          <div class="day" v-if="item.day_time || item.day_time === 0">
            权限剩余：{{`${(item.day_time == 0 || item.day_time == 'unuse') ? '已到期': `${item.day_time}天`} `}}
          </div>
        </div>
        <div class="price_box">
          <p class="price" v-html="item.price"></p>
          <div class="discount_price">
            <span>会员价</span>
            <span>{{item.discount_price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { allmodule } from '../../api/vipCenter'
import { appLogin } from '@u/login'
export default {
  name: "vipDiscount",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ["getuid", 'getrulesList'],
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
      vipDate: [
        {
          name: "短线猎手交易圈",
          img: require("./images/pic_dxlsjyq.png"),
          info: "尾盘买早盘卖，年胜率高达72%",
          tips: ["盘中买卖点", "持股1-5天"],
          price: "<span>1598</span>元",
          discount_price: "1398元",
          power_id: 6071,
          day_time: "",
          isRight: false,
          hasRight: "upchina://advisor/chat?type=1&targetId=100009&groupId=100009",
          noRight: "https://uppay.upchina.com/unifiedpay/06f40b4dc3177f5bc8237ae1862600a0",
          hasRightOrder: "https://uppay.upchina.com/unifiedpay/1f609749f50c0f9e0082fee38fd44f1f"
        },
        {
          name: "21天核心指标训练营",
          img: require("./images/pic_rfxly.png"),
          info: "包含月度尊享会员",
          tips: ["短线入门课"],
          price: "<span>998</span>元/永久",
          discount_price: "298元",
          power_id: 6185,
          day_time: "",
          isRight: false,
          hasRight: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162",
          noRight: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162",
          hasRightOrder: "https://uppay.upchina.com/unifiedpay/3a6231f2e41741815ca5f2c74bf5d162"
        },
        {
          name: "短线战法专项班",
          img: require("./images/dxzfzxb.png"),
          info: "四大龙头主升浪专项训练",
          tips: ["打造赚钱模型"],
          price: "<span>4980</span>元",
          discount_price: "3980元",
          power_id: 6113, //都跳转营销页
          day_time: "",
          isRight: false,
          hasRight: "https://cdn.upchinaproduct.com/acm/202102/fljhmiddle/index.html",
          noRight: "https://cdn.upchinaproduct.com/acm/202102/fljhmiddle/index.html",
          hasRightOrder: "https://cdn.upchinaproduct.com/acm/202102/fljhmiddle/index.html"
        },
        {
          name: "趋势擒龙交易圈",
          img: require("./images/pic_qsqljyq.png"),
          info: "布局产业链，搏击主升浪",
          tips: ["盘中买卖点", "持股一个月以上"],
          price: "<span>1598</span>元",
          discount_price: "1398元",
          power_id: 6110,
          day_time: "",
          isRight: false,
          hasRight: "upchina://advisor/chat?type=1&targetId=100015&groupId=100015",
          noRight: "https://uppay.upchina.com/unifiedpay/3df034c4b57e7c39361894f01b2ac880",
          hasRightOrder: "https://uppay.upchina.com/unifiedpay/1f609749f50c0f9e0082fee38fd44f1f?t=0"
        },
      ],
    };
  },
  watch: {
    uid(val) {
      this.initRole()
    },
    rulesList(val) {
      // console.log(val, 'rulesList')
    }
  },
  computed: {
    rulesList() {
      return this.getrulesList()
    },
    uid() {
      return this.getuid()
    }
  },
  created: function () {
    this.initRole()
  },
  mounted() {
  },
  methods: {
    async initRole() {
      if (!this.uid) return console.log('请登录')
      let req = {
        uid: this.uid
      }
      let authorityList = await allmodule(req)
      this.vipDate.forEach(item => {
        let obj = authorityList.find(v => v.mid === item.power_id)//权限是否过期
        if (!obj) return
        if (obj.endtime > new Date().getTime()) {
          item.isRight = true;
          item.day_time = this.timediff(item.endtime)
        } else {
          item.day_time = 'unuse'
        }
      })
    },
    //计算时差
    timediff(timeEnd, timeStart) {
      var now = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
      var endtime = new Date(new Date(timeEnd).setHours(0, 0, 0)).getTime();
      if (timeStart) {
        var startTime = new Date(new Date(timeStart).setHours(0, 0, 0)).getTime();
        var utc = endtime - startTime;
        console.log("会员天数：", Math.floor(utc / (24 * 60 * 60 * 1000)))
        if (Math.floor(utc / (24 * 60 * 60 * 1000)) <= 10) {
          //会员10天以内新用户
          return true;
        } else {
          return false
        }
      } else if (timeEnd) {
        var utc = endtime - now;
        if (utc >= 0) {
          //返回会员天数
          var day = Math.floor(utc / (24 * 60 * 60 * 1000));//相隔天数
          return day;
        } else {
          return false
        }
      }
    },
    vipBuy(item) {
      if (!item) return;
      if (item.name == "21天核心指标训练营") {
        let link = "https://ntgapp.upchina.com/column/detail?articleid=10875";
        window.open(link);
        return;
      }
      if (this.rulesObj.isVip) {
        if (item.day_time) {
          window.open(item.hasRight);
        } else {
          if (this.uid) {
            this.orderSplice(item.hasRightOrder, 1);
          } else {
            appLogin();
          }
        }
      } else {
        if (this.uid) {
          this.orderSplice(item.noRight, 1);
        } else {
          appLogin();
        }
      }
    },
    //增加渠道统计
    orderSplice(orderUrl, type) {
      /*
      * orderUrl  订单地址
      * type      1:代表h5 2代表pc
      */
      //获取URL问号后面的参数值，最后以对象键值对的方式存储
      ~function (pro) {
        function QueryURLParameter() {
          var reg = /([^?&#=]+)=([^?&#=]+)/g;
          var obj = {};
          this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
          });
          return obj;
        }
        pro.QueryURLParameter = QueryURLParameter;
      }(String.prototype);
      var urlQuery = window.location.href.QueryURLParameter();
      var chString = '',
        ch = urlQuery['orderch'] || '';
      if (ch) {
        if (orderUrl.indexOf('?') == -1) {
          chString = '?ch=' + ch;
        } else {
          chString = '&ch=' + ch;
        }
      }
      if (type === 1) {
        window.open(orderUrl + chString)
        // upNativeComm.exec("WebView.open", {
        //     'url': orderUrl + chString
        // });
      } else {
        upNativeComm.exec("open.webview", {
          'url': orderUrl + chString
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.price_box .discount_price span {
  height: 0.4rem;
  line-height: 0.3rem;
}
.info_box {
  align-items: flex-start;
}
</style>
