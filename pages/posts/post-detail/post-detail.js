// pages/posts/post-detail/post-detail-template.js
const { postList } = require('../../../data/post-data.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false,
    isPlayMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postData = postList.filter(item=>item.post_id == options.id)[0]
    this.setData(postData)

    var postId = postData["post_id"]
    var postCollected = wx.getStorageSync("postCollected")
    if (postCollected[postId]){
      this.setData({
        collected:true
      })
    }

    this.onMusicMonitor()
    console.log(app.globalData.g_playMusic)
    if (app.globalData.g_playMusic && app.globalData.g_playId === this.data.post_id){
      this.setData({
        isPlayMusic: true
      })
    }
  },
  onMusicMonitor() {
    var self = this
    wx.onBackgroundAudioPause((param) => {
      self.setData({ isPlayMusic: false })
    })

    wx.onBackgroundAudioPlay((param) => {
      self.setData({ isPlayMusic: true })
    })
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
    if (this.data.isPlayMusic){
      app.globalData.g_playMusic = this.data.isPlayMusic;
      app.globalData.g_playId = this.data.post_id;
    } 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onCollection: function() {
    console.log(this.data.post_id)
    var postId = this.data.post_id
    var collected = wx.getStorageSync("postCollected")
    var self = this;
    if (collected){
      //model 弹窗
      // wx.showModal({
      //   title: collected[postId] ? '取消收藏?' : '收藏?',
      //   success(res) {
      //     console.log(res)
      //     if(res.confirm){
      //       collected[postId] = !collected[postId]
      //       self.setData({ "collected": collected[postId] })
      //       wx.setStorageSync("postCollected", collected)
      //     }
      //   }
      // })
      //toast 弹窗
      
      collected[postId] = !collected[postId]
      this.setData({ "collected": collected[postId] })
      wx.setStorageSync("postCollected", collected)
      wx.showToast({
        title: collected[postId] ? '收藏成功' : '取消成功',
        icon: collected[postId] ? 'success' : 'fail',
        duration: 1000
      })
    }
    else{
      var obj = {}
      obj[postId] = true
      wx.setStorageSync("postCollected", obj 
      )
      this.setData({ "collected": true })
      wx.showToast({
        title: '收藏成功',
      })
    }
    console.log(wx.getStorageSync('postCollected'))
  },
  onShare(){
    wx.showActionSheet({
      itemList: [
        '分享到好友',
        '分享到朋友圈',
        '分享到qq'
      ],
      itemColor:'#405f80',
      success:function(res) {
        console.log(res.tapIndex)
        switch(res.tapIndex){
          case 0:
            console.log('分享给了好友')
            break; 
          case 1:
            console.log('分享到了朋友圈')
            break; 
          default:
            console.log('选错l')
        }
      }
    })
  },
  onMusicTap(event) {
    if (this.data.isPlayMusic){
      wx.pauseBackgroundAudio();
      this.setData({isPlayMusic:false})
    }
    else{
      this.setData({isPlayMusic:true})
      let { url, title, coverImg } = this.data.music
      this.playMusic(url, title, coverImg)
    }
  },
  playMusic(url, title, coverImg) {
    wx.playBackgroundAudio({
      dataUrl: url,
      title,
      coverImgUrl: coverImg
    })
  }
})