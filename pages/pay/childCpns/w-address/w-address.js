// pages/pay/childCpns/w-address/w-address.js
Component({
  properties: {

  },
  data: {
    address: {},
  },
  lifetimes: {
    // 获取地址
    attached() {
      const address = wx.getStorageSync('address')
      let addressIsActive = address.find(v=>v.isActive)
      this.setData({
        address:addressIsActive,
      })
    }
  },
  methods: {

  }
})
