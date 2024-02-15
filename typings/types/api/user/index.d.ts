/**
 * `LoginParamVO` : 用户登录请求参数
 */
interface LoginParamVO {
  /**
   * 小程序appid
   */
  appid: string;
  /**
   * 登录时获取的code
   */
  code: string;
  /**
   * encryptedData
   */
  encryptedData: string;
  /**
   * iv
   */
  iv: string;
  /**
   * 微信头像
   */
  wechatAvatarUrl?: string;
  /**
   * 微信昵称
   */
  wechatNickName?: string;
  [property: string]: any;
}

/**
*
* `JwtAuthenticationResponse` : 用户登录请求参数
*/
interface JwtAuthenticationResponse {
  account?: string;
  expiration?: number;
  loginStatus?: boolean;
  openid?: string;
  token?: string;
  /**
   * java.util.Map<java.lang.String,java.lang.Object>
   */
  userAttrs?: MapObject;
  userId?: string;
  username?: string;
  [property: string]: any;
}




/**
 * RefreshTokenDTO
 */
interface RefreshTokenDTO {
  /**
   * token令牌
   */
  token: string;
  [property: string]: any;
}
