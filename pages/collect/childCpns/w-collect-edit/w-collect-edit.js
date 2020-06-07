// pages/collect/childCpns/w-collect-edit/w-collect-edit.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    collectNum:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCheck:false,
    editText:'编辑'
  },
  pageLifetimes:{

  },
  methods: {
    handleEdit(){
      if(!this.data.isCheck){
        app.isCheck = true
        this.setData({
          isCheck:app.isCheck,
          editText:'完成'
        })
      }else{
        app.isCheck = false
        this.setData({
          isCheck:app.isCheck,
          editText:'编辑'
        })
      }
      console.log(app.isCheck);
      this.triggerEvent('handleEditClick',{},{})
    }
  }
})
