// const $api = require("../../utils/api.js").API
import { login } from '../../../api/user/index'
import { updateRole } from '../../../utils/tab-service'
const App = getApp<IAppOption>()
export {}

Page({
  data: {
    radioType: false,
    code: '',
    iv: '',
    phone: '',
    phoneCode: '',
    type: '',
    isType: false
    // phoneStr: ''
  },

  onLoad(options) {
    this.setData({
      type: options.type
    })
  },
  onShow() {},
  getCode() {
    let _this = this
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          _this.setData({
            code: res.code
          })
          console.log('res=======', res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  agreement() {
    wx.navigateTo({
      url: '/pages/login/agreement/agreement'
    })
  },
  getPhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
    let _this = this
    console.log('getPhoneNumber ===>', e)
    const encryptedData = e.detail.encryptedData!
    const iv = e.detail.iv!
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      console.log('用户点击了接受', e)
      wx.login({
        success(res) {
          if (res.code) {
            const code = res.code
            console.log('res=======', res)
            wx.setStorageSync('radioType', true)
            console.log('wx.login ===>', res)
            console.log('wx.getPhoneNumber ===>', e)
            _this.getLogin({
              encryptedData,
              iv,
              code,
              appid: App.globalData.appid
            }) // 将code、phone、iv发给后台，让后台解密手机号
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      console.log('用户点击了拒绝')
    }

    // }
    // },
    // fail: () => {
    //     _this.$refs.toast.hide();
    //     _this.$refs.toast.error("登录失败！请重新授权登录！");
    // },
    // });
  },
  onCheckGetPhoneNumber() {
    wx.showModal({
      title: '提示',
      content: '请先阅读并同意《隐私条款》和《用户服务协议》再登录！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getLogin(loginData: LoginParamVO) {
    let _this = this
    console.log(JSON.stringify(loginData))
    login(loginData).then((res) => {
      App.globalData.checkLogin = true
      if (res.code === '0000') {
        console.log(res)
        const userId = wx.getStorageSync('userId') || ''
        if (userId && userId !== res.value!.userId) {
          wx.clearStorageSync()
        }
        console.log('login======>', res.value)
        wx.setStorageSync('token', res.value && res.value.token)
        wx.setStorageSync('userId', res.value && res.value.userId)
        App.globalData.avatarFileId = res.value && res.value.avatarFileId
        App.globalData.authFlag = res.value && res.value.authFlag
        App.globalData.orgType = res.value && res.value.orgType
        App.globalData.autherized = App.globalData.authFlag === '2'
        App.globalData.account = (res.value && res.value.account)!
        App.globalData.userId = (res.value && res.value.userId)!
        App.onSyncChatMsg()
        App.globalData.CHAT_MESSAGE_INTERVAL = setInterval(() => {
          App.onSyncChatMsg()
        }, 5 * 60 * 1000)
        if ((res.value && res.value.orgType) === '2') {
          updateRole(this, '0')
        } else {
          // 金融机构
          updateRole(this, '1')
        }
        if (_this.data.type == '0') {
          if (!App.globalData.autherized) {
            wx.switchTab({
              url: '/pages/my/home/index'
            })
          } else {
            wx.switchTab({
              url: '/pages/index/home/index'
            })
          }
        } else if (!App.globalData.autherized) {
          wx.switchTab({
            url: '/pages/my/home/index'
          })
        } else {
          wx.navigateBack()
        }
      } else {
        wx.showToast({
          title: res.message!,
          icon: 'none'
        })
      }
    })
  },

  getUserInfo(e: WechatMiniprogram.ButtonGetUserInfo) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  details() {
    wx.redirectTo({
      url: '/pages/index/details'
    })
  },
  radioTap() {
    this.setData({
      radioType: !this.data.radioType
    })
  },
  showStr() {
    wx.showToast({
      title: '请您先勾选同意用户服务协议',
      duration: 2000,
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    // this.dialog = this.selectComponent("#dialog")
  }
})
