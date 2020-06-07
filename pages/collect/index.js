// pages/collect/index.js
import { showToast } from '../../utils/asyncWxApi'

const app = getApp()
Page({
  data: {
    tabs: [{
      value: '收藏的店铺',
      isActive: true,
      id: 1
    },
    {
      value: '收藏的商品',
      isActive: false,
      id: 2
    },
    {
      value: '关注的商品',
      isActive: false,
      id: 3
    }, {
      value: '我的足迹',
      isActive: false,
      id: 4
    }
    ],
    collectList: [],
    collectNum: 0,
    // 没有收藏商品的时候显示
    isShowNullCollect: false,
    // 是否显示复选框
    isCheck: false,
    // 全选的状态
    isCheckedAll: false
  },
  onShow() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 1.获取当前小程序的页面栈-数组 最大为10
    let pages = getCurrentPages();
    // 2.数组中，索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3.得到url中的type参数
    const { type } = currentPage.options
    // 4.根据type值定位tabs的位置
    this.changeTabsItemByIndex(type - 1)
    // 5.获取数据
    this._getCollectList()
  },
  // 获取收藏商品数据
  _getCollectList() {
    let collectList = wx.getStorageSync('collect') || []
    // 判断有没有收藏商品
    if (collectList.length === 0) {
      this.setData({
        isShowNullCollect: true
      })
    } else {
      this.setData({
        isShowNullCollect: false
      })
    }
    this.setData({
      collectList,
      collectNum: collectList.length
    })
  },
  changeTabsItemByIndex(index) {
    //修改原数组
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  // 点击不同标题切换标签
  tabsItemChange(e) {
    //1.获取被点击的标题索引
    const { index } = e.detail
    this.changeTabsItemByIndex(index)
  },
  // 点击编辑显示复选框
  handleEditClick() {
    this.setData({
      isCheck: app.isCheck
    })
  },
  // 点击复选框进行反选
  checkClick(e) {
    // 1.根据下标修改某一项的选中状态:重新赋值给它
    const { index } = e.detail
    let isChecked = !this.data.collectList[index].isChecked
    this.setData({
      [`collectList[${index}].isChecked`]: isChecked
    })
    // 2.修改全选的状态
    const isCheckedAll = !this.data.collectList.find(item => !item.isChecked)
    this.setData({
      isCheckedAll
    })
  },
  // 点击全选按钮
  isCheckedAll() {
    let collectList = this.data.collectList;
    // 如果全部没有选中
    if (!this.data.isCheckedAll) {
      collectList.forEach(v => {
        v.isChecked = true
      })
      this.setData({
        collectList,
        isCheckedAll: true
      })
    } else {
      // 部分被选中
      collectList.forEach(v => {
        v.isChecked = false
      })
      this.setData({
        collectList,
        isCheckedAll: false
      })
    }
  },
  handleCancelCollect() {
    let isCollectList = this.data.collectList
    let isShowModle = isCollectList.some(v => v.isChecked)
    // 判断有没有选中商品
    if (isShowModle) {
      wx.showModal({
        cancelText: '再想想',
        cancelColor: '#eb4450',
        confirmText: '取消收藏',
        confirmColor: '#eb4450',
        content: '确定要取消收藏么？',
        success: async res => {
          if (res.confirm) {
            let collectList = this.data.collectList.filter(v => !v.isChecked)
            this.setData({ collectList })
            wx.setStorageSync('collect', collectList)
            // 弹框提示
            await showToast({ title: '取消收藏成功' })
            // 判断还有没有收藏商品
            if (collectList.length === 0) {
              this.setData({
                isShowNullCollect: true
              })
            }
          }
        }
      })
    }
  }
})