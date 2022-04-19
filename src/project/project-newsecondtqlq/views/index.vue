
<!-- 集合页app端  -->
<template>
  <div class="page_wrap" ref="page_wrap">
    
    <div class="fixed_head" v-show="showHead">
      <div class="list_wrap" id="list_wrap" ref="list_wrap">
        <div :href="item.id" class="list_item" :ref="'list_item_'+index" @click="setCurIndex(item)" :class="curIndex==item.id?'cur':''" v-for="(item,index) in list_items" :key="index" data-id="0">
          <div class="item_avator"><img :src="item.icon"></div>
          <div class="item_name" v-html="item.name"></div>
          <div class="item_pt" :class="{'zi':item.item_pt==='PC','red':item.class==='red'}">{{item.item_pt||'App+PC'}}={{item.id}}</div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="pg">
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
          <div id="spqsdpsz" class="content">
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
    <!-- 底部 -->
    <div class="footer" v-if="showFooter">
      <!-- 新用户 -->
      <div v-if="!ruleObj.isOldUser">
        <div class="about_svip">
          <div class="info">*尊享会员SVIP专属特权,<span>解锁免费使用</span></div>
          <a href="https://cdn.upchinaproduct.com/acm/202006/gnnvipcenterh5/index.html" class="btn_about" data-track="newsecondtqlq_about1">了解会员详情&gt</a>
        </div>
        <div class="price_box">
          <div class="btn_buy" data-track="newsecondtqlq_buy1">
            <div class="price_txt" @click="buy(newUserOrder)">
              298元/30天<span>专属体验价</span>
            </div>
            <div class="cd">
              <span class="cd_txt">优惠倒计时</span>
              <van-count-down :time="time">

                <template #default="timeData" millisecond>
                  <span class="block u-fx-ac-jc">{{ timeData.days}}</span>
                  <span class="colon">:</span>
                  <span class="block u-fx-ac-jc">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block u-fx-ac-jc">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block u-fx-ac-jc">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
          </div>
          <div class="btn_share" data-track="newsecondtqlq_share1" @click="share">分享免费看7天</div>
        </div>
      </div>
      <!-- 老用户，2116权限未到期续费2598 -->
      <div v-else-if="ruleObj.isOldUser&&ruleObj.isPower">
        <div class="about_svip">
          <div class="info">您的会员权限将于,<span><i>{{ruleObj.vipEndTime | gmtToDate}}</i>失效</span></div>
          <a href="https://cdn.upchinaproduct.com/acm/202006/gnnvipcenterh5/index.html" class="btn_about" data-track="newsecondtqlq_about3">了解会员详情&gt</a>
        </div>
        <div class="price_box normal_price">
          <div class="btn_buy" data-track="newsecondtqlq_buy3">
            <div class="price_txt" @click="buy(oldUserHasPowerOrder)">
              续费价：2598元/半年
            </div>
          </div>
          <div class="btn_share" data-track="newsecondtqlq_share3" @click="share">分享免费看7天</div>
        </div>
      </div>
      <!-- 老用户，2116权限到期续费2998 -->
      <div v-else-if="ruleObj.isOldUser&&!ruleObj.isPower">
        <div class="about_svip">
          <div class="info">您的会员权限已经到期</div>
          <a href="https://cdn.upchinaproduct.com/acm/202006/gnnvipcenterh5/index.html" class="btn_about" data-track="newsecondtqlq_about3">了解会员详情&gt</a>
        </div>
        <div class="price_box normal_price">
          <div class="btn_buy" data-track="newsecondtqlq_buy3">
            <div class="price_txt" @click="buy(oldUserNoPowerOrder)">
              续费价：2998元/半年
            </div>
          </div>
          <div class="btn_share" data-track="newsecondtqlq_share3" @click="share">分享免费看7天</div>
        </div>
      </div>
    </div>
    <!-- 购买成功-14天 回调-->
    <MaskPoupon v-model="showSuss" v-if="showSuss">
      <img style="width:6rem" src="./images/pop_bg_open.png">
    </MaskPoupon>

    <!-- 新人专享悬浮 -->
    <!-- <div class="btn fryh fryk" v-if="!ruleObj.isOldUser" >
      <img class="fryh_img" src="./images/pic_new_lq.png" alt="" @click="buy">
      <div class="cd">
        <van-count-down :time="time">
          <template #default="timeData" millisecond>
            <span class="block cd_obj u-fx-ac-jc">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block cd_obj u-fx-ac-jc">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block cd_obj u-fx-ac-jc">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
    </div> -->

    <!-- 右侧下载悬浮 -->
    <div class="sider_bar" data-track="newsecondtqlq_down">
      <a href="https://cdn.upchinaproduct.com/acm/202102/xzszxhy/index.html">
        <img src="./images/pic_down.png">
      </a>
      <div class="btn_close"></div>
    </div>
  </div>
