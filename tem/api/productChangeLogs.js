import { request11 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}
function getProductChangeLogs(refid, startDate, endDate, offset, limit, cb=noop){
  return request11
   .post('/List')
   .send({
    refid,
    startDate,
    endDate,
    offset,
    limit
  })
   .json()
   .then( productChangeLogs => {
    if(productChangeLogs.length == 0){
      warn('此产品暂无改动！')
    }
    return {productChangeLogs}
   })
   .catch(err => {
    console.error(err)
   })
}
export {
  getProductChangeLogs
}