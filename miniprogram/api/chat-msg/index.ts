import { request } from '../request'

/**
 * `getSyncChatMsg` : 小程序同步聊天消息
 * @param SyncChatMsgParamVO
 * @returns CommonRespResult<PageResult\<SyncChatMsgVO\>>
 *
 */
export const getSyncChatMsg = (params: SyncChatMsgParamVO) =>
  request<SyncChatMsgParamVO, SyncChatMsgVO>({
    method: 'GET',
    url: '/member/member/chat-msg/syncChatMsg',
    data: params
  })

/**
 * `addChatUser` : 新建聊天室
 * @param OppositeUserId
 * @returns CommonRespResult<PageResult\<AssetReleaseVO\>>
 *
 */
export const addChatUser = (params: OppositeUserId) =>
  request<OppositeUserId, null | string>({
    method: 'POST',
    url: '/member/member/chat-user/queryRoomId',
    data: params
  })

/**
 * `sendChatMsg` : 聊天室发送消息
 * @param SendChatMsgParam
 * @returns CommonRespResult\<MsgContentVO>
 *
 */
export const sendChatMsg = (params: SendChatMsgParam) =>
  request<SendChatMsgParam, MsgContentVO>({
    method: 'POST',
    url: '/member/member/chat-user/sendChatMsg',
    data: params
  })

/**
 * `chatMsgConfirm` : 聊天消息确认
 * @param SendChatMsgParam
 * @returns CommonRespResult\<MsgContentVO>
 *
 */
export const chatMsgConfirm = (params: ChatMsgConfirmParams) =>
  request<ChatMsgConfirmParams, MessageResult<never>>({
    method: 'POST',
    url: '/member/member/chat-user/chatMsgConfirm',
    data: params
  })
