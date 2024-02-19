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

/**
 * UserAuthDTO
 */
interface UserAuthDTO {
  /**
   * 审核结果0拒绝1同意
   */
  auditResult?: string
  /**
   * 名片正面
   */
  cardFrontFileId: string
  /**
   * 名片反面
   */
  cardOppsiteFileId: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人ID
   */
  createUserId?: string
  /**
   * 创建人名称
   */
  createUserName?: string
  /**
   * 部门
   */
  department?: string
  /**
   * 主键
   */
  id?: string
  /**
   * 手机号
   */
  mobile?: string
  /**
   * 用户名称
   */
  nickname: string
  /**
   * 机构编号
   */
  orgCode: string
  /**
   * 机构名称
   */
  orgName: string
  /**
   * 机构类型1金融机构2企业
   */
  orgType?: string
  /**
   * 职务
   */
  post?: string
  /**
   * 拒绝原因
   */
  rejectReason?: string
  /**
   * 状态1待审核2同意3拒绝4作废中5作废
   */
  status?: string
  /**
   * 租户ID
   */
  tenantId?: string
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 更新人ID
   */
  updateUserId?: string
  /**
   * 更新人名称
   */
  updateUserName?: string
  /**
   * 用户id
   */
  userId?: string
  /**
   * 用户填写的用户名称
   */
  writeNickname: string
  /**
   * 用户填写的机构编号
   */
  writeOrgCode?: string
  /**
   * 用户填写的机构名称
   */
  writeOrgName: string
  [property: string]: any
}

interface UploadFileParam { 
  file: string
}

/**
 * 数据封装
 *
 * UserAuthVO
 */
interface UserAuthVO {
    /**
     * 审核时间
     */
    auditTime?: string;
    /**
     * 审核人
     */
    auditUserName?: string;
    /**
     * 名片正面
     */
    cardFrontFileId?: string;
    /**
     * 名片反面
     */
    cardOppsiteFileId?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 创建人ID
     */
    createUserId?: string;
    /**
     * 创建人名称
     */
    createUserName?: string;
    /**
     * 部门
     */
    department?: string;
    /**
     * 主键
     */
    id?: string;
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 用户名称
     */
    nickname?: string;
    /**
     * 机构编号
     */
    orgCode?: string;
    /**
     * 机构名称
     */
    orgName?: string;
    /**
     * 机构类型1金融机构2企业
     */
    orgType?: string;
    /**
     * 职务
     */
    post?: string;
    /**
     * 拒绝原因
     */
    rejectReason?: string;
    /**
     * 状态1待审核2同意3拒绝4作废中5作废
     */
    status?: string;
    /**
     * 租户ID
     */
    tenantId?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 更新人ID
     */
    updateUserId?: string;
    /**
     * 更新人名称
     */
    updateUserName?: string;
    /**
     * 用户id
     */
    userId?: string;
    /**
     * 用户填写的用户名称
     */
    writeNickname?: string;
    /**
     * 用户填写的机构编号
     */
    writeOrgCode?: string;
    /**
     * 用户填写的机构名称
     */
    writeOrgName?: string;
    [property: string]: any;
}

