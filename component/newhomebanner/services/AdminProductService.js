import { request } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function getBannerListHistory(countryCode,cb = noop){
  loading('add')
  return request
   .post('/GetBannerListHistory')
   .send({countryCode})
   .json()
   .then( banners=> {
    loading('none')
    cb(banners)
    return { banners }
   })
   .catch(err => {
      console.error(err)
   })
}

function addBannerList(banners,countryCode,cb = noop){
  return request
   .post('/AddBannerList')
   .send({banners,countryCode})
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('添加失败!')
     }else{
      success('添加成功!')
      cb()
     }
   })
   .catch(err => {
      console.error(err)
   })
}

function deleteBannerList(id, cb = noop){
  return request
   .post('/DeleteBannerList')
   .send({id})
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('删除失败!')
     }else{
      success('删除成功!')
      cb()
     }
   })
   .catch(err => {
      console.error(err)
   })
}

function getCategoryCollectionsHistory(cb = noop){
  loading('add')
  return request
   .post('/GetCategoryCollectionsHistory')
   .json()
   .then(collections => {
    loading('none')
    cb(collections)
    return { collections }
   })
   .catch(err => {
      console.error(err)
   })
}

function addCategoryCollections(collections, cb = noop){
  return request
   .post('/AddCategoryCollections')
   .send({collections})
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('添加失败!')
     }else{
      cb()
      success('添加成功!')
     }
   })
   .catch(err => {
      console.error(err)
   })
}

function deleteCategoryCollections(id, cb = noop){
  return request
   .post('/DeleteCategoryCollections')
   .send({id})
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('删除失败!')
     }else{
      cb()
      success('删除成功!')
     }
   })
   .catch(err => {
      console.error(err)
   })
}

function getPromotionProductsHistory(topCategoryId,cb = noop){
  loading('add')
  return request
   .post('/GetPromotionProductsHistory')
   .send({topCategoryId})
   .json()
   .then(products => {
    loading('none')
    cb(products)
    return { products }
   })
   .catch(err => {
      console.error(err)
   })
}

function addPromotionProducts(products, cb = noop){
  return request
   .post('/AddPromotionProducts')
   .send(products)
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('添加失败!')
     }else{
      cb()
      success('添加成功!')
     }
   })
   .catch(err => {
      console.error(err)
   })
}

function deletePromotionProducts(id, cb = noop){
  return request
   .post('/DeletePromotionProducts')
   .send({id})
   .json()
   .then(body => {
     if(body.message!= 'ok'){
      warn('删除失败!')
     }else{
      cb()
      success('删除成功!')
     }
   })
   .catch(err => {
      console.error(err)
   })
}

//此方法页面直接调用，获取上传相关参数
function getToken(cb = noop){
  return request
   .post('/GetUploadInfo')
   .json()
   .then(info => {
     return cb(info)
   })
   .catch(err => {
     console.error(err)
   })
}
export {
  getBannerListHistory,
  addBannerList,
  deleteBannerList,
  getCategoryCollectionsHistory,
  addCategoryCollections,
  deleteCategoryCollections,
  getPromotionProductsHistory,
  addPromotionProducts,
  deletePromotionProducts,
  getToken
}

