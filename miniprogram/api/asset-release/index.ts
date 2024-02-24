import { request } from '../request'

/**
 * `getAssetRelease` : 查询资产发布表
 * @param AssetReleaseListParmaVO
 * @returns CommonRespResult<PageResult\<AssetReleaseVO\>>
 * 
*/
export const getAssetReleaseList = (params: AssetReleaseListParmaVO) =>
  request<AssetReleaseListParmaVO, PageResult<AssetReleaseVO>>({
    method: 'POST',
    url: '/member/business/advertisement/list',
    data: params
  })

/**
 * `addAssetReleaseItem` : 添加资产发布表
 * @param AddAssetReleaseItemParamVO
 * @returns CommonRespResult<MessageResult\<never\>>
 * 
*/  
export const addAssetReleaseItem = (params: AddAssetReleaseItemParamVO) =>
  request<AddAssetReleaseItemParamVO, MessageResult<never>>({
    method: 'POST',
    url: '/member/business/advertisement/list',
    data: params
  })