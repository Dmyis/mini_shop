// pages/address/childCpns/w-add-address/w-add-address.js
import { showToast } from "../../../../utils/asyncWxApi"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  data: {
    region: ['请选择', '', ''],
    userName: '',
    telNumber: '',
    detailInfo: '',
    label: [
      {
        id: 0,
        value: '公司',
        isActive: false
      },
      {
        id: 1,
        value: '家',
        isActive: false
      },
      {
        id: 2,
        value: '学校',
        isActive: false
      }
    ],
    // 自定义标签内容
    cusLab: '',
    // 编辑自定义标签
    editLab: '确认',
    // 是否显示自定义标签
    isShowLab: false
  },
  methods: {
    // 改变所在地区
    bindRegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
    },
    // 点击地址标签
    handleLabelClick(e) {
      // 关闭自定义标签
      const { index } = e.currentTarget.dataset
      let label = this.data.label
      if (label[index].isActive) {
        return
      }
      label.forEach(v => {
        v.isActive = false
      })
      this.setData({
        label,
        [`label[${index}].isActive`]: true,
        isShowLab: false
      })
    },
    // 点击添加地址标签
    handleAddLab() {
      const label = this.data.label
      label.forEach(v => {
        v.isActive = false
      })
      this.setData({
        label,
        isShowLab: true
      })
    },
    // 点击×号取消自定义标签
    cancelAddLab() {
      this.setData({
        isShowLab: false
      })
    },
    // 获取焦点
    handleAddLabFocus() {
      this.setData({
        editLab: '确认'
      })
    },
    //自定义标签文本框失去焦点
    handleAddLabBlur(e) {
      const { value } = e.detail
      if (!value) {
        this.setData({
          isShowLab: false
        })
      }
      this.setData({
        cusLab: value,
        editLab: '编辑'
      })
    },
    // 输入姓名
    handleIntName(e) {
      const { value } = e.detail
      this.setData({
        userName: value
      })
    },
    // 输入手机号码
    handleIntNumber(e) {
      const { value } = e.detail
      this.setData({
        telNumber: value
      })
    },
    // 输入详细地址
    handleIntDetailInfo(e) {
      const { value } = e.detail
      this.setData({
        detailInfo: value
      })
    },

    // 点击保存地址
    async handleAddAddress() {
      // 验证手机号码正则
      const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      // 判断是否输入信息
      if (!this.data.userName) {
        await showToast({ title: '请输入姓名' })
      } else if (!this.data.telNumber) {
        await showToast({ title: '请输入手机号码' })
      } else if (!myreg.test(this.data.telNumber)) {
        await showToast({ title: '手机号码格式不正确' })
      } else if (this.data.region[0] == '请选择') {
        await showToast({ title: '请选择地区' })
      } else if (!this.data.detailInfo) {
        await showToast({ title: '请输入详细地址' })
      }else{
        let getAddress = wx.getStorageSync('address') || []
        console.log(getAddress);
        
        getAddress.forEach(v=>{
          v.isActive = false
        })
        let newAddress = {
          cityName:this.data.region[1],
          countyName:this.data.region[2],
          provinceName:this.data.region[0],
          telNumber:this.data.telNumber,
          userName:this.data.userName,
          detailInfo:this.data.detailInfo,
          isActive:true,
          detail:this.data.region[0]+this.data.region[1]+this.data.region[2]+this.data.detailInfo
        }
        getAddress.push(newAddress)
        wx.setStorageSync('address', getAddress)
        await showToast({title:'添加成功'})        
        wx.navigateBack()
      }
    }
  }
})
