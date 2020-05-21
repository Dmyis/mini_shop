// pages/goods_list/index.js
import request from '../../service/network'

Page({
  data: {
    // tab切换标题
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    //商品数据
    goodsList: [],
    priceGoodsList: [],
    // 商品总页数
    totalPages: 1,
    // tabs是否吸顶
    isTabShow: true,
    // 搜索框的高度
    w_search_input_height: 0,
    // 是否显示返回顶部按钮
    isShowBackTopIcon: true
  },
  //接口需要的参数
  queryParams: {
    query: "",
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this._getGoodsList();
    // 获取搜索框的高度
    wx.createSelectorQuery().selectAll('#WSI').boundingClientRect(rect => {
      this.setData({
        w_search_input_height: rect[0].height
      })
    }).exec()

  },
  // 点击不同标题切换标签
  tabsItemChange(e) {
    //获取被点击的标题索引
    const { index } = e.detail
    //修改原数组
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 赋值到data中
    this.setData({
      tabs
    })
    // 判断是否选择价格排序    还需要改进
    if (index === 2) {
      let priceSort = this.data.goodsList.sort(this.compare("goods_price"))
      this.setData({
        priceGoodsList: priceSort
      })
    }
  },
  // 比较价格降序函数
  compare(property) {
    return (obj1, obj2)=> {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value2 - value1;     // 降序
    }
  },
  //获取商品列表
  async _getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.queryParams
    });
    // 获取总条数
    const total = res.total
    // 计算总页数
    this.totalPages = Math.ceil(total / this.queryParams.pagesize)
    this.setData({
      // 拼接新的数据
      goodsList: [...this.data.goodsList, ...res.goods]
    });
    //数据加载完成关闭下拉刷新框
    wx.stopPullDownRefresh()
  },
  //上拉加载更多
  onReachBottom() {
    // 判断还有没有下一页数据
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '已经到底了...',
      })
    } else {
      this.queryParams.pagenum++;
      this._getGoodsList()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      // 重置商品
      goodsList: []
    })
    // 重置页数
    this.queryParams.pagenum = 1;
    // 重新发送请求
    this._getGoodsList()
  },
  // 监听滚动
  onPageScroll(options) {
    let scrollTop = options.scrollTop;
    // 判断是否吸顶
    if (scrollTop > this.data.w_search_input_height) {
      let isTabShow = false
      this.setData({
        isTabShow
      })
    } else {
      this.setData({
        isTabShow: true
      })
    }
    // 判断是否显示返回顶部按钮
    if (scrollTop > 300) {
      this.setData({
        isShowBackTopIcon: false
      })
    } else {
      this.setData({
        isShowBackTopIcon: true
      })
    }
  }
})