import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/popBanner'
function noop() {}

export const ADD_BANNER = 'ADD_BANNER'
export const EDIT_BANNER = 'EDIT_BANNER'
export const SEARCH = 'SEARCH'
export const CHANGE_BANNER = 'CHANGE_BANNER' 

export const search = createAction(SEARCH, api.search)
export const editBanner = createAction(EDIT_BANNER, api.editBanner)
export const addBanner = createAction(ADD_BANNER, api.addBanner)
export const changeBanner = createSyncAction(CHANGE_BANNER, (info)=>({info}))