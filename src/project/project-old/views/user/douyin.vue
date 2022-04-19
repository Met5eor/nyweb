<!-- 抖音注册页 -->
<template>
<div class="page-douyin" v-loading="loading">
    <div class="dy-box">
        <div class="dy-head">
            <img src="../../assets/images/user-douyin/head.png" alt="买在起涨前"/>
        </div>
        <div class="dy-content">
            <div class="title">赠送专属特权已放入您的账号</div>
            <div class="tips-box">
                <div class="lq"><span class="before"></span> &nbsp;马上激活领取&nbsp; <span class="after"></span> </div>
                <div class="list">
                    <div>
                        <span class="before">1</span>
                        <div>
                            【龙头排行全景地图】纸质精编版
                            <img src="../../assets/images/user-douyin/icon-zzb.png" style="width:2.4rem;" alt="纸质版">
                            <p>（付款后最晚5个工作日发出）</p>
                        </div>
                    </div>
                    <div>
                        <span class="before">2</span>
                        <div>
                            【龙头排行全景地图】电子经典版
                            <img src="../../assets/images/user-douyin/icon-dzb.png" style="width:2.4rem;" alt="电子版">
                            <p>（纸质精编版发出后10个工作日内发出）</p>
                        </div>
                    </div>
                    <div>
                        <span class="before">3</span>
                        <div>
                            【股牛牛会员】*60天
                            <img src="../../assets/images/user-douyin/icon-ld.png" alt="立得">
                            <p>（特色题材库+三大股池+股票入门视频课）</p>
                        </div>
                    </div>
                    <div>
                        <span class="before">4</span>
                        <div>
                            【若风团队热点题材解读】视频直播
                            <p>（每周两节，限量赠送，先到先得）</p>
                        </div>
                        <img src="../../assets/images/user-douyin/icon-ld.png" alt="立得">
                    </div>
                </div>
                <div class="f-input">
                    <input type="number" v-model="mobile" placeholder="请输入手机号" />
                    <div class="tips">*请输入抖音下单手机号激活权限</div>
                    <transition name="fade">
                        <div v-show="flag" class="toast">{{message||'请输入正确的手机号！'}}</div>
                    </transition>
                </div>
                <div class="btn-box" @click.self.prevent="onSubmit" >立即激活</div>
            </div>
        </div>
    </div>
    <el-dialog
        :visible.sync="visible" width="88%" center :show-close="false">
            <div class="context">
                <div class="title">成功激活股牛牛会员及课程权限</div>
                <div class="qrcode">
                    <img class="qrcode" src="../../assets/images/user-douyin/qrcode.png" alt="qrcode"/>
                    <div class="tips">立即扫码下载股牛牛APP<br>使用您的专属特权</div>
                </div>
            </div>
            <img class="close" @click="visible=false;" src="../../assets/images/user-douyin/close-circle.png" alt="close">
    </el-dialog>
</div>
    
</template>


<script>
import network from "../../network/index";
export default {
    data(){
        return {
            mobile: '',
            flag: false,
            loading: true,
            message: '',
            visible: false
        }
    },
    created(){
        // 判断公众号授权是否成功
        if(!window.location.search){
            this.loginAuth();
        }else{
            if(!localStorage)return;
            const foundUsername = localStorage.getItem('foundUsername');
            const mobile = localStorage.getItem('mobile');
            this.falg = !!foundUsername;
            if(foundUsername){
                this.visible = true;
                this.mobile = mobile;
            }
        }
        this.loading = false;
    },
    methods:{
        async loginAuth(){
            const callback = encodeURIComponent(`http://192.168.8.175:8080`);
            const {data} = await network({ url: `/merchant/loginAuth?callback=${callback}`, method: "get"});
            if(data&&data.ret===0){
                window.location.href = data.path;
            }else{
                // this.$message.error(data.message);
            }
        },
        checkPhone(mb){
            if(!mb)return false;
            const Reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
            return Reg.test(mb);
        },
        sendRequest(data){
            const params = window.location.search;
            return network({
                url: `/merchant/mobileReg${params}`,
                method: "post",
                data
            });
        },
        async onSubmit(){
            this.flag = !this.checkPhone(this.mobile);
            if(!this.flag){
                const {data={}} = await this.sendRequest({mobile: this.mobile});
                const {ret,username='',message} = data;
                if(ret===0 && username){
                    // 设置本地缓存，已查询的用户再次进入默认弹窗
                    localStorage&&localStorage.setItem('foundUsername','true');
                    localStorage&&localStorage.setItem('mobile',this.mobile);
                    this.visible = true;
                }else{
                    this.message = message;
                    this.flag = true;
                }
            }
        },
    },
    watch:{
        flag(v){
            v&&setTimeout(()=>{ this.flag = false; },1500);
        }
    }
}
</script>