</template>

<script>
import { allmodule, getUserInfo } from '../api/index'
import MaskPoupon from "@c/MaskPoupon1.vue";
import Msg from "@c/MsgH5Url.vue";
import tools from "@u/tools.js";
import { appLogin, appCheckLogin } from '@u/login'
const iosStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715325577";
const androidStore =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.upchina.teach&ckey=CK1427715261800&ch=2000000842";
export default {
  name: 'poolshare',
  components: {
    Msg, MaskPoupon
  },
  data() {
    return {
      uid: 'up2913729',
      time: 30 * 60 * 60 * 1000 * 4,
      showHead: true,
      showFooter: true,
      showSuss: false,
      downloadUrl: tools.isTerminal("ios") ? iosStore : androidStore, // app下载地址
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
      curIndex: '0',
      newUserOrder: 'https://uppay.upchina.com/unifiedpay/2168f09b64433ee7ae9199d1484027e5?ch=56006',
      oldUserNoPowerOrder: 'https://uppay.upchina.com/unifiedpay/c0097ae1293375821a585935acd03fde?ch=56006', //老用户到期
      oldUserHasPowerOrder: 'https://uppay.upchina.com/unifiedpay/2168f09b64433ee7ae9199d1484027e5?ch=56006', //老用户续费
      ruleObj: {
        name: '尊享会员',
        val: 'isSvip',
        mid: 2116,
        isVip: false, //曾记有过
        isOldUser: false, //是否是老用户，拥有过7天才算老用户
        isPower: false,  //现在是否拥有权限
        vipEndTime: '', //到期时间
      },

    }
  },
  async created() {
    this.curIndex = this.$route.query.tabindex || '';
    this.setTabindex()
    this.initRole()
  },
  mounted() {
    this.scrollHeadLeft()
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //初始化角色
    async initRole() {
      if (!this.uid) return
      let req = {
        uid: this.uid
      }
      let authorityList = await allmodule(req)
      let obj = authorityList.find(v => v.mid === this.ruleObj.mid)
      if (!obj) return
      this.ruleObj.isVip = true
      this.ruleObj.isOldUser = this.timediff(obj)
      this.ruleObj.isPower = Number(obj.endtime) - new Date().getTime() > 0
      this.vipEndTime = obj.endtime
    },
    //购买订单
    buy(url) {
      if (!this.uid) return appLogin()
      this.$tools.orderSplice(url, 1)
    },
    share() {
      if (!this.uid) return appLogin()
      let upshare = new shareApi.initSharePlugin({
        gift: true, //是否显示分享得会员的icon
        gifttext: '<span><img src="{giftIcon}" alt=""></span>分享得7天尊享会员 |您已邀请 <span class="invite_num">{inviteNum}</span> 位用户', //邀请奖励文案
        giftemptytext: '<span><img src="{giftIcon}" alt=""></span>分享得7天尊享会员|您已邀请 <span class="invite_num">{inviteNum}</span> 位用户', //未邀请用户时奖励文案
        giftcoefficient: 1, //系数
        desc: '邀请1位好友可得7天尊享会员（实战直播版）权限',
        rewardtext: '即日起登录后分享到微信、朋友圈，邀请1位新用户加入股牛牛，在新用户首次完成微信登录App后，您将获得7天尊享会员SVIP（实战直播版）权限!',
        title: "帮我解锁股牛牛股票尊享会员权限吧~", //标题
        summary: "高胜率股池、视频解盘、短线课程免费得！", //描述
        method: 'Share.link', // Share.image   分享图片 Share.text  分享文本 Share.link 图文混合，带有链接
        // linkurl: `http://dragontiger.dev.test.upchina.com/project-newsecondtqlq.html#/wx?business=gnn_gnfxshy&tabindex=${this.curIndex}`, //跳转链接 收费：4652  音频：5236  多文字：5271
        linkurl: `https://cdn.upchina.com/front/2022/4/project-newsecondtqlq/prod/index.html#/wx?business=gnn_gnfxshy&tabindex=${this.curIndex}`, //跳转链接 收费：4652  音频：5236  多文字：5271
        imageurl: "", //图片地址
        authorname: "flywan",
        authornickname: "flywan",
        business: "gnn_gnfxshy", //gnn_L2
        id: new Date().getTime(), //必选，业务下要分享内容的唯一标识，例如：观点id
        source: 55048, //渠道号,这个渠道号为被邀请新用户的注册渠道
        env: "production",
        plats: ["wechat", "circle"], //显示哪些分享方式
        isStopBodyScroll: false, //是否禁止遮罩滚动
        isCanAnonymousShare: true,
      })
      upshare.show();
    },
    //计算时差是否大于10天
    timediff({ endtime, starttime }) {
      if (!endtime || !starttime) return
      let oneday = 24 * 60 * 60 * 1000
      let time = endtime - starttime
      return time / oneday > 10
    },
    receive() {

    },
    setCurIndex(item) {
      this.curIndex = item.id
      this.setTabindex()
      window.scrollTo(0, 0)
      if (item.ref) {
        this.scroll(item)
      }
    },
    download() {
      window.open(this.downloadUrl);
    },
    //定位
    scroll(item) {
      this.$nextTick(() => {
        console.log(this.$refs)
        let top = this.$refs[item.ref]
        console.log(top)
        window.scrollTo(0, top.offsetTop)
      })
    },
    //设置router参数tabindex
    setTabindex() {
      // this.$router.push({
      //   path: this.$route.path,
      //   query: Object.assign({ tabindex: this.curIndex }, this.curIndex || '0',)
      // })
    },
    //滚动定位头部, 
    scrollHeadLeft() {
      this.$nextTick(() => {
        let domstr = `list_item_${this.curIndex}`
        let offsetLeft = this.$refs[domstr][0].offsetLeft
        let list_wrapDom = this.$refs.list_wrap
        console.dir(list_wrapDom)
        list_wrapDom.scrollLeft = 1200
        // list_wrapDom.scrollTo(1200,0)
      })

    },
    //头部滑动悬浮
    handleScroll() {
      //页面参考高度
      let refHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //一屏高度
      let hideHeight = window.screen.height
      // console.log(this.scrollTop(),'this')
      if (refHeight > 1200) {
        this.showHead = false;
      } else {
        this.showHead = true;
      }
    },
  },
  watch: {
  }
}
</script>
<style src="./style-v3.css" scoped>
</style>
<style lang="less" scoped>
.fixed_head {
  &.wx {
    height: 4rem;
    width: 100%;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
      width: 3rem;
      height: 0.8rem;
    }
  }
}
.pg {
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
.fryh {
}
.footer {
  .price_box {
    position: relative;
    /deep/.van-count-down {
      position: absolute;
      top: 0.5rem;
      left: 2rem;
      .colon {
        display: inline-block;
        margin: 0 4px;
        color: #fff;
      }
      .block {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.35rem;
        color: #ee0a24;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        border-radius: 0.04rem;
      }
    }
  }
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
