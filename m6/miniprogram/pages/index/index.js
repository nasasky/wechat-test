var page = 0;
var page_size = 10;
// var totalPage =1;

// Page({
//   data: { // 前台显示list 
//     list: [], // 当前页
    
//   },
//   onLoad: function(options) {
//     var self = this; // 请求后台 // 获取第一页的list及总页数 
   
   
//     wx.request({
//       url: 'https://hg.airyee.com/tools/small_program.ashx?action=can_activity_list',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       method: "POST",
//       // data: JSON.stringify(js),
//       data: {
//         user_name: '13380080028',
//         password: '123123',
//         // user_name: 'test',
//         // password: '123456',
//         page: page,
//         page_size: page_size,
      

//       },

//       success: function(res) {
//         self.setData({
//           list: res.data.list,
//           count: res.data.count,
//         })
//         // console.log(page)
//       },
//       fail: function(res) {

//       }
//     })
//   },
//   /**
//    * 页面上拉触底事件的处理函数
//    */








//   onReachBottom: function (e) {
//     var that = this;
//     var page = null;
//     page = that.data.count/10;
//     that.setData({
//     page_size:page_size
//     })

//     if (page <= page) {
//       wx.showToast({
//         title: '加载中！',
//         icon: 'loading',
//         duration: 1000
//       })

     
     
//     } else if (page > page) {
//       wx.showToast({
//         title: '数据已加载完',
//         icon: 'loading',
//         duration: 1000
//       });
//       return;
//     }
//   }



// })





Page({
  data: { // 前台显示list showlist: [], // 当前页 pageNumber: 1, // 总页数 totalPage: 1, }, onLoad: function (options) { var self = this; // 请求后台 // 获取第一页的list及总页数 wx.request({ url: '', data: { }, success: function (res) { self.setData({ showlist: res.data.list, totalPage: res.data.totalPage, }) }, fail: function (res) { } }) }, /**
    * 页面上拉触底事件的处理函数
   */ onReachBottom: function() {
    var self = this; // 当前页+1 var pageNumber = self.data.pageNumber + 1; self.setData({ pageNumber: pageNumber, }) if (pageNumber <= self.data.totalPage) { wx.showLoading({ title: '加载中', }) // 请求后台，获取下一页的数据。 wx.request({ url: '', data: { pageNumber: pageNumber, }, success: function (res) { wx.hideLoading() // 将新获取的数据 res.data.list，concat到前台显示的showlist中即可。 self.setData({ showlist: self.data.showlist.concat(res.data.list) }) }, fail: function (res) { wx.hideLoading() } }) } } })
    ---------------------
      作者：酒肉猿
    来源：CSDN
    原文：https://blog.csdn.net/z834410038/article/details/77532899 
    版权声明：本文为博主原创文章，转载请附上博文链接！