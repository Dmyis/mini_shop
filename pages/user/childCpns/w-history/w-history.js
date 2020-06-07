// pages/user/childCpns/w-history/w-history.js
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
    // 收藏的数量
    collectNums:0
  },
  pageLifetimes:{
    show(){
      const collect = wx.getStorageSync('collect') || []
      this.setData({
        collectNums:collect.length
      })
      
    }
  },
  methods: {

  }
})
