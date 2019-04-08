
var app = getApp();

Page({
  data:{
    username:null,
    password:null,
  },
  onLoad:function(options){
   
  },
  onReady:function(){
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

 loginCBtnClick:function (){
   app.appData.username = {username:this.data.username,password:this.data.password}
   console.log()
   wx.switchTab ({url:"../user/user"})
  },

  usernameInput : function (event){

    console.log(event)
    this.setData({username:event.detail.value})
  },

  passwordInput : function (event){
    this.setData({password:event.detail.value})
  }


})