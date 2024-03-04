import { chatMsgConfirm, sendChatMsg } from '../../../api/chat-msg/index'
import { getAssetReleaseListForMy } from '../../../api/asset-release/index'
import { BASE_URL } from '../../../api/request'
let listIntervalFlag = 0
let chartListLength = 0
const App = getApp<IAppOption>()
export {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL_IMG: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_`,
    headImg: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${App.globalData.avatarFileId}`,
    avatarFileId: App.globalData.avatarFileId,

    userId: App.globalData.userId,
    roomId: '',
    showPage: false,
    showPopup: false,
    getindexid: '',
    getindexnum: 0,
    first: 1,
    scrollTop: 99999, // 触底

    inputValue: '',
    connectchat: [] as MsgContentVO[],
    show: false,
    showLoading: false,
    // page: false,

    tabs: '1',
    page: 1,
    pageSize: 10,
    totalPages: 1,
    releaseType: '1',
    releaseUserId: '',
    isLoading: true,
    no_more: false,
    list: [] as AssetReleaseVO[],

    orgType: App.globalData.orgType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id, rUserId } = options
    this.setData({
      roomId: id,
      releaseUserId: rUserId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      orgType: App.globalData.orgType,
      avatarFileId: App.globalData.avatarFileId,
      headImg: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${App.globalData.avatarFileId}`
    })
    this.refreshPage()
    this.pageScrollToBottom()
    listIntervalFlag = setInterval(() => {
      this.refreshPage()
    }, 1 * 60 * 1000)

    setTimeout(() => {
      this.setData({
        showPage: true
      })
    }, 500)
  },

  refreshPage() {
    const store: ChatMesaageStore = wx.getStorageSync('CHAT_MESSAGE_STORE')
      ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_STORE'))
      : {}
    const CHAT_MESSAGE_NEW_ROOM_ID: ChatMessageNewRoomId = wx.getStorageSync(
      'CHAT_MESSAGE_NEW_ROOM_ID'
    )
      ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_NEW_ROOM_ID'))
      : []
    console.log(store)
    let list = store[this.data.roomId] ? store[this.data.roomId] : []
    console.log(list)
    this.setData({
      connectchat: list
    })

    const room_id_store = CHAT_MESSAGE_NEW_ROOM_ID.filter((item: string) => {
      return item !== this.data.roomId
    })
    wx.setStorageSync('CHAT_MESSAGE_STORE', JSON.stringify(store))
    wx.setStorageSync('CHAT_MESSAGE_NEW_ROOM_ID', JSON.stringify(room_id_store))
    this.connecting()
  },

  onTapsChange(e: WechatMiniprogram.BaseEvent) {
    const { tabs, type } = e.currentTarget.dataset
    this.setData({
      releaseType: type,
      tabs: tabs,
      page: 1,
      totalPages: 1,
      no_more: false,
      isLoading: true
    })
    this.getPublishList()
  },

  getPublishList(isPage?: boolean, page?: number) {
    page = page || 1
    console.log(Number(this.data.tabs))
    const params = {
      inlet: '1',
      pageSize: this.data.pageSize,
      page: this.data.page,
      releaseType: this.data.releaseType,
      releaseUserId: Number(this.data.tabs) >= 3 ? this.data.releaseUserId : ''
    }
    getAssetReleaseListForMy(params).then((res) => {
      if (res.code === '0000') {
        if (res.value && res.value.rows?.length) {
          if (isPage == true) {
            this.setData({
              list: [...this.data.list, ...res.value.rows],
              totalPages: res.value.totalPages!,
              isLoading: false
            })
          } else {
            this.setData({
              list: [...res.value.rows],
              totalPages: res.value.totalPages!,
              isLoading: false
            })
          }
        } else {
          this.setData({
            list: [],
            totalPages: 1,
            isLoading: false
          })
        }
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  /**
   * 下拉到底加载数据
   */
  bindDownLoad() {
    console.log(this.data.page, this.data.totalPages)
    if (this.data.page >= this.data.totalPages) {
      this.setData({
        no_more: true
      })
    } else {
      this.setData({
        page: this.data.page + 1
      })
      this.getPublishList(true, this.data.page)
    }
  },

  onInputChange(e: WechatMiniprogram.CustomEvent) {
    console.log(e, e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  async connecting() {
    if (chartListLength === this.data.connectchat.length) return
    // if (res) {
    // this.setData({
    //   connectchat: [...this.data.connectchat, ...this.data.connectchat]
    //   // first: this.data.first + 1
    // })
    // if (this.data.first === 1) {
    this.pageScrollToBottom() //  只为了执行一次进入页面触底
    chartListLength = this.data.connectchat.length
    // } else {
    //   this.setData({
    //     getindexnum: this.data.connectchat.length
    //   })
    // 第2次调接口获取到接口中数组的大小（为了后面定点到的index）
    // }
    // if (this.data.params.page == 1) {
    //   console.log(this.data.params.page)
    //   let a = this.data.getindexnum - 1
    //   // this.setData({
    //   //   getindexid: 'chat' + 1 //这里将调到的id ，对应的scroll-into-view="{{getindexid}}"
    //   // })
    // }
    // }
  },

  pageScrollToBottom() {
    this.setData({
      scrollTop: this.data.scrollTop - 1
    }) // 减一了，才会触发scroll-top触底。首次进入调用。
  },

  handleClickInputConfirm(e: WechatMiniprogram.InputConfirm) {
    const { value } = e.detail
    this.sendMsg('1', value)
  },
  handleClickInputConfirmBtn() {
    console.log(this.data.inputValue)
    this.sendMsg('1', this.data.inputValue)
  },
  sendMsg(msgType: string, content: string) {
    const params = {
      msgType,
      roomId: this.data.roomId,
      content
    }
    sendChatMsg(params).then((res) => {
      if (res.code === '0000') {
        this.setData({
          inputValue: ''
        })
        App.onSyncChatMsg(undefined, () => {
          this.refreshPage()
        })
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  onMessageComfirm(e: WechatMiniprogram.BaseEvent) {
    const { id, status } = e.currentTarget.dataset
    const param = {
      msgId: id,
      confirmStatus: status
    }
    chatMsgConfirm(param).then((res) => {
      if (res.code === '0000') {
        // const store = wx.getStorageSync('CHAT_MESSAGE_STORE')
        //   ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_STORE'))
        //   : {}
        // if (Object.keys(store).includes(this.data.roomId)) {
        //   store[this.data.roomId][index].status = status
        // }
        // wx.setStorageSync('CHAT_MESSAGE_STORE', store)
        App.onSyncChatMsg(undefined, () => {
          this.refreshPage()
        })
        App.$showToast('操作成功', 'success')
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  handleSendLC(e: WechatMiniprogram.BaseEvent) {
    const { id } = e.currentTarget.dataset
    this.sendMsg('3', id)
  },
  handleComfirmLC(e: WechatMiniprogram.BaseEvent) {
    const { id } = e.currentTarget.dataset
    this.sendMsg('2', id)
  },

  handleClickChooseType() {
    this.setData({
      tabs: '1',
      page: 1,
      pageSize: 10,
      totalPages: 1,
      releaseType: '1',
      isLoading: true,
      no_more: false
    })
    this.getPublishList()
    this.setData({
      showPopup: true
    })
  },

  handleClickComfirm() {},

  // 滚动条到顶部是触发
  onScrollToUpper() {
    // console.log(11111)
    // if (this.data.pagination <= this.data.params.page * 20) {
    //   return false // 当小于总数时返回，
    // }
    // this.setData({
    //   show: true,
    //   'params.page': this.data.params.page + 1
    // })
    // this.connecting()
  },

  onImgErr(e: WechatMiniprogram.CustomEvent) {
    const { errMsg } = e.detail
    console.log(errMsg)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

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
