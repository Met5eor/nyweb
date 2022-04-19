import $http from "@u/http";
const api = "/activitysqx";



// 获取用户分享进度数据
export const getUserRelationInfo = (params) =>  $http.get(`${api}/user/userRelationInfo`,params);

// 批量获取用户头像、手机号等信息
 export const userInfoBatch = (params) =>  $http.get(`${api}/user/userInfoBatch`,params);

 // 批量查询是否是新用户
 export const isNewUser = (params) =>  $http.get(`${api}/user/isNewUser`,params);

