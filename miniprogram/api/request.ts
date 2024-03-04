// const DEV_BASE_URL = 'https://fftingcs.guilinbank.com.cn/api'
const DEV_BASE_URL = 'https://fft.openunion.cn/api'

const MASTER_BASE_URL = 'https://ffting.guilinbank.com.cn/api'

const accountInfo = wx.getAccountInfoSync()

let API_URL = ''
console.log('miniprogram version ===>',accountInfo.miniProgram.envVersion)
if (accountInfo.miniProgram.envVersion == 'release') {
  // 线上正式版本
  API_URL = DEV_BASE_URL
} else {
  // 非线上 开发或体验版本
  API_URL = DEV_BASE_URL
}
export const BASE_URL = API_URL

let JWT_DISABLE = false

/**
 * api请求
 * @param requestOption WechatMiniprogram.RequestOption<U>
 * @returns Promise<CommonRespResult<T>>
 */

export const request = <U extends string | WechatMiniprogram.IAnyObject | ArrayBuffer, T>(
  requestOption: WechatMiniprogram.RequestOption<U>
): Promise<CommonRespResult<T>> => {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      const token = wx.getStorageSync('token')
      /** 取接口后面的路径名 */
      const URL_LAST_NAME = requestOption.url.slice(-8)
      console.log('isToken====', URL_LAST_NAME)
      let header = {}
      /** 登录时不用传token */
      if (
        URL_LAST_NAME.indexOf('register') >= 0 ||
        URL_LAST_NAME.indexOf('login') >= 0
      ) {
        header = {
          'content-type': 'application/json'
        }
      } else {
        header = {
          'content-type': 'application/json',
          Authorization: token
        }
      }
      wx.request({
        url: BASE_URL + requestOption.url,
        data: requestOption.data,
        method: requestOption.method,
        header: header,
        success(
          res: WechatMiniprogram.RequestSuccessCallbackResult<
            CommonRespResult<T>
          >
        ) {
          console.log(res)
          // token 失效
          if (res.statusCode == 401) {
            if (JWT_DISABLE) { 
              return
            } 
            JWT_DISABLE = true
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/index/login?type=0'
              })
             },1000)
            wx.showToast({
              title: '请重新登录',
              icon: 'error'
            })
            return
          }
          // 未认证个人信息
          if (res.statusCode == 403 && res.data.code === '2002') {
            if (JWT_DISABLE) { 
              return
            } 
            JWT_DISABLE = true
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/my/home/index'
              })
             },1000)
            wx.showToast({
              title: '请认证个人信息',
              icon: 'error'
            })
            return
          }
          JWT_DISABLE = false
          resolve(res.data)
        },
        fail(err: WechatMiniprogram.RequestFailCallbackErr) {
          console.log(err)
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
          reject(err)
        },
        complete() {
          wx.hideLoading()
        }
      })
    })
}
