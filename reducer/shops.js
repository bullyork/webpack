import { createReducer } from 'redux-action'

import {
  GET_CURRENT_FILTER,
  GET_TRANS_BY_SEA,
  GET_UNDER_CARRIAGE,
  GET_CURRENT_TAB,
  GET_DOWNLOAD_URL
} from '../action/shops'
const assign = Object.assign

const defaultState = {
  currentTab: 'SeaCids',
  seaCids: {cids:[],total:0},
  underCarriageCids: {cids:[],total:0},
  filter: {current:1},
  downloadUrl: ''
}

const shops = createReducer(defaultState, {
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [GET_TRANS_BY_SEA]: (payload) => ({seaCids: payload.seaCids}),
  [GET_UNDER_CARRIAGE]: (payload) => ({underCarriageCids: payload.underCarriageCids}),
  [GET_CURRENT_FILTER]: (payload, state) => ({filter: assign({}, state.filter, payload.filter)}),
  [GET_DOWNLOAD_URL]: (payload) => ({downloadUrl: payload})
})

export default shops