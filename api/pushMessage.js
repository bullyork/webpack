import { request } from './base/client'
import { warn, success } from '../util/antd'
import loading from '../util/loading'

function noop() {}

function getMessageList(messageType,nickName,catalogCode,pageSize,pageIndex){
  loading('add')
  return request
    .post('/GetMessageList')
    .send({
      messageType,
      nickName,
      catalogCode,
      pageSize,
      pageIndex
    })
    .json()
    .then( messages =>{
      loading('none')
      return {messages}
    })
    .catch(err => {
      console.error(err)
     })
}

export {
  getMessageList
}