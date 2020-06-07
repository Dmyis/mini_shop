import {
  baseURL
} from './config.js' 

export default function(options){
  // 判断url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header = {...options}
  if(options.url.includes("/my/")){
    // 拼接header 带上token
    header['Authorization'] = wx.getStorageSync('token')
  }


  // 显示加载中 效果  
  wx.showLoading({
    title: '加载中',
    mask: true,
  });

  return new Promise((resolve, reject) => {
    wx.request({
      url:baseURL + options.url,
      header:header,
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