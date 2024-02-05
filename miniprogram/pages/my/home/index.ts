// pages/my/newMarket/index.js
const tabService = require("../../../utils/tab-service")
export { }
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autherized:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { 
    tabService.updateLastIndex(this);
  },

  handleClickRegister(e: WechatMiniprogram.BaseEvent) { 
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/improveInfo/index?type=${type}`
    })
  },
  
  handleClickLine(e: WechatMiniprogram.BaseEvent) { 
    console.log(e)
    const { name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/${name}/index`
    })
  },

  handleClickExit() {
    wx.showModal({
      title: "提示",
      content: "请先完成认证！",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定")
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})