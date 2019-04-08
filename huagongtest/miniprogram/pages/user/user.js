
var app = getApp();
Page({
  data:{
    username:null
  },
  onLoad:function(options){
    if(app.appData.username == null ){
    //  wx.navigateTo({url:"../login/login"})

        wx.redirectTo({url:"../login/login"})
    }else{

      this.setData({username:app.appData.username.username})


    }


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})