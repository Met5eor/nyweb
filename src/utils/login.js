export const appLogin = () => {
  try {
    upNativeComm.exec("Navigation.userLogin", {
      callback: (code, data) => {
        data = JSON.parse(data);
        if (data && data.ret == 0) {
          //登录成功
          // console.log("//登录成功");
          window.location.reload();
        } else {
          // upNativeComm.exec("WebView.close");
          console.log("login fail");
        }
      },
    });
  } catch (err) {
    reject("Navigation.userLogin 错误", err);
    console.log("Navigation.userLogin 错误");
  }
}

export const pcGnnLogin = () => {
  try {
    upNativeComm.exec("open.loginframe", {
      callback: (code, data) => {
        data = JSON.parse(data);
        if (data && data.ret == 0) {
          //登录成功
          // console.log("//登录成功");
          window.location.reload();
        } else {
          console.log("login fail");
        }
      },
    });
  } catch (err) {
    reject("open.loginframe 错误", err);
    console.log("open.loginframe 错误");
  }
}

export const appCheckLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      upNativeComm.exec("UPUser.getUserInfo", {
        callback: function (code, param) {
          param = JSON.parse(param);
      
          if (param && param["uid"]) {
            resolve(param);
          } else {
            try {
              upNativeComm.exec("Navigation.userLogin", {
                callback: function (code, data) {
                  data = JSON.parse(data);
                  if (data.ret === 0) {
                    console.log("登陆成功校验用户是否领取来显示页面");
                    window.location.reload()
                  }
                },
              });
            } catch (err) {
              console.log("Navigation.userLogin 错误");
            }
          }
        },
      });
    } catch (err) {
      reject("UPUser.getUserInfo 错误", err);
      console.log("UPUser.getUserInfo 错误");
    }
  });
}
export const pcCheckLogin = (isInGNNPC = true) => {
  // console.log('upNativeComm.exec',upNativeComm.exec)
  return new Promise((resolve, reject) => {
    try {
      upNativeComm.exec("user.info", {
        callback: (code, data) => {
          if (isInGNNPC) {
            data = JSON.parse(data);
            // console.log(data,111)
          } else {
            sessionStorage.setItem('loginObj', JSON.stringify(data))
          }
          // console.log(data["uid"],'000000000')
          //股票通登录验证,默认游客uid: 'guest2018'
          if (data && data["uid"]) {
            if (data["uid"] === "guest2018") {
              upNativeComm.exec("open.regist");
            } else {
              //用户已登录
              resolve(data);
            }
          }
        },
      });
    } catch (err) {
      reject(err);
      console.log("UPUser.getUserInfo 错误");
    }
  });
}