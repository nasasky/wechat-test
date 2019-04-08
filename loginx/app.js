App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
          }
        })
      }
    });
  },

  /**
   * 设置全局变量
   */
  globalData: {
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb26d9c5e3ce6b971&secret=d2941401a60856fab2f113302a3d80ef&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  }
})