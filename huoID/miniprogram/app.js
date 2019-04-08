//app.js
App({
  onLaunch: function () {
    /*初始化APP自动登陆
    * 您也可以在任何地方进行用户登陆验证 
    *用法：首先在js文件中定义 var app = getApp(); app.getUserDataToken();
    */
    this.getUserDataToken();
  },
  getUserDataToken: function () {
    var that = this;
    //获取用户缓存token 此token是服务器作为用户唯一验证的标识，具体请看后端代码
    var utoken = wx.getStorageSync("utoken");
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              //用户登陆URL地址，请根据自已项目修改
              url: 'https://66018954.qcloud.la/WxApp/index.php/UserApi/userAuthSlogin',
              method: "POST",
              data: {
                utoken: utoken,
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              fail: function (res) {

              },
              success: function (res) {
                var utoken = res.data.utoken;
                //设置用户缓存
                wx.setStorageSync("utoken", utoken);
              }
            })
          }
        })
      }
    })
  }
})