import { createReducer } from 'redux-action'
import {
  GET_PRODUCT_CHANGE_LOGS
} from '../action/productChangeLogs'

const assign = Object.assign
const defaultState = {
  productChangeLogs:[]
}

const productChangeLogs = createReducer(defaultState, {
  [GET_PRODUCT_CHANGE_LOGS]: (payload,state) => ({productChangeLogs:payload.productChangeLogs})
})

export default productChangeLogs