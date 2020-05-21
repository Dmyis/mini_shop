import {
  baseURL
} from './config.js' 

export default function(options){
  // 显示加载中 效果  
  wx.showLoading({
    title: '加载中',
    mask: true,
  });

  return new Promise((resolve, reject) => {
    wx.request({
      url:baseURL + options.url,
      method: options.method || 'get' ,
      data:options.data || {},
      success: res=> {
        resolve(res.data.message)
      },
      fail: reject,
      // 关闭正在等待的图标
      complete:()=>{
        wx.hideLoading()
      }
    })
  })
}