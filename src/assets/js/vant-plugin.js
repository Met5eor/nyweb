// 注册vant全局组件
import { Swipe, SwipeItem, CountDown } from "vant";
const ComList = [Swipe, SwipeItem, CountDown];

const install = (Vue) => {
  ComList.forEach((v) => {
    Vue.use(v);
  });
};

export default { install };
