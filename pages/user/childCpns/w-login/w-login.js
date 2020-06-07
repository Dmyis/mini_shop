// pages/user/childCpns/w-login/w-login.js
const app = getApp()
Component({
  data: {
    userInfo: {}
  },
  pageLifetimes:{
    show(){
      const userInfo = wx.getStorageSync('userInfo') || []
      this.setData({
        userInfo
      })
    } 
  },
  methods: {
    getUserInfo(e) {
      const userInfo = e.detail.userInfo  
      this.setData({
        userInfo
     })
      
      wx.setStorageSync('userInfo', userInfo)
      this.triggerEvent('getUserInfo',{},{})
    }
  }
})
