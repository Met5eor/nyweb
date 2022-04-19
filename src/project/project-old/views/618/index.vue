
<!-- 618活动页面  -->
<template>
    <div class="box">
        <div class="header">
            <img src="../../assets/images/618/header-pc.png" alt="财运大转盘"/>
            <div class="btn-box">
                <div class="btn" @click="toScrollPage(1)">6元秒杀</div>
                <div class="btn" @click="toScrollPage(2)">5折抢购</div>
                <div class="btn" @click="toScrollPage(3)">年中加油包</div>
            </div>
        </div>
        <div class="content">
            <div class="activity">
                <div class="title">
                    <div class="tag">
                        <img src="../../assets/images/518activity/activtiy1.png" alt="好礼一">
                        <div class="txt">
                            <div>518每日秒杀</div>
                            <span v-if="actStatus===0">距离秒杀结束</span>
                            <span v-else-if="actStatus===-1">距离秒杀开始</span>
                            <flip-countdown v-if="dateTime&&actStatus!==-2" :showDays="false" :deadline="dateTime" @timeElapsed="timeElapsed"></flip-countdown>
                        </div>
                    </div>
                    <div class="tips">每日10:00开抢</div>
                </div>
                <div class="cont">
                    <el-table :data="table1"  
                    align="center" size="medium" border style="border-color:#c9c9c9;width: 100%;"
                    header-row-class-name="tb-row" >
                        <el-table-column prop="name" label="产品名称" width="330">
                            <div slot-scope="{row}" class="prod-name">
                                <div class="totas" v-if="row.tag">518限定</div>
                                <div class="prod">{{row.title}}</div>
                                <div class="name">{{row.name}}</div>
                            </div>
                        </el-table-column>
                        <el-table-column prop="rule" label="秒杀规则">
                             <template slot-scope="{row}">
                                <div v-if="row.date==='查看详情'" @click="getDetail(row.key)">
                                    <el-link type="primary">查看详情</el-link>
                                </div>
                                <template v-else>
                                    <div class="prod">每日限量</div>
                                    <div>抢完即止</div>
                                    <div>不可重复购买</div>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oldPrice" label="日常价">
                            <div slot-scope="{row}" class="prod-old">{{row.oldPrice}}</div>
                        </el-table-column>
                        <el-table-column prop="price" label="产品价格">
                            <div slot-scope="{row}" class="prod-price">{{row.price}}</div>
                        </el-table-column>
                        <el-table-column prop="price" label="购买链接">
                            <template slot-scope="{row}">
                                <el-button v-if="actStatus===-1" type="primary" disabled round>即将开启</el-button>
                                <el-button v-else-if="actStatus===-2" type="info" disabled round>活动已结束</el-button>
                                <el-button v-else-if="actStatus===0&&row.total<=0" type="info" disabled round>已&nbsp;抢&nbsp;光</el-button>
                                <el-button v-else-if="actStatus===0&&row.isSnapUp" type="info" disabled round>今日已参与</el-button>
                                <div v-else-if="actStatus===0&&row.total>0&&!row.isSnapUp" @click="topay(row.key,1)">
                                    <el-button type="danger" round>点击秒杀</el-button>
                                    <br/><span style="font-size:16px">仅剩{{row.total}}份</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="activity">
                 <div class="title">
                    <div class="tag">
                        <img src="../../assets/images/518activity/activtiy2.png" alt="好礼二">
                        <div class="txt">
                            518财运大转盘
                            <span>买的越多，财运抽奖越多，最高赢39800元</span>
                        </div>
                    </div>
                </div>
                <div class="cont">
                    <el-table :data="table2" 
                    :span-method="objectSpanMethod"
                    align="center" size="medium" border style="border-color:#c9c9c9;width: 100%;"
                    header-row-class-name="tb-row" >
                        <el-table-column prop="name" label="产品名称" width="330">
                            <div slot-scope="{row}" class="prod-name">
                                <div class="totas" v-if="row.tag">518限定</div>
                                <div class="prod" v-html="row.title" ></div>
                                <div class="name" v-if="row.name">{{row.name}}</div>
                            </div>
                        </el-table-column>
                        <el-table-column prop="rule" label="权限时长">
                            <template slot-scope="{row}">
                                <div v-if="row.date==='查看详情'" @click="getDetail(row.key)">
                                    <el-link type="primary">查看详情</el-link>
                                </div>
                                <template v-else>{{row.date}}</template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oldPrice" label="日常价">
                            <div class="prod-old" slot-scope="{row}">{{row.oldPrice}}</div>
                        </el-table-column>
                        <el-table-column prop="price" label="产品价格">
                            <div slot-scope="{row}" class="prod-price">{{row.price}}</div>
                        </el-table-column>
                        <el-table-column prop="price" label="购买链接">
                            <template slot-scope="{row}">
                                <div v-if="actStatus!==-2" @click="topay(row.key)">
                                    <el-link type="primary">{{row.btntx?row.btntx:'立即购买'}}</el-link>
                                </div>
                                <el-button v-else type="info" disabled round>活动已结束</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="submit">优品25年品质保障，7天不满意无条件退款</div>
                </div>
            </div>
            <div class="activity-tips">
                <h1>活动说明</h1>
                <p>1、活动时间:2021年6月16日-6月18日23:59  共2天</p>
                <p>2、每日1次免费抽奖：每天每个用户可享受1次免费抽奖机会，可在【首页】—参与每日抽奖。</p>
                <p>3、买1次送一次财运大转盘：凡是在本活动页面下单任意产品，均可获得一次财运大转盘机会，中奖率100%，买的越多，金额越大，财运奖品越大，最高价值39800元。</p>
                <p>4、518元每日秒杀，可以重复秒杀吗？<br/>
                答：可以。如当日秒杀名额已抢光，可在下一日10:00再来。</p>
                <p>5、在哪查看自己获得的奖品和购买的权限？<br>
                答：下单成功后，权限将自动开通，可在【个人中心】—【我的订单】查看；抽奖获得的奖品可点击【我的奖品池】中查看。</p>
            </div>
            <!-- 查看详情 -->
            <el-dialog :visible.sync="DialogVisible" :lock-scroll="false" custom-class="dialog" width="30%" :show-close="false">
                <p>{{diaMsg.title||""}}</p>
                <div class="cent">
                    <div class="" v-for="(item,index) in diaMsg.context||[]" :key="index">
                        {{item}}
                    </div>
                </div>
                <div class="tips" v-if="diaMsg.tips">{{diaMsg.tips}}</div>
                <div class="dialog-footer" @click="DialogVisible = false"> 确 定</div>
            </el-dialog>
        </div>
        <!-- <div class="footer">
        </div> -->
    </div>
