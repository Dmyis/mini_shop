// pages/goods_detail/index.js
import request from "../../service/network"

const app = getApp()
Page({

  data: {
    // 详情列表
    detailList: {},
    // 是否显示返回顶部按钮
    isShowBackTop: true
  },
  onLoad: function (options) {
    // 通过商品id获取数据
    const { goods_id } = options
    this._getGoodsDetail(goods_id)
  },
  // 获取详情数据
  async _getGoodsDetail(goods_id) {
    const detailList = await request({ url: '/goods/detail', data: { goods_id } })
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
      }
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
    obj.goods_img = detail.pics[0].pics_big

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.提示加入成功
    wx.showToast({
      title: '加入购物车成功',
    })

  }
})