import { request } from '../request'

/**
 * `getAdvertisement` : 分页查询轮播广告表
 * @param AdvertisementParamVO
 * @returns CommonRespResult<PageResult\<AdvertisementVO\>>
 * 
*/
export const getAdvertisement = (params: AdvertisementParamVO) =>
  request<AdvertisementParamVO, PageResult<AdvertisementVO>>({
    method: 'POST',
    url: '/member/business/advertisement/list',
    data: params
  })