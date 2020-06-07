import {
  chooseAddress, getSetting, openSetting
} from "../../../../utils/asyncWxApi"

const app = getApp()

var action = '';
var moveY = 200;
var animation = animation = wx.createAnimation({
  transformOrigin: "50% 50%",
  duration: 400,
  timingFunction: "ease",
  delay: 0
})
animation.translateY(moveY + 'vh').step();

Component({
  properties: {

  },
  data: {
    address: '点击选择收货地址！',
    // 地址列表
    addressList: [],
    // 是否选择了地址
    addressIsActive: false,
    edit: '编辑',
    // 是否显示删除和加入收藏夹按钮
    isShowEditFun: false,
    show: false,
    backgroundVisible: false,
    animation: animation,
    bg: 'background',
  },
  pageLifetimes: {
    show() {
      // 获取收货地址
      const addressList = wx.getStorageSync('address') || []
      // 如果缓存中有地址就显示地址
      let isActiveAddress = addressList.find(v => v.isActive)
      if (isActiveAddress) {
        this.setData({
          address: isActiveAddress.detail,
          addressIsActive: true
        })
      } else{
        this.setData({
          addressIsActive:false,
          address:'点击选择收货地址！'
        })
      }

      // 重置编辑
      app.isShowEditFun = false
      this.setData({
        addressList,
        isShowEditFun: app.isShowEditFun,
        edit: "编辑"
      })
    }
  },
  methods: {
    // 选择收货地址
    async choiceAddress() {
      try {
        // 1.获取权限状态
        const res1 = await getSetting()
        // 2.保存状态
        const scopeAddress = res1.authSetting['scope.address'];
        // 3.如果拒绝了授权
        if (scopeAddress === false) {
          // 打开权限设置界面
          await openSetting();
        }
        // 4.都需要选择地址
        const address = await chooseAddress();
        // 5.存入到缓存中
        wx.setStorageSync('address', address)
      } catch (error) {
        return
      }
    },
    // 点击编辑切换功能
    handleEdit() {
      if (!this.data.isShowEditFun) {
        app.isShowEditFun = true
        this.setData({
          isShowEditFun: app.isShowEditFun,
          edit: "完成"
        })
      } else {
        app.isShowEditFun = false
        this.setData({
          isShowEditFun: app.isShowEditFun,
          edit: "编辑"
        })
      }

      this.triggerEvent('handleEditClick', {}, {})
    },
    //移动按钮点击事件
    showModel() {
      moveY = 0;
      action = 'show';
      animationEvents(this, moveY, action);
    },
    //隐藏弹窗浮层
    hidden(e) {
      moveY = 200;
      action = 'hide';
      animationEvents(this, moveY, action);
    },
    // 选中一个地址
    handleCheckAddress(e) {
      const { index } = e.currentTarget.dataset
      let addressList = this.data.addressList
      addressList.forEach(v => {
        v.isActive = false
      })
      this.setData({
        addressList,
        [`addressList[${index}].isActive`]: true,
        address: addressList[index].detail,
        addressIsActive: true
      })
      wx.setStorageSync('address', addressList)
      // 关闭模态框
      this.hidden()
    },
    // 弹出框添加一个地址
    handleAddAddress() {
      wx.navigateTo({
        url: '/pages/address/childCpns/w-add-address/w-add-address',
      })
      setTimeout(() => {
        this.hidden();
      }, 500)
    }
  }
})

//动画事件 底部的弹出，背景层通过切换不同的class，添加一个transition的效果，使之有一个渐变的感觉。
function animationEvents(that, moveY, action) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  if (action == 'show') {
    that.setData({
      animation: that.animation.export(),
      show: true,
      backgroundVisible: true,
      bg: 'bg',
      disableScroll: 'disableScroll'
    });
  } else if (action == 'hide') {
    that.setData({
      animation: that.animation.export(),
      // show: false,
      backgroundVisible: false,
      bg: 'background',
      disableScroll: ''
    });
  }
}
