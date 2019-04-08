// var page = 0;
var page_size = 10;
// var last = 1;
var app=getApp().globalData
Page({

  data: {
    /** 
     * 需要访问的url 
     */
    urls: [
      'https://hg.airyee.com/tools/small_program.ashx?action=can_activity_list',

    ],
    /** 
     * 当前访问的url索引 
     */
    currentUrlIndex: 0,
    page:{
      current:1,
      total:10
    },
    /** 
     * 获取到的文章 
     */
    list: [],
    /** 
     * 控制上拉到底部时是否出现 "数据加载中..." 
     */
    hidden: true,
    /** 
     * 数据是否正在加载中，避免数据多次加载 
     */
    loadingData: false
  },




  onLoad: function (options) {
    this.loadData();
  },

  /** 
   * 加载数据 
   */
  loadData: function (fromShow) {
    var that = this
      var that = this,
        urlIndex = that.data.currentUrlIndex;
      wx.request({
        url: that.data.urls[urlIndex],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        // data: JSON.stringify(js),
        data: {
          user_name: '13380080028',
          password: '123123',
          page: that.data.page.current,
          page_size: page_size


        },
        success: function (res) {

          var oldlist = that.data.list
       that.data.page.current = fromShow ? 1 :that.data.page.current
          that.data.page.total = res.data.last
          that.setData({
            // list: newlist,
            list: that.data.page.current && that.data.page.current <= res.data.last ? that.data.list.concat(res.data.list) : res.data.list,
            page:  that.data.page
          });
          // if (callback) {
          //   callback();
          // }
          wx.hideLoading()
          console.log(that.data.page.current && that.data.page.current < res.data.last,that.data.list)
   
        },
        error: function (r) {
          console.info('error', r);
        },
        complete: function () { }
      });


  },
  onShow: function (options) {
    var that = this
    if (that.data.page.current > 1 || app.route) {
      that.data.page.current = 1
      that.setData({
        list: [],
        page: that.data.page
      })
      that.loadData(true)
    }
    // this.(,false);
  },
  /** 
   * 监听用户下拉动作 
   */
  onPullDownRefresh: function () {
    console.info('onPullDownRefresh');
    var loadingData = this.data.loadingData,
      that = this;
   
    if (loadingData) {
      return;
    }
    // 显示导航条加载动画  
    wx.showNavigationBarLoading();
    // 显示 loading 提示框,在 ios 系统下，会导致顶部的加载的三个点看不见  
    wx.showLoading({  
      title: '数据加载中...',  
    });  
    setTimeout(function () {
      that.loadData(false, () => {
        that.setData({
          loadingData: true
        });
        wx.stopPullDownRefresh();
        // wx.hideLoading();  
        wx.hideNavigationBarLoading();
        console.info('下拉数据加载完成.');
      });
    }, 1000);
  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    var that=this
    console.info('onReachBottom');
    if (that.data.page.current>=0&&that.data.page.current < that.data.page.total) {
      wx.showLoading({
        title: "上拉加载更多！",
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      that.data.hidden = false,
    //       that.data.loadingData=false
      that.data.page.current = Number(that.data.page.current) + 1

    var timer=  setInterval(function () {
        that.data.hidden=false,
          that.data.loadingData=false
      wx.showLoading({
        title: '数据加载中...',
      });
       that.setData({
         hidden: that.data.hidden,
         loadingData:that.data.loadingData
      })
      that.loadData()
      console.info('上拉数据加载完成.');
      clearInterval(timer)
      }, 1000);


    } else {
       that.data.hidden = true,
        that.data.loadingData = true
      // that.setData({
      //   hidden: that.data.hidden,
      //   page: that.data.page
      // })
      wx.showToast({
        title: '亲！已经到底啦',
        icon: 'none',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    that.setData({
      hidden: that.data.hidden,
      page: that.data.page,
      loadingData: that.data.loadingData,
 
    });

    // 加载数据,模拟耗时操作  
    console.log( that.data.hidden)



  }
})  