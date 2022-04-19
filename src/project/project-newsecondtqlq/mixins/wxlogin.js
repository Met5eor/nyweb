// 查询或注册用户信息,绑定新老用户关系
import network from "../network/index";
const loginMix = {
    beforeMount() {
        this.getwxInfo();
    },
    methods: {
        async getwxInfo(){
            const search = window.location.search;
            const username = sessionStorage.getItem('username');
            if(username)return ;
            const istoken = search&&search.includes('key=')&&search.includes('time=');
            // 判断公众号授权是否成功
            if(!istoken && !username){
                this.loginAuth();
            }else if(istoken){
                const query = {};
                const params = {
                    // 分享关联用户信息
                    relationData: {
                        uid: 'up0188735',
                        business: '',
                    },
                    // 分享渠道号
                    ch: '15999'
                };
                const searchList = search.substr(1).split('&');
                searchList.forEach((item)=>{
                    const arr = item.split("=");
                    query[arr[0]] = arr[1];
                });
                const {key,time} = query;
                if(key && time){
                    // 替换微信授权信息
                    this.filterWx();
                    const {data} = await network({ 
                        url: `/merchant/userWechatReg${search}`, 
                        method: "post", 
                        data: params,
                    });
                    // 保存用户信息到session
                    const {ret,username} = data;
                    sessionStorage.setItem('username',ret===0 ? username:'');
                }
            }
        },
        // 地址栏过滤微信参数
        filterWx(){
            const {origin,search} = location;
            let path = `${origin}`;
            if(search){
                const searchList = search.substr(1).split('&');
                let params = [];
                searchList.forEach((item)=>{
                    const arr = item.split("=");
                    if(arr[0]!=='key'&&arr[0]!=='time'){
                        params.push(`${arr[0]}=${arr[1]}`);
                    }
                });
                if(params.length){
                    path = `${origin}?${params.join("&")}`
                }
            }
            // 过滤微信信息
            history.replaceState(null,"",`${path}`);
        },
        // 获取微信key + time
        async loginAuth(){
            const callback = location.href;
            const {data} = await network({ url: `/merchant/loginAuth?callback=${callback}`, method: "get"});
            if(data&&data.ret===0){
                window.location.href = data.backurl;
            }
        },
    }
}

export default loginMix