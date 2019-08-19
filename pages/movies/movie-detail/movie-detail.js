// pages/movies/movie-detail/movie-detail.js
const app = getApp();
const detailUrl = app.globalData.doubanAPIBase + '/v2/movie/subject/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    // movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.movieId)
    this.setData({url: detailUrl + options.movieId})
    this.getMovieData()
  },
  getMovieData( ) {
    let self = this;
    let url = this.data.url
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'aplication/json'
      },
      success(res) {
        let data = res.data
        if (!data) {
          return;
        }
        var director = {
          avatar: "",
          name: "",
          id: ""
        }
        if (data.directors[0] != null) {
          if (data.directors[0].avatars != null) {
            director.avatar = data.directors[0].avatars.large

          }
          director.name = data.directors[0].name;
          director.id = data.directors[0].id;
        }
        var movie = {
          movieImg: data.images ? data.images.large : "",
          country: data.countries[0],
          title: data.title,
          originalTitle: data.original_title,
          wishCount: data.wish_count,
          commentCount: data.comments_count,
          year: data.year,
          generes: data.genres.join("、"),
          score: data.rating.average,
          director: director,
          casts: data.casts,
          castsInfo: data.casts,
          summary: data.summary
        }
        self.setData({...movie})
      },
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