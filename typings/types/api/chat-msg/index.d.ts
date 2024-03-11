/**
 * `SyncChatMsgParamVO` : 同步聊天消息请求参数
 */
interface SyncChatMsgParamVO {
  /**
   * yyyy-MM-dd HH:mm:ss
   */
  updateTime: string
  [property: string]: any
}




/**
 * 数据封装
 *
 * SyncChatMsgVO
 */
interface SyncChatMsgVO {
    /**
     * 最后更新时间
     */
    lastUpdateTime?: string;
    /**
     * 更新内容
     */
    syncChatMsgContentList?: SyncChatMsgContentVO[];
    [property: string]: any;
}

/**
 * 聊天内容表 页面展示实体
 * SyncChatMsgContentVO
 */
interface SyncChatMsgContentVO {
  /**
   * 金额下限
   */
  amountLower?: number
  /**
   * 金额上限
   */
  amountUpper?: number
  /**
   * 内容
   */
  content?: string
  /**
   * 最新消息ID
   */
  lastMsgId?: string
  /**
   * 消息类型1文本2表单3只读表单
   */
  msgType?: string
  /**
   * 备注
   */
  note?: string
  /**
   * 下架原因
   */
  offReason?: string
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
   * 贸易类型1服贸2货贸3货服混合
   */
  readeType?: string
  /**
   * 已读消息id
   */
  readMsgId?: string
  /**
   * 接收人id
   */
  receiveUserId?: string
  /**
   * 接收人名称
   */
  receiveUserName?: string
  /**
   * 发布截止日期
   */
  releaseDeadline?: string
  /**
   * 资产发布id
   */
  releaseId?: string
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
   * 聊天室id
   */
  roomId?: string
  /**
   * 类型1单聊
   */
  roomType?: string
  /**
   * 发送人id
   */
  sendUserId?: string
  /**
   * 发送人名称
   */
  sendUserName?: string
  /**
   * 状态0已下架1已确认2已拒绝3已与其他人达成
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
   * 更新时间
   */
  updateTime?: string
  [property: string]: any
}

/**
 * 在线沟通 对方Id
 * OppositeUserId
 */
interface OppositeUserId {
  /**
   * 资产id
   */
  releaseId?: null | string
  [property: string]: any
}

/**
 * 发送消息 参数
 * SendChatMsgParam
 */
interface SendChatMsgParam {
  /**
   * 内容
   */
  content?: null | string
  /**
   * 消息类型1文本2表单3只读表单
   */
  msgType?: null | string
  /**
   * 聊天室id
   */
  roomId?: null | string
  [property: string]: any
}

/**
 * 发送消息实体
 * MsgContentVO
 */
interface MsgContentVO {
  /**
   * 内容
   */
  content?: null | string
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
   * 方向0-自己 1-对方
   */
  direction?: null | string
  /**
   * 主键
   */
  id?: null | string
  /**
   * 消息类型1文本2表单3只读表单
   */
  msgType?: null | string
  /**
   * 接收人id
   */
  receiveUserId?: null | string
  /**
   * 接收人名称
   */
  receiveUserName?: null | string
  /**
   * 聊天室id
   */
  roomId?: null | string
  /**
   * 发送人id
   */
  sendUserId?: null | string
  /**
   * 发送人名称
   */
  sendUserName?: null | string
  /**
   * 状态0已删除1正常
   */
  status?: null | string
  /**
   * 租户ID
   */
  tenantId?: null | string
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
 * 消息确认参数
 * ChatMsgConfirmParams
 */
interface ChatMsgConfirmParams {
  /**
   * 状态0已下架1已确认2已拒绝3已与其他人达成4待确认
   */
  confirmStatus?: null | string
  /**
   * 消息Id
   */
  msgId?: null | string
  [property: string]: any
}

/**
 * 获取消息加工后数据仓库
 * ChatMesaageStore
 */
interface ChatMesaageStore {
  [property:string]:SyncChatMsgContentVO[]
}

/**
 * 获取消息原始数据类型
 * ChatMessageRaw
 */
type ChatMessageRaw = SyncChatMsgContentVO[]


/**
 * 聊天室主键
 * MessageRoomId
 */
type MessageRoomId = SyncChatMsgContentVO['roomId'] & string


/**
 * 未读消息聊天室主键数组
 * ChatMessageNewRoomId
 */
type ChatMessageNewRoomId = MessageRoomId[]

type ChatUpdateTime = SyncChatMsgVO['lastUpdateTime']


