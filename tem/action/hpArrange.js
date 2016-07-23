import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/hpArrange'

function noop() {}

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const GET_CATEGORY = 'GET_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

export const ADD_BANNER = 'ADD_BANNER'
export const GET_BANNER = 'GET_BANNER'
export const DELETE_BANNER = 'DELETE_BANNER'

export const ADD_FLOOR = 'ADD_FLOOR'
export const GET_FLOOR = 'GET_FLOOR'
export const DELETE_FLOOR = 'DELETE_FLOOR'

export const GET_POP_STATUS = 'GET_POP_STATUS'

export const CHANGE_COUNTRY = "CHANGE_COUNTRY"

export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'

export const getPopStatus = createSyncAction(GET_POP_STATUS, (popStatus) => ({popStatus}))
export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))


export const addCategory = createAction(ADD_CATEGORY, api.addPromotionProducts)
export const getCategory = createAction(GET_CATEGORY, (id,cb) => api.getPromotionProductsHistory(id,cb))
export const deleteCategory = createAction(DELETE_CATEGORY, api.deletePromotionProducts)

export const addBanner = createAction(ADD_BANNER, api.addBannerList)
export const getBanner = createAction(GET_BANNER, api.getBannerListHistory)
export const deleteBanner = createAction(DELETE_BANNER, api.deleteBannerList)

export const addFloor = createAction(ADD_FLOOR, api.addCategoryCollections)
export const getFloor = createAction(GET_FLOOR, api.getCategoryCollectionsHistory)
export const deleteFloor = createAction(DELETE_FLOOR, api.deleteCategoryCollections)

export const changeCountry = createAction(CHANGE_COUNTRY,(countryCode)=>({countryCode}))