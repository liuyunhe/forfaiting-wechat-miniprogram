/**
 * `AssetReleaseListParmaVO` : 查询资产发布表请求参数
 * 
*/
interface AssetReleaseListParmaVO {
  /**
   * 金额
   */
  amount?: null | string;
  /**
   * 0，分页下标
   */
  page?: number;
  /**
   * 10，分页大小
   */
  pageSize?: number;
  /**
   * 承兑行类型1国故2城商3农商
   */
  promiseOrgType?: null | string;
  /**
   * 报价下限
   */
  rateLower?: number;
  /**
   * 报价上限
   */
  rateUpper?: number | null;
  /**
   * 发布类型1发证2收证
   */
  releaseType?: null | string;
  /**
   * 期限
   */
  term?: null | string;
  [property: string]: any;
}

/**
 * `AssetReleaseVO` : 查询资产发布表返回结构
 * 
 * 资产发布页面展示实体
 *
 */
interface AssetReleaseVO {
  /**
   * 金额下限
   */
  amountLower?: number | null
  /**
   * 金额上限
   */
  amountUpper?: number | null
  /**
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建人ID
   */
  createUserId?: null | string
  /**
   * 创建人名称
   */
  createUserName?: null | string
  /**
   * 主键
   */
  id?: null | string
  /**
   * 备注
   */
  note?: null | string
  /**
   * 下架原因
   */
  offReason?: null | string
  /**
   * 承兑行行号
   */
  promiseOrgCode?: null | string
  /**
   * 承兑行行名
   */
  promiseOrgName?: null | string
  /**
   * 承兑行类型1国故2城商3农商
   */
  promiseOrgType?: null | string
  /**
   * 报价下限
   */
  rateLower?: number | null
  /**
   * 报价上限
   */
  rateUpper?: number | null
  /**
   * 贸易类型1服贸2货贸3服贸/货贸
   */
  readeType?: null | string
  /**
   * 发布截止日期
   */
  releaseDeadline?: null | string
  /**
   * 资产编号
   */
  releaseNo?: null | string
  /**
   * 发布行行号
   */
  releaseOrgCode?: null | string
  /**
   * 发布行行名
   */
  releaseOrgName?: null | string
  /**
   * 发布类型1发证2收证
   */
  releaseType?: null | string
  /**
   * 发布人id
   */
  releaseUserId?: null | string
  /**
   * 发布人名称
   */
  releaseUserName?: null | string
  /**
   * 发布人手机号
   */
  releaseUserPhone?: null | string
  /**
   * 转卖次数
   */
  resellNum?: number | null
  /**
   * 状态0已下架1已上架2已确认
   */
  status?: null | string
  /**
   * 租户ID
   */
  tenantId?: null | string
  /**
   * 期限下限
   */
  termLower?: number | null
  /**
   * 期限上限
   */
  termUpper?: number | null
  /**
   * 是否置顶0不置顶1置顶
   */
  topFlag?: null | string
  /**
   * 更新时间
   */
  updateTime?: null | string
  /**
   * 更新人ID
   */
  updateUserId?: null | string
  /**
   * 更新人名称
   */
  updateUserName?: null | string
  [property: string]: any
}

/**
 * `AddAssetReleaseItemParamVO` : 添加资产发布表请求参数
 * 
*/
interface AddAssetReleaseItemParamVO {
  /**
   * 金额下限
   */
  amountLower?: number
  /**
   * 金额上限
   */
  amountUpper?: number
  /**
   * 备注
   */
  note?: string
  /**
   * 承兑行行号
   */
  promiseOrgCode?: string
  /**
   * 承兑行行名
   */
  promiseOrgName?: string
  /**
   * 承兑行类型1国故2城商3农商
   */
  promiseOrgType?: string
  /**
   * 报价下限
   */
  rateLower?: number
  /**
   * 报价上限
   */
  rateUpper?: number
  /**
   * 贸易类型1服贸2货贸3服贸/货贸
   */
  readeType?: string
  /**
   * 发布截止日期
   */
  releaseDeadline?: string
  /**
   * 发布行行号
   */
  releaseOrgCode?: string
  /**
   * 发布行行名
   */
  releaseOrgName?: string
  /**
   * 发布类型1发证2收证
   */
  releaseType?: string
  /**
   * 发布人id
   */
  releaseUserId?: string
  /**
   * 发布人名称
   */
  releaseUserName?: string
  /**
   * 转卖次数
   */
  resellNum?: number
  /**
   * 期限下限（发布类型为1时 其与上限填写一个就可）
   */
  termLower?: number
  /**
   * 期限上限
   */
  termUpper?: number
  [property: string]: any
}

