import { request } from '../request'

/**
 * `getSyncChatMsg` : 小程序同步聊天消息
 * @param AssetReleaseListParmaVO
 * @returns CommonRespResult<PageResult\<AssetReleaseVO\>>
 *
 */
export const getSyncChatMsg = (params: SyncChatMsgParamVO) =>
  request<SyncChatMsgParamVO, PageResult<SyncChatMsgVO>>({
    method: 'POST',
    url: '/member/chat-msg/syncChatMsg',
    data: params
  })
