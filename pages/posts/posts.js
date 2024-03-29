// pages/posts/posts.js
var {postList} = require("../../data/post-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: 'Sep 16 2018'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      postList
    })
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
    console.log('onPullDownRefresh')
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
  },
  onPostTap: function(event) {
    // console.log(event.currentTarget.dataset.postid)
    var id = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: './post-detail/post-detail?id='+id,
    })
  },
  onPostLun: function(e) {
    console.log(e)
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + e.target.dataset['index'],
    })
  }
})