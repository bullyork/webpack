import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/ezdelivery'
function noop() {}

export const ADD_USER = 'ADD_USER'
export const GET_USER_BY_TYPE = 'GET_USER_BY_TYPE'
export const GET_STATIONS_BY_USERID = 'GET_STATIONS_BY_USERID'
export const DELSTAION = 'DELSTAION'
export const DELUSER = 'DELUSER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_STATION_BY_USER = 'UPDATE_STATION_BY_USER'
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
export const ADD_STATION_BY_USER = 'ADD_STATION_BY_USER'
export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'
export const GET_STATION_BT_STR = 'GET_STATION_BT_STR'
export const GET_STATIONS_INFO = 'GET_STATIONS_INFO'

export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))

export const addUser = createAction(ADD_USER, api.addUser)
export const getUserByType = createAction(GET_USER_BY_TYPE, api.getUserByType)
export const getStationsByUserId = createAction(GET_STATIONS_BY_USERID, api.getStationsByUserId)
export const delStation = createAction(DELSTAION, api.delStation)
export const delUser = createAction(DELUSER, api.delUser)
export const updateUser = createAction(UPDATE_USER, api.updateUser)
export const updateStationByUser = createAction(UPDATE_STATION_BY_USER, api.updateStationByUser)
export const updateUserPassword = createAction(UPDATE_USER_PASSWORD, api.updateUserPassword)
export const addStationByUser = createAction(ADD_STATION_BY_USER, api.addStationByUser)
export const getStationByStr = createAction(GET_STATION_BT_STR, api.getStationByStr)
export const getStationsInfo = createAction(GET_STATIONS_INFO, api.getSelfStations)