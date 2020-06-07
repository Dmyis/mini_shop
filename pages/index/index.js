// pages/index/index.js
import {
  getSwiperData,
  getCatesDate,
  getFloorData
} from '../../service/home'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList:[],
    // 导航栏数据
    catesList:[],
    // 楼层数据
    floorList:[]
  },
  onLoad: function (options) {
    this._getSwiperData()
    this._getCatesData()
    this._getFloorData()   
  },
  // 获取轮播图数据
  _getSwiperData(){
    getSwiperData().then(res =>{
        res.forEach(v => {
          v.navigator_url = v.navigator_url.replace(/main/g, 'index')
        })
      this.setData({
        swiperList: res
      })
    })
  },
  // 获取导航栏数据
  _getCatesData(){
    getCatesDate().then(res=>{
      this.setData({
        catesList: res
      })
    })
  },
  // 获取楼层数据
  _getFloorData(){
    getFloorData().then(res =>{
      this.setData({
        floorList:res
      })      
    })
  },
  onShareAppMessage: function () {
    return {
      title: "快来选购吧",
      imageUrl: '/assets/image/O1CN01syHZxs1C8zCFJj97b_!!37-0-lubanu.jpg',
      path: '/pages/index/index'
    }
  }
})