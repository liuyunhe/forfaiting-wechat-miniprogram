/**
 * WechatDTO
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
* 数据封装
*
* JwtAuthenticationResponse
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


interface MapObject {
  /**
   * value.userAttrs.key
   */
  key?: { [key: string]: any };
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
