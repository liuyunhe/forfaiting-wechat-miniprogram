import { getRefreshToken } from "./api/user/index"

// app.ts
const tabService = require("./utils/tab-service")
const appid = wx.getAccountInfoSync().miniProgram.appId

App<IAppOption>({
  globalData: {
    appid,
    kBottomSafeHeight: 0,
    isIPhoneX: false
  },
  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch() {
    // 小程序主动更新
    this.updateManager()
    if (wx.getStorageSync("token")) {
      //获取最新token
      this.getToken()
      tabService.updateRole(this, '0')
    } else { 
      /**
       * app没有launch之前，navigateTo等跳转方法虽然会走到success，但是会被忽略
       * 加延时处理
      */
      setTimeout(() => { 
        wx.redirectTo({
          url: "/pages/login/index/login"
        })
      })
      
    }
    console.log("onLaunch======")
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow(options) {
    console.log("app.js ---onShow---");
    
  },

  onHide() {
    // console.log("app.js ---onHide---");
  },
  onError(msg) {
    // console.log("app.js ---onError---" + msg);
  },
  // 获取token
  getToken() {
    const loginData = {
      token: "Bearer " + wx.getStorageSync("token")
    }
    getRefreshToken(loginData).then((res) => {
      console.log(res)
      wx.setStorageSync("token", res.value?.token)
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
      "pages/login/index/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage)
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/index/login"
    })
  },

  /**
   * 小程序主动更新
   */
  updateManager() {
    console.log("updateManager")
    if (!wx.canIUse("getUpdateManager")) {
      return false
    }
    const updateManager = wx.getUpdateManager()
    if (!updateManager) return
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，即将重启应用",
        showCancel: false,
        confirmColor: "#26a886",
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
        title: "更新提示",
        content: "新版本下载失败",
        confirmColor: "#26a886",
        showCancel: false
      })
    })
  },

  /**
   * 显示失败提示框
   */
  showError(msg: string, callback: () => void) {
    wx.showModal({
      title: "友情提示",
      content: msg,
      showCancel: false,
      confirmColor: "#26a886",
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