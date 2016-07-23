import { request10 } from './base/client'
import loading from '../util/loading'
import { warn, success } from '../util/antd'
function noop() {}

function addVehicle(vehicle, cb = noop) {
  return request10
    .post('/AddVehicle')
    .send({vehicle})
    .then( msg => {
      if (msg === true) {
        cb()
        success('添加成功!')
      } else {
        warn('添加失败!')
      }
    })
    .catch( err => {
      console.error(err)
    })
}

function getDrivers(filter, cb = noop) {
  return request10
    .post('/FindDrivers')
    .send({filter})
    .json()
    .then(drivers => {
      cb()
      return { drivers }
    })
    .catch(err => {
      cb()
      warn('fetching failed')
    })
}

function getDeliveryJobs(filter, cb = noop) {
  return request10
    .post('/FindDeliveryJobs')
    .send({filter})
    .json()
    .then(jobs => {
      cb()
      return { jobs }
    })
    .catch(err => {
      cb()
      console.log(err)
    })
}

/*
  @depreciated
 */
function lockDeliveryJobs(jobs, cb = noop) {
  return request10
    .post('/LockDeliveryJobs')
    .send({jobs})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('锁定成功')
      } else {
        warn('锁定失败')
      }
    })
}

function updateDeliveryJobsLockStatus(ids, cb = noop, lock = true) {
  return request10
    .post('/UpdateDeliveryJobsLockStatus')
    .send({ids:ids, isLocked:lock})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('操作成功')
      } else {
        warn('操作失败')
      }
    })
}

function addDriver(driver, cb = noop) {
  return request10
    .post('/AddDriver')
    .send({driver})
    .then(msg => {
      if (msg.ok === true) {
        cb(msg)
        success('添加成功')
      } else {
        warn('添加失败')
      }
    })
}

function deleteDriver(driverNo, cb = noop) {
  return request10
    .post('/DeleteDriver')
    .send({driverNo})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('删除成功')
      } else {
        warn('删除失败')
      }
    })
}

function updateDriver(driver, cb = noop) {
  return request10
    .post('/UpdateDriver')
    .send({driver})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('修改成功')
      } else {
        warn('修改失败')
      }
    })
}

function addPostCode(postCode, cb = noop) {
  return request10
    .post('/AddPostCode')
    .send({postCode})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('添加成功')
      } else {
        warn('添加失败')
      }
    })
}

function deletePostCode(id, cb = noop) {
  return request10
    .post('/DeletePostCode')
    .send({id})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('删除成功')
      } else {
        warn('删除失败')
      }
    })
}

function updatePostCode(postCode, cb = noop) {
  return request10
    .post('/UpdatePostCode')
    .send({postCode})
    .json()
    .then(msg => {
      if (msg === true) {
        cb()
        success('修改成功')
      } else {
        warn('修改失败')
      }
    })
}

function getPostCodes(query, cb = noop) {
  return request10
    .post('/FindPostCodes')
    .send({query})
    .json()
    .then(postCodes => ({postCodes}))
    .catch(err => {
      console.error(err)
    })
}

function deleteZipGroup(id, cb = noop) {
  return request10
    .post('/DeletePostCodeGroup')
    .send({id})
    .then(msg => {
      if (msg.ok == true) {
        cb()
        success('删除成功')
      } else {
        warn('删除失败')
      }
    })
}

function getZipGroups(offset = 0, limit = 20, cb = noop) {
  return request10
    .post('/FindPostCodeGroups')
    .send({offset: offset, limit: limit})
    .json()
    .then(zipGroups => {
      cb && cb()
      return {zipGroups}
    })
    .catch(err => {
      console.error(err)
    })
}

function addZipGroup(zipGroup, cb = noop) {
  return request10
    .post('/AddPostCodeGroup')
    .send({
      name: zipGroup.name,
      postCodes: zipGroup.postCodes.split(' ')
    })
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('添加成功')
      } else {
        warn('添加失败')
      }
    })
}

function updateZipGroup(postCodeGroup, cb = noop) {
  return request10
    .post('/UpdatePostCodeGroup')
    .send({postCodeGroup})
    .then(msg => {
      if (msg.ok === true) {
        cb()
        success('更新成功')
      } else {
        warn('更新失败')
      }
    })
}



export {
  addVehicle,
  getDrivers,
  addDriver,
  deleteDriver,
  updateDriver,
  addPostCode,
  deletePostCode,
  updatePostCode,
  getPostCodes,
  getZipGroups,
  getDeliveryJobs,
  lockDeliveryJobs,
  updateDeliveryJobsLockStatus,
  addZipGroup,
  updateZipGroup,
  deleteZipGroup
}