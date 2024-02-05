import { request } from '../request'

export const login = (params: LoginParamVO) =>
  request<LoginParamVO, JwtAuthenticationResponse>({
    method: 'GET',
    url: '/uc/member-user/login',
    data: params
  })

export const getRefreshToken = (params: RefreshTokenDTO) =>
  request<RefreshTokenDTO, JwtAuthenticationResponse>({
    method: "POST",
    url: '/uc/member-user/refreshToken',
    data: params
  }) 
