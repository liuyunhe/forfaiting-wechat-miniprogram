const DEV_BASE_URL = 'https://fft.openunion.cn/api'
const MASTER_BASE_URL = 'https://ffting.guilinbank.com.cn'
export const BASE_URL = DEV_BASE_URL

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
      title: "加载中"
    })
    const token = wx.getStorageSync("token")
    /** 取接口后面的路径名 */
    const URL_LAST_NAME = requestOption.url.slice(-8)
    console.log("isToken====", URL_LAST_NAME)
    let header = {}
    /** 登录时不用传token */
    if (URL_LAST_NAME.indexOf("register") >= 0 || URL_LAST_NAME.indexOf("login") >= 0) {
      header = {
        "content-type": "application/json"
      }
    } else {
      header = {
        "content-type": "application/json",
        authorization: "Bearer " + token
      }
    }
    wx.request({
      url: BASE_URL + requestOption.url,
      data: requestOption.data,
      method: requestOption.method,
      header: header,
      success(res: WechatMiniprogram.RequestSuccessCallbackResult<CommonRespResult<T>>) {
        resolve(res.data)
      },
      fail(err: WechatMiniprogram.RequestFailCallbackErr) {
        reject(err)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}
