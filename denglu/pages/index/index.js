//index.js
//获取应用实例
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {

  },
  //登录获取code
  login: function () {
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'https://nasasky.com.cn/webapi/demo.php', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  }
})