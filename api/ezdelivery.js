import { request8 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function addUser(username, password, catelog, userType, data, identUrl, myStationName, isGiveVoucher, itemPrice, ezbuyApportionPrice, cb=noop){
  return request8
   .post('/UserRegister')
   .send({
    username,
    password,
    catelog,
    userType,
    data,
    identUrl,
    myStationName,
    isGiveVoucher,
    itemPrice,
    ezbuyApportionPrice
  })
   .json()
   .then( msg => {
    if(msg.data){
      success('添加成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getUserByType(userType, catelog, offset, limit, cb=noop){
  return request8
   .post('/GetUserByType')
   .send({
    userType,
    catelog,
    offset,
    limit
   })
   .json()
   .then( users => ({users}))
   .catch(err => {
    console.error(err)
   })
}

function getStationsByUserId(userId, cb=noop){
  return request8
   .post('/GetStationsByUserId')
   .send({userId})
   .json()
   .then( stations => {
    cb()
    return {stations}
   })
   .catch(err => {
    console.error(err)
   })
}

function delStation(catelog, stationName, userName, cb=noop){
  return request8
   .post('/DelStation')
   .send({
    catelog,
    stationName,
    userName
   })
   .json()
   .then( msg => {
    if(msg.data){
      cb()
      success('删除成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function delUser(catelog, userName, cb=noop){
  return request8
   .post('/DelUser')
   .send({
    catelog,
    userName
   })
   .json()
   .then( msg => {
    if(msg.data){
      cb()
      success('删除成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function updateUser(userName, catelog, commission, identUrl, myStationName, isGiveVoucher, itemPrice, ezbuyApportionPrice, cb=noop){
  return request8
   .post('/UpdateUser')
   .send({
    userName,
    catelog,
    commission,
    identUrl,
    myStationName,
    isGiveVoucher,
    itemPrice,
    ezbuyApportionPrice
   })
   .json()
   .then( msg => {
    if(msg.data){
      cb()
      success('更新成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function updateStationByUser(userName, catelog, stationName, newStationName, cb=noop){
  return request8
   .post('/UpdateStationByUser')
   .send({
    userName,
    catelog,
    stationName,
    newStationName
   })
   .json()
   .then( msg => {
    if(msg.data){
      success('更新成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function updateUserPassword(userName, catelog, password, isGiveVoucher, itemPrice, ezbuyApportionPrice, cb=noop){
  return request8
   .post('/UpdateUserPassword')
   .send({
    userName,
    catelog,
    password,
    isGiveVoucher,
    itemPrice,
    ezbuyApportionPrice
   })
   .json()
   .then( msg => {
    if(msg.data){
      cb()
      success('更新成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function addStationByUser(stationName, userName, catelog, cb=noop){
  return request8
   .post('/AddStationByUser')
   .send({
    stationName,
    userName,
    catelog
  })
   .json()
   .then( msg => {
    if(msg.data){
      cb()
      success('添加成功！')
    }else{
      warn(msg.errMsg)
    }
   })
   .catch(err => {
    console.error(err)
   })
}

function getStationByStr(vague,catelog,cb=noop){
  return request8
    .post('/GetStationByStr')
    .send({
      vague,
      catelog
    })
    .text()
    .then(matchedStations =>{
      cb()
      return {matchedStations:JSON.parse(matchedStations)}
    })
    .catch(err => {
      console.error(err)
     })
}

function getSelfStations(catelog,cb=noop){
  loading('add')
  return request8
    .post('/GetSelfStations')
    .send({
      catelog
    })
    .text()
    .then(stationsInfo =>{
      loading('none')
      return {stationsInfo:JSON.parse(stationsInfo)}
    })
    .catch(err => {
      console.error(err)
     })
}

export {
  addUser,
  getUserByType,
  getStationsByUserId,
  delStation,
  delUser,
  updateUser,
  updateStationByUser,
  updateUserPassword,
  addStationByUser,
  getStationByStr,
  getSelfStations
}