</template>

<script>
import { getConfig,toPayPage, lottery } from "@/network/activtiy";
import {scrollTo} from "@/utils/scroll-to.js";
export default {
  name: 'Active518',
  data(){
      return {
        table1:[],
        table2:[],
        loading: null,
        // 秒杀时间状态0：待开始，1：待结束
        dateStatus: 0,
        actStatus: -1,
        // 倒计时
        dateTime: null,
        // 是否已抽奖
        lottBefore: false,
        username:'',
        lottImg: '',
        DialogVisible: false,
        diaMsg: {},
        isGPT:false,
        isGNN:false,
        prizeName: "",
        // 股牛牛秒杀信息
        gnnSecondUp:[
            {title:"【若风擒牛大礼包】",name:"股牛牛尊享会员半年卡+21天龙头战法短训营", date:"查看详情", tag:true, oldPrice:"5978元",price:"3998元",key:"be4da711ce67101a9435bde95d49af13", total:0, isSnapUp:0},
            {title:"股牛牛尊享会员",name:"实战直播版*1个月", tag:true, oldPrice:"1598元",price:"518元",key:"c16c8ad95879ce56febb65a337b51d6b",total:0, isSnapUp:0},
        ],
        // 股牛牛商品信息
        gnnProds:[
            {title:"手机Level-2+超级Level-2",name:"赠送Level-2专属微信服务圈", tag:true, date:"年",oldPrice:"1496元",price:"1098元",key:"15cd48ab3a9ad50818fea2edc7271d86"},
            {title:"股牛牛尊享会员实战直播版",name:"",date:"3个月",oldPrice:"3998元",price:"3298元",key:"5e45250a09c08a0fb7e8cabb1ac45ac9"},
            {title:"股牛牛尊享会员实战直播版",name:"",date:"6个月",oldPrice:"6998元",price:"5898元",key:"02a64f40bb5822a0d3f4367ab4db3173"},
            {title:"短线猎手交易圈",name:"尾盘捡钱包",date:"3个月",oldPrice:"3998元",price:"3298元",key:"053f4908b59738b054e7b5b5468d6916"},
            {title:"短线猎手交易圈",name:"尾盘捡钱包",date:"6个月",oldPrice:"6498元",price:"5898元",key:"8db59ecdbb51359f82ca40416dac611b"},
            {title:"趋势擒龙交易圈",name:"擒龙案例：均瑶健康30%",date:"3个月",oldPrice:"3998元",price:"3298元",key:"70d700027d4d53025eff0a83a52281e2"},
            {title:"趋势擒龙交易圈",name:"擒龙案例：均瑶健康30%",date:"6个月",oldPrice:"6498元",price:"5898元",key:"aed7d14ffa9bb5e1bdf3779168c106d1"},
            {title:"若风无限大神卡",name:"",date:"查看详情",oldPrice:"17300元",price:"15800元",key:"a84bd6bf6e151b33e247c6301ec032df"},
        ],
        // 股票通秒杀信息
        gptSecondUp:[
            {title:"超级会员半年卡",name:"送《年中抢筹金股》名单", tag:true, oldPrice:"1794元",price:"518元",key:"8ac0ae845f74d05a1d13614a59e53e08", total:0, isSnapUp:0},
            {title:"超级Level-2",name:"送《L2超级盘口》盘中讲解*1个月",date:"一年",oldPrice:"2296元",price:"1098元",key:"87db1981bd99ade3acd0fce55ce3d5c9", total:0, isSnapUp:0},
        ],
        // 股票通商品信息
        gptProds:[
            {title:"超级会员<br/>终身VIP限量版",name:"买1次，终身有效",date:"永久",oldPrice:"9800元",price:"3998元",key:"4837d55748213c81655465afd956f895"},
            {title:"超级会员<br/>终身VIP限量版",name:"买1次，终身有效",date:"2021年1月1日后购买【超级会员年卡】用户专享价",oldPrice:"9800元",price:"2998元",btntx:"补差价升级",key:"4d9635180aacbb75eb06088d4cf333a3"},
            {title:"【若风擒牛大礼包】",name:"股牛牛尊享会员半年卡+21天龙头战法短训营",date:"查看详情",oldPrice:"4978元",price:"3998元",key:"be4da711ce67101a9435bde95d49af13"},
            {title:"短线猎手交易圈",name:"尾盘捡钱包",date:"3个月",oldPrice:"3998元",price:"3298元",key:"5b9e7c77577c185c2a313f322d648b89"},
            {title:"趋势擒龙交易圈",name:"擒龙案例：均瑶健康30%",date:"3个月",oldPrice:"3998元",price:"3298元",key:"61db7769985a41908e691100eda9da14"},
            {title:"若风无限大神卡",name:"",date:"查看详情",oldPrice:"22888元",price:"15800元",key:"a84bd6bf6e151b33e247c6301ec032df"},
        ]
      }
  },
  created(){
    document.title = "618抢购活动";
    window.localStorage.setItem('username', "");
    window.localStorage.setItem('hqrights', "");
    const ua = navigator.userAgent.toLowerCase();
    const isInGPTApp = !!ua.match(/stock/i);
    const isInGNNApp = !!ua.match(/teach/i);
    const isInGPTPC = !!ua.match(/upgpt_pc/i);
    const isInGNNPC = !!ua.match(/_hummer_pc/i);

    const isGPT = isInGPTApp || isInGPTPC;
    const isGNN = isInGNNApp || isInGNNPC;
    if(isGNN&&window.upNativeComm){
        upNativeComm.exec("user.info", {
            callback: function(code, param) {
                param = JSON.parse(param);
                if(!param.username||!param.hqrights){
                    this.openLogin();
                    return false;
                }
                this.username = param.username;
                window.localStorage.setItem('username', param.username);
                window.localStorage.setItem('hqrights', param.hqrights);
            }
        })
    }

    if(isGPT&&upNativeComm){
        upNativeComm.exec("user.info", {
            callback: function(ret, data){
                var data=JSON.parse(data);
                console.log(data)
                if(data.uid ===''){
                    //未登陆
                    this.openLogin();
                    return false;
                }else{
                    console.log("已登录",data.uid)
                    this.username = data.uid;
                    window.localStorage.setItem('username', data.uid);
                    window.localStorage.setItem('hqrights', data.hqrights);
                }
            }
        });
    }
    this.isGPT = isGPT;
    this.isGNN = isGNN;
    this.table1 = isGPT? this.gptSecondUp : this.gnnSecondUp;
    // 判断是股牛牛还是股票通
    this.table2 = isGPT ? this.gptProds : this.gnnProds;
    this.lottImg =  require(`../../assets/images/${isGPT ?'gupt.png':'gunn.png'}`);

    // this.loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     customClass: 'load-box',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.8)'
    // })
    // 获取页面配置信息
    this.pageConfig();
    const {name=""} = this.$route.query;
    if(name){
        this.prizeName = name;
    }
  },
  methods:{
    toScrollPage(k){
        scrollTo(1000*k,800)
    },
    async topay(prodKey, payType=0){

        if(prodKey==='4d9635180aacbb75eb06088d4cf333a3'){
            window.open("https://kf.upchina.com/pc/pcchat/xtkfxc");
            return false;
        }

        const uid = window.localStorage.getItem('username');
        const hqrights = window.localStorage.getItem('hqrights');
        if(!uid||!hqrights||uid==='guest2018'){
            this.openLogin();
            return false;
        }
        // 需要更换正式环境
        // let env = this.isGNN?'gunn':this.isGPT?'gupt':'alibeta';
        // const callback = `https://cdn.upchina.com/front/20210518/${env}/index.html#/activtiy`;
        const callback = `https://cdn.upchina.com/front/20210518/alibeta/index.html#/activtiy`;
        const {data} = await toPayPage({payType,productKey:prodKey,callback});
        if(data.ret===0&&data.url){
            window.open(`${data.url}&productKey=${prodKey}`)
        }else{
            this.$message.error(data.message||'请求失败');
        }
    },
    // 弹窗查看详情
    getDetail(prodKey){
        const msgObj = {
            // 无限大神卡
            "a84bd6bf6e151b33e247c6301ec032df":{
                title:"【若风无限大神卡】包含服务：",
                context: [
                    "1. 全新升级8大专项训练课程+群服务（2周/1个模型，共16周服务）",
                    "2. 若风短线交易系统课程（永久）",
                    "3. 基础班历史答疑视频（永久）",
                    "4. 注册制下人气龙头的玩法课程（永久）",
                    "5. 2020年专项班课程（永久）",
                    "6. 2019年专项班课程（永久）",
                    "7. 专项班历史答疑汇总课程（永久）",
                    "8. 若风实战讲堂7月+8月+9月（永久）",
                    "9. 尊享会员实战直播版（6个月）"
                ],
                tips:"总价值高达22888元。"
            },
            // 擒牛大礼包
            "be4da711ce67101a9435bde95d49af13":{
                title:"【若风擒牛大礼包】包含服务：",
                context: [
                    "1.股牛牛尊享会员6个月（不包含视频直播+Level-2）",
                    "2. 【龙头的黄金博弈】短训营（包含群服务）",
                ],
                tips:"总价值高达4978元。"
            }
        }
        this.diaMsg = msgObj[prodKey]||{};
        this.DialogVisible = true;
    },
    // 表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 0) {
            const rowNext = this.table2[rowIndex+1];
            const rowPrev = this.table2[rowIndex-1];
            if(rowNext && rowNext.title===row.title){
                return { rowspan: 2, colspan: 1 };
            }else if(rowPrev && rowPrev.title===row.title){
                return { rowspan: 0, colspan: 0 };
            }
            return { rowspan: 1, colspan: 1 };
        }
    },
    // 获取后台服务配置信息
    async pageConfig() {
        const {data} = await getConfig();
        const {data:ds,ret} = data;
        if(ret===0){
            this.lottBefore = this.username? ds.lottBefore: false;
            const hours = new Date(ds.date).getHours();
            const activeDate = [17,18,19,20,21];
            const startTime = new Date(`2021-05-${activeDate[0]}`).getTime();
            const endTime = new Date(`2021-05-21 23:59:59`).getTime();
            this.dateStatus = hours>=10;
            const snapInfo = ds.snapInfo||{}
            if(ds.snapInfo){
                this.table1.forEach(item => {
                    item.total = snapInfo[item.key].total||0;
                    item.isSnapUp = snapInfo[item.key].isSnapUp||0;
                });
            }

            if(this.dateStatus){
                // 已开始
                this.dateTime = `${ds.dateString} 23:59:59`;
            }else{
                // 未开始
                this.dateTime = `${ds.dateString} 10:00:00`;
            }
            if(Date.now()<startTime){
                // 还未开始
                this.actStatus = -1
            }else if(Date.now()>endTime){
                // 活动已结束
                this.actStatus = -2
            }else if(this.dateStatus){
                this.actStatus = 0
            }
        }
        this.loading.close();
    },
    // 时间结束
    timeElapsed(){
        this.dateStatus = this.dateStatus===0?-1:0;
        const date = this.dateTime.split(" ")[0];
        this.dateTime = "";
        if(this.dateStatus){
            this.dateTime = `${date} 23:59:59`;
        }else{
            this.dateTime = `${date} 10:00:00`;
        }
    },
    // 抽奖
    async lotteryFn(){
        // 简单抽奖逻辑
        const {data} = await lottery();
        // this.$emit("changeLott",false);
        const prize = data.data.prize || '';
        const lottBe = this.$refs.lottBefore;
        this.lottBefore = false;
        // 抽奖完成
        if(prize&&lottBe){
            lottBe.prizeDia = true;
            lottBe.notPrize = false;
        }else{
            lottBe.prizeDia = false;
            lottBe.notPrize = true;
        }
    },
    openLogin(){
        const isHummer = navigator.userAgent.match(/hummer/i);
        if (isHummer) {
            upNativeComm.exec('open.loginframe', { callback: function (_, r) { } })
        } else {
            location.href = "iwin://cmd=cmd_popup_regist_window";
        }
    }
  },
  watch:{
      prizeName(){
        // 获取页面配置信息
        this.pageConfig();
      }
  }
}
</script>

