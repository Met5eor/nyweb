<template>
    <div>
        <div class="content">
            <div>打开手机微信扫描下方二维码，有1位好友点击你的链接，即可免费解锁题材成份股</div>
            <Loading size="24px" vertical :class="loading?'':'d-none'">二维码生成中...</Loading>
            <div v-show="src">
                <img :src="src" alt="" class="img">
            </div>
        </div>

    </div>
</template>
<script>
    import {
        POST
    } from '../../../network/http';
    import {
        pcCheckLogin
    } from "@u/login";
    import {
        Loading
    } from 'vant';
    export default {
        components: {
            Loading
        },
        data() {
            return {
                loading: true,
                src: '', //小程序二维码
            };
        },
        async created() {
            let url = this.$tools.isTerminal("isInGNNPC") ?
                'https://cdn.upchinaproduct.com/test/test/webNativeCommunicatePC-1.js' :
                'https://cdn.upchinaproduct.com/assert/jssdk/jssdk-pc-1.0.1.min.js';
            await this.$tools.loadJsSdk(url);
            let {
                uid
            } = await pcCheckLogin(); // 当前用户upid
            let market = parseInt(this.$route.query.market);
            let scode = parseInt(this.$route.query.sCode);
            this.getQr(market, scode, uid)
        },
        mounted() {

        },
        methods: {
            async getQr(market, scode, upid) {
                // const url = 'https://weeduapi.test.upchina.com/wechat/getQrCode'
                const url = 'https://weapp.upchina.com/weeduapi/wechat/getQrCode'
                let data = {
                    scene: `mid=${market}&code=${scode}&uid=${upid}`,
                    type: "theme"
                }
                let [res, err] = await POST(url, data);
                this.loading = false;
                if (res.ret == 0) {
                    this.src = 'data:image/jpeg;base64,' + res.data
                }
            },
        }
    };
</script>

<style scoped lang="less">
    .d-none {
        display: none;
    }

    .content {
        width: 100vw;
        height: 100vh;
        font-size: 14px;
        font-weight: 600;
        padding: 16px 20px 0;
        background: #fff;
        line-height: 21px;
    }

    .img {
        width: 28vw;
        height: 28vw;
        margin-top: 0.1rem;
    }
</style>