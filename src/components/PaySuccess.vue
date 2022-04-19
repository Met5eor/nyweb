<template>
    <!-- 支付成功弹窗 - new -->
    <el-dialog :visible.sync="payDialog" :lock-scroll="false" custom-class="prizeDialog prize-box" width="30%" :show-close="false">
        <div class="close-btn" @click="closeDialog"></div>
        <h3>支付成功</h3>
        <p>恭喜您成功开通特权</p>
        <div class="prize-tips" style="margin-bottom:20px">可在个人中心”我的订单“中查看</div>
        <img :src="require('../assets/images/518activity/paySuccess.png')" alt="支付成功">
        <p>抽中奖品&nbsp;&nbsp;&nbsp;<span style="color:#f83d2e">{{payName}}</span></p>
        <div class="prize-tips" style="margin-bottom:20px">奖品将自动为你加入【我的奖品】</div>
        <div class="btn" @click="closeDialog">再抽一次</div>
    </el-dialog>
</template>


<script >

export default{
    name:'PaySuccess',
    props:{
        payName:{
            type: String,
            default: "【北向资金】内测特权*1个月"
        }
    },
    data(){
        return {
            payDialog: true,
        }
    },
    methods:{
        closeDialog(){
            this.payDialog = false;
        }
    },
    watch:{
        payDialog(v){
            !v&&this.$router.push({query: ""})
        }
    }
}
</script>


<style lang="less" scope>

</style>