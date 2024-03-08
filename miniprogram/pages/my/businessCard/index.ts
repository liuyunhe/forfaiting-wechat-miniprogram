import { queryLoginUserAuth, updateUserAuthCard } from "../../../api/user/index"
const App = getApp<IAppOption>()
export {}
// pages/my/newMarket/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    nickname: '',
    writeOrgName: '',
    writeNickname: '',
    department: '',
    post: '',
    mobile: '',
    orgCode: '',
    orgName: '',
    orgType: '',
    cardFrontFileId: '',
    cardOppsiteFileId: '',

    registerOrgVisible: false,
    registerOrgType: '', // 机构类型1金融2企业
    registerOrgs: [
      { label: '金融机构认证', value: '1' },
      { label: '企业认证', value: '2' }
    ],
    registerOrgText: '',
    registerOrgValue: [] as string[]
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
    this.getQueryLoginUserAuth()
  },

  onInputChange(e: WechatMiniprogram.CustomEvent) {
    const { type } = e.currentTarget.dataset
    console.log(e, e.detail.value)
    this.setData({
      [`${type}`]: e.detail.value
    })
  },

  onColumnChange(e: WechatMiniprogram.BaseEvent) {
    console.log('picker pick:', e)
  },

  onPickerChange(e: WechatMiniprogram.CustomEvent) {
    const { key } = e.currentTarget.dataset
    const { value, label } = e.detail
    console.log('picker change:', e.detail)
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Type`]: value[0],
      [`${key}Text`]: label.join(' ')
    })
    wx.navigateTo({
      url: `/pages/my/improveInfo/index?type=${this.data.registerOrgType}&id=${this.data.id}`
    })
  },

  onPickerCancel(e: WechatMiniprogram.CustomEvent) {
    const { key } = e.currentTarget.dataset
    console.log(e, '取消')
    console.log('picker1 cancel:')
    this.setData({
      [`${key}Visible`]: false
    })
  },

  getQueryLoginUserAuth() {
    queryLoginUserAuth().then((res) => {
      if (res.code === '0000') {
        // App.globalData.authFlag = res.value&&res.value.
        if (res.value) {
          this.setData({
            id: res.value.id,
            nickname: res.value.nickname,
            writeOrgName: res.value.writeOrgName,
            writeNickname: res.value.writeNickname,
            department: res.value.department || '',
            post: res.value.post || '',
            mobile: res.value.mobile || App.globalData.account,
            orgCode: res.value.orgCode,
            orgName: res.value.orgName,
            orgType: res.value.orgType,
            cardFrontFileId: res.value.cardFrontFileId,
            cardOppsiteFileId: res.value.cardOppsiteFileId
          })
        }
      } else {
        wx.showToast({
          title: res.message!,
          icon: 'error'
        })
      }
    })
  },

  saveData(e: WechatMiniprogram.CustomEvent) {
    console.log(e.detail.value)
  },

  handleClickSubmit() {
    const params = {
      id: this.data.id,
      nickname: this.data.nickname,
      writeOrgName: this.data.writeOrgName,
      writeNickname: this.data.writeNickname,
      department: this.data.department,
      post: this.data.post,
      mobile: this.data.mobile,
      orgCode: this.data.orgCode,
      orgName: this.data.orgName,
      cardFrontFileId: this.data.cardFrontFileId,
      cardOppsiteFileId: this.data.cardOppsiteFileId
    }
    updateUserAuthCard(params).then((res) => {
      if (res.code === '0000') {
        App.$showToast('提交成功', 'success')
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      } else {
        App.$showToast(res.message!, 'error')
      }
    })
  },

  handleClickRegister() {
    this.setData({
      registerOrgVisible: true
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