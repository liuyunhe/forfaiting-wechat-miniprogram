import { request } from '../request'

/**
 * `getAssetRelease` : 首页查询资产发布表
 * @param AssetReleaseListParmaVO
 * @returns CommonRespResult<PageResult\<AssetReleaseVO\>>
 * 
*/
export const getAssetReleaseList = (params: AssetReleaseListParmaVO) =>
  request<AssetReleaseListParmaVO, PageResult<AssetReleaseVO>>({
    method: 'POST',
    url: '/member/member/business/asset-release/list',
    data: params
  })

/**
 * `getAssetRelease` : 首页查询资产发布表
 * @param AssetReleaseListParmaVO
 * @returns CommonRespResult<PageResult\<AssetReleaseVO\>>
 * 
*/
export const getAssetReleaseListForMy = (params: AssetReleaseListParmaVO) =>
  request<AssetReleaseListParmaVO, PageResult<AssetReleaseVO>>({
    method: 'POST',
    url: '/member/member/business/asset-release/listForMy',
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
    url: '/member/member/business/asset-release/publishAsset',
    data: params
  })


/**
 * `opAssetReleaseItem` : 操作资产发布表
 * @param OpAssetReleaseItemParamVO
 * @returns CommonRespResult<MessageResult\<never\>>
 * 
*/  
export const opAssetReleaseItem = (params: OpAssetReleaseItemParamVO) =>
  request<OpAssetReleaseItemParamVO, MessageResult<never>>({
    method: 'GET',
    url: '/member/member/business/asset-release/operation',
    data: params
  })

/**
 * `getAssetReleaseDetail` : 小程序首页查询资产详情
 * @param getAssetReleaseDetail
 * @returns CommonRespResult<MessageResult\<never\>>
 * 
*/  
export const getAssetReleaseDetail = (params: ReleaseId) =>
  request<ReleaseId, AssetReleaseDetailVO>({
    method: 'GET',
    url: '/member/member/business/asset-release/releaseDetail',
    data: params
  })

/**
 * `getOrgInfoList` : 小程序查询金融机构表
 * @param OrgListParam
 * @returns CommonRespResult<OrgInfoVO>>
 * 
*/  
export const getOrgInfoList = (params: OrgListParam) =>
  request<OrgListParam, PageResult<OrgInfoVO[]>>({
    method: 'POST',
    url: '/member/member/business/org-info/list',
    data: params
  })