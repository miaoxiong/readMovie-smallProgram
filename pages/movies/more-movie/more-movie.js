// pages/movies/more-movie/more-movie.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = options.category.split(',')
    wx.setNavigationBarTitle({
      title: params[1]
    })
    //当前电影类型
    let type = params[0]

    let self = this, url;
    let inTheaterUrl = app.globalData.doubanAPIBase + '/v2/movie/in_theaters'
    let comingUrl = app.globalData.doubanAPIBase + '/v2/movie/coming_soon'
    let topUrl = app.globalData.doubanAPIBase + '/v2/movie/top250'
    switch(type) {
      case 'top':
        url = topUrl;
        break;
      case 'coming':
        url = comingUrl;
        break;
      case 'inTheater':
        url = inTheaterUrl;
        break;
      default:
        break;
    }
    wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
    this.getMovieData(url, type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMovieData(url, type) {
    let self = this;
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'aplication/json'
      },
      success(res) {
        let { subjects, title } = res.data
        let arr = []
        subjects.forEach(item => {
          let realCounts = Math.round(item.rating.average / 2)
          arr.push({
            title: item.title.length > 6 ? item.title.substring(0, 6) + '...' : item.title,
            average: item.rating.average,
            imgUrl: item.images.large,
            realStars: new Array(realCounts).fill(1),
            nonStars: new Array(5 - realCounts).fill(1),
            id: item.id
          })
        })
        self.setData({ movies: arr})
        wx.hideLoading()
      },
    })
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
    wx.startPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('bottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})