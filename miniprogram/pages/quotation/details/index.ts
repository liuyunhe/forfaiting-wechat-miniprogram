// pages/my/newMarket/index.js

const echarts = require('../../../components/echarts/echarts.min.js')
function bar(canvas: any, width: number, height: number, dpr: number) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  let option = {
    title: {
      text: '工商银行（7天平均报价）',
      left: 10,
    },
    color: ['#DA5D9E', '#683D8B', '#0097E0'],
    tooltip: {
      trigger: 'axis',
      // formatter: '{b0}: {c0}<br />{b1}: {c1}'
      // valueFormatter: (value:number) => value+'%'
      formatter: function (params: string | any[]) {
        var relVal = params[0].name + '日';
        for (var i = 0, l = params.length; i < l; i++) {
          relVal += '\n' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '%'
        }
        return relVal;
      }
    },
    legend: {
      data: ['3M', '6M', '12M'],
      bottom: 0,
      right: 0,
      icon: "rect",
      itemHeight: 3,
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
      data: ['12', '13', '14', '15', '16', '17', '18'],
      axisLabel: {
        formatter: '{value}日'
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
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
    series: [
      {
        name: '3M',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        data: [1.2, 1.32, 1.01, 1.34, 5.0, 2.30, 1.10],
      },
      {
        name: '6M',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        data: [2.20, 3.82, 3.91, 1.34, 2.90, 1.30, 2.10]
      },
      {
        name: '12M',
        type: 'line',
        stack: 'Total',
        showSymbol: false,
        data: [1.50, 2.32, 2.01, 3.54, 1.90, 3.30, 1.10]
      },
    ]
  };
  chart.setOption(option);
  console.log(chart.getOption())
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: bar
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})