// pages/movies/more-movie/more-movie.js
const app = getApp()

const inTheaterUrl = app.globalData.doubanAPIBase + '/v2/movie/in_theaters',comingUrl = app.globalData.doubanAPIBase + '/v2/movie/coming_soon',topUrl = app.globalData.doubanAPIBase + '/v2/movie/top250'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    totalCount:0,
    isEmpty:true,
    type:'',
    url:''
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
    this.data.type = type

    let self = this
    this.data.url = this.getReactUrl()
    wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
    this.getMovieData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMovieData() {
    let self = this;
    let url = this.data.url+'?start='+this.data.totalCount+'&count=18';
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
        let totalMovies = arr;

        if(self.data.isEmpty){
          self.data.isEmpty = false
        }
        else{
          totalMovies = self.data.movies.concat(arr)
        }
        self.setData({ movies: totalMovies})
        self.data.totalCount += 20
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        wx.stopPullDownRefresh()
      },
    })
  },

  getReactUrl() {
    const type = this.data.type
    switch (type) {
      case 'top':
        return topUrl;
      case 'coming':
        return comingUrl;
      case 'inTheater':
        return inTheaterUrl;
      default:
        return topUrl;
    }
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
    this.data.totalCount = 0;
    this.data.isEmpty = true
    this.getMovieData() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('bottom')
    wx.showNavigationBarLoading()
    this.getMovieData() 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})