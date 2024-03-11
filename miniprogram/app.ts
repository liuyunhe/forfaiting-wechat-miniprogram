import { getRefreshToken } from './api/user/index'
import { BASE_URL } from './api/request'
import { updateRole } from './utils/tab-service'
import { getSyncChatMsg } from './api/chat-msg/index'
import { formatTime } from './utils/util'

// app.ts
const appid = wx.getAccountInfoSync().miniProgram.appId

App<IAppOption>({
  globalData: {
    appid,
    kBottomSafeHeight: 0,
    isIPhoneX: false,
    BASE_URL,
    orgType: '',
    autherized: false,
    authFlag: '0',
    account: '',
    userId: '',
    CHAT_MESSAGE_INTERVAL: null,
    avatarFileId: '',
    // 登录接口是否返回
    checkLogin: false,
    HOME_LIST_NEED_REFRESH:false
  },
  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch() {
    // 小程序主动更新
    this.updateManager()
    if (wx.getStorageSync('token')) {
      //获取最新token
      this.getToken()
    } else {
      /**
       * app没有launch之前，navigateTo等跳转方法虽然会走到success，但是会被忽略
       * 加延时处理
       */
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/index/login'
        })
      })
    }
    console.log('onLaunch======')
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow(options) {
    console.log('app.js ---onShow---')
  },

  onHide() {
    // console.log("app.js ---onHide---");
  },
  onError(msg) {
    // console.log("app.js ---onError---" + msg);
  },
  // 获取token
  getToken() {
    const _this = this
    const loginData = {
      token: wx.getStorageSync('token')
    }
    getRefreshToken(loginData).then((res) => {
      console.log(res)
      if (res.code === '0000') {
        _this.globalData.account = (res.value && res.value.account)!
        _this.globalData.userId = (res.value && res.value.userId)!
        _this.globalData.orgType = (res.value && res.value.orgType)!
        _this.globalData.authFlag = res.value && res.value.authFlag
        _this.globalData.avatarFileId = res.value && res.value.avatarFileId
        _this.globalData.autherized = _this.globalData.authFlag === '2'
        wx.setStorageSync('token', res.value && res.value.token)
        wx.setStorageSync('userId', res.value && res.value.userId)
        this.onSyncChatMsg()
        // 定时任务
        _this.globalData.CHAT_MESSAGE_INTERVAL = setInterval(() => {
          this.onSyncChatMsg()
        }, 5 * 60 * 1000)
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        if ((res.value && res.value.orgType) === '2') {
          // 企业
          updateRole(page, '0')
        } else {
          // 金融机构
          updateRole(page, '1')
        }
        if (!_this.globalData.autherized) {
          wx.switchTab({
            url: '/pages/my/home/index'
          })
        } else {
          wx.navigateBack()
        }
      } else {
        // this.$showToast(res.message!, 'error')
        wx.setStorageSync('token', '')
        wx.showToast({
          title: res.message!,
          icon: 'error'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/index/login?type=0'
          })
        }, 1000)
      }
      this.globalData.checkLogin = true
      // 返回后Page回调函数
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback(res)
      }
    })
  },

  onSyncChatMsg(date, callback) {
    const beginDate = '1999-01-01 00:00:00'
    // 加工的数据
    const CHAT_MESSAGE_STORE: ChatMesaageStore = {}
    // 原始数据
    let CHAT_MESSAGE_RAW: ChatMessageRaw = wx.getStorageSync('CHAT_MESSAGE_RAW')
      ? JSON.parse(wx.getStorageSync('CHAT_MESSAGE_RAW'))
      : []
    if (date) {
      CHAT_MESSAGE_RAW = []
    }
    // 最后更新时间
    let CHAT_UPDATE_TIME = wx.getStorageSync('CHAT_UPDATE_TIME')
      ? wx.getStorageSync('CHAT_UPDATE_TIME')
      : beginDate
    // 更新列表
    let CHAT_MESSAGE_NEW_ROOM_ID: ChatMessageNewRoomId = []

    const params = {
      updateTime: date ? date : CHAT_UPDATE_TIME
    }

    const compareTime = (t1: SyncChatMsgVO, t2: SyncChatMsgVO) => {
      return t1.createTimeEpoch - t2.createTimeEpoch
    }

    getSyncChatMsg(params).then((res) => {
      if (res.code === '0000') {
        if (res.value) {
          res.value?.syncChatMsgContentList!.map((item) => {
            if (!CHAT_MESSAGE_NEW_ROOM_ID.includes(item.roomId!)) {
              CHAT_MESSAGE_NEW_ROOM_ID.push(item.roomId!)
            }
            if (item.msgType === '2' && Number(item.status) < 4) {
              const msgIndex = CHAT_MESSAGE_RAW.findIndex(
                (msg: SyncChatMsgContentVO) => {
                  return item.id === msg.id
                }
              )
              if (msgIndex > -1) {
                CHAT_MESSAGE_RAW.splice(msgIndex, 1)
              }
            }
          })
          // 原始数据
          CHAT_MESSAGE_RAW = [
            ...CHAT_MESSAGE_RAW,
            ...res.value.syncChatMsgContentList!
          ]
          CHAT_MESSAGE_RAW.sort(compareTime)
          // 最后更新时间
          CHAT_UPDATE_TIME = res.value && res.value.lastUpdateTime
          CHAT_MESSAGE_RAW.map((item) => {
            // 加工的数据

            if (CHAT_MESSAGE_STORE[item.roomId!]) {
              CHAT_MESSAGE_STORE[item.roomId!].push(item)
            } else {
              CHAT_MESSAGE_STORE[item.roomId!] = [item]
            }
          })
          wx.setStorageSync(
            'CHAT_MESSAGE_STORE',
            JSON.stringify(CHAT_MESSAGE_STORE)
          )
          wx.setStorageSync(
            'CHAT_MESSAGE_RAW',
            JSON.stringify(CHAT_MESSAGE_RAW)
          )
          wx.setStorageSync(
            'CHAT_MESSAGE_NEW_ROOM_ID',
            JSON.stringify(CHAT_MESSAGE_NEW_ROOM_ID)
          )
          if (CHAT_UPDATE_TIME) {
            wx.setStorageSync('CHAT_UPDATE_TIME', CHAT_UPDATE_TIME)
          }
          callback && callback()
        }
      } else {
        this.$showToast(res.message!, 'error')
      }
    })
  },

  // 判断设备是否为 iPhone X
  checkIsIPhoneX() {
    const that = this
    wx.getSystemInfo({
      success: (res) => {
        const safeBottom = res.screenHeight - res.safeArea.bottom
        that.globalData.kBottomSafeHeight = safeBottom
        //根据安全高度判断
        if (safeBottom === 34) {
          that.globalData.isIPhoneX = true
          // console.log(that.isIPhoneX)
        }
      }
    })
  },

  /**
   * 执行用户登录
   */
  doLogin() {
    // 保存当前页面
    let pages = getCurrentPages()
    if (pages.length) {
      let currentPage = pages[pages.length - 1]
      'pages/login/index/login' != currentPage.route &&
        wx.setStorageSync('currentPage', currentPage)
    }
    // 跳转授权页面
    wx.navigateTo({
      url: '/pages/login/index/login'
    })
  },

  /**
   * 小程序主动更新
   */
  updateManager() {
    console.log('updateManager')
    if (!wx.canIUse('getUpdateManager')) {
      return false
    }
    const updateManager = wx.getUpdateManager()
    if (!updateManager) return
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log('app.js ---hasUpdate--->', res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        confirmColor: '#26a886',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        confirmColor: '#26a886',
        showCancel: false
      })
    })
  },

  /**
   * 显示失败提示框
   */
  showError(msg: string, callback: () => void) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      confirmColor: '#26a886',
      success(res) {
        // callback && (setTimeout(function() {
        //   callback();
        // }, 1500));
        callback && callback()
      }
    })
  },
  $showToast(title: string, icon: 'success' | 'error' | 'loading' | 'none') {
    wx.showToast({
      title: title,
      icon: icon
    })
  }
})
