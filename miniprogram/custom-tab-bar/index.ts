const App = getApp<IAppOption>()
export {}
const UnAutherized_Disableed_list = [
  '/pages/index/home/index',
  '/pages/quotation/home/index',
  '/pages/publish/home/index'
]
Component({
  data: {},
  methods: {
    switchTab(e: WechatMiniprogram.BaseEvent) {
      console.log(e)
      const data = e.currentTarget.dataset
      // console.log('currentTarget:', data.index)
      const url = data.path
      if (
        !App.globalData.autherized &&
        UnAutherized_Disableed_list.includes(url)
      ) {
        this.onUnAutherized()
        return
      }
      if (url === '/pages/index/home/index') {
        App.globalData.HOME_LIST_NEED_REFRESH = true
      }
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    },
    onUnAutherized() {
      wx.showModal({
        title: '提示',
        content: '请先完成认证！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
