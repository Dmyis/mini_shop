// pages/cart/childCpns/w-tool/w-tool.js
import { showToast } from '../../../../utils/asyncWxApi'
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
    },
    isShowEditFun: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  methods: {
    // 点击全选按钮
    onSelectAll() {
      this.triggerEvent('onSelectAll', {}, {})
    },
    // 移至收藏
    moveCollect(){
      this.triggerEvent('moveCollect',{},{})
    },
    // 删除商品
    deleteGoods() {
      this.triggerEvent('deleteGoods', {}, {})
    },
    // 点击结算功能
    async handlePay() {
      // 提交之前必须选择收货地址
      const address = wx.getStorageSync('address') || []
      const addIsActive =  address.some(v=>v.isActive)
      //必须选择地址  
      if (!addIsActive) {
        await showToast({ title: '请选择收获地址' })
        return
      }
      // 必须至少有一个商品选中      
      if (this.properties.counter <= 0){
        await showToast({ title: '请选择购买的商品' })
        return
      }
        // 跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/index',
        })
    }
  }
})
