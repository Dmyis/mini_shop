// pages/search/index.js
import request from '../../service/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isShow_x: false,
    inpValue: '',
    isNull:true
  },
  TimeId: -1,
  // 监听输入框值得改变
  handleInput(e) {
    // 1.获取输入框的值
    const { value } = e.detail
    // 2.检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isNull:true,
        isShow_x: false
      })
      // 值不合法
      return;
    }
    // 3.发送请求回去数据(定时器就行防抖)
    this.setData({ isShow_x: true })
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qSearch(value)
    }, 1000)
  },
  // 根据文本框请求数据
  async qSearch(query) {
    let res = await request({ url: '/goods/qsearch', data: { query } })
    console.log(!res.length)
    console.log(res);
    
    // 如果没有搜索到商品
    if(!res.length){
      this.setData({
        isNull:false
      })
    }
  
    this.setData({
      goods: res
    })
  },
  // 文本框获取焦点
  handleFocus(e) {
    let { value } = e.detail
    if (value) {
      this.setData({ isShow_x: true })
    }
  },
  // 文本框失去焦点
  handleBlur() {
    this.setData({ isShow_x: false })
  },
  // 点击x清空文本框
  empty_int() {
    this.setData({
      inpValue: '',
      isShow_x: false,
      goods: []
    })
  },
  // 点击取消返回上一层
  handleCancel(){
    wx.navigateBack({
      delta:1
    })
  }
})