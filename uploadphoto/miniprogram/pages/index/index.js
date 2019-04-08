var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: []
  },
  /**
   * form提交事件
   */
  bindFormSubmit: function(e) {
    self = this
    //图片
    var imglist = self.data.imglist
    //提问内容
    var content = e.detail.value.content;
    if (content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    //添加问题
    wx.request({
      url: 'https://nasasky.com.cn/webapi/formx.php',
      data: {
        mingcheng: e.detail.value.mingcheng,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.header, // 设置请求的 header
      success: function(res) {
        // success
      
          if (imglist != '') {
            //开始插入图片
            for (var i = 0; i < imglist.length; i++) {
              //上传至服务器
              wx.uploadFile({
                url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img', //仅为示例，非真实的接口地址
                filePath: imglist[0],
                name: 'files',
                formData: {
                  'wtid': res.data,
                   name:'name'
                },
                header: app.globalData.header,
                success: function(res) {
                  if (i >= imglist.length) {
                    self.setData({
                      imglist: []
                    })
                    wx.hideLoading();
                    wx.showToast({
                      title: '提问成功',
                      icon: 'success',
                      duration: 2000,
                      mask: true
                    })
                    wx.navigateBack({
                      delta: 1
                    })
                  }

                  
                }

           


              })
            }
            console.log(imglist);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '提失败',
              icon: 'success',
              duration: 2000,
              mask: true
            })
            wx.navigateBack({
              delta: 1
            })
          }
        
      },
      fail: function(res) {
        self.onLoad();
      }
    })
  },
  //点击选择图片
  checkimg: function() {
    console.log('点击选择图片');
    self = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        self.setData({
          imglist: tempFilePaths
        })
        console.log(tempFilePaths)
      }
    })
  },
  //点击预览图片
  // ylimg: function(e) {
  //   wx.previewImage({
  //     current: e.target.dataset.src,
  //     urls: this.data.imglist // 需要预览的图片http链接列表
  //   })
  // },
  delImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var imglist = this.data.imglist;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此商品吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          imglist.splice(index, 1);
        } else if (res.cancel) {
          return false
          console.log('用户点击取消')
        }
        that.setData({
          imglist: imglist
        });
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})