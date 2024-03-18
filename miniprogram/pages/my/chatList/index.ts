import { BASE_URL } from '../../../api/request'

// pages/my/newMarket/index.js
const CHAT_MESSAGE_STORE = []
let listIntervalFlag = 0
const App = getApp<IAppOption>()
export {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    BASE_URL_IMG: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_`,
    list: [] as SyncChatMsgContentVO[],
    CHAT_MESSAGE_NEW_ROOM_ID: [] as ChatMessageNewRoomId,
    userId: App.globalData.userId,
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
    this.getList()
    listIntervalFlag = setInterval(() => { 
      this.getList()
    },1*60*1000)
  },

  getList() { 
    const compareTime = (t1: SyncChatMsgVO, t2: SyncChatMsgVO) => {
      return t2.createTimeEpoch - t1.createTimeEpoch
    }
    const store:ChatMesaageStore = wx.getStorageSync('CHAT_MESSAGE_STORE')
      ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_STORE'))
      : {}
    const CHAT_MESSAGE_NEW_ROOM_ID:ChatMessageNewRoomId = wx.getStorageSync(
      'CHAT_MESSAGE_NEW_ROOM_ID'
    )
      ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_NEW_ROOM_ID'))
      : []
    let list:SyncChatMsgContentVO[] = []
    if (Object.keys(store).length) {
      list = Object.keys(store).map((item) => {
        const i = store[item][store[item].length - 1]
        i.showMessage = true
        if (CHAT_MESSAGE_NEW_ROOM_ID.includes(i.roomId!)) {
          i.showNew = true
        } else {
          i.showNew = false
        }
        return i
      })
    }
    list.sort(compareTime)
    this.setData({
      list,
      CHAT_MESSAGE_NEW_ROOM_ID
    })
  },

  onClickChatRoom(e: WechatMiniprogram.BaseEvent) {
    const { id, ruserid } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/index/chatRoom/index?id=${id}&rUserId=${ruserid}`
    })
  },

  handleClickInputConfirm(e: WechatMiniprogram.InputConfirm) {
    let { value } = e.detail
    const inputValue = value.trim()
    this.setData({
      inputValue
    })
    let list

    list = this.data.list.map((item) => {
      if (inputValue == '') {
        item.showMessage = true
        return item
      } else {
        if (
          (item.nickname as string).indexOf(inputValue) > -1 ||
          (item.orgName as string).indexOf(inputValue) > -1
        ) {
          item.showMessage = true
        } else {
          item.showMessage = false
        }
        return item
      }
    })
    this.setData({
      list
    })
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
    clearInterval(listIntervalFlag)
  },

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
