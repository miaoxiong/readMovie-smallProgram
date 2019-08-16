// pages/movies/movies.js
const app = getApp();
Page({
  // restful api json
  // soap xml
  /**
   * 页面的初始数据
   */
  data: {
    top:'',
    coming:'',
    inTheater:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let inTheaterUrl = app.globalData.doubanAPIBase + '/v2/movie/in_theaters?start=0&count=3'
    let comingSoonUrl = app.globalData.doubanAPIBase + '/v2/movie/coming_soon?start=0&count=3'
    let top250Url = app.globalData.doubanAPIBase + '/v2/movie/top250?start=0&count=3'


    wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
    this.getMovieData(inTheaterUrl, 'inTheater')
    this.getMovieData(comingSoonUrl, 'coming')
    this.getMovieData(top250Url, 'top')
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
        let {subjects, title} = res.data
        console.log(subjects,title)
        let arr = []
        subjects.forEach( item => {
          let realCounts = Math.round(item.rating.average / 2)
          arr.push({
            title: item.title.length > 6 ? item.title.substring(0,6) + '...' : item.title,
            average: item.rating.average,
            imgUrl: item.images.large,
            realStars: new Array(realCounts).fill(1),
            nonStars: new Array(5-realCounts).fill(1),
            id:item.id
          })
        })
        console.log(arr)
        let tempObj = {}
        tempObj[type] = Object.assign({}, { subjects: arr, title, type })
        self.setData(tempObj)
        if (self.data.hasOwnProperty('top') && self.data.hasOwnProperty('coming') && self.data.hasOwnProperty('inTheater')){
          wx.hideLoading()
        }
      },
    })
  },

  onMoreTap(event) {
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
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