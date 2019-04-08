var page=0;
var page_size=10;
var last=1;

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
    this.loadData(false);
  },

  /** 
   * 加载数据 
   */
  loadData: function (tail, callback) {
    var that=this
    page >= 0 && page < last ? page++ : page >= last ? 
    wx.showToast({ title: '加载完成', icon: 'none', success: res => {
        console.log(22)
     that.setData({ loadData:true})
   }
      }) : ""
    if (that.data.loadData){

   }else{
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
          page: page,
          page_size: page_size

        },
        success: function (r) {

          var oldlist = that.data.list,
            newlist = tail ? oldlist.concat(r.data.list) : r.data.list;
          that.setData({
            list: newlist,
            currentUrlIndex: (urlIndex + 1) >= that.data.urls.length ? 0 : urlIndex + 1
          });
          if (callback) {
            callback();
          }
          console.log(that.data.list)
          console.log(page) 
        },
        error: function (r) {
          console.info('error', r);
        },
        complete: function () { }
      });
   }
 console.log(333)
  
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
    // wx.showLoading({  
    //   title: '数据加载中...',  
    // });  
    setTimeout(function () {
      that.loadData(false, () => {
        that.setData({
          loadingData: false
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
    console.info('onReachBottom');
    var hidden = this.data.hidden,
      loadingData = this.data.loadingData,
      that = this;
    if (hidden) {
      this.setData({
        hidden: false
      });
      console.info(this.data.hidden);
    }
    if (loadingData) {
      return;
    }
    this.setData({
      loadingData: true
    });
    // 加载数据,模拟耗时操作  

    wx.showLoading({
      title: '数据加载中...',
    });

    setTimeout(function () {
      that.loadData(true, () => {
        that.setData({
          hidden: true,
          loadingData: false
        });
        wx.hideLoading();
      });
      console.info('上拉数据加载完成.');
    }, 1000);
  }
})  