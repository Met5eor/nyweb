
<!-- 抽奖组件  -->
<template>
    <div class="main_wrap">
        <div class="main" v-if="false">
            <div class="main_cnt">
                <!-- 会员抽奖池 -->
                <div class="sec cj" id="hycjc">
                    <div class="sec_title">
                        <img src="https://cdn.upchina.com/front/2001gnnvip/images/sec_title4.png">
                    </div>
                    <div class="my_gift" @click="getShowPool">我的奖品池</div>
                    <el-carousel class="vip_info" indicator-position="none" :interval="1800" height="52px" direction="vertical">
                        <el-carousel-item v-for="(item,index) in getRandomData" :key="`rad${index}`">
                        {{item}}
                        </el-carousel-item>
                    </el-carousel>
                    <div class="cj_cnt">
                        <div class="lottery_wrapper">
                            <span class="big_arrow"></span>
                            <span class="small_arrow"></span>
                            <ul class="lottery_pool">
                                <li v-for="(item,index) in giftList" :class="{'active':index===indexAnim}" :key="index">
                                    <h4 class="gift_name">{{item.name}}</h4>
                                    <span v-if="item.date" class="gift_date">{{item.date}}</span>
                                    <span class="gift_price">{{item.price}}</span>
                                </li>
                                <li :class="{'active':indexAnim===7}">
                                    <i class="gift_icon"></i>
                                    <h4 class="gift_name">谢谢参与</h4>
                                </li>
                            </ul>
                            <div class="lottery_btn">
                                <img @click="lotteryFn" src="https://cdn.upchina.com/front/2001gnnvip/images/lottery_btn.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--优惠券 中奖弹窗-->
        <div class="lottery_pop coupon_pop" v-show="false">
            <div class="pop_cnt">
                <img class="win" src="https://cdn.upchina.com/front/2001gnnvip/images/coupon_bg.png" alt="">
                <div class="gift_name">
                    【<span></span>】
                </div>
                <div class="btn btn_close"></div>
            </div>
        </div>

        <!-- 未中奖弹窗 - new -->
        <el-dialog append-to-body :visible.sync="notPrize" :lock-scroll="false" custom-class="prizeDialog prize-box" width="30%" :show-close="false">
            <div class="close-btn" @click="notPrize = false"></div>
            <h3>差一点就中奖了</h3>
            <p>参与518财富节秒杀<span style="color:#f83d2e">即可获得1次机会哦~</span></p>
            <div class="btn" @click="notPrize=false">去秒杀</div>
            <span class="prize-pool" @click="notPrize=false;getShowPool();">我抽中的奖品</span>
            <div class="prize-list">
                <ChangePrize :isGnn="isGnn"/>
            </div>
        </el-dialog>
        <!-- 中奖弹窗 - new -->
        <el-dialog append-to-body :visible.sync="prizeDia" :lock-scroll="false" custom-class="prizeDialog prize-box" width="30%" :show-close="false">
            <div class="close-btn" @click="prizeDia = false"></div>
            <h3>恭喜您</h3>
            <p>抽中奖品&nbsp;&nbsp;<span>{{diaData.name||'股牛牛手机Level-2 1个月'}}</span></p>
            <div class="prize-tips" style="margin-bottom:20px">奖品将自动为你加入【我的奖品】</div>
            <div class="btn" @click="prizeDia=false">再抽一次</div>
            <el-link class="prize-pool" @click="prizeDia=false;getShowPool();" >我抽中的奖品</el-link>
            <div class="prize-list">
                <ChangePrize :isGnn="isGnn"/>
            </div>
        </el-dialog>
        <!--奖品池-->
        <div class="gift_pop block_pop" v-show="showPool">
            <div class="close_btn" @click="showPool=false"><img src="https://cdn.upchina.com/MemberCenterWebServer/gptpc/v006/images/block_close_btn.png" alt=""></div>
            <div class="my_gift_cnt">
                <h4>我的奖品池</h4>
                <ul>
                    <li v-for="(item,index) in myPoolList" :style="getBackground(index)" :key="`pool${index}`">
                        <span>{{index+1}}、{{item.name}}
                            <strong style="color:#FFFF7D">(×{{item.num}})</strong>
                        </span>
                        <el-button round size="small" plain @click="showDialog(item)">立即查看</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 奖品池信息查看弹窗 -->
        <el-dialog :visible.sync="visible" :lock-scroll="false" custom-class="prizeDialog" width="30%" :show-close="false">
            <h3>恭喜您</h3>
            <p>抽中奖品&nbsp;&nbsp;<span>{{diaData.name||''}}</span></p>
            <img class="qrcode" v-if="diaData.qrcode" :src="diaData.qrcode"/>
            <div class="tips">使用微信扫一扫，添加小助理好友领取</div>
        </el-dialog>
        
        <!-- 支付成功页面弹窗 -->
        <PaySuccess v-if="payName" :payName="payName"/>

        <p class="text-tip" v-show="msgTips">{{msgTips}}</p>
    </div>
