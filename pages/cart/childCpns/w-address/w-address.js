 import {
  chooseAddress, getSetting, openSetting
}from "../../../../utils/asyncWxApi"


Component({
  properties: {

  },
  data: {
    address: '点击选择收货地址！',
    addressIsActive: false
  },
  pageLifetimes: {
    show() {
      const addressData = wx.getStorageSync('address')
      // 如果缓存中有地址就显示地址
      if (addressData.cityName) {
        const address = addressData.cityName + addressData.countyName + '...'
        this.setData({
          address,
          addressIsActive: true
        })
      }
    }
  },
  methods: {
    // 选择收货地址
    async choiceAddress() {
      try {
        // 1.获取权限状态
        const res1 = await getSetting()
        // 2.保存状态
        const scopeAddress = res1.authSetting['scope.address'];
        // 3.如果拒绝了授权
        if (scopeAddress === false) {
          // 打开权限设置界面
          await openSetting();
        }
        // 4.都需要选择地址
        const address = await chooseAddress();
        // 5.存入到缓存中
        wx.setStorageSync('address', address)
      } catch (error) {
        return
      }
    }
  }
})
