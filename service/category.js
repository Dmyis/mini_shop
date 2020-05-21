import request from './network'

export function getCategoryData(){
  return request({
    url:'/categories'
  })
}