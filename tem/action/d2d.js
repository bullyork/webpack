import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/d2d'
function noop() {}

export const GET_DRIVERS = 'GET_DRIVERS'
export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const ADD_DRIVER = 'ADD_DRIVER'
export const UPDATE_DRIVER = 'UPDATE_DRIVER'
export const DELETE_DRIVER = 'DELETE_DRIVER'
export const EDIT_DRIVER = 'EDIT_DRIVER'
export const EDIT_ZIPGROUP = 'EDIT_ZIPGROUP'
export const EDIT_AREA = 'EDIT_AREA'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const ADD_POSTCODE = 'ADD_POSTCODE'
export const DELETE_POSTCODE = 'DELETE_POSTCODE'
export const GET_POSTCODES = 'GET_POSTCODES'
export const UPDATE_POSTCODE = 'UPDATE_POSTCODE'
export const ADD_ZIPGROUP = "ADD_ZIPGROUP"
export const GET_ZIPGROUPS = 'GET_ZIPGROUPS'
export const UPDATE_ZIPGROUP = 'UPDATE_ZIPGROUP'
export const DELETE_ZIPGROUP = 'DELETE_ZIPGROUP'
export const MOVE_MARKER = 'MOVE_MARKER'
export const FIND_DELIVERY_JOBS = 'FIND_DELIVERY_JOBS'
export const LOCK_DELIVERY_JOBS = 'LOCK_DELIVERY_JOBS'
export const UNLOCK_DELIVERY_JOBS = 'UNLOCK_DELIVERY_JOBS'

export const getDrivers = createAction(GET_DRIVERS, api.getDrivers)
export const openDialog = createSyncAction(OPEN_DIALOG, dialogKey => dialogKey)
export const closeDialog = createSyncAction(CLOSE_DIALOG, dialogKey => dialogKey)
export const addDriver = createAction(ADD_DRIVER, (driver, cb) => api.addDriver(driver, cb))
export const updateDriver = createAction(UPDATE_DRIVER, (driver, cb) => api.updateDriver(driver, cb))
export const deleteDriver = createAction(DELETE_DRIVER, (driverNo,cb) => api.deleteDriver(driverNo, cb))
export const editDriver = createSyncAction(EDIT_DRIVER, driver => driver)
export const editZipGroup = createSyncAction(EDIT_ZIPGROUP, zpID => zpID)
export const editArea = createSyncAction(EDIT_AREA, driverId => driverId)
export const cancelEdit = createSyncAction(CANCEL_EDIT)
export const addPostCode = createAction(ADD_POSTCODE, (postCode, cb) => api.addPostCode(postCode, cb))
export const deltePostCode = createAction(DELETE_POSTCODE, (pid, cb) => api.deletePostCode(pid, cb))
export const getPostCodes = createAction(GET_POSTCODES, api.getPostCodes)
export const updatePostCode = createAction(UPDATE_POSTCODE, (postCode, cb) => api.updatePostCode(postCode, cb))
export const addZipGroup = createAction(ADD_ZIPGROUP, (zipGroup, cb = noop) => api.addZipGroup(zipGroup, cb))
export const updateZipGroup = createAction(UPDATE_ZIPGROUP, (zipGroup, cb) => api.updateZipGroup(zipGroup, cb))
export const getZipGroups = createAction(GET_ZIPGROUPS, api.getZipGroups)
export const deleteZipGroup = createAction(DELETE_ZIPGROUP, (zid, cb = noop) => api.deleteZipGroup(zid, cb))
export const moveMarker = createSyncAction(MOVE_MARKER, markerPosition => markerPosition)
export const findDeliveryJobs = createAction(FIND_DELIVERY_JOBS, api.getDeliveryJobs)
export const lockDeliveryJobs = createAction(LOCK_DELIVERY_JOBS, (ids, cb) => api.updateDeliveryJobsLockStatus(ids, cb, true))
export const unlockDeliveryJobs = createAction(UNLOCK_DELIVERY_JOBS, (ids, cb) => api.updateDeliveryJobsLockStatus(ids, cb, false))


