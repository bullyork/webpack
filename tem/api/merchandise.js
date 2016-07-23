import { request2,request4 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}
/**
 * query{
 *   prefix,
 *   caseSensitive,
 *   limit
 * }
*/
function addProperty(name, cb=noop){
  return request2
   .post('/AddProperty')
   .send({name})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function delProperty(pid, cb=noop){
  return request2
   .post('/DelProperty')
   .send({pid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getProperties(query, cb=noop){
  return request2
   .post('/GetProperties')
   .send({query})
   .json()
   .then( properties => {
    return {properties}
   })
   .catch(err => {
    console.error(err)
   })
}

function addValue(name, cb=noop){
  return request2
   .post('/AddValue')
   .send({name})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function delValue(vid, cb=noop){
  return request2
   .post('/DelValue')
   .send({vid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getValues(query, cb=noop){
  return request2
   .post('/GetValues')
   .send({query})
   .json()
   .then( values => {
    return {values}
   })
   .catch(err => {
    console.error(err)
   })
}

function addCategory(name, parent, translation, cb=noop){
  return request2
   .post('/AddCategory')
   .send({
    name,
    parent,
    translation
   })
   .json()
   .then( category => {
    if(category){
      success('添加成功！')
    }
    cb(category)
   })
   .catch(err => {
    console.error(err)
   })
}


function delCategory(cid, cb=noop){
  return request2
   .post('/DelCategory')
   .send({cid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getCategories(query, parent, index, cb=noop){
  return request2
   .post('/GetCategories')
   .send({
      query,
      parent
    })
   .json()
   .then( categories => {
    if(parent != -1){
      return {categories, index}
    }else{
      return {preCategories: categories}
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getSubCategories(cid, index, cb=noop){
  return request2
   .post('/GetSubCategories')
   .send({cid})
   .json()
   .then( subCategories => {
    const info ={
      subCategories,
      index,
      cid
    }
    return {info}
   })
   .catch(err => {
    console.error(err)
   })
}

function updateSubCategories(cid, subCids, cb=noop){
  return request2
   .post('/UpdateSubCategories')
   .send({cid,subCids})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('更新成功！')
    }else{
      warn('更新失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function addCategoryPropertyValueSet(categoryPath, propertyValueOptions, cb=noop){
  return request2
   .post('/AddCategoryPropertyValueSet')
   .send({
    categoryPath,
    propertyValueOptions
   })
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function updateCategoryValueOptions(cid, options, cb=noop){
  return request2
   .post('/UpdateCategoryValueOptions')
   .send({
    cid,
    options
   })
   .json()
   .then( ValueOptions => {
    return {ValueOptions}
   })
   .catch(err => {
    console.error(err)
   })
}

function getCategoryValueOptions(cid, cb=noop){
  return request2
   .post('/GetCategoryValueOptions')
   .send({cid})
   .json()
   .then( ValueOptions => {
    return {ValueOptions}
   })
   .catch(err => {
    console.error(err)
   })
}

function addPropertyValue(pid, vid, cb=noop){
  return request2
   .post('/AddPropertyValue')
   .send({
    pid,
    vid
   })
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function addPropertyValueByNames(pname, vname, cb=noop){
  return request2
   .post('/AddPropertyValueByNames')
   .send({
    pname,
    vname
   })
   .json()
   .then( propertyValue => {
      cb(propertyValue)
   })
   .catch(err => {
    console.error(err)
   })
}

function getValuesForProperty(pname, cb=noop){
  return request2
   .post('/GetValuesForProperty')
   .send({pname})
   .json()
   .then( propertyValues => {
    if (propertyValues.length>0) {cb(propertyValues)}
    return {propertyValues}
   })
   .catch(err => {
    console.error(err)
   })
}

function delValuesForProperty(pid, vids, cb=noop){
  return request2
   .post('/DelValuesForProperty')
   .send({pid, vids})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function disableCategory(cid, disabled, cb=noop){
  return request2
   .post('/DisableCategory')
   .send({cid, disabled})
   .json()
   .then( category => {
    if(category.cid){
      cb()
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function renameCategory(cid,name,translation,cb=noop) {
  return request2
    .post('/UpdateCategory')
    .send({
      cid,
      name,
      translation
    })
    .json()
    .then( category =>{
      if (category) {
        success('修改成功！')
        cb()
      }else{
        warn('修改失败！')
      }})
      .catch(err => {
      console.error(err)
     })
}

function adminDisplaySetAdd(data,cb=noop){
  return request4
    .post('/AdminDisplaySetAdd')
    .send({data})
    .json()
    .then( DisplaySet =>{
      success('添加成功！')
      cb(DisplaySet)
      return {DisplaySet}
    })
    .catch(err => {
      console.error(err)
     })
}

function adminDisplaySetList(query,cb=noop) {
  return request4
    .post('/AdminDisplaySetList')
    .send({query})
    .json()
    .then(displaySetList =>({displaySetList}))
    .catch(err => {
      console.error(err)
     })
}

function adminDisplaySetGet(id,cb=noop) {
  return request4
    .post('/AdminDisplaySetGet')
    .send({id})
    .json()
    .then(DisplaySet =>{
      cb()
      return {DisplaySet}
    })
    .catch(err => {
      console.error(err)
     })
}

function adminDisplaySetUpdate(data,cb=noop) {
  return request4
    .post('/AdminDisplaySetUpdate')
    .send({data})
    .json()
    .then( DisplaySet =>{
      success('更新成功！')
    })
    .catch(err => {
      console.error(err)
     })
}

function adminDisplayCateList(parent,index,cb=noop){
  return request4
    .post('/AdminDisplayCateList')
    .send({parent})
    .json()
    .then( displayCates =>({
      index,
      parent,
      displayCates
    }))
    .catch(err => {
      console.error(err)
     })
}

function adminDisplayCateAdd(parent,name,setId,cb=noop){
  return request4
    .post('/AdminDisplayCateAdd')
    .send({parent,name,setId})
    .json()
    .then( displayCate =>{
      if(displayCate){
        cb()
        success('添加成功！')
      }else{
        warn('添加失败！')
      }
    })
    .catch(err => {
      console.error(err)
     })
}

function adminDisplayCateUpdate(id,name,disabled,cb=noop){
  return request4
    .post('/AdminDisplayCateUpdate')
    .send({id,name,disabled})
    .json()
    .then( displayCate =>{
      if(displayCate){
        cb()
        success('更新成功！')
      }else{
        warn('更新失败！')
      }
    })
    .catch(err => {
      console.error(err)
     })
}

export {
  addProperty,
  delProperty,
  getProperties,
  addValue,
  delValue,
  getValues,
  addCategory,
  delCategory,
  getCategories,
  getSubCategories,
  updateSubCategories,
  updateCategoryValueOptions,
  getCategoryValueOptions,
  delValuesForProperty,
  getValuesForProperty,
  addPropertyValueByNames,
  addPropertyValue,
  disableCategory,
  renameCategory,
  adminDisplaySetAdd,
  adminDisplaySetList,
  adminDisplaySetUpdate,
  adminDisplaySetGet,
  adminDisplayCateList,
  adminDisplayCateAdd,
  adminDisplayCateUpdate
}