</template>

<script>
import { getPollList, lottery } from "@/network/activtiy"
import ChangePrize from "@/components/ChangePrize"
import PaySuccess from "@/components/PaySuccess"
export default {
  name: 'Active518',
  components:{
      ChangePrize,PaySuccess
  },
  data(){
    return {
        // 支付成功后赠送的产品名称
        payName:'',
        // 奖品列表
        giftList:[
            {name:'复利计划实训营', price:'100元优惠券', date:""},
            {name:'股牛牛尊享会员', price:'100元优惠券', date:""},
            {name:'解读龙虎榜', price:'3天权限', date:"售价：328元/月"},
            {name:'手机Level-2', price:'1个月', date:""},
            {name:'短线猎手交易圈', price:'3天权限', date:"售价：2598元/月"},
            {name:'短线猎手交易圈', price:'100元优惠券', date:""},
            {name:'复利计划实训营', price:'100元优惠券', date:""},
        ],
        showPool: false,
        visible: false,
        notPrize: false,
        prizeDia: false,
        diaData: {},
        indexAnim: -1,
        myPoolList: [],
        // 是否是股牛牛端
        isGnn: true,
        // 消息提示
        msgTips:'',
        // 滚动轮播用户
        userNames:["J_D","yangtongxue","upc7986","Janson","wSS68352","up17655247","up17655247","36817619954","lznly665659","leon0088","wSS68352","up14714982","fly0025","sunnyfor","qq_1809081","up1476932","up18787936"],
        // 滚动轮播奖品
        prizeList:["开通了1年尊享会员","抽中了复利计划实训营100元优惠券","开通了半年尊享会员","抽中了超短掘金策略圈3天权限","开通了1个月若风实战讲堂权限","抽中了复利计划实训营100元优惠券","抽中了短线猎手交易圈100元优惠券","开通了1个月复利计划实训营服务","开通了1个月短线猎手交易圈服务","抽中了复利计划实训营100元优惠券","抽中了超短掘金策略圈3天权限","开通了1个月若风实战讲堂权限","开通了1个月短线猎手交易圈服务","抽中了贵宾直播室1天权限","抽中了复利计划实训营100元优惠券","抽中了超短掘金策略圈3天权限"]
    }
  },
  created(){
    const {name} = this.$route.query;
    const ua = navigator.userAgent.toLowerCase();
    const isInGPTApp = !!ua.match(/stock/i);
    const isInGPTPC = !!ua.match(/upgpt_pc/i);

    const isGPT = isInGPTApp || isInGPTPC;
    this.isGnn = !isGPT;
    this.payName = name;
  },
  computed:{
    // 获取随机跑马灯信息
    getRandomData(){
        return this.userNames.map(name=>{
            return `用户${name.substr(0,1)}***${name.substr(name.length-1,1)}${this.prizeList[Math.floor(Math.random()*16)]}`
        })
    },
    getBackground(){
        return (index)=>{
            index = index%4+1;
            const bg = require(`../assets/images/prize/prize${index}.png`)
            return {background: `url(${bg}) -20px -20px no-repeat`}
        }
    },
  },
  methods:{
    // 我的奖品池
    async getShowPool(){
        const {data} = await getPollList();
        if(data.ret===0&&data.data&&data.data.length){
            this.showPool = true;
            this.myPoolList = data.data.filter(item=>item.name&&item.num>0);
        }else{
            this.msgTips = "暂无奖品信息";
        }
    },

    // 查看我的奖品信息
    async showDialog(item){
        this.visible = true;
        let custQR = "xiaojinli.png";
        // 默认客服 - 小锦鲤
        // 小芒果客服对应的产品id
        if(['【龙头的黄金博弈】短训营体验课1节','【复利计划专项班体验课】1节'].includes(item.name||'')){
            custQR = "xiaomangguo.png";
        }
        this.diaData = { qrcode: require(`../assets/images/qrCustomer/${custQR}`), name: item.name, num: item.num }
    },
    // 更换抽奖池奖品 
    changePrize(){
        this.$refs.carousel.next();
    },
    // 抽奖
    async lotteryFn(){
        // 简单抽奖逻辑
        const {data} = await lottery();
        // this.$emit("changeLott",false);
        const prize = data.data.prize || '';
        // 抽奖完成
        if(prize){
            this.prizeDia = true;
        }else{
            this.notPrize = true;
        }
    
    
        // const now = Date.now();
        // let time = localStorage.getItem('lotteryTime');
        // if(time && now - time*1 < 86400000){
        //     this.msgTips = "今天已经抽过了，请明天再来";
        //     return false;
        // }else{
        //     localStorage.setItem('lotteryTime',now);
            
        //     // 执行抽奖
        //     const {data} = await lottery();
        //     const prize = data.data.prize || '';
        //     // 抽奖动画
        //     this.lotteryAnim(0,prize?3:7);
        // }
    },
    // 抽奖动画
    lotteryAnim(index=0, prize=7){
        setTimeout(()=>{
            this.indexAnim = (index+1)%(this.giftList.length+1);
            if(index*120>3000&&this.indexAnim===prize){
                // 抽奖完成
                if(prize===3){
                   this.prizeDia = true;
                }else{
                   this.notPrize = true;
                }
            }else{
                this.lotteryAnim(index+1,prize);
            }
        },index*10)
    }
  },
  watch:{
      msgTips(v){
            v&&setTimeout(()=>{this.msgTips=""},2000)
      },
      notPrize(v){
          if(!v){
              this.indexAnim = -1;
              this.$emit("changeLott", false);
          }
      },
      prizeDia(v){
          if(!v){
              this.indexAnim = -1;
              this.$emit("changeLott", false);
          }
      }
  }
}
</script>

