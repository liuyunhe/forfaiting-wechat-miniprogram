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
    url: '/member/uc/member-user/login',
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
    url: '/member/uc/member-user/refreshToken',
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
    url: '/member/uc/user-auth/add',
    data: params
  }) 


export const queryLoginUserAuth = () =>
  request<'', UserAuthVO>({
    method: 'GET',
    url: '/member/uc/user-auth/queryLoginUserAuth',
  }) 
