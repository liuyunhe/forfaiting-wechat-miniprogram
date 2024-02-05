const DEV_BASE_URL = "https://test-cn.your-api-server.com"
const MASTER_BASE_URL = "https://pubserv.tsfztz.cn/api"
const BASE_URL = DEV_BASE_URL

interface ApiResult<T> {
  /**
   * 状态码
   */
  code?: string;
  /**
   * 提示信息
   */
  message?: string;
  /**
   * 数据封装
   */
  value?: T;
  [property: string]: any;
}

/**
 * api请求
 * @param requestOption:WechatMiniprogram.RequestOption<U>
 * @returns Promise<ApiResult<T>>
 */

export const request = <U extends string | WechatMiniprogram.IAnyObject | ArrayBuffer, T>(
  requestOption: WechatMiniprogram.RequestOption<U>
): Promise<ApiResult<T>> => {
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
      success(res: WechatMiniprogram.RequestSuccessCallbackResult<ApiResult<T>>) {
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
