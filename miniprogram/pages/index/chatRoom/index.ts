// pages/my/newMarket/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  handleClickInputConfirm(e: WechatMiniprogram.InputConfirm) { 
    const { value } = e.detail
    wx.showModal({
      title: '提示',
      content: `${value}`,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  handleClickChooseType() { 
    this.setData({
      showPopup:true
    })
  },

  

  handleClickComfirm() { 

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})