<style lang="less">
@import url("../assets/css/lottery.css");
.prizeDialog.el-dialog{
    text-align: center;   
    border-radius: 20px;
    .el-dialog__header{
        display: none;
    }
    h3{
        font-weight: bold;
        font-size: 36px;
        letter-spacing: 4px;
        color: #e01b18;
    }
    p{
        display: flex;
        padding: 18px 60px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        line-height: 30px;
        color:#666;
        span{
            color: #e01b18;
            margin-left: 20px;
        }
    }
    img.qrcode{
        width: 240px;
        height: 240px;
        margin-top: 30px;
        border: 2px solid #ddd;
        padding: 2px;
        border-image: -webkit-linear-gradient(#ffdd9b, #ff8483) 20 20;
        border-image: -webkit-linear-gradient(#ffdd9b, #ff8483) 20 20;
        border-image: -moz-linear-gradient(#ffdd9b, #ff8483) 20 20;
        border-image: -o-linear-gradient(#ffdd9b, #ff8483) 20 20;
        border-image: linear-gradient(#ffdd9b, #ff8483) 20 20;
    }
    .tips{
        color:#e01b18;
        font-size: 16px;
        margin: 20px 0;
    }
}
.prize-box.el-dialog{
    background: url('../assets/images/prize/bg.png') no-repeat;
    background-size: cover;
    position: relative;
    padding-top: 30px;
    width: 680px!important;
    .close-btn{
        width: 68px;
        height: 68px;
        background: url('../assets/images/prize/close-btn.png') no-repeat;
        background-size: 68px 68px;
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: -1px;
    }
    .prize-pool{
        margin-bottom: 30px;
        margin-top: -10px;
        font-size: 14px;
        color:#f83d2e;
        cursor: pointer;
        text-decoration: underline;
    }
    .btn{
        width: 80%;
        max-width: 320px;
        height: 48px;
        line-height: 48px;
        letter-spacing: 2px;
        cursor: pointer;
        font-size: 18px;
        color: #eee;
        margin: 0 auto 30px;
        border-radius: 60px;
        background-image: linear-gradient(to right, #f98f5f , #f83d2e);
    }
}
</style>