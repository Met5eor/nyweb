import network from "./index";  

// 领取优惠劵/wx）
export const addCoupon = (params) => {
    return network({
      url: `/addCouponNewPeople`,
      method: "post",
      params
    });
};

export const ounponAll = (params) => {
  return network({
    url: `/getCounponAll`,
    method: "post",
    params
  });
};
