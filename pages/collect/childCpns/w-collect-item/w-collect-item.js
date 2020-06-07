// pages/collect/w-collect-item/w-collect-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    collectList:{
      type:Object,
      value:{}
    },
    index:{
      type:Number
    },
    // 是否显示复选框
    isCheck:{
      type:Boolean,
      value:false
    }
  },
  data: {
  },
  methods: {
    checkClick(){
      let index = this.properties.index
      this.triggerEvent('checkClick',{index},{})
    }
  }
})
