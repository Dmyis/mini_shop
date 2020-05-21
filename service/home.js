import request from './network.js'

export function getSwiperData(){
  return request({
    url:'/home/swiperdata'
  })
}

export function getCatesDate(){
  return request({
    url:'/home/catitems'
  })
}

export function getFloorData(){
  return request({
    url:'/home/floordata'
  })
}