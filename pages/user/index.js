// pages/user/index.js
import { showToast } from '../../utils/asyncWxApi'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示退出登录按钮
    isShowCancel: false
  },
  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        isShowCancel: true
      })
    }
  },
  getUserInfo() {
    this.setData({
      isShowCancel: true
    })
  },
  handleCancel() {
    var that = this
    wx.showModal({
      title: '确定要退出登录吗?',
      confirmText: '心意已决',
      cancelText: '再想想',
      async success(res) {
        if (res.confirm) {
          wx.clearStorage()
          that.setData({
            isShowCancel: false,
          })
          await showToast({title:'退出成功,请切换页面'})
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "朋友，快来选购吧",
      imageUrl: '/assets/image/O1CN01syHZxs1C8zCFJj97b_!!37-0-lubanu.jpg',
      path: '/pages/index/index'
    }
  }
})