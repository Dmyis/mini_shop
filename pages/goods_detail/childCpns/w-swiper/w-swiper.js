// pages/goods_detail/childCpns/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailList: {
      type: Object,
      value: {}
    },
    goodsInfo:{
      type: Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    // 点击图片预览大图
    handlePrevew(e) {
      // 1.先构造预览的图片数组    
      const urls = this.properties.goodsInfo.map(v => v.pics_mid)
      // 2.当前图片的路径
      const current = e.currentTarget.dataset.url
      // 预览图片API
      wx.previewImage({
        urls,
        current
      })
    }
  }
})
