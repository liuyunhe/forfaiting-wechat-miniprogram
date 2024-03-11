/// <reference path="./user/index.d.ts" />
/// <reference path="./advertisement/index.d.ts" />
/// <reference path="./asset-release/index.d.ts" />
/// <reference path="./chat-msg/index.d.ts" />
/// <reference path="./quotation/index.d.ts" />



/**
 * `CommonRespResult` : 请求返回通用数据格式
 * 
*/
interface CommonRespResult<T> {
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
 * `PageResult` : 请求返回分页数据格式
 * 
 */
interface PageResult<T> {
  /**
   * 当前页码
   */
  page?: number | null;
  /**
   * 查询分页长度
   */
  pageSize?: number | null;
  /**
   * 查询结果
   */
  rows?: T[] | null;
  /**
   * 总数
   */
  total?: number | null;
  /**
   * 总页数
   */
  totalPages?: number | null;
  [property: string]: any;
}

/**
 * `MessageResult` : 请求返回消息类型数据格式
 * 
*/
type MessageResult<T> = T

/**
 * `MapObject` : Object数据类型结构
 * 
*/

interface MapObject {
  /**
   * value.userAttrs.key
   */
  key?: { [key: string]: any };
  [property: string]: any;
}

/**
 * `AvatarFileId` : 头像iD
 * 
*/

 interface AvatarFileId {
   avatarFileId: string
   [property: string]: any
 }