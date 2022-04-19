<template>
  <div class="stock-pool">
    <div class="title">三大特色股池-买点快一步</div>
    <div class="btn-area">
      <div
        class="btn"
        :class="selectId == btnItem.id ? 'sel' : ''"
        v-for="btnItem in btnList"
        :key="btnItem.id"
        @click="selectId = btnItem.id"
      >
        {{ btnItem.text }}
      </div>
    </div>
    <div class="img-list" v-for="item in imgList" :key="item.id">
      <img :src="item.src" alt="" v-show="selectId == item.id" class="img" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectId: 1,
      btnList: [
        { text: "五星股票池", id: 1 },
        { text: "红黄白股池", id: 2 },
        { text: "攻守道股池", id: 3 },
      ],
      imgList: [
       
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.stock-pool {
  background: #fff;
  padding: 0.2rem;
  border: 1px solid #ff7553;
  border-radius: 0.2rem;
  margin: 0.24rem 0.22rem 0.22rem;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.4rem;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
  color: #ffe142;
  line-height: 0.4rem;
  background: linear-gradient(0deg, #cc350e 0%, #f55f23 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 0 0.32rem;
  &::before {
    content: "";
    display: block;
    width: 0.36rem;
    height: 0.24rem;
    background: url("../img/icon_title_left.png") no-repeat;
    background-size: 100%;
    margin-right: 0.08rem;
  }
  &::after {
    content: "";
    display: block;
    width: 0.36rem;
    height: 0.24rem;
    background: url("../img/icon_title_right.png") no-repeat;
    background-size: 100%;
    margin-left: 0.08rem;
  }
}
.btn-area {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 0.3rem;
  .btn {
    width: 1.8rem;
    height: 0.7rem;
    background: linear-gradient(-5deg, #ffb16f, #fd741e);
    border: 3px solid #fb9b3f;
    box-shadow: 0px 2px 6px 0px rgba(180, 43, 6, 0.5);
    border-radius: 0.1rem;
    font-size: 0.3rem;
    font-family: Alibaba PuHuiTi;
    font-weight: 500;
    color: #fff;
    line-height: 0.7rem;
    text-align: center;
  }
  .sel {
    background: linear-gradient(-5deg, #fee8d1, #fdbe89);
    border: 3px solid #fb9b3f;
    box-shadow: 0px 2px 6px 0px rgba(203, 51, 9, 0.5);
    color: #d13618;
  }
}
.img {
  width: 6.7rem;
  height: 5rem;
}
</style>
