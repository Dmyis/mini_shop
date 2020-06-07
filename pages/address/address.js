// pages/address/address.js
import {
  chooseAddress, getSetting, openSetting
} from "../../utils/asyncWxApi"
Page({
  data: {
    address: [],
  },
  onShow() {
    this.getAddress()
  },
  async getAddress() {
    var address = wx.getStorageSync('address') 
    console.log(Boolean(address));
    
     this.setData({
       address
     })
  },
  handleAddAddress(){
    wx.navigateTo({
      url: './childCpns/w-add-address/w-add-address',
    })
  }
})