import { request } from '../request'

/**
 * `login` : 微信小程序用户登录
 * @param AssetReleaseListParmaVO
 * @returns CommonRespResult\<JwtAuthenticationResponse\>
 * 
*/
export const login = (params: LoginParamVO) =>
  request<LoginParamVO, JwtAuthenticationResponse>({
    method: 'POST',
    url: '/member/member/uc/member-user/login',
    data: params
  })

/**
* `getAssetRelease` : 查询资产发布表
* @param AssetReleaseListParmaVO
* @returns CommonRespResult\<JwtAuthenticationResponse\>
* 
*/
export const getRefreshToken = (params: RefreshTokenDTO) =>
  request<RefreshTokenDTO, JwtAuthenticationResponse>({
    method: 'POST',
    url: '/member/member/uc/member-user/refreshToken',
    data: params
  }) 

/**
* `addUserAuthApply` : 用户认证申请
* @param UserAuthDTO
* @returns CommonRespResult\<MessageResult\<never>\>
* 
*/
export const addUserAuthApply = (params: UserAuthDTO) =>
  request<UserAuthDTO, MessageResult<never>>({
    method: 'POST',
    url: '/member/member/uc/user-auth/userAuth',
    data: params
  }) 
/**
* `reUserAuthApply` : 用户重新认证申请
* @param UserAuthDTO
* @returns CommonRespResult\<MessageResult\<never>\>
* 
*/
export const reUserAuthApply = (params: UserAuthDTO) =>
  request<UserAuthDTO, MessageResult<never>>({
    method: 'POST',
    url: '/member/member/uc/user-auth/reAuth',
    data: params
  }) 

/**
* `queryLoginUserAuth` : 查询小程序用户认证详情
* @param None
* @returns CommonRespResult\<UserAuthVO>\>
* 
*/
export const queryLoginUserAuth = () =>
  request<'', UserAuthVO>({
    method: 'GET',
    url: '/member/member/uc/user-auth/queryLoginUserAuth'
  }) 

/**
* `queryLoginUserAuth` : 小程序用户修改名片
* @param UserAuthVO
* @returns CommonRespResult\<MessageResult\<never>\>
* 
*/
export const updateUserAuthCard = (params: UserAuthVO) =>
  request<UserAuthVO, MessageResult<never>>({
    method: 'POST',
    url: '/member/member/uc/user-auth/updateUserAuthCard',
    data: params
  }) 

/**
* `queryLoginUserAuth` : 小程序用户修改头像
* @param AvatarFileId
* @returns CommonRespResult\<MessageResult\<never>\>
* 
*/
export const updateAvatar = (params: AvatarFileId) =>
  request<AvatarFileId, MessageResult<never>>({
    method: 'GET',
    url: '/member/member/uc/member-user/updateAvatar',
    data: params
  }) 