<style lang="less" scoped>
.header{
    position: relative;
    .btn-box{
        position: absolute;
        bottom: 40px;
        width: 100%;
        justify-content: center;
        display: flex;
        .btn{
            margin: 0 80px;
            border: 1px solid transparent;
            cursor: pointer;
            padding: 10px 50px;
            background: #f2f2f2;
            color: #f32412;
            font-size: 24px;
            font-weight: 600;
            border-radius: 40px;
            &:hover{
                border: 1px solid #ffce4a;
                box-shadow: 1px 4px 4px #ccc;
            }
        }
    }
}

.activity{
    margin: 30px auto 40px;
    background: #FFFFFF;
    box-shadow: 1px 10px 23px 0px rgba(0, 0, 0, 0.15);
    border-radius: 40px;
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        padding-right: 40px;
        background: linear-gradient(270deg, rgba(255, 226, 223, 0.5), rgba(255, 62, 62, 0.3));
        border-radius: 40px 40px 0px 0px;
        .tag{display:flex;align-items: center; margin-left: -20px;}
        .tag img{width: 160px;margin-right: 20px;}
        .txt{display:flex; justify-content: center;align-items: center; font-size: 36px;font-family: AlibabaPuHuiTiR;font-weight: bold;color: #1B1B1B;line-height: 4px;}
        .txt>span{font-size: 24px;color:#555;margin: 0 10px 0 30px;}
        .tips{font-size: 28px;font-family: AlibabaPuHuiTiR;font-weight: bold;color: #F32412;line-height: 4px;}
    }
    .cont{padding: 30px 40px 40px;}
    .tp-info{margin: 60px auto;font-size: 24px;font-family: AlibabaPuHuiTiR;font-weight: bold;color: #1B1B1B;line-height: 4px;    }
    /deep/.has-gutter th{background: rgba(234, 234, 234, 0.6);color: rgba(0, 0, 0,.7);font-weight: bold;font-size: 22px;}
    .prod-name{
        position: relative;
        text-align: justify;
        padding: 10px 0;
        .totas{
            width: 86px;
            height: 26px;
            display: inline-block;
            margin-left: calc(100% - 86px);
            line-height: 26px;
            border-radius: 15px;
            font-size: 14px;
            font-family: PingFangSC;
            text-align: center;
            color: #FFCE4A;
            background-color: #ED2312;
        }
    }
    .prod{
        font-size: 28px;
        font-family: AlibabaPuHuiTiR;
        text-align: center;
        margin: 6px 0 10px;
        font-weight: bold;
        color: #FF0000;
        line-height: 34px;
    }
    .prod-old{
        font-weight: bold;
        font-size: 22px;
        text-decoration: line-through;
    }
    .prod-price{
        font-weight: bold;
        color:#FF0101;
        font-size: 22px;
    }
    .submit{
        font-size: 24px;
        font-family: PingFangSC;
        display: inline-block;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
        line-height: 4px;
        margin: 40px auto 20px;
        position: relative;
        &>span{
            position:absolute;
            cursor: pointer;
            left: 50%;
            top: 50%;
            transform: translate(-50%);
            font-size: 36px;
            color: #fff;
            font-weight: bold;
            span{
                font-size: 24px;
                font-weight: 400;
            }
        }
        img{
            cursor: pointer;
        }
    }
}
.activity-tips{
    text-align: justify;
    font-size: 30px;
    font-family: PingFangSC;
    color: rgba(0, 0, 0, 0.7);
    line-height: 44px;
    margin: 10px 0 60px;
    h1{margin-bottom: 30px;font-size: 40px;}
    p{margin-bottom: 30px;}
}
.lotter-load{
    cursor: pointer;
    position: fixed;
    top: 538px;
    right: 40px;
}
/deep/.dialog{
    border-radius: 18px;
    max-width: 100vw;
    p{
        color: #ff1212;
        font-size: 24px;
        margin-bottom: 30px;
        text-align: center;
    }
    .el-dialog__header{
        display: none;
    }
    .el-dialog__body{
        padding: 30px 0px 0px;
    }
    &.tx{
        background: transparent;
        box-shadow: none;
        .el-dialog__body{
            padding: 0px;
            background:transparent;
        }
        img{
            cursor: pointer;
        }
    }
    .cent,.tips{
        width: 480px;
        margin: 0 auto 20px;
        font-size: 16px;
        text-align: left;
        line-height: 30px;
    }
    .tips{
        margin: 0px auto 30px;
        color: #FF0101;
    }
    .dialog-footer{
        width: 100;
        text-align: center;
        color: #409eff;
        font-size: 22px;
        font-weight: 500;
        padding: 10px 0;
        cursor: pointer;
        border-top: 1px solid #eee;
    }
}
.cont .link{
    text-decoration: underline;
    cursor: pointer;
    line-height: 24px;
    color: #66b1ff;
    &:hover{
        color: #6695ff;
    }
}
</style>

<style lang="less">
td,tr, th{
    color: rgba(27, 27, 27, 0.6);
    font-size: 18px;
    font-weight: 500;
    border-color:#C9C9C9!important;
    div{
        text-align: center;
        &+div{
            margin-top: 6px;
        }
    }
}
.el-link--inner{
    font-size: 22px;
}
span.flip-clock__slot{display: none!important;}
.el-table .cell{
    overflow:inherit!important;
}
span.flip-card{
    font-size: 2.15rem!important;
}
.el-loading-spinner i.el-icon-loading{
    font-size: 42px;
}
.el-loading-spinner p.el-loading-text{
    font-size: 32px;
}
.el-button--danger{
    background: #f32412!important;
    border-color:#f32412!important;
    margin-bottom: 10px!important;
    padding: 14px 28px!important;
    border-radius:40px!important;
    span{
        font-size: 22px;
    }
}
</style>
