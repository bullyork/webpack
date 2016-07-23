import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/shops'

export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'
export const GET_CURRENT_FILTER = 'GET_CURRENT_FILTER'

export const GET_TRANS_BY_SEA = 'GET_TRANS_BY_SEA'
export const ADD_TRANS_BY_SEA = 'ADD_TRANS_BY_SEA'
export const REMOVE_TRANS_BY_SEA = 'REMOVE_TRANS_BY_SEA'

export const GET_UNDER_CARRIAGE = 'GET_UNDER_CARRIAGE'
export const ADD_UNDER_CARRIAGE = 'ADD_UNDER_CARRIAGE'
export const REMOVE_UNDER_CARRIAGE = 'REMOVE_UNDER_CARRIAGE'

export const GET_DOWNLOAD_URL = 'GET_DOWNLOAD_URL'

export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))
export const getCurrentFilter =  createSyncAction(GET_CURRENT_FILTER, (filter) => ({filter}))

export const getTransBySea = createAction(GET_TRANS_BY_SEA, (size,offset) => api.showShipMentCids(size, offset))
export const addTransBySea = createAction(ADD_TRANS_BY_SEA, (id,cb) => api.addShipMent(id,cb))
export const removeTransBySea = createAction(REMOVE_TRANS_BY_SEA, (id,cb) => api.removeShipMent(id,cb))

export const getUnderCarriage = createAction(GET_UNDER_CARRIAGE, (size,offset) => api.showUnShelveCids(size,offset))
export const addUnderCarriage = createAction(ADD_UNDER_CARRIAGE, (id,cb) => api.addUnShelve(id,cb))
export const removeUnderCarriage = createAction(REMOVE_UNDER_CARRIAGE, (id,cb) => api.removeUnShelve(id,cb))

export const getDownloadUrl = createSyncAction(GET_DOWNLOAD_URL, (str) => (str))