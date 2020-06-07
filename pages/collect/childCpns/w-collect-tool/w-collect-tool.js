// pages/collect/childCpns/w-collect-tool/w-collect-tool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCheck:{
      type:Boolean,
      type:true
    },
    collectList:{
      type:Array,
      value:[]
    },
    isCheckedAll:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击全选按钮
    isCheckedAll(){
      this.triggerEvent('isCheckedAll',{},{})
    },
    handleCancelCollect(){
      this.triggerEvent('handleCancelCollect',{},{})
    }
  }
})
