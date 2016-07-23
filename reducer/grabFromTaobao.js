import { createReducer } from 'redux-action'

import { 
  SEARCH_QUERY,
  GET_DATA
 } from '../action/grabFromTaobao'
const assign = Object.assign

const defaultState = {
  data: '',
  info: false
}

const grabFromTaobao = createReducer(defaultState, {
  [SEARCH_QUERY]: (payload) => ({data: payload.data}),
  [GET_DATA]: (payload) => ({info:payload.info})
})

export default grabFromTaobao