App({
  onLaunch: function () { },
  globalData: {
    cartList: []
  },
  addToCart(obj) {
    // 1.判断购物车是否存在
    const oldInfo = this.globalData.cartList.find(v => v.goods_id === obj.goods_id)
    // 如果已经存在
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      // 如果没有，就数量等于1，选中状态
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
    
    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  }
})
