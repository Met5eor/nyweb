import network from "./index";
const api = `/fortune`;

// router.get("/fortune/config", decryptUser, fortune.getPageConfig)       // 获取页面配置信息
// router.get("/fortune/lottery", decryptUser, fortune.lottery)            // 抽奖
// router.get("/fortune/pollList", decryptUser, fortune.getPollList)       // 中奖信息列表
// router.get("/fortune/topay", decryptUser, fortune.toUnifiedpay)         // 支付订单地址
// router.get("/fortune/callback", decryptUser, fortune.callback)          // 订单回调中转


// 获取【活动页面配置信息】
export const getConfig = () => {
  return network({
    url: `${api}/config`,
    method: "get"
  });
};

// 抽奖
export const lottery = (data) => {
  return network({
    url: `${api}/lottery`,
    method: "post",
    data
  });
};

// 查看我的奖品池
export const getPollList = (params) => {
    return network({
        url: `${api}/pollList`,
        method: "get",
        params
    });
};

// 去支付
export const toPayPage = (params) => {
    return network({
        url: `${api}/topay?isWeb=1`,
        method: "get",
        params
    });
};

