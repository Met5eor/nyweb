import network from "./index";  

// 获取当前用户是否有领取会员（shareVip/wx）
export const checkFollow = (params) => {
    return network({
      url: `/check/userShareSuc`,
      method: "get",
      params
    });
};
