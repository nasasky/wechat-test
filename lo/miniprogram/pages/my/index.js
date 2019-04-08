//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    userInfo: {},
    source: 'github.com/wangmingjob/weapp-weipiao'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
      var pages = getCurrentPages();//获取当前页面信息栈
    var _thisPage = pages[pages.length - 1]
    console.log(_thisPage, that.data.page)
    app.route = _thisPage
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  }
})
