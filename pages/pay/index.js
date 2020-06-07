// pages/pay/index.js
import request from '../../service/network'
import { requestPayment,showToast } from '../../utils/asyncWxApi'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    price: 0,
    address: {},
    addressAll: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取提交的商品
    const cartList = app.globalData.cartList.filter(v => v.checked)
    //  计算总价钱
    const price = cartList.reduce((t, v, i) => {
      return v.goods_price * v.count + t
    }, 0)
    //  获取地址
    const address = wx.getStorageSync('address')
    const addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({
      cartList,
      price,
      address,
      addressAll
    })

  },
  async handlePay() {
    try {
      // 1.判断是否存在token值
      const token = wx.getStorageSync('token')
      // 2.判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      // 3.创建订单
      // 3.1准备 请求头参数
      // const header = { Authorization: token }
      // 3.2准备 请求头参数
      const order_price = this.data.price
      const consignee_addr = this.data.addressAll
      let goods = []
      this.data.cartList.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.count,
        goods_price: v.goods_price
      }))

      const orderParams = { order_price, consignee_addr, goods }
      // 4.发送网络请求,得到订单编号(因为不是企业号,无法些这个功能只能写功能代码)
      let {order_number} = await request({url:'/orders/create',data:orderParams,method:"post"})
      order_number = "HMDD20190802000000000422"
      // 5.发起预支付接口(因为不是企业号,无法些这个功能只能写功能代码)
      let {pay} = await request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"post"})
      // 6.发起微信支付
      await requestPayment(pay)
      // 7.查询后台 订单状态
      const res = await request({ url: "/my/orders/chkOrder", data: { order_number }, method: "post" })
      await showToast({title:'支付成功'})
      // 8.支付成功过后,手动删除已经支付的商品
      let newCart = app.globalData.cartList;
      newCart = newCart.filter(v=>!v.checked)
      app.globalData.cartList = newCart
      app.addCartCallback();

      // 9.支付成功了 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'
      })
    } catch (error) {
      await showToast({title:'支付失败(此功能只对企业号开放)'})
      console.log(error);
      
    }

  }
})