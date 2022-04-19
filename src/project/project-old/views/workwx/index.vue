<template>
    <el-container>
        <el-header class="head">
            <el-card shadow="always" :body-style="{padding:'10px 20px'}">
                <span>用户名：up2291970</span>
                <span>手机号：176****0650</span>
            </el-card>
        </el-header>
        <el-main>
            用户订单列表
            <el-divider></el-divider>

        </el-main>
    </el-container>
</template>

<script>
import sha1 from "@/utils/sha1"
import { getwxTicket, getUserOrders } from "@/network/workwx"
export default {
    name:"WorkWx",
    data(){
        return {
            corpid:'',
            agentid:'',
            userId:'',
            status:"",
        }
    },
    created(){
        this.getUserOrders();
        // const timestamp = Date.now();
        // const timestamp = 1622706235706;
        // const appidSign = this.signWorkwx('LIKLckvwlJT9cWIhEQTwfK_tOTpt1X7TvpdJywvUHqIUYh06hbF-Gyjd8BVyFsplqEdmOLCv9bI0qw_lEuuUtg',timestamp,'https://mini.test.upchina.com/');
        // const agentSign = this.signWorkwx('f/X/kFthT6owXTlHN9mNRw==',timestamp,'https://mini.test.upchina.com/');
        // wx.config({
        //     beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: corpid, // 必填，企业微信的corpID
        //     timestamp, // 必填，生成签名的时间戳
        //     nonceStr: 'upchina', // 必填，生成签名的随机串
        //     signature: appidSign,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        //     jsApiList: ['selectExternalContact','getCurExternalContact'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        // });
        // wx.ready(()=>{
        //     wx.agentConfig({
        //         corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
        //         agentid, // 必填，企业微信的应用id （e.g. 1000247）
        //         timestamp, // 必填，生成签名的时间戳
        //         nonceStr: 'upchina', // 必填，生成签名的随机串
        //         signature: agentSign,// 必填，签名，见附录-JS-SDK使用权限签名算法
        //         jsApiList: ['selectExternalContact','getCurExternalContact'], //必填，传入需要使用的接口名称
        //         success: (res)=> {
        //             this.status = "Success";
        //             // 回调
        //             wx.invoke('getCurExternalContact', {}, (res)=>{
        //                 if(res.err_msg == "getCurExternalContact:ok"){
        //                     this.userId = res.userId;
        //                     // 通过企业微信id 获取 unionid

        //                     // 通过unionid获取upid

        //                 }else {
        //                     //错误处理
        //                     alert(JSON.stringify(res))
        //                 }
        //             });
        //         },
        //         fail: (res) => {
        //             this.status = "Fail";
        //             if(res.errMsg.indexOf('function not exist') > -1){
        //                 alert('版本过低请升级')
        //             }
        //         }
        //     });
        // }) 
    },
    methods:{
        // 微信sign加密
        signWorkwx(ticket, timestamp, url){
            const str = `jsapi_ticket=${ticket}&noncestr=upchina&timestamp=${timestamp}&url=${url}`
            return sha1(str);
        },
        // 获取企业微信票据信息
        async getWorkTicket(){
            const { corpid, agentid } = this.$route.query;
            const ret = await getwxTicket({corpid, agentid});
            if(res.data.ret===0){
                
            }
            console.log(ret.data);
        },
        // 获取订单信息
        async getUserOrders(upid){
            const pageIndex = 1;
            const pageSize = 10;
            const orderRet = await getUserOrders({upid:'up2291970',pageIndex,pageSize});
            console.log(orderRet);
        }
    }
}
</script>


<style lang="less" scope>
.head{
    padding: 0!important;
    span+span{
        margin-left: 20px;
    }
}
</style>