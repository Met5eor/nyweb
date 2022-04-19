import axios from 'axios';
import {Toast} from 'vant';


// 行情正式url
let baseURL='https://gateway.uptougu.com/json/';
const HTTP= axios.create({
    baseURL,
    headers: {
        "Content-Type":"application/json"
    },
    async:false,
    responseType: "json",
    timeout: 5000, // 请求超时时间
})

export const GET = (url,params)=>{
    params = params || {};
    return new Promise((resolve,reject)=>{
        HTTP.get(url,{
            params,
        }).then(res=>{
            if(res.status===200){
                resolve([res.data.stRsp, null]);
            }else{
                Toast(res.data)
                resolve([null, res.data]);
            }
        }).catch(error=>{
            Toast(error.data)
            resolve([null, error]);
        })
    })
}

export const POST = (url,data)=>{
    data = data || {};
    return new Promise((resolve,reject)=>{
    HTTP.post(url,data).then(res=>{
        if(res.status===200){
            res.data.stRsp ? resolve([res.data.stRsp, null]) : resolve([res.data, null]);
        }else{
            Toast(res.data)
            resolve([null, res.data]);
        }
    }).catch(error=>{
        Toast(error.data)
        resolve([null, error]);
    })
    })
}

export const POST_New = (url,data)=>{
    data = data || {};
    return new Promise((resolve,reject)=>{
    HTTP.post(url,data).then(res=>{
        if(res.status===200){
            resolve([res.data, null]);
        }else{
            Toast(res.data)
            resolve([null, res.data]);
        }
    }).catch(error=>{
        Toast(error.data)
        resolve([null, error]);
    })
    })
}