/**
 * `OpAssetReleaseItemParamVO` : 操作资产发布表
 * 
*/
interface OpAssetReleaseItemParamVO {
  /**
   * 资产发布表ID
   */
  id: string
  /**
   * 操作类型 0-删除 1-下架 2-达成
   */
  operationType?: string
  [property: string]: any
}


/**
 * getOrgInfoList请求参数
 *
 * OrgListParam
 */
interface OrgListParam {
  /**
   * 机构名称
   */
  orgName?: null | string
  [property: string]: any
}

/**
 * OrgInfo页面展示实体
 *
 * OrgInfoVO
 */
interface OrgInfoVO {
    /**
     * 创建时间
     */
    createTime?: null | string;
    /**
     * 创建人ID
     */
    createUserId?: null | string;
    /**
     * 创建人名称
     */
    createUserName?: null | string;
    /**
     * 主键
     */
    id?: null | string;
    /**
     * 机构编号
     */
    orgCode?: null | string;
    /**
     * 机构名称
     */
    orgName?: null | string;
    /**
     * 机构类型编号
     */
    orgTypeCode?: null | string;
    /**
     * 机构类型名称
     */
    orgTypeName?: null | string;
    /**
     * 状态0已删除1正常
     */
    status?: null | string;
    /**
     * 租户ID
     */
    tenantId?: null | string;
    /**
     * 更新时间
     */
    updateTime?: null | string;
    /**
     * 更新人ID
     */
    updateUserId?: null | string;
    /**
     * 更新人名称
     */
    updateUserName?: null | string;
    [property: string]: any;
}

/**
 * 查询资产详情参数
 *
 * ReleaseId
 */
interface ReleaseId {
  releaseId: string
  [property: string]: any
}


/**
 * 数据封装
 *
 * AssetReleaseDetailVO
 */
interface AssetReleaseDetailVO {
  /**
   * 金额下限
   */
  amountLower?: number
  /**
   * 金额上限
   */
  amountUpper?: number
  /**
   * 头像
   */
  avatarFileId?: string
  /**
   * 部门
   */
  department?: string
  /**
   * 主键
   */
  id?: string
  /**
   * 图片LOGO
   */
  logo?: string
  /**
   * 用户名称
   */
  nickname?: string
  /**
   * 备注
   */
  note?: string
  /**
   * 下架原因
   */
  offReason?: string
  /**
   * 机构名称
   */
  orgName?: string
  /**
   * 职务
   */
  post?: string
  /**
   * 承兑行行号
   */
  promiseOrgCode?: string
  /**
   * 承兑行行名
   */
  promiseOrgName?: string
  /**
   * 承兑行类型1国故2城商3农商
   */
  promiseOrgType?: string
  /**
   * 报价下限
   */
  rateLower?: number
  /**
   * 报价上限
   */
  rateUpper?: number
  /**
   * 贸易类型1服贸2货贸3服贸/货贸
   */
  readeType?: string
  /**
   * 发布截止日期
   */
  releaseDeadline?: string
  /**
   * 资产编号
   */
  releaseNo?: string
  /**
   * 发布行行号
   */
  releaseOrgCode?: string
  /**
   * 发布行行名
   */
  releaseOrgName?: string
  /**
   * 发布类型1发证2收证
   */
  releaseType?: string
  /**
   * 发布人id
   */
  releaseUserId?: string
  /**
   * 发布人名称
   */
  releaseUserName?: string
  /**
   * 发布人手机号
   */
  releaseUserPhone?: string
  /**
   * 转卖次数
   */
  resellNum?: number
  /**
   * 状态0已下架1已上架2已确认
   */
  status?: string
  /**
   * 期限下限
   */
  termLower?: number
  /**
   * 期限上限
   */
  termUpper?: number
  /**
   * 是否置顶0不置顶1置顶
   */
  topFlag?: string
  [property: string]: any
}
