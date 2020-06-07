// pages/auth/index.js
import { login } from '../..//utils/asyncWxApi'
import request from '../../service/network'

Page({
  async handleGetUserInfo(e) {
    try {
      // 1.获取用户信息
      const { encryptedData, iv, rawData, signature } = e.detail
      // 2.获取小程序登录成功过后的code
      const { code } = await login()
      const loginParams = { encryptedData, iv, rawData, signature, code }
      // 3.发送网络请求,获取token  (需要企业号才行)  
      const res = await request({ url: "/users/wxlogin", data: loginParams, method: 'post' })
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      // 4.把token存入缓存中,同时跳转会上一个页面
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error);
    }

  }
})