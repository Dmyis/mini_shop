// pages/cart/index.js
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
    isSelectAll: true
  },
  onLoad() {
    // 1.获取购物车数据
    this.setData({
      cartList: app.globalData.cartList
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
    if (!app.globalData.cartList.length) {
      this.setData({
        isSelectAll: false
      })
    }
  },
  // 每次进入刷新一下数据
  onShow() {
    this.changeData()
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
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})