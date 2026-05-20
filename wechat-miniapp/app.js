App({
  onLaunch() {
    const sysInfo = (typeof wx !== 'undefined' && wx.getSystemInfoSync) ? wx.getSystemInfoSync() : {}
    const source = `wechat-miniapp:${sysInfo.platform || 'unknown'}`
    // if (typeof wx !== 'undefined' && wx.request) {
    //   wx.request({
    //     url: 'https://api.xiluo.net/nonuser/',
    //     method: 'GET',
    //     data: { source },
    //     fail() {}
    //   })
    // }
  }
})
