import { BASE_URL } from '../../../api/request'
import { queryLoginUserAuth, updateAvatar } from '../../../api/user/index'
import { updateLastIndex } from '../../../utils/tab-service'
const App = getApp<IAppOption>()
export {}
let need_onShow = true
Page({
  /**
   * 页面的初始数据
   */
  data: {
    BASE_URL_IMG: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_`,
    autherized: App.globalData.autherized,
    headImg: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${App.globalData.avatarFileId}`,
    authFlag: App.globalData.authFlag,
    account: App.globalData.account,
    autherizedOrgType: App.globalData.orgType,
    avatarFileId: App.globalData.avatarFileId,
    showNewMsg: false
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
    console.log('my hone onshow =====>')
    if (!need_onShow) {
      need_onShow = true
      return
    }
    updateLastIndex(this)
    this.getQueryLoginUserAuth()
    const CHAT_MESSAGE_NEW_ROOM_ID = wx.getStorageSync(
      'CHAT_MESSAGE_NEW_ROOM_ID'
    )
    this.setData({
      account: App.globalData.account,
      headImg: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${App.globalData.avatarFileId}`,
      avatarFileId: App.globalData.avatarFileId
    })
    if (
      CHAT_MESSAGE_NEW_ROOM_ID &&
      JSON.parse(CHAT_MESSAGE_NEW_ROOM_ID).length > 0
    ) {
      this.setData({
        showNewMsg: true
      })
    } else {
      this.setData({
        showNewMsg: false
      })
    }
  },
  getQueryLoginUserAuth() {
    queryLoginUserAuth().then((res) => {
      if (res.code === '0000') {
        // App.globalData.authFlag = res.value&&res.value.
        this.setData({
          autherizedOrgType: res.value && res.value.orgType
        })
        App.globalData.authFlag = (res.value && res.value.status) as
          | '0'
          | '1'
          | '2'
        App.globalData.autherized = App.globalData.authFlag === '2'
        App.globalData.orgType = (res.value && res.value.orgType)!
        this.setData({
          autherized: App.globalData.autherized,
          authFlag: App.globalData.authFlag
        })
        if (this.data.autherized) {
          this.setData({
            nickname: res.value && res.value.nickname,
            orgName: res.value && res.value.orgName,
            mobile: (res.value && res.value.mobile) || App.globalData.account
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
  handleClickRegister(e: WechatMiniprogram.BaseEvent) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/improveInfo/index?type=${type}`
    })
  },

  handleClickLine(e: WechatMiniprogram.BaseEvent) {
    console.log(e)
    const { name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/${name}/index`
    })
  },

  handleClickExit() {
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '/pages/login/index/login?type=0'
    })
  },

  // 图片转64
  base64(url: string, type: string) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: url, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: (res) => {
          resolve(
            'data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data
          )
          // resolve(res.data)
        },
        fail: (res) => reject(res.errMsg)
      })
    })
  },
  onClickChooseAvatar() { 
    need_onShow = false
    
  },
  onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
    let _this = this
    console.log(e)
    const { avatarUrl } = e.detail
    console.log(avatarUrl)
    // this.base64(avatarUrl, 'JPG').then((base64) => {
    //   this.setData({
    //     headImg: base64 as string
    //   })
    //   console.log(base64)
    // })
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    this.getImageInfo(avatarUrl)
    // _this.setData({
    //   avatarUrl: e.detail.avatarUrl
    // });
    //  将头像上传到服务器
    // wx.uploadFile({
    //   url: $baseUrl + '/file/v1/fileUpload',
    //   filePath: avatarUrl,
    //   name: 'files',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //     authorization: 'Bearer ' + wx.getStorageSync('token')
    //   },
    //   success(res) {
    //     if (res.statusCode == '200') {
    //       if (res.data) {
    //         const { fileId, fileName } = JSON.parse(res.data)
    //         _this.onlinePreview(fileId, fileName)
    //       } else {
    //       }
    //     } else {
    //       App.showError('上传失败')
    //     }
    //   }
    // })
  },

  getImageInfo(image_tempFilePath: string) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    const _this = this
    const windowWidth = 200 //图片压缩的宽度
    const quality = 0.9 //图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
    wx.getImageInfo({
      src: image_tempFilePath,
      success(images) {
        console.log('压缩之前的图片', images)
        var imgwidth = images.width //图片实际宽度
        var imgheight = images.height //图片实际高度
        if (imgwidth > windowWidth) {
          //判断图片实际宽度是否大于要压缩的宽度，这个判断也可以不要，根据实际需求来
          _this.setData({
            windowWidth: windowWidth, //图片压缩宽度
            windowHeight: (windowWidth * imgheight) / imgwidth //计算图片压缩之后的高度，与图片原比例一致
          })
          // 放到对应的wxml页面
          const ctx = wx.createCanvasContext('attendCanvasId') //canvas id
          ctx.drawImage(
            image_tempFilePath,
            0,
            0,
            windowWidth,
            (windowWidth * imgheight) / imgwidth
          )
          ctx.draw(
            false,
            setTimeout(() => {
              wx.canvasToTempFilePath({
                canvasId: 'attendCanvasId',
                fileType: images.type == 'png' ? 'png' : 'jpg', //目标文件的类型，这里可以根据实际情况来，
                quality: quality, //图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
                success(s) {
                  console.log('压缩之后的图片', s)
                  _this.upLoadImage(s.tempFilePath)
                }
              })
            }, 200) as unknown as (...args: any[]) => any
          )
        } else {
          console.log('不用压缩图片', images)
          _this.upLoadImage(image_tempFilePath)
        }
      },
      fail(err) {
        App.$showToast(err.errMsg, 'none')
        wx.hideLoading()
      },
      complete() {}
    })
  },

  upLoadImage(tempFilePath: string) {
    const _this = this
    wx.getImageInfo({
      src: tempFilePath,
      success(i) {
        console.log(i)
      }
    })
    wx.uploadFile({
      url: App.globalData.BASE_URL + '/file/file/v1/upload',
      filePath: tempFilePath,
      name: 'files',
      header: {
        // 'content-type': 'application/json', // 默认值
        Authorization: wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        const result = JSON.parse(res.data)
        if (result.code === '0000') {
          const params = {
            avatarFileId: result.value.fileId
          }
          updateAvatar(params).then((updateAvatarRes) => {
            if (updateAvatarRes.code === '0000') {
              App.$showToast('操作成功', 'success')
              App.globalData.avatarFileId = result.value.fileId
              _this.setData({
                avatarFileId: result.value.fileId,
                headImg: `${BASE_URL}/file/api/file/v1/onlinePreviewController/getFileById_${App.globalData.avatarFileId}`
              })
            } else {
              App.$showToast(result.message, 'error')
            }
          })
        } else {
          App.$showToast(result.message, 'error')
        }
      },
      fail(err) {
        App.$showToast(err.errMsg, 'none')
      },
      complete() {}
    })
  },

  onlinePreview(fileId: string, fileName: string) {
    // let _this = this
    // var imgData = {
    //   fileId: fileId
    // }
    // $api.onlinePreview(imgData).then((res) => {
    //   console.log('浏览图片结果=====', res)
    //   if (res.result != 'error') {
    //     const wechatAvatarUrl = [
    //       {
    //         fileName: fileName,
    //         url: `${IMAGE_UPLOAD_URL}${fileId}`,
    //         previewUrl: `${IMAGE_UPLOAD_URL}${fileId}`
    //       }
    //     ]
    //     const avatarUrl = wechatAvatarUrl[0].url
    //     _this.setData({
    //       wechatAvatarUrl: JSON.stringify(wechatAvatarUrl),
    //       avatarUrl
    //     })
    //     console.log(_this)
    //   } else {
    //     wx.showToast({
    //       title: res.message,
    //       icon: 'none'
    //     })
    //   }
    // })
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
