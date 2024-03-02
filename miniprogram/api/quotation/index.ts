import { request } from '../request'

/**
 * `getSyncChatMsg` : 小程序近七天报价汇总曲线查询
 * @param None
 * @returns CommonRespResult\<SevenCurveVO>
 *
 */
export const getAllSevenCurve = () =>
  request<'', SevenCurveVO>({
    method: 'GET',
    url: '/member/member/business/daily-quotation/allSevenCurve'
  })

/**
 * `getOrgSevenCurve` : 小程序一个机构类别近七天报价汇总曲线查询
 * @param None
 * @returns CommonRespResult\<SevenCurveVO>
 *
 */
export const getOrgSevenCurve = (params: OrgTypeCode) =>
  request<OrgTypeCode, SevenCurveVO>({
    method: 'GET',
    url: '/member/member/business/daily-quotation/orgSevenCurve',
    data: params
  })


/**
 * `getSevenList` : 小程序按机构类别分页查询近七天报价汇总快照表
 * @param None
 * @returns CommonRespResult\<PageResult<QuotationOrgVO>\>
 *
 */
export const getSevenList = (params: BasePageRequest) =>
  request<BasePageRequest, PageResult<QuotationOrgVO>>({
    method: 'POST',
    url: '/member/member/business/daily-quotation/sevenList',
    data: params
  })
