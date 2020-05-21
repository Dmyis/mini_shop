// pages/goods_detail/childCpns/w-tool/w-tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加到购物车
    handleAddCart() {
      this.triggerEvent('addcart', {}, {})
    }
  }
})