<style lang="less" scope>
.dy-box{
    min-height: 100vh;
    background: linear-gradient(180deg, #f0442c 0%, #ec3d37 100%);
    .dy-head{
        display: flex;
    }
    .dy-content {
        padding: 0 1.1rem 3.5rem;
    }

    .dy-content .title{
        padding: 0.84rem 0;
        box-shadow: 0rem 0.08rem 0.38rem 0.08rem rgba(0, 0, 0, 0.2);
        background: linear-gradient(180deg, #FFEFCD 0%, #FFE091 100%);
        border-radius: .8rem .8rem 0 0;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 600;
        color: #ff3636;
    }
    .dy-content .tips-box{
        background-color: #fff;
        border-radius: 0 0 .8rem .8rem;
        padding: 1.8rem 1.2rem 1.2rem;
        box-shadow: 0rem 0.08rem 0.38rem 0.08rem rgba(0, 0, 0, 0.2);
    }
    .dy-content .lq{
        font-size: 1.4rem;
        white-space: nowrap;
        text-align: center;
        margin-bottom: 1.5rem;
        font-weight: 600;
        color: #FF1818;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dy-content .lq .before,.dy-content .lq .after{
        display: inline-block;
        width: 3.38rem;
        height: 0.16rem;
        margin: 0 .5rem;
        background: linear-gradient(270deg, rgba(255, 85, 47, 1),rgba(255, 255, 255, 1));
    }
    .dy-content .lq .after{
        background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 85, 47, 1));
    }
    .dy-content .list{
        text-align: left;
        &>div{
            font-weight: 600;
            display: flex;
            align-items: center;
            margin: .8rem 0;
            color: #333;
            white-space: nowrap;
            font-size: .92rem;
            p{
                font-weight: 400;
                font-size: .2rem;
                color: #999;
            }
        }
        .before{
            display: inline-block;
            text-align: center;
            width: 1.2rem;
            height: 1.2rem;
            line-height: 1.3rem;
            margin-top: .16rem;
            font-size: .36rem;
            border-radius: 50%;
            color: #fff;
            align-self: flex-start;
            background: linear-gradient(180deg, #ffaaa8 0%, #ff5835 100%);
        }
        img{
           width: 1.8rem;
           margin-left: .2rem;
           align-self: flex-start;
        }
    }
    .f-input{
        margin-top: 2.3rem;
        position: relative;
        input{
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            background-color: #f7f8ff;
            color: #333;
            overflow: hidden;
            border: none;
            text-indent: 1rem;
            font-size: 1rem;
            border-radius: 1.48rem;
            &:active,&:link,&:focus{
                border: none;
            }
            &::placeholder{
                color: #999;
            }
        }
        .tips{
            font-size: 0.81rem;
            color: #FF1515;
            text-align: left;
            margin: .5rem 0 2rem;
            line-height: 1.16rem;
        }
        .toast{
            position: absolute;
            top: -100%;
            left: 50%;
            transform:translate(-50%);
            border-radius: 1rem;
            background: #333;
            padding: .2rem .4rem .3rem;
            white-space: nowrap;
            color: #ddd;
            width: 12rem;
        }
    }
    .btn-box{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3.19rem;
        background: linear-gradient(180deg, #FCEFCC 0%, #FFCB22 100%);
        box-shadow: 0rem 0.5rem 0.75rem 0rem rgba(255, 179, 75, 0.3);
        border-radius: 1.59rem;
        color: #FF0019;
        font-size: 1.25rem;
        font-weight: 600;
        cursor: pointer;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 320px) {
    .dy-box .dy-content .list .before{
        display: none;
    }
}
</style>

<style lang="less">
.page-douyin{
    .el-dialog{
        background: transparent;
        box-shadow: none;
        margin-top: 10vh!important;
    }
    .el-dialog__header{
        display: none;
    }
    .el-dialog__body{
        padding: 0!important;
        text-align: center!important;
    }
    .context{
        height: 30rem;
        box-sizing: border-box;
        padding: 13.5rem 3rem 0;
        background: url('../../assets/images/user-douyin/alert.png') no-repeat center;
        background-size: cover;
        border-bottom-left-radius: .8rem;
        border-bottom-right-radius: .8rem;
        .title{
            font-size: 1.5rem;
            font-weight: 600;
            color: #ff2323;
            margin-bottom: .8rem;
        }
        .qrcode img{
            width: 7.4rem;
        }
        .tips{
            color: #999;
            font-size: .88rem;
            margin-top: .54rem;
        }
    }
    .close{
        width: 2.3rem;
        margin: 1.2rem auto;
    }
}
</style>