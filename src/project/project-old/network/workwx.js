import network from "./index";
const api = "/workwx";

// 获取企业微信Tick票据
export const getwxTicket = (params) => {
    return network({
      url: `${api}/getJsapiTicket`,
      method: "get",
      params
    });
};


// 获取用户在up的订单信息
export const getUserOrders = (params)=>{
    return network({
        url: `${api}/getUserOrders`,
        method: "get",
        params
      });
}