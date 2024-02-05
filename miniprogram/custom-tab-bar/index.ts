Component({
  data: {

  },
  methods: {
    switchTab(e: WechatMiniprogram.BaseEvent) {
      console.log(e)
      const data = e.currentTarget.dataset
      // console.log('currentTarget:', data.index)
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
