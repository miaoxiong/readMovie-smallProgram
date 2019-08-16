App({
  globalData: {
    g_playMusic:false,
    g_playId:'',
    // doubanBase:'http://api.douban.com',
    doubanBase: 'http://t.yushu.im',
    doubanAPIBase: 'https://douban.uieee.com'
  },
  onLaunch(options) {
    // Do something initial when launch.
    
  },
  onShow(options) {
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  }
})