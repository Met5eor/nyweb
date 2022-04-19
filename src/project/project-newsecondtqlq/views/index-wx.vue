
<!-- 集合页活动页面  -->
<template>
  <div class="page_wrap" ref="page_wrap">
    <div class="wx_head" v-if="isWX">
      <div class="upName">{{shareUpName}}</div>
      <img v-if="isNewUesr" src="./images/wx_new_head.png" alt="">
      <img v-else src="./images/wx_old_head.png" alt="">
      <div class="btn" @click="showReceiveMask=true"></div>
    </div>
    <!-- 内容 -->
    <div class="pg" :style="{marginTop: isWX?'0px':'120px'}">
      <div v-show="curIndex==0" class="tab_cnt tab_cnt0">
        <img src="./images/tab1_cnt_1.png" alt="">
        <img src="./images/tab1_cnt_2.png" alt="">
        <div class="modular swiper">
          <img class="bg_img" src="./images/tab1_cnt_sw_bg.png" alt="">
          <div class="content">
            <van-swipe class="cnt0-swipe" :autoplay="4000" indicator-color="#FFE2C1">
              <van-swipe-item><img src="./images/tab1_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab1_cnt_sw2.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab1_cnt_sw3.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <div v-show="curIndex==1" class="tab_cnt tab_cnt1">
        <img src="./images/tab2_cnt_1.png?v=2" alt="">
      </div>
      <div v-show="curIndex==2||curIndex==3" class="tab_cnt tab_cnt2">
        <img src="./images/tab3_cnt_1.png" id="jjxj" class="tab3_cnt_1" alt="">
        <div ref="bkxj">
          <img src="./images/tab3_cnt_2.png" alt="">
          <img src="./images/tab3_cnt_3.png" alt="">
        </div>
      </div>
      <div v-show="curIndex==4" class="tab_cnt tab_cnt4">
        <div class="modular click_wrap">
          <img src="./images/gjdp_img1.png?v=1" alt="">
          <a href="upchina://wxapp/mini?userName=gh_c2c24c1e700e&path=pages/activity/apptoserver/apptoserver&id=0&type=0" target="_blank" class="btn btn_wx"></a>
        </div>
      </div>
      <div v-if="curIndex==5" class="tab_cnt tab_cnt5">
        <div class="modular swiper6">
          <img src="./images/tab6_cnt_1.png" alt="">
          <div class="content">
            <van-swipe class="cnt5-swipe" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/tab6_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab6_cnt_sw2.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <div v-if="curIndex==6" class="tab_cnt tab_cnt6">
        <div class="modular click_wrap">
          <img src="./images/gglyb_img1.png?v=1" alt="">
          <a href="upchina://wxapp/mini?userName=gh_c2c24c1e700e&path=pages/activity/apptoserver/apptoserver&id=0&type=0" target="_blank" class="btn btn_wx"></a>
        </div>
        <div class="modular swiper_modular swiper_gglyb">
          <img src="./images/gglyb_sw_bg.png" alt="">
          <div class="content">
            <van-swipe class="cnt5-swipe" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/gglyb_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/gglyb_sw2.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <img src="./images/gglyb_img2.png" alt="">
      </div>
      <div v-show="curIndex==7" class="tab_cnt tab_cnt7">
        <div class="modular click_wrap">
          <img src="./images/bklyb_img1.png" alt="">
          <a href="upchina://wxapp/mini?userName=gh_c2c24c1e700e&path=pages/activity/apptoserver/apptoserver&id=0&type=0" target="_blank" class="btn btn_wx"></a>
        </div>
        <img src="./images/bklyb_img2.png" alt="">
        <img src="./images/bklyb_img3.png" alt="">
      </div>
      <div v-if="curIndex==8" class="tab_cnt tab_cnt8">
        <div class="modular swiper9">
          <img src="./images/tab9_cnt_bg.png" alt="">
          <div class="content">
            <van-swipe class="cnt5-swipe" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/tab9_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab9_cnt_sw2.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab9_cnt_sw3.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <div v-show="curIndex==9" class="tab_cnt tab_cnt9">
        <img src="./images/tab10_cnt_1.png" alt="">
      </div>
      <div v-if="curIndex==10" class="tab_cnt tab_cnt10">
        <div class="modular swiper11">
          <img src="./images/tab11_cnt_bg.png" alt="">
          <div class="content">
            <van-swipe class="cnt5-swipe" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/tab11_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab11_cnt_sw2.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab11_cnt_sw3.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <div v-show="curIndex==11" class="tab_cnt tab_cnt11">
        <img src="./images/tab12_cnt_1.png?v=2" alt="">
      </div>
      <div v-show="curIndex==12||curIndex==13" class="tab_cnt tab_cnt12">
        <!-- <img src="./images/tab13_cnt_1.png" id="ybsfc" alt=""> -->
        <img src="./images/tab13_cnt_2.png" id="sddxcl" alt="">
      </div>
      <div v-if="curIndex==14" class="tab_cnt tab_cnt14">
        <div class="modular swiper15">
          <img src="./images/tab15_cnt_1.png" alt="">
          <img src="./images/tab15_cnt_bg_sw.png" alt="">
          <img src="./images/tab15_cnt_2.png" alt="">
          <div class="content lunbo">
            <div class="video_wrap">
              <div class="tag">新用户限免经典战法抢先看</div>
              <video preload="auto" id="main_video" class="main_video" controls="controls" src="http://upfv.upchina.com/202005/202005080800.mp4"></video>
            </div>
            <ul class="tab">
              <li class="active">
                <p>1.看点攻击波战法，擒获汉缆股份连板大肉。</p>
              </li>
              <li class="">
                <p>2.复盘锁牛股，怒抓反包龙头汇金通。</p>
              </li>
              <li class="">
                <p>3.明日个股推演。</p>
              </li>
            </ul>

            <van-swipe class="cnt5-swipe" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/tab15_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab15_cnt_sw2.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab15_cnt_sw3.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab15_cnt_sw4.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <div v-show="curIndex==15" class="tab_cnt tab_cnt15">
        <div class="modular vipcenter">
          <img src="./images/zswxfwq_img1.png" alt="">
          <a href="upchina://wxapp/mini?userName=gh_c2c24c1e700e&path=pages/activity/apptoserver/apptoserver&id=0&type=0" target="_blank" class="btn btn_vipcenter"></a>
        </div>
      </div>
      <div v-show="curIndex==16" class="tab_cnt tab_cnt16">
        <img src="./images/tab17_cnt_1.png?v=3" alt="">
        <a href="https://cdn.upchinaproduct.com/acm/202006/gnnvipcenterh5/index.html" class="btn btn_discount" target="_blank">查看更多会员折扣商品</a>
      </div>
      <div v-show="curIndex==17" class="tab_cnt tab_cnt17">
        <img src="./images/tab18_cnt_1.png?v=1" alt="">
        <a href="https://cdn.upchinaproduct.com/acm/202011/gnnpcxzrw/index.html" target="_blank" class="btn btn_use">立即使用</a>
      </div>
      <div v-show="curIndex==18" class="tab_cnt tab_cnt18">
        <img src="./images/tab19_cnt_1.png" alt="">
      </div>
      <div v-show="curIndex==19||curIndex==29" class="tab_cnt tab_cnt19">
        <img src="./images/tab_cnt_qsdp_1.png" alt="">
        <img src="./images/tab_cnt_qsdp_2.png" alt="">
        <div class="tab_sct">
          <img src="./images/tab_cnt_qsdp_3.png" alt="">
          <div ref="spqsdpsz" class="content">
            <van-swipe v-if="curIndex==19||curIndex==29" class="swiper" :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/pic_tab_cnt_qsdp_spsz_1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/pic_tab_cnt_qsdp_spsz_1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/pic_tab_cnt_qsdp_spsz_3.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>

        <img src="./images/tab_cnt_qsdp_4.png" alt="">
        <img src="./images/tab_cnt_qsdp_5.png" alt="">
        <img ref="spqsdpsz" src="./images/tab_cnt_qsdp_6.png" alt="" id="qsabc">
      </div>
      <div v-show="curIndex==20" class="tab_cnt tab_cnt20">
        <img src="./images/tab21_cnt_1.png" alt="">
        <img src="./images/tab21_cnt_2.png" alt="">
      </div>
      <div v-show="curIndex==22||curIndex==23" class="tab_cnt tab_cnt22">
        <img src="./images/tab22_cnt_1.png" alt="">
        <img src="./images/tab22_cnt_2.png" alt="">
        <img src="./images/tab22_cnt_3.png" alt="" ref="smcdzb">
        <img src="./images/tab22_cnt_4.png" alt="">
        <img src="./images/tab22_cnt_5.png" alt="">
      </div>
      <div v-show="curIndex==24" class="tab_cnt tab_cnt24">
        <img src="./images/tab24_cnt_1.png" alt="">
        <img src="./images/tab24_cnt_2.png" alt="">
        <img src="./images/tab24_cnt_3.png" alt="">
      </div>
      <div v-show="curIndex==25" class="tab_cnt tab_cnt25">
        <img src="./images/tab25_cnt_1.png" alt="">
        <img src="./images/tab25_cnt_2.png" alt="">
        <img src="./images/tab25_cnt_3.png" alt="">
        <img src="./images/tab25_cnt_4.png" alt="">
      </div>
      <div v-show="curIndex==26" class="tab_cnt tab_cnt26">
        <img src="./images/tab26_cnt_1.png" alt="">
      </div>
      <div v-show="curIndex==27" class="tab_cnt tab_cnt27">
        <img src="./images/tab27_cnt_1.png" alt="">
        <img src="./images/tab27_cnt_2.png" alt="">
        <img src="./images/tab27_cnt_3.png" alt="">
      </div>
      <div v-if="curIndex==28" class="tab_cnt tab_cnt28">
        <img src="./images/tab28_cnt_1.png" alt="">
        <div class="modular swiper  u-fx-ac-jc">
          <img class="bg_img" src="./images/tab28_cnt_2.png" alt="">
          <div class="content ">
            <van-swipe class="swiper-box " :autoplay="4000" indicator-color="#72441a">
              <van-swipe-item><img src="./images/tab28_cnt_sw1.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab28_cnt_sw2.png" alt=""></van-swipe-item>
              <van-swipe-item><img src="./images/tab28_cnt_sw3.png" alt=""></van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <img src="./images/tab28_cnt_3.png" alt="">
      </div>
      <!-- 特色题材 -->
      <div v-if="curIndex==31" class="tab_cnt tab_cnt_tstc tab_cnt31">
        <img src="./images/tab_cnt_tstc_1.png" alt="">
        <div class="tab_sct tab_sctsz ">
          <div class="tab_sp_tip">左右滑动查看</div>
          <van-swipe class="swiper-box " :autoplay="4000" indicator-color="#72441a">
            <van-swipe-item><img src="./images/pic_tab_cnt_tstc_spsz_1.png" alt=""></van-swipe-item>
            <van-swipe-item><img src="./images/pic_tab_cnt_tstc_spsz_2.png" alt=""></van-swipe-item>
          </van-swipe>
        </div>
        <div class="tab_sct tab_sctgn ">
          <div class="tab_sp_tip">左右滑动查看</div>
          <van-swipe class="swiper-box2" :autoplay="4000" indicator-color="#72441a">
            <van-swipe-item><img src="./images/pic_tab_cnt_tstc_spgn_1.png" alt=""></van-swipe-item>
            <van-swipe-item><img src="./images/pic_tab_cnt_tstc_spgn_2.png" alt=""></van-swipe-item>
            <van-swipe-item><img src="./images/pic_tab_cnt_tstc_spgn_3.png" alt=""></van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>

    <div class="footer" v-if="showFooter">
      <div class="flex-col section_3">
        <div class="flex-col group_3">
          <span class="text_2">{{shareUpName}}给您赠送了一张股牛牛尊享会员7天礼品卡，赶快下载股牛牛app体验上述功能吧！</span>
        </div>
      </div>
      <div class="justify-between section_5">
        <span class="text_3">2998元/半年</span>
        <div class="flex-col items-center text-wrapper" @click="showReceiveMask=true">
          <span>领取免费用7天</span>
        </div>
      </div>
    </div>

    <!-- 领取弹窗 -->
    <MaskPoupon v-model="showReceiveMask" isClose class="ReceiveMask">
      <img v-if="isNewUesr" class="" style="width:6rem" src="./images/wx_new_mask.png" alt="">
      <img v-else class="" style="width:6rem" src="./images/wx_old_mask.png" alt="">
      <div class="btn pointer " @click="download"></div>
    </MaskPoupon>
  </div>
