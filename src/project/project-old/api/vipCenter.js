import $http from "./http";
const api = "/activitysqx";

 //用户权限获取
export const allmodule = (params) =>  $http.get(`${api}/allmodule`,params);

// 获取用户信息
export const getUserInfo = (params) =>  $http.get(`${api}/userinfo`,params);

