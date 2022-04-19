<template>
  <!-- 会员权益 -->
  <div class="tab_vip">
    <div class="sub_tit">
     <slot name="title">
     </slot>
    </div>
    <div class="tq_box" ref="vip_tq">
      <div class="tq_list">
        <div class="tq_icon nopowers" v-for="(item,index) in dataList" :key="index" @click="goIcon(item,1)">
          <img :src="item.img">
          <p class="txt">{{item.txt}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "IconList",
  components: {},
  // 继承所有父组件的内容
  inheritAttrs: false,
  inject: ['chageOrder', 'currentIndex','changeCurrentIndex'],
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    rulesObj: {
      type: Object,
      default: () => {
        return {
          // name: '股牛牛会员',
          // isVip: false, //是否拥有过权限
          // isPower: false, //是否有权限
          // isOldUser: false //是否是老用户
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    };
  },
  computed: {
  },
  created: function () {
  },
  mounted() {
  },
  methods: {
    goIcon(item, type) {
      if (type && type == 1) {
        if (item.svip) {
          this.currentIndex = item.fixed;
        } else {
          if (this.isVip || (this.isNewVip && !this.isVipEnd)) {
            if (item.fixed) {
              window.scrollTo(0, this.$refs.discount.offsetTop - 10);
            } else {
              if (this.isSendSvip && item.isSend) {
                window.open(item.noRight)
              } else {
                window.open(item.hasRight)
              }
            }
          } else {
            if(item.noRight==='会员vip'){
              this.changeCurrentIndex(0)
              return
            }
            window.open(item.noRight)
          }
        }
      }
      if (type && type == 2) {
        if (this.isSvip || (this.isNewSvip && !this.isSvipEnd)) {
          if (this.isSendSvip && item.isSend) {
            window.open(item.noRight)
          } else {
            window.open(item.hasRight)
          }
        } else {
          window.open(item.noRight)
        }
      }
    },
  },

  watch: {

  },
};
</script>
<style lang="less" scoped>
</style>
