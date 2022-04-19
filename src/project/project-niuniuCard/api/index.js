import $http from "@u/http";
const api = "/activitysqx";



// 查询注册天数
export const getregdateday = (params) =>  $http.get(`${api}/getregdateday`,params);



