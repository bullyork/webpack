import { request6 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function addRebateVoucher(data,cb = noop){
  return request6
   .post('/AddRebateVoucher')
   .send({data})
   .then( msg=> {
    if(msg.ok == true){
      success('添加成功！')
    }
   })
   .catch(err => {
      console.error(err)
   })
}

function addCashVoucher(data,cb = noop){
  return request6
   .post('/AddCashVoucher')
   .send({data})
   .then( msg=> {
    if(msg.ok == true){
      success('添加成功！')
    }
   })
   .catch(err => {
      console.error(err)
   })
}

function addPrimeTrailVoucher(data,cb = noop){
  return request6
   .post('/AddPrimeTrialVoucher')
   .send({data})
   .then( msg=> {
    if(msg.ok == true){
      success('添加成功！')
    }
   })
   .catch(err => {
      console.error(err)
   })
}

function getVoucherUsage(id,limit,offset,cb = noop){
  return request6
   .post('/GetVoucherUsage')
   .send({
      id,
      limit,
      offset
    })
   .json()
   .then( voucherUsageList=>({voucherUsageList}))
   .catch(err => {
      console.error(err)
   })
}

function getStats(voucherCategory, limit, offset, catalogCode, cb=noop){
  return request6
   .post('/GetStats')
   .send({
      voucherCategory,
      limit,
      offset,
      catalogCode
    })
   .json()
   .then( statResults=> ({
    voucherCategory,
    statResults
   }))
   .catch(err => {
      console.error(err)
   })
}

function updateVoucherTotalCount(id, delta, cb=noop){
  return request6
   .post('/UpdateVoucherTotalCount')
   .send({id,delta})
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

function getVoucherTotalCountLog(id,cb=noop){
  return request6
   .post('/GetVoucherTotalCountLog')
   .send({id})
   .json()
   .then( voucherTotalCountLogs => {
    cb()
    return {voucherTotalCountLogs}
   })
   .catch(err => {
    console.error(err)
   })
}

function deleteVoucher(id, cb=noop){
  return request6
   .post('/DeleteVoucher')
   .send({id})
   .then( msg => {
    if(msg.ok == true){
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


function AdminGiveVoucher(nickname, catalogCode, voucherTypeId, cb = noop){
  return request6
  .post('/AdminGiveVoucher')
  .send({nickname, catalogCode, voucherTypeId})
  .text()
  .then(msg=>{
    if(msg.length <= 2){
      success(`送券成功能${nickname} 券ID: ${voucherTypeId}`);
      cb();
    }else{
      alert(`送券不成功,错误信息! ${msg}`);
    }
  })
}

function addRegisterVoucher(data,cb = noop){
  return request6
   .post('/AddRegisterVoucher')
   .send({data})
   .text()
   .then( msg=> {
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


export {
  addRebateVoucher,
  addCashVoucher,
  addPrimeTrailVoucher,
  getStats,
  getVoucherUsage,
  updateVoucherTotalCount,
  getVoucherTotalCountLog,
  deleteVoucher,
  AdminGiveVoucher,
  addRegisterVoucher
}
