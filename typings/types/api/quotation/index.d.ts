/**
 * 数据封装
 *
 * SevenCurveVO
 */
interface SevenCurveVO {
  /**
   * 曲线名字list
   */
  dataMap?: MapListBigDecimal
  /**
   * 曲线名字list
   */
  nameList?: string[]
  /**
   * 日期list
   */
  timeList?: string[]
  [property: string]: any
}

/**
 * 曲线名字list
 *
 * Map«List«BigDecimal»»
 */
interface MapListBigDecimal {
  key?: number[]
  [property: string]: any
}

interface OrgTypeCode {
  orgTypeCode: string
  [property: string]: any
}

/**
 * BasePageRequest
 */
interface BasePageRequest {
  /**
   * 分页大小
   */
  pageSize: number
  /**
   * 分页下标
   */
  page: number
  [property: string]: any
}

/**
 * <p>
 * 报价汇总机构表 页面展示实体
 * </p>
 *
 * QuotationOrgVO
 */
interface QuotationOrgVO {
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
     * 12月报价
     */
    decemberRate?: number;
    /**
     * 主键
     */
    id?: string;
    /**
     * 6月报价
     */
    juneRate?: number;
    /**
     * 3月报价
     */
    marchRate?: number;
    /**
     * 机构类型编号
     */
    orgTypeCode?: string;
    /**
     * 机构类型名称
     */
    orgTypeName?: string;
    /**
     * 状态0已删除1正常
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
    [property: string]: any;
}

