//icon跳转的方法
let fun = {
  inject: ['currentIndex', 'getrulesObj','changeShowWx'],
  methods: {
    goIcon(item, type) {
      if (!type) return;
      let arr = ["股牛牛会员", "尊享会员", "尊享会员实战直播版"];
      let { isVip, isPower, isOldUser } = this.getrulesObj(arr[this.currentIndex]);
      if (!isPower) return window.open(item.noRight);
      if (item.txt == "微信服务圈") return this.changeShowWx()
      if (item.txt === "会员折扣") return window.scrollTo(0, item.fixed);
      if (item.hasRight.includes("http")) return window.open(item.hasRight);
      upNativeComm.exec("cmd_goto", { func_guid: item.hasRight });
    },
  },
  created: function () {},
};
export default fun 