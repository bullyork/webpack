import { request9 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function userAddPrimeMembershipDiscountUser(userName, catalog, membershipType, amount, cb=noop){
  return request9
   .post('/UserAddPrimeMembershipDiscountUser')
   .send({
    userName,
    catalog,
    membershipType,
    amount
   })
   .text()
   .then( msg => {
    if(msg){
      success('添加成功！')
      cb()
    }else{
      warn('添加失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function userUpdatePrimeMembershipDiscountUser(id, userName, status, amount, cb=noop){
  return request9
   .post('/UserUpdatePrimeMembershipDiscountUser')
   .send({
    id,
    userName,
    status,
    amount
   })
   .text()
   .then( msg => {
    if(msg){
      success('更新成功！')
      cb()
    }else{
      warn('更新失败！')
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function userDeletePrimeMembershipDiscountUser(id,cb=noop){
  return request9
    .post('/UserDeletePrimeMembershipDiscountUser')
    .send({id})
    .text()
    .then( msg => {
      if(msg){
        success('删除成功！')
        cb()
      }else{
        warn('删除失败！')
      }
     })
     .catch(err => {
      console.error(err)
     })
}

function userGetPrimeMembershipDiscountUserList(catalog, offset, limit, cb=noop){
  return request9
    .post('/UserGetPrimeMembershipDiscountUserList')
    .send({
      catalog,
      offset,
      limit
    })
    .json()
    .then( data => ({primeDiscountUserList:data}))
    .catch(err => {
      console.error(err)
     })
}
export {
  userAddPrimeMembershipDiscountUser,
  userUpdatePrimeMembershipDiscountUser,
  userDeletePrimeMembershipDiscountUser,
  userGetPrimeMembershipDiscountUserList
}

