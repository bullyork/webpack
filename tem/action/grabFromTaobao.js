import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/grabFromTaobao'

export const SEARCH_QUERY = 'SEARCH_QUERY'
export const SEARCH_SUBMIT = 'SEARCH_SUBMIT'
export const GET_DATA = 'GET_DATA'

export const searchSubmit = createAction(SEARCH_SUBMIT,api.searchSubmit)
export const getData = createSyncAction(GET_DATA, (info) => ({info}))
export const queryData = createSyncAction(SEARCH_QUERY, (data) => ({data}))