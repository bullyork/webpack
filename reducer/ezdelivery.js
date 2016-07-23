import { createReducer } from 'redux-action'

import {
  GET_USER_BY_TYPE,
  GET_STATIONS_BY_USERID,
  GET_CURRENT_TAB,
  GET_STATION_BT_STR,
  GET_STATIONS_INFO
} from '../action/ezdelivery'

const assign = Object.assign

const defaultState = {
  currentTab: 'UserInfo',
  stations:[],
  users:[],
  matchedStations:[],
  stationsInfo:[]
}

const ezdelivery = createReducer(defaultState, {
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [GET_STATIONS_BY_USERID]:(payload) => ({stations:payload.stations}),
  [GET_USER_BY_TYPE]:(payload) => ({users:payload.users}),
  [GET_STATION_BT_STR]:(payload) => ({matchedStations:payload.matchedStations}),
  [GET_STATIONS_INFO]:(payload) => ({stationsInfo:payload.stationsInfo})
})
export default ezdelivery