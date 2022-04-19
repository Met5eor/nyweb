import $http from "@u/http";
const api = "/activity_wup";

// 优惠券后台下发
export const addCoupon = (params) =>  $http.post(`${api}/addCouponNewPeople`,params);

// 优惠券后台下发
export const ounponAll = (params) =>  $http.post(`${api}/getCounponAll`,params);

