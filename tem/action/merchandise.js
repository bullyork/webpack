import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/merchandise'
function noop() {}

export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'
export const GET_PREFIX = 'GET_PREFIX'
export const CLEAR_PROPERTY_VALUES = 'CLEAR_PROPERTY_VALUES'
export const UPDATE_RULE = 'UPDATE_RULE'

export const ADD_PROPERTY = 'ADD_PROPERTY'
export const DELETE_PROPERTY = 'DELETE_PROPERTY'
export const GET_PERPERTIES = 'GET_PERPERTIES'

export const ADD_VALUE = 'ADD_VALUE'
export const DELETE_VALUE = 'DELETE_VALUE'
export const GET_VALUES = 'GET_VALUES'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_SUB_CATEGORIES = 'GET_SUB_CATEGORIES'
export const UPDATE_SUB_CATEGORIES = 'UPDATE_SUB_CATEGORIES'

export const ADD_PRPERTY_VALUE = 'ADD_PRPERTY_VALUE'
export const ADD_PROPERTY_VALUE_BY_NAMES = 'ADD_PROPERTY_VALUE_BY_NAMES'
export const GET_VALUES_FOR_PROPERTY = 'GET_VALUES_FOR_PROPERTY'
export const DEL_VALUES_FOR_PROPERTY = 'DEL_VALUES_FOR_PROPERTY'

export const UPDATE_CATEGORY_VALUE_OPTIONS = 'UPDATE_CATEGORY_VALUE_OPTIONS'
export const GET_CATEGORY_VALUE_OPTIONS = 'GET_CATEGORY_VALUE_OPTIONS'
export const DISABLE_CATEGORY = 'DISABLE_CATEGORY'
export const RENAME_CATEGORY = 'RENAME_CATEGORY'

export const DISPLAY_SET_PNAME = 'DISPLAY_SET_PNAME'
export const DISPLAY_SELECT = 'DISPLAY_SELECT'
export const ADD_TO_DISPLAYSET = 'ADD_TO_DISPLAYSET'

export const ADMIN_DISPLAY_SET_ADD = 'ADMIN_DISPLAY_SET_ADD'
export const ADMIN_DISPLAY_SET_LIST = 'ADMIN_DISPLAY_SET_LIST'
export const ADMIN_DISPLAY_SET_GET = 'ADMIN_DISPLAY_SET_GET'
export const ADMIN_DISPLAY_SET_UPDATE = 'ADMIN_DISPLAY_SET_UPDATE'

export const ADMIN_DISPLAY_CATE_UPDATE = 'ADMIN_DISPLAY_CATE_UPDATE'
export const ADMIN_DISPLAY_CATE_ADD = 'ADMIN_DISPLAY_CATE_ADD'
export const ADMIN_DISPLAY_CATE_LIST = 'ADMIN_DISPLAY_CATE_LIST'

export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))
export const getPrefix =  createSyncAction(GET_PREFIX, (value, index) =>({value,index}))

export const addProperty = createAction(ADD_PROPERTY, (name) => api.addProperty(name))
export const delProperty = createAction(DELETE_PROPERTY, (pid, cb=noop) => api.delProperty(pid,cb))
export const getProperties = createAction(GET_PERPERTIES, (query) => api.getProperties(query))

export const addValue = createAction(ADD_VALUE, (name) => api.addValue(name))
export const delValue = createAction(DELETE_VALUE, (pid, cb=noop) => api.delValue(pid, cb))
export const getValues = createAction(GET_VALUES, (query) => api.getValues(query))

export const addCategory = createAction(ADD_CATEGORY, (name, parent, translation,cb=noop) => api.addCategory(name, parent, translation, cb))
export const delCategory = createAction(DELETE_CATEGORY, (cid,cb=noop) => api.delCategory(cid,cb))
export const getCategories = createAction(GET_CATEGORIES, (query, parent, index) => api.getCategories(query, parent, index))
export const getSubCategories = createAction(GET_SUB_CATEGORIES, (cid, index) => api.getSubCategories(cid, index))
export const updateSubCategories = createAction(UPDATE_SUB_CATEGORIES, (cid,subCids,cb=noop) => api.updateSubCategories(cid,subCids,cb))

export const addPropertyValue = createAction(ADD_PRPERTY_VALUE, (pid, vid) => api.addPropertyValue(pid,vid))
export const addPropertyValueByNames = createAction(ADD_PROPERTY_VALUE_BY_NAMES, (pname, vname, cb=noop) => api.addPropertyValueByNames(pname,vname,cb))
export const getValuesForProperty = createAction(GET_VALUES_FOR_PROPERTY, (pname,cb=noop) => api.getValuesForProperty(pname,cb))
export const delValuesForProperty = createAction(DEL_VALUES_FOR_PROPERTY, (pid, vids) => api.delValuesForProperty(pid, vids))


export const updateCategoryValueOptions = createAction(UPDATE_CATEGORY_VALUE_OPTIONS, (cid, ValueOptions, cb=noop) => api.updateCategoryValueOptions(cid, ValueOptions,cb))
export const getCategoryValueOptions = createAction(GET_CATEGORY_VALUE_OPTIONS, (cid, cb=noop) => api.getCategoryValueOptions(cid, cb))
export const clearPropertyValues = createSyncAction(CLEAR_PROPERTY_VALUES,(info) => (info))
export const disableCategory = createAction(DISABLE_CATEGORY, (cid, disabled, cb=noop)=>api.disableCategory(cid, disabled, cb))
export const renameCategory = createAction(RENAME_CATEGORY, api.renameCategory)

export const displaySetName = createSyncAction(DISPLAY_SET_PNAME, (displayPname) => ({displayPname}))
export const displaySelect = createSyncAction(DISPLAY_SELECT, (displaySelected) => ({displaySelected}))
export const addToDisplaySet = createSyncAction(ADD_TO_DISPLAYSET, (DisplaySet) => ({DisplaySet}))

export const adminDisplaySetAdd = createAction(ADMIN_DISPLAY_SET_ADD, api.adminDisplaySetAdd)
export const adminDisplaySetList = createAction(ADMIN_DISPLAY_SET_LIST, api.adminDisplaySetList)
export const adminDisplaySetGet = createAction(ADMIN_DISPLAY_SET_GET, api.adminDisplaySetGet)
export const adminDisplaySetUpdate = createAction(ADMIN_DISPLAY_SET_UPDATE, api.adminDisplaySetUpdate)

export const adminDisplayCateList = createAction(ADMIN_DISPLAY_CATE_LIST, api.adminDisplayCateList)
export const adminDisplayCateUpdate = createAction(ADMIN_DISPLAY_SET_UPDATE, api.adminDisplayCateUpdate)
export const adminDisplayCateAdd = createAction(ADMIN_DISPLAY_SET_ADD, api.adminDisplayCateAdd)

export const updateRule = createSyncAction(UPDATE_RULE, (rule) => ({rule}))
