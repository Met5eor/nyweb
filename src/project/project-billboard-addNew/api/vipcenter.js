import $http from "@u/http";
const api = "/vipcenter";



//获取当前用户是否是新用户，是否有领取会员
//url第一个参数地址，params参数二， 参数三是否提示加载进度icon:showToast ,参数四 isTip是否提示后台提示信息msg message 参数5是否返回整个resObj
export const checkFollow = (params) =>$http.get(`${api}/check/userShareSuc`,params,true,true,true);

