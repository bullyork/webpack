import { request3 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function showShipMentCids(limit,offset){
  loading('add')
  return request3
   .post('/ShowShipMentCids')
   .send({limit,offset})
   .json()
   .then( seaCids => {
    loading('none')
    return {seaCids}
   })
   .catch(err => {
    console.error(err)
   })
}

function addShipMent(cid,cb = noop){
  return request3
   .post('/AddShipMent')
   .send({cid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！请检查cid')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function removeShipMent(cid,cb = noop){
  return request3
   .post('/RemoveShipMent')
   .send({cid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      console.log(cb)
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function showUnShelveCids(limit,offset){
  loading('add')
  return request3
   .post('/ShowUnShelveCids')
   .send({limit,offset})
   .json()
   .then( underCarriageCids => {
    loading('none')
    return {underCarriageCids}
   })
   .catch(err => {
    console.error(err)
   })
}

function addUnShelve(cid,cb = noop){
  return request3
   .post('/AddUnShelve')
   .send({cid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      success('添加成功！')
    }else{
      warn('添加失败！请检查cid')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function removeUnShelve(cid,cb = noop){
  return request3
   .post('/RemoveUnShelve')
   .send({cid})
   .then( msg => {
    if(msg.ok == true){
      cb()
      console.log(cb)
      success('删除成功！')
    }else{
      warn('删除失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

export {
  showShipMentCids,
  addShipMent,
  removeShipMent,
  showUnShelveCids,
  addUnShelve,
  removeUnShelve
}