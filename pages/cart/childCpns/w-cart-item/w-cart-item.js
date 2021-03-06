// pages/cart/childCpns/w-cart-item/w-cart-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },
  data: {
    // 减的样式
    isChangeCount1: true,
    isChangeCount2:false
  },
  methods: {
    onCheckClick(e) {
      // 1.查找到对应的商品
      const goods = app.globalData.cartList.find(v => v.goods_id === this.properties.cartList.goods_id)
      goods.checked = !goods.checked
      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;
      // 3.回调
      app.changeGoodsState(index, goods)
    },
    // 点击减
    decrement() {
      this.setData({
        isChangeCount2:false
      })
      // 2.查找到对应的商品
      const goods = app.globalData.cartList.find(v => v.goods_id === this.properties.cartList.goods_id)
      if (goods.count === 1) {
        this.setData({
          isChangeCount1: true
        })
        return
      }
      goods.count > 1 ? goods.count -= 1 : goods.count = 1
      app.addCartCallback();
    },
    // 点击加
    iecrement() {
      this.setData({
        isChangeCount1:false
      })
      // 2.查找到对应的商品
      const goods = app.globalData.cartList.find(v => v.goods_id === this.properties.cartList.goods_id)
      if (goods.count >= 20) {
        this.setData({
          isChangeCount2: true
        })
        return
      }
      goods.count < 20 ? goods.count += 1 : ''
      app.addCartCallback();
    }
  }
})
