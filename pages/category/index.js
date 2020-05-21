import {
  getCategoryData
} from '../../service/category'

Page({
  data: {
    // 左侧列表数据
    leftMenuList: [],
    // 右侧数据
    rightContent: [],
    // 选中的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scroll_top: 0
  },
  // 接口返回的数据
  Cates: [],
  onLoad: function (options) {
    /*
      1. 先判断本地存储中有没有旧数据
        {time:Date.now(), data:[...]}
      2. 没有旧数据，发送新请求
      3. 有旧数据，同时旧的数据没过期，旧使用旧数据
    */
    // 1.获取本地存储的数据 （小程序技术）
    const Cates = wx.getStorageSync('cates');
    // 2.判断
    if (!Cates) {
      //不存在 发送请求
      this._getCategoryData();
    } else {
      //有旧数据 定义过期时间  测试10s 改为 5分钟
      if (Date.now() - Cates.time > 1000 * 300) {
        // 如果超过时间重新发送请求
        this._getCategoryData();
      }else{
        // 可以使用旧数据
        // 把本地数据赋值给Cates
        this.Cates = Cates.data
        const leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取所有分类数据
  _getCategoryData() {
    getCategoryData().then(res => {
      this.Cates = res;

      // 把接口的数据存入本地存储中
      wx.setStorageSync('cates', { time:Date.now(), data: this.Cates })

      // 解构左侧的菜单数据
      const leftMenuList = this.Cates.map(v => v.cat_name);
      // 解构右侧菜单数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 切换分类加载数据
  handleItemTap(e) {
    // 得到传过来的下标    
    const { index } = e.currentTarget.dataset
    // 更新数据
    this.setData({
      // 重置右侧内容的滚动条距离
      scroll_top: 0,
      currentIndex: index,
      rightContent: this.Cates[index].children
    })
    console.log(this.data.rightContent);

  }

})