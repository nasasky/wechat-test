const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const API_URL = 'https://www.wazyb.com/newsapi/';
Page({
  data: {
    picUrl: "https://www.wazyb.com/",
    userInfo: [],  // 微信信息
    openid: '',
    vid: 0, // 内容ID
    names: '标题加载中...',
    olist: 0,
    wlist: 0,
    disabled_1: false,
    disabled_2: false,
    gzList: []  // 关注列表
  },

  /* 关注度写入 */
  getGuanzhu: function (ev) {
    var that = this;
    var userInfo = that.data.userInfo;
    if (ev == 1) {
      // 数据写入
      wx.request({
        url: API_URL + 'getGuanzhu/',
        data: {
          cid: 1,
          openid: that.data.openid,
          vid: that.data.vid,
          avatar: userInfo.avatarUrl,
          uname: userInfo.nickName
        },
        method: 'GET',
        success: function (res) {
          //console.log(res);
        }
      })
    } else if (ev == 2) {
      // 数据查询
      wx.request({
        url: API_URL + 'getGuanzhu/',
        data: {
          cid: 2,
          vid: that.data.vid
        },
        method: 'GET',
        success: function (res) {
          console.log(res);
          that.setData({
            gzList: res.data
          })
        }
      })
    }

  },


  /* 生命周期函数--监听页面加载*/
  onLoad: function (params) {
    var that = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    //******************************* */
    if (params.id < '1') {
      wx.showToast({
        title: '没有数据啦',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.request({
        url: API_URL + 'view/id/' + params.id,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res);
          var homeid = res.data[0];
          if (homeid) {
            wx.redirectTo({
              url: 'view?id=' + homeid
            })
          } else {
            var article = res.data.content;
            WxParse.wxParse('article', 'html', article, that, 5);
            // success
            that.setData({
              gzList: res.data.gzlist,
              vid: res.data.id,
              names: res.data.name,
              olist: res.data.olist,
              wlist: res.data.wlist
            })
            setTimeout(function () {
              if (that.data.wlist == that.data.vid) {
                that.setData({
                  disabled_1: false,
                  disabled_2: true
                })
              } else if (that.data.olist == that.data.vid) {
                that.setData({
                  disabled_1: true,
                  disabled_2: false
                })
              } else {
                that.setData({
                  disabled_1: false,
                  disabled_2: false
                })
              }
            }, 2000)
            wx.showLoading({
              title: '图片加载中'
            })
          }
        },
        complete: function () {
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          wx.hideNavigationBarLoading() //完成停止加载
        }
      })
      // 获取OPENID
      wx.login({
        success: function (loginCode) {
          //console.log(loginCode) //获取openid  
          wx.request({
            url: API_URL + 'GetOpenid/code/' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //console.log(res.data) //获取openid  
              that.setData({
                openid: res.data
              })
            }
          })
        }
      })
      ///**************************** */
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //console.log(userInfo)
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })

      setTimeout(function () {
        that.getGuanzhu(1);
      }, 5000)
      setTimeout(function () {
        that.getGuanzhu(2);
      }, 7000)
    }

  },

  // 上一组数据
  topIc: function (e) {
    var that = this;
    var topid = e.currentTarget.dataset.id - 1;
    wx.redirectTo({
      url: 'views?id=' + topid
    })

  },
  // 下一组数据
  nextIc: function (e) {
    var that = this;
    var nextid = parseInt(e.currentTarget.dataset.id) + 1;
    wx.redirectTo({
      url: 'views?id=' + nextid
    })
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '这里可以自定义新闻标题~',
      path: '/pages/views/views?id=' + that.data.vid
    }
  }

})