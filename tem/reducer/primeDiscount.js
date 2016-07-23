import { createReducer } from 'redux-action'

const assign = Object.assign

import {
  GET_CURRENT_TAB,
  GET_USERS
} from '../action/primeDiscount'

const defaultState = {
  currentTab: 'PrimeDiscountUserList',
  primeDiscountUserList: {
    total:0,
    users:[]
  }
}

const primeDiscount = createReducer(defaultState, {
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [GET_USERS]: (payload) => ({primeDiscountUserList: payload.primeDiscountUserList})
})
export default primeDiscount