import { getAllSevenCurve, getSevenList } from '../../../api/quotation/index'
import { updateIndex } from '../../../utils/tab-service'
const App = getApp<IAppOption>()
export {}
const echarts = require('../../../components/echarts/echarts.min.js')
const option = {
  title: {
    text: '各机构近7天平均报价',
    left: 10
  },
  color: ['#DA5D9E', '#683D8B', '#0097E0'],
  tooltip: {
    trigger: 'axis',
    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
    // valueFormatter: (value:number) => value+'%'
    formatter: function (params: string | any[]) {
      var relVal = params[0].name + '日'
      for (var i = 0, l = params.length; i < l; i++) {
        relVal +=
          '\n' +
          params[i].marker +
          params[i].seriesName +
          ' : ' +
          params[i].value +
          '%'
      }
      return relVal
    }
  },
  legend: {
    data: [] as string[],
    bottom: 0,
    right: 0,
    icon: 'rect',
    itemHeight: 3
  },
  grid: {
    left: 15,
    right: 15,
    bottom: '15%',
    top: 45,
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [] as string[],
    axisLabel: {
      formatter: '{value}日'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    scale: true,
    axisLine: { show: true, onZero: false },
    axisLabel: {
      formatter: '{value}%'
    },
    axisTick: {
      show: true
    },
    splitLine: {
      show: false
    }
  },
  series: [] as any[]
}
function bar(canvas: any, width: number, height: number, dpr: number) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  chart.setOption(option)
  console.log(chart.getOption())
  return chart
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ec: {},
    list: [] as QuotationOrgVO[],
    page: 1,
    pageSize: 20,
    totalPages: 1,
    no_more: false,
    isLoading: true,
    showEC: false,
    scrollTop: 0
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
    updateIndex(this, 1)
    this.setData({
      showEC: false,
      page: 1,
      totalPages: 1,
      no_more: false,
      isLoading: true,
      scrollTop: 0,
      list: []
    })
    this.getQuotationData()
    this.getList()
  },
  getList(isPage?: boolean, page?: number) {
    page = page || 1
    const params = {
      pageSize: this.data.pageSize,
      page: this.data.page
    }
    getSevenList(params).then((res) => {
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
  getQuotationData() {
    getAllSevenCurve().then((res) => {
      if (res.code === '0000') {
        if (res.value) {
          option.xAxis.data = res.value.timeList!
          option.legend.data = res.value.nameList!
          const series = res.value.nameList?.map((name, index) => {
            const data = Object.values(res.value?.dataMap!).map(
              (item: number[]) => {
                return item[index]
              }
            )
            return {
              name: name,
              type: 'line',
              showSymbol: false,
              data
            }
          })
          console.log(series)
          option.series = series!
          console.log(option)
          this.setData({
            ec: {
              onInit: bar
            },
            showEC: true
          })
        } else {
          App.$showToast('暂无数据', 'error')
        }
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  handleClickDetails(e: WechatMiniprogram.BaseEvent) {
    const { code: orgTypeCode, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/quotation/details/index?code=${orgTypeCode}&name=${name}`
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
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
