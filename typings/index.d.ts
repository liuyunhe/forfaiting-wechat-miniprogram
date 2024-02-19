/// <reference path="./types/index.d.ts" />

/**
 * `IAppOption` : 小程序App类型结构
 * 
*/
interface IAppOption {
  globalData: {
    authFlag: '1' | '2' | '0' // 0：未认证1：待审核2：已认证
    userInfo?: WechatMiniprogram.UserInfo
    appid: string
    BASE_URL: string
    kBottomSafeHeight: number
    isIPhoneX: boolean
    autherized: boolean
    account: string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  updateManager: () => void
  getToken: () => void
  doLogin: () => void
  showError: (msg: string, callback: () => void) => void
  $showToast: (
    title: string,
    icon: 'success' | 'error' | 'loading' | 'none'
  ) => void
  checkIsIPhoneX: () => void
  queryLoginUserAuth: () => void
}