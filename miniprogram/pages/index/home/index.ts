// pages/my/newMarket/index.js

import { updateIndex, updateRole } from '../../../utils/tab-service'
import { getAdvertisement } from '../../../api/advertisement/index'
import { getAssetReleaseList } from '../../../api/asset-release/index'
import { BASE_URL } from '../../../api/request'
const App = getApp<IAppOption>()
export {}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL_IMG: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_`,
    imgNewsData: [] as AdvertisementVO[],
    list: [] as AssetReleaseVO[],
    showMoreFilter: false,

    releaseType: '',
    promiseOrgType: [] as string[],
    term: '',
    amount: '',
    rateLower: '',
    rateUpper: '',
    status: '',
    releaseUserId: '',

    page: 1,
    pageSize: 10,
    totalPages: 1,
    no_more: false,
    isLoading: true,

    releaseTypeDM: false,
    termDM: false,
    amountDM: false,

    termLower: '',
    termUpper: '',
    amountLower: '',
    amountUpper: '',

    showGG: false,
    showCS: false,
    showNS: false,

    showLayer: false,
    showNavBar:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    updateIndex(this, 0)

    if (!wx.getStorageSync('token')) return
    if (App.globalData.checkLogin) {
      console.log('登录接口已返回')
    } else {
      App.checkLoginReadyCallback = (res) => {
        console.log('登录接口通过回调函数返回', res)
      }
    }
    this.getSwiperImgs()
    if (App.globalData.HOME_LIST_NEED_REFRESH || this.data.list.length === 0) {
      this.handleResetMoreFilter()
      App.globalData.HOME_LIST_NEED_REFRESH = false
    }
  },

  handleScroll(e: WechatMiniprogram.CustomEvent) {
    const isFixed = e.detail.isFixed
    console.log(isFixed)
    if (isFixed && !this.data.showNavBar) {
      this.setData({
        showNavBar: true
      })
    }
    if (!isFixed && this.data.showNavBar) {
      this.setData({
        showNavBar: false
      })
    }
  },

  onChange(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      'product.value': e.detail.value
    })
  },
  onCLickFilter(e: WechatMiniprogram.BaseEvent) {
    const { type, value }: Record<string, string> = e.currentTarget.dataset
    if (this.data[`${type as 'releaseType'}`] === value) {
      this.setData({
        [`${type}`]: ''
      })
    } else {
      this.setData({
        [`${type}`]: value
      })
    }
  },
  onCLickMultiFilter(e: WechatMiniprogram.BaseEvent) {
    const { type, value }: Record<string, string> = e.currentTarget.dataset
    if (this.data[`${type as 'promiseOrgType'}`].includes(value)) {
      const index = this.data[`${type as 'promiseOrgType'}`].findIndex(
        (item) => {
          return item === value
        }
      )
      const list = this.data[`${type as 'promiseOrgType'}`]
      list.splice(index, 1)
      this.setData({
        [`${type}`]: list,
        showGG: list.includes('1'),
        showCS: list.includes('2'),
        showNS: list.includes('3')
      })
    } else {
      const list = this.data[`${type as 'promiseOrgType'}`]
      list.push(value)
      this.setData({
        [`${type}`]: list,
        showGG: list.includes('1'),
        showCS: list.includes('2'),
        showNS: list.includes('3')
      })
    }
    console.log(this.data.promiseOrgType)
  },
  onStickyScroll(detail: { scrollTop: number; isFixed: boolean }) {
    console.log(detail)
  },
  onDropMenuShow(e: WechatMiniprogram.BaseEvent) {
    const { type } = e.currentTarget.dataset
    console.log(this.data.showLayer)
    if (this.data.showLayer) {
      this.closeLayer()
    } else {
      this.setData({
        releaseTypeDM: false,
        termDM: false,
        amountDM: false,
        showMoreFilter: false,
        showLayer: true,
        ...{
          [`${type}DM`]: true
        }
      })
    }
  },
  onCLickDropMenu(e: WechatMiniprogram.BaseEvent) {
    const { type, value }: Record<string, string> = e.currentTarget.dataset
    if (this.data[`${type as 'releaseType'}`] === value) {
      return
    }
    this.setData({
      [`${type}`]: value
    })
    this.setData({
      [`${type}DM`]: false,
      page: 1,
      no_more: false,
      isLoading: true,
      termLower: '',
      termUpper: '',
      amountLower: '',
      amountUpper: '',
      promiseOrgType: [],
      showGG: false,
      showCS: false,
      showNS: false,
      showLayer: false
    })
    this.getList()
  },
  onInputChange(e: WechatMiniprogram.CustomEvent) {
    const { type } = e.currentTarget.dataset
    console.log(e, e.detail.value)
    this.setData({
      [`${type}`]: e.detail.value
    })
  },
  getList(isPage?: boolean, page?: number) {
    page = page || 1
    const params = {
      pageSize: this.data.pageSize,
      page: this.data.page,
      releaseType: this.data.releaseType,
      promiseOrgType: this.data.promiseOrgType.join(','),
      term: this.data.term,
      amount: this.data.amount,
      rateLower: Number(this.data.rateLower),
      rateUpper: Number(this.data.rateUpper),
      status: this.data.status,
      releaseUserId: this.data.releaseUserId,
      termLower: this.data.termLower ? this.data.termLower : 0,
      termUpper: this.data.termUpper ? this.data.termUpper : 0,
      amountLower: this.data.amountLower ? this.data.amountLower : 0,
      amountUpper: this.data.amountUpper ? this.data.amountUpper : 0
    }
    getAssetReleaseList(params).then((res) => {
      if (res.code === '0000') {
        if (res.value && res.value.rows?.length) {
          if (isPage == true) {
            this.setData({
              list: [...this.data.list, ...res.value.rows],
              totalPages: res.value.totalPages!,
              isLoading: false
            })
          } else {
            this.setData({
              list: [...res.value.rows],
              totalPages: res.value.totalPages!,
              isLoading: false
            })
          }
        } else {
          this.setData({
            list: [],
            totalPages: 1,
            isLoading: false
          })
        }
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  /**
   * 下拉到底加载数据
   */
  bindDownLoad() {
    console.log(this.data.page, this.data.totalPages)
    if (this.data.page >= this.data.totalPages) {
      if(this.data.list.length == 0) return
      this.setData({
        no_more: true
      })
    } else {
      this.setData({
        page: this.data.page + 1
      })
      this.getList(true, this.data.page)
    }
  },

  handleClickMoreFilter() {
    console.log(this.data.showLayer)
    if (this.data.showLayer) {
      this.closeLayer()
    } else {
      this.setData({
        showLayer: true,
        showMoreFilter: true,
        releaseTypeDM: false,
        termDM: false,
        amountDM: false
      })
    }
  },
  handleResetMoreFilter() {
    this.setData({
      page: 1,
      totalPages: 1,
      no_more: false,
      isLoading: true,
      showLayer: false,
      showMoreFilter: false,
      releaseType: '',
      term: '',
      amount: '',
      termLower: '',
      termUpper: '',
      amountLower: '',
      amountUpper: '',
      rateLower: '',
      rateUpper: '',
      promiseOrgType: [],
      showGG: false,
      showCS: false,
      showNS: false,
      list: []
    })
    this.getList()
  },
  handleSubmitFilter() {
    if (
      Number((this.data.termLower && this.data.termLower) || 0) >
      Number((this.data.termUpper && this.data.termUpper) || 0)
    ) {
      if (!this.data.termLower) {
        App.$showToast('请输入期限下限', 'none')
      } else if (!this.data.termUpper) {
        App.$showToast('请输入期限上限', 'none')
      } else {
        App.$showToast('期限下限不能大于期限上限', 'none')
      }
      return
    }
    if (
      Number((this.data.amountLower && this.data.amountLower) || 0) >
      Number((this.data.amountUpper && this.data.amountUpper) || 0)
    ) {
      if (!this.data.amountLower) {
        App.$showToast('请输入金额下限', 'none')
      } else if (!this.data.amountUpper) {
        App.$showToast('请输入金额上限', 'none')
      } else {
        App.$showToast('金额下限不能大于金额上限', 'none')
      }
      return
    }
    if (
      Number((this.data.rateLower && this.data.rateLower) || 0) >
      Number((this.data.rateUpper && this.data.rateUpper) || 0)
    ) {
      if (!this.data.rateLower) {
        App.$showToast('请输入报价下限', 'none')
      } else if (!this.data.rateUpper) {
        App.$showToast('请输入报价上限', 'none')
      } else {
        App.$showToast('报价下限不能大于报价上限', 'none')
      }
      return
    }
    this.setData({
      page: 1,
      totalPages: 1,
      no_more: false,
      isLoading: true,
      showMoreFilter: false,
      showLayer: false,
      term: '',
      amount: ''
    })
    this.getList()
  },
  handleCloseMoreFilter() {
    this.setData({
      showMoreFilter: false
    })
  },

  handleClickCard(e: WechatMiniprogram.BaseEvent) {
    const { type, status, id } = e.currentTarget.dataset
    if (status === '2') return
    console.log(type)
    if (type == 2) {
      wx.navigateTo({
        url: `/pages/index/receiveDetails/index?id=${id}`
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: `/pages/index/sendDetails/index?id=${id}`
      })
    }
  },

  getSwiperImgs() {
    const params = {
      pageSize: 10,
      page: 0
    }
    getAdvertisement(params).then((res) => {
      if (res.code === '0000') {
        this.setData({
          imgNewsData: res.value?.rows!
        })
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },
  formatImgs(fileId: string) {
    return `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${fileId}`
  },

  closeLayer() {
    this.setData({
      showLayer: false,
      showMoreFilter: false,
      releaseTypeDM: false,
      termDM: false,
      amountDM: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.bindDownLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
