<template>
  <div class="user_info">
    <div class="advisor ">
      <img :src="avatar ? avatar : touristImg" @mouseover="mouseover" />
      <slot></slot>
    </div>
    <div class="nick_name">

      <span class="name">
        {{nickname&&nickname || uid || '未登陆'}}
      </span>
      <!-- 是否有高阶权限 -->
      <span class="icon svip" v-if="getHighRoleActive()"></span>
      <!-- 是否有低阶权限股牛牛会员 -->
      <span class="icon vip" v-else-if="getGnnRoleActive()"></span>
      <!-- 是否有高阶过期权限 -->
      <span class="icon nosvip" v-else-if="getHighRoleNoactive()"></span>

      <span class="icon novip" v-else></span>
      <!-- <div v-show="false">{{rulesList}}</div> -->
    </div>
    <div class="uid">用户名:{{ uid|| "" }}</div>
  </div>

</template>

<script>
import { getUserInfo } from '../../../api/vipCenter'
export default {
  name: "userInfo",
  inject: ['getuid', 'getrulesList','getUserIfo'],
  components: {},
  props: {
    // rulesList: {
    //   type: Array,
    //   default: () => []
    // },
  },
  data() {
    return {
      showCard: false,
      avatar: "",
      nickName: "",
      touristImg:
        "https://cdn.upchina.com/front/gnnvipcenterh5/images/pic_tourist.png",
    };
  },

  computed: {
    uid() {
      return this.getuid()
    },
    rulesList() {
      return this.getrulesList()
    },
    userInfo() {
      return this.getUserInfo()
    },
  },
  watch: {
    uid(val) {
      this.getUserInfo()
    },
  },
  async created() {
    if (this.uid) {
      this.getUserInfo()
    }
  },
  mounted: function () { },
  methods: {
    //用户信息头像的获取
    async getUserInfo() {
      let req = {
        uid: this.uid
      }
      let res = await getUserInfo(req)
      this.avatar = res.head_url
      this.nickname = res.nickname
    },
    //是否有高阶的权限的角色
    getHighRoleActive() {
      return this.rulesList.some(v => (v.name === '尊享会员' || v.name === '实战直播版') && v.isPower)
    },
    //是否有低阶的权限的股牛牛角色
    getGnnRoleActive() {
      return this.rulesList[0].isPower
    },
    //是否有过高阶权限
    getHighRoleNoactive() {
      return this.rulesList.some(v => (v.name === '尊享会员' || v.name === '实战直播版') && v.isVip)
    },
    mouseover() {
      if (!this.$listeners.changshowCard) return
      this.$emit('changshowCard', true)
    }
  },


};
</script>
<style lang="less" scoped>
.user_info {
  padding-left: 1.28rem;
  color: #fff;
  min-width: 185px;
  // margin-left: auto;
  margin-top: 22px;
  /*  margin-left: auto;
    padding-top: 22px;*/
  .advisor {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
    }
  }
  .nick_name {
    font-size: 22px;
    line-height: 30px;
    width: 300px;
    text-align: left;
    .icon {
      height: 20px;
      margin-left: 8px;
      display: inline-block;
    }
    .icon.vip {
      width: 35px;
      background: url(../images/icon_vip.png) no-repeat;
      background-size: 100%;
    }
    .icon.novip {
      width: 37px;
      background: url(../images/icon_novip.png) no-repeat;
      background-size: 100%;
    }
    .icon.svip {
      width: 46px;
      background: url(../images/icon_svip.png) no-repeat;
      background-size: 100%;
    }
    .icon.nosvip {
      width: 46px;
      background: url(../images/icon_nosvip.png) no-repeat;
      background-size: 100%;
    }
  }
  .uid {
    width: 300px;
    font-size: 16px;
    line-height: 22px;
    margin-top: 4px;
    text-align: left;
  }
}
</style>
