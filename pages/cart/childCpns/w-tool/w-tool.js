// pages/cart/childCpns/w-tool/w-tool.js
const app = getApp()

Component({
  properties: {
    selected: {
      type: Boolean,
      value: false
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },
  data: {
  },
  methods: {
    // 点击全选按钮
    onSelectAll(){
      // 如果没有用商品就不能点
      if(app.globalData.cartList.length == 0){
        return
      }
      this.triggerEvent('onSelectAll',{},{})
    }
  }
})
