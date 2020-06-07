// pages/order/index.js
import request from '../../service/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      value: '全部订单',
      isActive: true,
      id: 1
    },
    {
      value: '待支付',
      isActive: false,
      id: 2
    },
    {
      value: '已支付',
      isActive: false,
      id: 3
    }, {
      value: '退款/退货',
      isActive: false,
      id: 4
    }
    ],
    // 订单列表
    orders: []
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
    this.getOrders(type)
  },
  // 4.根据type获取订单列表
  async getOrders(type) {
    const res = await request({ url: '/my/orders/all', data: { type } })
    this.setData({
      orders: res.orders.map(v=>({
        ...v,
        create_time_cn:(new Date(v.create_time*1000).toLocaleString())
      }))
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
    // 2.每点击一次重新发送请求获取数据
    this.getOrders(index + 1)
  }
})