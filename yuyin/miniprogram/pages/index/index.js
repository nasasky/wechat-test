var url = "https://www.wazyb.com/newsapi/";
var page = 0;
var page_size = 10; //每页显示数量
// 请求全部数据
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.showNavigationBarLoading(); //在标题栏中显示加载
  wx.request({
    url: url + 'index/',
    data: {
      page: page,
      page_size: page_size
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var whdthNum = res.data;
      if (whdthNum == 0) {
        that.setData({
          ShdthNum: whdthNum
        });
      }
      if (res.data != 0) {
        var listData = wx.getStorageSync('infoList') || []
        // -------------
        for (var i = 0; i < res.data.listz.length; i++) {
          listData.push(res.data.listz[i]);
        }
        wx.setStorageSync('infoList', listData)
        setTimeout(function () {
          that.setData({
            infoList: listData,
            imgUrls: res.data.gzlist
          });
          //console.log(listData);
        }, 800)
        page++;
        // -------------
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 2000)
      } else {
        that.setData({
          hidden: true,
          display: false
        });
      }

    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh();
    }
  })

  // 替换
  
}

Page({
  data: {
    imgUrls: [],
    picUrl: "https://www.wazyb.com",
    infoList: [],
    hidden: true,
    display: true,
    ShdthNum: 1
  },
  
  onLoad: function () {
    try {
      wx.removeStorageSync('infoList')
    } catch (e) {
      //console.log('no data')
    }
  },
  onShow: function () {
    var that = this;
    var ShdthNum = that.data.ShdthNum;
    if (ShdthNum == 1) {
      GetList(that);
    } else {
      //获取
      setTimeout(function () {
        try {
          var value = wx.getStorageSync('infoList')
          if (value) {
            that.setData({
              infoList: value,
            })
          }
        } catch (e) {
          console.log('error');
        }
      }, 1000)
    }
    /*
    
    */
  },

  // 下拉加载刷新
  onPullDownRefresh: function () {
    page = 0;
    this.setData({
      display: true,
      infoList: []
    })
    wx.removeStorageSync('infoList')
    GetList(this)
  },

  // 上拉加载更多
  onReachBottom: function () {
    var that = this;
    setTimeout(function () {
      GetList(that)
    }, 500)
  },

  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    var that = this;
    var picUrl = that.data.picUrl;
    return {
      title: '这里可以自定义新闻标题~',
      path: '/pages/index/index'
    }
  }

})