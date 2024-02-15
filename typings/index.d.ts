/// <reference path="./types/index.d.ts" />

/**
 * `IAppOption` : 小程序App类型结构
 * 
*/
interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    appid: string,
    kBottomSafeHeight: number,
    isIPhoneX: boolean,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  updateManager:()=>void,
  getToken:()=>void,
  doLogin:()=>void,
  showError: (msg: string, callback: () => void) => void,
  $showToast:(title: string, icon: 'success' | 'error' | 'loading' | 'none') => void,
  checkIsIPhoneX:()=>void
}