// pages/my/newMarket/index.js

const tabService = require("../../../utils/tab-service")
export { }
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgNewsData: [
      {
        url:''
      }
    ],
    showMoreFilter:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    tabService.updateRole(this, 0)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    tabService.updateIndex(this, 0);
   },

  handleClickMoreFilter() { 
    this.setData({
      showMoreFilter:true
    })
  },
  
  handleCloseMoreFilter() { 
    this.setData({
      showMoreFilter:false
    })
  },
  
  handleClickCard(e: WechatMiniprogram.BaseEvent) { 
    const { type } = e.currentTarget.dataset
    console.log(type)
    if (type == 2) {
      wx.navigateTo({
        url: '/pages/index/receiveDetails/index',
      })
    } else if (type == 1) { 
      wx.navigateTo({
        url: '/pages/index/sendDetails/index',
      })
    }
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