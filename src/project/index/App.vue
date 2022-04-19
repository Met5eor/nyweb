<template>
  <div class="protal-index">
    <div class="title">项目列表</div>
    <div class="u-fx-f1 protal-list">
      <div v-for="(app, index) in appList" :key="index" class="box u-fx-ac-jc" @click="goHtml(app.url)">
        <img  src="https://img2.baidu.com/it/u=3145937528,1513473364&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500" alt />
        {{ app.name }}
      </div>
    </div>
  </div>
</template>
<script>
const moduleList = require('./module-list')
export default {
  name: 'App',
  components: {},
  data() {
    return {
      appList: [
        ...moduleList
      ]
    }
  },
  mounted() {},
  methods: {
    goHtml(path) {
      window.location.href = `./${path}.html`
      // window.location.href = `./${path}/`
    }
  }
}
</script>

<style lang="less">
.protal-index {
  background: rgb(15, 13, 65);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(50, 50, 190, 1) 0%, rgba(10, 86, 101, 1) 70%);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  .title {
    text-shadow: 0px 0px 3px #ccc;
    height: 150px;
    text-align: center;
    color: #fff;
    letter-spacing: 4px;
    line-height: 120px;
    font-size: 34px;
  }
  .protal-list {
    width: 1020px;
    margin: 0 auto;
  }
  .box {
    transition: all 0.5s ease;
    color: #666;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    border-right: 1px #ccc solid;
    padding: 50px 0;
    width: 120px;
    height: 44px;
    border-radius: 4px;
    box-shadow: 0px 0px 2px #ccc;
    margin-left: 20px;
    cursor: pointer;
    background: #fff;
    font-size: 12px;
    img {
      width: 60px;
      height: 60px;
      display: block;
      margin-bottom: 10px;
    }
    &:hover {
      transform: scale(1.1);
      background: #666;
      color: #f5f5f5;
      box-shadow: 0px 0px 6px #ccc;
    }
  }
}
</style>
