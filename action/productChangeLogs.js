import { createAction } from 'redux-action'
import * as api from '../api/productChangeLogs'
function noop() {}

export const GET_PRODUCT_CHANGE_LOGS = 'GET_PRODUCT_CHANGE_LOGS'

export const getProductChangeLogs = createAction(GET_PRODUCT_CHANGE_LOGS, api.getProductChangeLogs)