</template>

<script>
import MaskPoupon from "@c/MaskPoupon1.vue";
import tools from "@u/tools.js";
import { Toast } from 'vant';
import { getregdateday } from '../api/index'
const iosStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715325577";
const androidStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715261800&ch=2000000842";
export default {
  name: 'poolshare',
  components: {
    MaskPoupon
  },
  data() {
    return {
      showFooter: false,
      showReceiveMask: false,
      upName: 'up123456',
      shareUpName: 'upzoujuan',
      showHead: true,
      isNewUesr: true,
      downloadUrl: tools.isTerminal("ios") ? iosStore : androidStore, // app下载地址
      // isWX:this.$tools.isTerminal('weixin'),
      isWX: true,
      list_items: [
        {
          id: 0,
          name: '红黄白股池',
          icon: require('./images/list_icon1.png')
        },
        {
          id: 1,
          name: '五星股票池',
          icon: require('./images/list_icon2.png')
        },
        {
          id: 2,
          name: '竞价先机',
          icon: require('./images/list_icon3.png'),
        },
        {
          id: 3,
          name: '板块先机',
          icon: require('./images/list_icon4.png'),
          ref: 'bkxj',
        },
        {
          id: 4,
          name: '超短盯盘/高级盯盘',
          icon: require('./images/list_icon5.png')
        },
        {
          id: 5,
          name: '涨停因子',
          icon: require('./images/list_icon6.png')
        },
        {
          id: 6,
          name: '个股琅琊榜',
          icon: require('./images/list_icon7.png')
        },
        {
          id: 7,
          name: '板块琅琊榜',
          icon: require('./images/list_icon8.png')
        },
        {
          id: 8,
          name: '短线历史数据',
          icon: require('./images/list_icon9.png')
        },
        {
          id: 9,
          name: '市场情绪',
          icon: require('./images/list_icon10.png')
        },
        {
          id: 10,
          name: '涨停推演',
          icon: require('./images/list_icon11.png'),
          item_pt: 'PC'
        },
        {
          id: 11,
          name: '超短复盘/牛牛复盘',
          icon: require('./images/list_icon12.png')
        },
        // {
        // id:12,
        //   name: '研报私房菜',
        //   icon: require('./images/list_icon13.png')
        // },
        // {
        // id:13,
        //   name: '深度低吸策略',
        //   icon: require('./images/list_icon14.png')
        // },
        // {
        // id:14,
        //   name: '贵宾直播室',
        //   icon: require('./images/list_icon15.png')
        // },
        {
          id: 15,
          name: '专属微信服务圈',
          icon: require('./images/list_icon16.png')
        },
        {
          id: 16,
          name: '会员折扣',
          icon: require('./images/list_icon17.png')
        },
        {
          id: 17,
          name: '尊享会员抽奖',
          icon: require('./images/list_icon18.png'),
          item_pt: 'PC'
        },
        {
          id: 18,
          name: '专属标识',
          icon: require('./images/list_icon19.png')
        },
        {
          id: 19,
          name: '趋势盯盘',
          icon: require('./images/list_icon21.png')
        },
        {
          id: 29,
          name: '趋势ABC指标',
          icon: require('./images/icon_qsabc.png'),
          ref: 'spqsdpsz',
        },
        {
          id: 20,
          name: '涨停挖掘',
          icon: require('./images/list_icon22.png')
        },
        {
          id: 22,
          name: '神秘C点股池',
          icon: require('./images/list_icon23.png')
        },
        {
          id: 23,
          name: '神秘C点指标',
          icon: require('./images/list_icon24.png'),
          ref: 'smcdzb'
        },
        {
          id: 24,
          name: '5分钟课程',
          icon: require('./images/list_icon25.png')
        },
        {
          id: 25,
          name: '手机L2指标',
          icon: require('./images/list_icon26.png'),
          item_pt: '正式版专享',
          class: 'red',
        },
        {
          id: 26,
          name: '自选股琅琊榜',
          icon: require('./images/list_icon27.png'),
          item_pt: '敬请期待',
          class: 'red',
        },
        {
          id: 27,
          name: '攻守道股池',
          icon: require('./images/list_icon28.png'),
          item_pt: '敬请期待',
          class: 'red',
        },
        {
          id: 28,
          name: '超级L2<span>(PC版)</span>',
          icon: require('./images/list_icon29.png'),
          item_pt: '正式版专享',
          class: 'red',
        },
        {
          id: 31,
          name: '特色题材',
          icon: require('./images/list_icon_tstc.png'),
          item_pt: '正式版专享'
        },
        {
          id: 32,
          name: '',
          icon: require('./images/list_icon20.png'),
          item_pt: '敬请期待',
          class: 'red',
        },
      ],
      videList: [
        "http://upfv.upchina.com/202005/202005080800.mp4",
        "http://upfv.upchina.com/202005/202005080801.mp4",
        "http://upfv.upchina.com/202005/202005080802.mp4"
      ],
      curIndex: 0
    }
  },
  async created() {
    this.curIndex = this.$route.query.tabindex === 'undefined' ? 0 : Number(this.$route.query.tabindex);
    let query = window.location.href.split("?")[1];
    this.business = this.$tools.getQueryVariable("business", query);
    let { shareUpName = "", upName = "" } = await this.initshareInfo();
    this.upName = upName
    this.shareUpName = shareUpName
    if (!this.upName) return
    this.isNewUesr = await this.isCheckNew().catch(err => console.log(err))
  },
  mounted() {
    let curItem = this.list_items[this.curIndex]
    if (curItem.ref) {
      this.scroll(curItem)
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //初始化分享信息
    initshareInfo() {
      return new Promise((resolve, reject) => {
        shareApi.getShareInfo({
          callback: (data) => {
            console.log(data, 'data')
            if (data.ret !== 0) return Toast(data.message);
            resolve(data.data)
          },
        });
      })
    },
    //定位
    scroll(item) {
      setTimeout(()=>{
         let top = this.$refs[item.ref].offsetTop
         window.scrollTo(0, top)
      },500)
    },
    isCheckNew() {
      return new Promise(async (resolve, reject) => {
        let req = {
          uid: this.upName
        }
        let { day } = await getregdateday(req).catch(err => reject(err))
        if (Number(day) >= 7) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 348) {
        this.showFooter = true;
      } else {
        this.showFooter = false;
      }
    },
    download() {
      window.open(this.downloadUrl);
    },
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
  }
}
</script>
<style src="./style-v3.css" scoped>
</style>
<style lang="less" scoped>
.wx_head {
  height: 4rem;
  width: 100%;
  background: #fff;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .btn {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 5rem;
    height: 0.8rem;
  }
  .upName {
    position: absolute;
    color: #d1553a;
    font-size: 12px;
    left: 1.31rem;
    top: 0.63rem;
    width: 1.2rem;
    height: 0.3rem;
  }
}
.pg {
  margin-top: 4rem;
  .tab_cnt0 {
  }
  .tab_cnt19 {
    position: relative;
    .tab_sct {
      position: relative;
      .content {
        width: 6.9rem;
        position: absolute;
        bottom: 0;
        left: 0.3rem;
        .van-swipe-item {
          // height: 3rem;
        }
        img {
          height: 100%;
        }
      }
    }
  }
  .tab_cnt28 {
    .swiper-box {
      height: 4.5rem;
      width: 6rem;
      .van-swipe-item {
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .tab_cnt31 {
    .swiper-box {
      margin: 0 auto;
      width: 6.8rem;
      height: 9.5rem;
      .van-swipe-item {
        text-align: center;
        // img {
        //   width: 100%;
        //   height: 100%;
        // }
      }
    }
    .swiper-box2 {
      margin: 0 auto;
      width: 6.8rem;
      height: 13rem;
    }
  }
}

.footer {
  .section_3 {
    padding: 0.12rem 0;
    color: rgb(255, 115, 40);
    font-size: 0.26rem;
    line-height: 0.3rem;
    white-space: nowrap;
    filter: drop-shadow(0px -0.1rem 0.1rem #0000001a);
    background-color: rgb(255, 240, 207);
    border-radius: 0.01rem;
    .group_3 {
      margin: 0 0.2rem;
      overflow: hidden;
      height: 0.26rem;
      position: relative;
      overflow-x: scroll;
      .text_2 {
        margin-right: -2.78rem;
      }
      .section_4 {
        background-image: linear-gradient(
          270deg,
          rgb(255, 240, 207) 0%,
          rgb(255, 240, 207) 0%,
          rgba(255, 240, 207, 0) 58.91%,
          rgba(255, 240, 207, 0) 100%
        );
        height: 0.26rem;
        position: absolute;
        left: 6.17rem;
        right: 0;
        bottom: 0;
      }
    }
  }
  .section_5 {
    padding-left: 0.24rem;
    background-color: rgb(255, 255, 255);
    .text_3 {
      align-self: center;
      color: rgb(179, 179, 179);
      font-size: 0.36rem;
      line-height: 0.43rem;
      white-space: nowrap;
      text-decoration: line-through;
    }
    .text-wrapper {
      padding: 0.3rem 0 0.26rem;
      color: rgb(255, 255, 255);
      font-size: 0.36rem;
      line-height: 0.43rem;
      white-space: nowrap;
      background-image: url("./images/footer-btn.png");
      background-position: 0px 0px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 3.14rem;
      height: 0.98rem;
    }
  }
}
//弹窗
.ReceiveMask {
  .btn {
    position: absolute;
    width: 3.5rem;
    height: 1.2rem;
    left: 50%;
    bottom: 4.05rem;
    transform: translate(-50%, 0);
  }
}

// 指示器
.van-swipe__indicators {
  bottom: 2px !important;
  background: rgba(0, 0, 0, 0.1);
}
.list_item {
  display: block;
  color: #ffe2c1;
}
// .fixed_head {
//   position: relative;
//   height: 120px;
//   .list_wrap {
//     // border: 1px solid red;
//     height: 120px;
//     display: flex;
//     align-content: center;
//     position: absolute;
//     left: 0;
//     .list_item {
//       display: flex;
//       flex-flow: column;
//       justify-content: center;
//     }
//   }
// }
</style>
