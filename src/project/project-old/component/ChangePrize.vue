<template>
    <div class="">
        <div class="list-box">
            <el-carousel class="list-box-carouse" ref="carousel" indicator-position="none" :autoplay="false" height="150px">
                <el-carousel-item v-for="(list,index) in getPrizeTips" :key="`prow${index}`">
                    <el-row :gutter="10">
                        <el-col :span="8" class="list-item" v-for="(item,id) in list" :key="`tips${id}`">
                            <div v-if="item.top" class="top" >{{item.top}}</div>
                            <div v-if="item.title" class="context" v-html="item.title"></div>
                            <div v-if="item.tips" class="ftr" >{{item.tips}}</div>
                        </el-col>
                    </el-row>
                </el-carousel-item>
            </el-carousel>
        </div>
        <p style="padding:0 60px 30px;font-size:16px;">可能抽中的奖品</p>
        <div class="btn" @click="()=>changePrize()">换一换</div>
    </div>
    
</template>


<script>

export default{
    name:'ChangePrize',
    props: ['isGnn'],
    data(){
        return {
        // 奖品轮播
        prizeTips:{
            gnn:[
                [
                    {top:'100%中奖',title:'股牛牛手机<br/>Level-2',tips:'价值18元/月'},
                    {top:'爆款',title:'股牛牛尊享会员<br/>【北向资金】',tips:'内测特权1个月'},
                    {top:'限量',title:'年中抢筹金股',tips:"限量1000份"}
                ],
                [
                    {top:'爆款',title:'若风私享会',tips:'价值39800元'},
                    {top:'爆款',title:'复利计划专项班',tips:'体验课1节'},
                    {top:'限量',title:'【龙头的黄金博弈】<br/>短训营',tips:"体验课1节"}
                ],
                [
                    {top:'限量',title:'股牛牛<br/>【牛气冲天】<br/>摆件',tips:'价值88元'},
                    {top:'爆款',title:'短线猎手交易圈',tips:'1个月'},
                    {top:'限量',title:'趋势擒龙交易圈',tips:"1个月"}
                ],
            ],
            gpt:[
                [
                    {top:'稀缺',title:'若风私享会',tips:'价值39800元'},
                    {top:'爆款',title:'股牛牛尊享会员<br/>【北向资金】',tips:'内测特权1个月'},
                    {top:'',title:'超级Level2',tips:"1年"}
                ],
                [
                    {top:'100%中奖',title:'手机Level-2',tips:'价值18元/月'},
                    {top:'限量',title:'趋势擒龙交易圈',tips:'限量1000份'},
                    {top:'',title:'【龙头的黄金博弈】<br/>短训营',tips:"体验课1节"}
                ],
                [
                    {top:'限量',title:'股牛牛<br/>【牛气冲天】<br/>摆件',tips:'价值88元'},
                    {top:'爆款',title:'短线猎手交易圈',tips:'1个月'},
                ],
            ]
        },
        }
    },
    computed:{
        getPrizeTips(){
            return this.isGnn?this.prizeTips.gnn:this.prizeTips.gpt
        }
    },
    methods:{
        // 更换抽奖池奖品 
        changePrize(){
            const $carousel = this.$refs.carousel;
            console.log($carousel)
            $carousel.next();
        }
    }
}
</script>


<style lang="less" scope>
    .list-box{
        width: 82%;
        margin: 20px auto 0;
        padding: 0 20px;
        box-sizing: border-box;
        height: 200px;
        background: url('../assets/images/prize/prize-list-bg.png') no-repeat;
        background-size: 100% 200px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-row{
            width: 100%;
        }
    }
    .list-item{
        height: 150px;
        background: url('../assets/images/prize/item.png') no-repeat;
        background-size: 98% 98%;
        font-size: 16px;
        position: relative;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        padding-bottom: 20px;
        .top{
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 3px 6px;
            border-radius: 10px;
            background-image: linear-gradient(to right, #f98f5f , #f83d2e);
            font-size: 12px;
            color: #fff;
        }
        .context{
            font-size: 18px;
            padding: 10px 10px 15px;
            color: #f83d2e;
        }
        .ftr{
            color: #666;
        }
    }
    .list-box-carouse{
        width: 100%;
        .el-carousel__arrow {
            display: none;
        }
    }
</style>