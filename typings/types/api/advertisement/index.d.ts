/**
 * `AdvertisementParamVO` : 分页查询轮播广告表参数
 * 
 * 
 */ 

interface AdvertisementParamVO {
  /**
   * 10，分页大小
   */
  pageSize?: number;
  /**
   * 0，分页下标
   */
  page?: number;
  [property: string]: any;
}


/**
 * `AdvertisementVO` : 分页查询轮播广告表返回数据结构
 * 
 * 
 */
 interface AdvertisementVO {
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
   * 图片
   */
  fileId?: null | string;
  /**
   * 主键
   */
  id?: null | string;
  /**
   * 发布时间
   */
  releaseTime?: null | string;
  /**
   * 状态0已下架1已上架
   */
  status?: null | string;
  /**
   * 租户ID
   */
  tenantId?: null | string;
  /**
   * 广告内容名称
   */
  title?: null | string;
  /**
   * 是否置顶0不置顶1置顶
   */
  topFlag?: null | string;
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