// pages/goods_detail/index.js
import request from "../../service/network"
import {showToast} from "../../utils/asyncWxApi"

const app = getApp()
Page({

  data: {
    // 详情列表
    detailList: {},
    // 是否显示返回顶部按钮
    isShowBackTop: true,
    // 商品是否被收藏
    isCollect: false
  },
  onShow: function () {
    // 1.通过商品id获取数据
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    const { goods_id } = currentPage.options
    this._getGoodsDetail(goods_id)
  },
  // 获取详情数据
  async _getGoodsDetail(goods_id) {
    const detailList = await request({ url: '/goods/detail', data: { goods_id } })
    //  // 2.获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync('collect') || []
    //  // 3.判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === detailList.goods_id)

    this.setData({
      detailList: {
        pics: detailList.pics,
        goods_id: detailList.goods_id,
        goods_price: detailList.goods_price,
        goods_name: detailList.goods_name,
        // iphone部分手机不支持 webp图片格式
        // 最好找到后台 让他修改
        // 临时自己修改 确保后台有 1.webp => 1.jpg
        goods_introduce: detailList.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop;
    // 判断是否显示返回顶部按钮
    if (scrollTop > 300) {
      this.setData({
        isShowBackTop: false
      })
    } else {
      this.setData({
        isShowBackTop: true
      })
    }
  },
  // 加入购物车
  onAddCart() {
    // 1.获取商品列表对象
    const obj = {}
    const detail = this.data.detailList
    obj.goods_id = detail.goods_id
    obj.goods_name = detail.goods_name
    obj.goods_price = detail.goods_price
    obj.goods_img = detail.pics.length === 0 ? 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24y9t530j30i20i2glm.jpg' : detail.pics[0].pics_big

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.提示加入成功
    wx.showToast({
      title: '加入购物车成功',
    })

  },
  // 点击收藏按钮收藏商品
  async handleCollect() {
    let isCollect = false
    // 1.获取缓存中的商品收藏数组
    let collect = wx.getStorageSync('collect') || []
    // 2.判断该商品是否收藏过
    let index = collect.findIndex(v => v.goods_id === this.data.detailList.goods_id)
    // 3.当index != -1表示收藏过
    if (index !== -1) {
      // 取消收藏
      collect.splice(index, 1)
      isCollect = false
      // 弹窗
      await showToast({title:"取消收藏",icon:'success'})
    } else {
      this.data.detailList.isChecked = false
      // 没有收藏过
      collect.push(this.data.detailList)
      isCollect = true
      await showToast({title:"收藏成功",icon:'success'})
    }
    // 4.把数组存入缓存中
    wx.setStorageSync('collect', collect)
    // 5.修改收藏状态
    this.setData({
      isCollect
    })
  }
})