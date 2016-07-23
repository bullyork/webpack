import { request7 } from './base/client'
import { warn, success } from '../util/antd'
function noop() {}

function addBanner(banner, cb=noop){
  return request7
   .post('/AddBanner')
   .send({banner})
   .then( msg => {
    if(msg.ok == true){
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function editBanner(banner, cb=noop){
  return request7
   .post('/EditBanner')
   .send({banner})
   .then( msg => {
    if(msg){
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function search(countryCode,cb=noop){
  return request7
   .post('/Search')
   .send({countryCode})
   .json()
   .then( popBanners => ({popBanners}))
   .catch(err => {
    console.error(err)
   })
}

export {
  addBanner,
  editBanner,
  search
}