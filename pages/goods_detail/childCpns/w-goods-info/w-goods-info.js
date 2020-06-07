// pages/goods_detail/childCpns/w-goods-info/w-goods-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailList: {
      type: Object,
      value: {}
    },
    isCollect:{
      type:Boolean,
      value:false
    }
  },
  methods: {
    handleCollect(){
      this.triggerEvent('handleCollect',{},{})
    }
  }
})
