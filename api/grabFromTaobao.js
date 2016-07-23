import { request5 } from './base/client'
import { warn, success } from '../util/antd'
function noop() {}

function searchSubmit(url, page,cb=noop){
  return request5
    .post('/Submit')
    .send({
      url,
      page
    })
    .json()
    .then((msg) =>{
      console.log(msg.code)
      if(msg.code == 0){
        success('开始抓取！')
      }else{
        warn('任务已存在！')
      }
    })
    .catch(err => {
        console.error(err)
     })
}

function searchQuery(url, page,cb=noop){
  return request5
    .post('/Query')
    .send({
      url,
      page
    })
    .json()
    .catch(err => {
      console.error(err)
   })
}

export {
  searchSubmit,
  searchQuery
}