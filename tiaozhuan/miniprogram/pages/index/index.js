// pages/eg/eg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数组
    list: [
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b8d3a155a.jpg',
        title: '星空'
      },
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b7134812b.jpg',
        title: '花'
      },
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b8d3a155a.jpg',
        title: '星空'
      },
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b7134812b.jpg',
        title: '花'
      },
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b8d3a155a.jpg',
        title: '星空'
      },
      // {
      //   pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b7134812b.jpg',
      //   title: '花'
      // },
      // {
      //   pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b8d3a155a.jpg',
      //   title: '星空'
      // },
      {
        pic: 'http://pic1.win4000.com/wallpaper/2018-08-03/5b63b7134812b.jpg',
        title: '花'
      }

    ]
  },
  //点击事件
  picChange: function (e) {
    var that = this
    // console.log(e)//打印数据
    console.log(e.currentTarget.dataset.id)//打印数据
    var id = e.currentTarget.dataset.id
    console.log(that.data.list)
    // console.log(that.data.list[id].pic)
    wx.navigateTo({
      url: '/pages/list/list?pic=' + that.data.list[id].pic + '&title=' + that.data.list[id].title,//传pic、pic两个参数到跳转新页面
      // success: function (res) { },
      // fail: function (res) { },
      // complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(that.data.list[0].pic)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})