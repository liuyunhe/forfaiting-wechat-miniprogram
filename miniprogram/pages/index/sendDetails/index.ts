import { addChatUser } from "../../../api/chat-msg/index"
import { getAssetReleaseDetail } from "../../../api/asset-release/index"
import { BASE_URL } from "../../../api/request"

// pages/my/newMarket/index.js
const App = getApp<IAppOption>()
export {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL_IMG: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_`,
    id: '',
    department: '',
    post: '',
    avatarFileId: '',
    releaseUserId: '',
    releaseUserPhone: '',
    releaseUserName: '',
    releaseOrgName: '',
    releaseOrgCode: '',
    promiseOrgName: '',
    promiseOrgTypeName: '',
    promiseOrgCode: '',
    promiseOrgType: '',
    termLower: 0,
    termUpper: 0,
    amountLower: 0,
    amountUpper: 0,
    rateLower: 0,
    rateUpper: 0,
    resellNum: 0,
    readeName: '',
    readeType: '30',
    releaseDeadline: '0',
    note: '0',
    userId: App.globalData.userId,
    orgType: App.globalData.orgType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    this.getDetails(id!)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  getDetails(id: string) {
    const params = {
      releaseId: id
    }
    getAssetReleaseDetail(params).then((res) => {
      if (res.code === '0000') {
        if (res.value) {
          const {
            id,
            department,
            post,
            avatarFileId,
            releaseUserId,
            releaseUserPhone,
            releaseUserName,
            releaseOrgName,
            releaseOrgCode,
            promiseOrgName,
            promiseOrgCode,
            promiseOrgType,
            termLower,
            termUpper,
            amountLower,
            amountUpper,
            rateLower,
            rateUpper,
            resellNum,
            readeType,
            releaseDeadline,
            note
          } = res.value
         
          this.setData({
            id,
            department,
            post,
            avatarFileId,
            releaseUserId,
            releaseUserPhone,
            releaseUserName,
            releaseOrgName,
            releaseOrgCode,
            promiseOrgName,
            promiseOrgCode,
            promiseOrgType,
            termLower,
            termUpper,
            amountLower,
            amountUpper,
            rateLower,
            rateUpper,
            resellNum,
            readeType,
            releaseDeadline,
            note
          })
        }
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  handleClickChat() {
    const params = {
      releaseId: this.data.id
    }
    addChatUser(params).then((res) => {
      if (res.code === '0000') {
        wx.navigateTo({
          url: `/pages/index/chatRoom/index?id=${res.value}&rUserId=${this.data.releaseUserId}`
        })
      } else {
        App.$showToast(res.message!, 'error')
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