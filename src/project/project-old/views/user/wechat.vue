<!-- 微信授权登录接口 -->
<template>
    <div>
        <div class="btn" @click="onSubmit"> Send </div>
        {{upid}}
    </div>
</template>


<script>

export default{
    data(){
        return {
            upid: ''
        }
    },
    mounted(){
    },
    methods:{
        async onSubmit(){
            shareApi.getShareInfo({callback:(data)=>{
                console.log(data)
            }});
        }
    }
}
</script>


<style lang="less" scope>
.btn{
    margin:20px auto;
    cursor:pointer;
    padding:10px 20px;
    border:1px solid green;
    color: green;
    display: inline-block;
    border-radius:30px;
    box-shadow: 1px 2px 2px #eee,-1px 2px 2px #eee;
}
</style>