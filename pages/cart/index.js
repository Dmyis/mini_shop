// pages/cart/index.js
import {showToast} from '../../utils/asyncWxApi'
const app = getApp()

Page({
  data: {
    // 购物车商品列表
    cartList: [],
    // 总数量
    totalCounter: 0,
    // 总价格
    totalPrice: 0,
    // 是否全部选中
    isSelectAll: true,
    isShowEditFun: false
  },
  onLoad() {
    // 1.获取购物车数据
    this.setData({
      cartList: app.globalData.cartList,
    })

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态:重新赋值给它
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  // 每次进入刷新一下数据
  onShow() {
    this.changeData()
    // 隐藏编辑功能
    if (this.data.isShowEditFun) {
      this.setData({
        isShowEditFun: false
      })
    }
  },
  // 点击全选按钮
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      // 全部不选择
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      // 更新数据
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      // 全部选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      // 更新数据
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData()
  },
  // 更新总价格和数量
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    // 循环数组
    for (let item of this.data.cartList) {
      // 如果是选中的
      if (item.checked) {
        // 数量加1
        counter++
        // 价格
        totalPrice += item.goods_price * item.count
      }
    }
    // 显示加载
    wx.showLoading({
      mask: true,
    });
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
    // 修改完过后关闭加载
    wx.hideLoading()
  },
  // 点击编辑按钮
  handleEditClick() {
    this.setData({
      isShowEditFun: app.isShowEditFun
    })
  },
  // 移动到收藏
  moveCollect() {
    let cartList = this.data.cartList;
    const isShowModle = cartList.some(v => v.checked)
    let num = 0
    cartList.forEach(v => { if (v.checked) num += 1 })

    // 判断有选中的商品才弹框
    if (isShowModle) {
      wx.showModal({
        confirmText: "移至收藏",
        confirmColor: '#eb4450',
        content: `确定将已选中的${num}件商品移至收藏?`,
        success: async res => {
          if (res.confirm) {
            let collect = wx.getStorageSync('collect') || []
            // 得到被选中的商品
            const isCheck = cartList.filter(v=>v.checked)
            // 如果收藏有该商品，就覆盖
            isCheck.forEach((v,index)=>{
              collect.forEach(i=>{
                if(v.goods_id===i.goods_id){
                  // 如果有相同的就把旧的过滤出去
                 collect = collect.filter(s=>s.goods_id!==i.goods_id)
                }
              })
            })
            // 循环添加到收藏中
            isCheck.forEach(v=>{
              let pics = []
              let pics_mid = {pics_mid:v.goods_img}
              pics.push(pics_mid)
              v.pics = pics
              collect.push(v)
            })
            // 留下没有被选中的商品
            cartList = cartList.filter(v=>!v.checked)
            this.setData({
              cartList
            })
            app.globalData.cartList = cartList
            wx.setStorageSync('collect', collect)
            // 弹窗提示
            await showToast({title:'已成功移至收藏',icon:'success'})
          }
        }
      })
    }
  },
  // 删除商品
  deleteGoods() {
    let GoodsLength = 0
    this.data.cartList.forEach(v => v.checked ? GoodsLength++ : '')
    if (!GoodsLength) {
      return
    }
    // 弹窗
    wx.showModal({
      content: `确认将已选中的${GoodsLength}件商品删除吗`,
      success(res) {
        if (res.confirm) {
          // 删除已选择的商品
          let cartList = app.globalData.cartList
          cartList = cartList.filter(v => !v.checked)
          app.globalData.cartList = cartList
          // 更新数据
          app.addCartCallback()
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "我的购物车快来看看",
      path: '/pages/cart/index'
    }
  }
})