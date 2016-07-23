import { createReducer } from 'redux-action'

import {
  GET_CURRENT_TAB,
  GET_PERPERTIES,
  GET_VALUES,
  GET_CATEGORIES,
  GET_SUB_CATEGORIES,
  GET_CATEGORY_VALUE_OPTIONS,
  GET_VALUES_FOR_PROPERTY,
  GET_PREFIX,
  CLEAR_PROPERTY_VALUES,
  UPDATE_CATEGORY_VALUE_OPTIONS,
  DISPLAY_SET_PNAME,
  DISPLAY_SELECT,
  ADD_TO_DISPLAYSET,
  ADMIN_DISPLAY_SET_LIST,
  ADMIN_DISPLAY_SET_GET,
  ADMIN_DISPLAY_CATE_LIST,
  TEMP_CONDITION_ADD,
  UPDATE_RULE
} from '../action/merchandise'

import {
  uniqueSort
} from '../util/kit'
const assign = Object.assign

const defaultState = {
  currentTab: 'SelectCategory',
  properties: [],
  values: [],
  categoriesForSelect: [],
  categoryTree: {
    '0': {
      selected: -1,
      all: [],
      prefixCategories: []
    },
    '1': {
      selected: -1,
      all: [],
      prefixCategories: []
    },
    '2': {
      selected: -1,
      all: [],
      prefixCategories: []
    },
    '3': {
      selected: -1,
      all: [],
      prefixCategories: []
    }
  },
  displayTree: {
    '0':{
      selected: -1,
      all: []
    },
    '1':{
      selected: -1,
      all: []
    },
    '2':{
      selected: -1,
      all: []
    },
    '3':{
      selected: -1,
      all: []
    }
  },
  ValueOptions: {fixed:[],single:[],multi:[]},
  propertyValues: [],
  prefix:{"0":"","1":"","2":"","3":""},
  preCategories: [],
  displayPname: {
    pname:'',
    oname:''
  },
  displaySelected: {
    category: '',
    property: {
      name: '',
      values: []
    },
    other: {
      name:'',
      values: {
        1:-1,
        5:-1,
        8:-1
      }
    }
  },
  DisplaySet: {
    id: -1,
    name: '',
    op: 1,
    rules: [],
    disabled: false
  },
  displaySetList: {
    total:0,
    data: []
  },
  rule:{
    op:1,
    conditions:[]
  }
}

const merchandise = createReducer(defaultState, {
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [GET_PREFIX]: (payload, state) => {
    const index = payload.index
    let  prefix = state.prefix
    prefix[index] = payload.value
    return {prefix}
  },
  [GET_PERPERTIES]: (payload) => ({properties: payload.properties}),
  [GET_VALUES]: (payload) => ({values: payload.values}),
  [GET_CATEGORIES]: (payload, state) => {
    let categoryTree = state.categoryTree
    if(!payload.hasOwnProperty('preCategories')){
      const index = payload.index
      categoryTree[index].all = uniqueSort(payload.categories)
      return {categoryTree}
    }else{
      return {preCategories: uniqueSort(payload.preCategories)}
    }
  },
  [ADMIN_DISPLAY_CATE_LIST]: (payload,state) => {
    const displayTree = state.displayTree
    const index = payload.index
    const init = {
      selected: -1,
      all: []
    }
    if(payload.parent != 0){
      displayTree[index].selected = payload.parent
      if(index<3){
        displayTree[index+1].selected = -1
        displayTree[index+1].all = uniqueSort(payload.displayCates)
      }
      if(index==0){
        displayTree[2] = init
        displayTree[3] = init
      }
      if(index ==1){
        displayTree[3] = init
      }
    }else{
      displayTree[0].all = uniqueSort(payload.displayCates)
      displayTree[1] = init
      displayTree[2] = init
      displayTree[3] = init
    }
    return {displayTree}
  },
  [GET_SUB_CATEGORIES]: (payload, state) => {
    const categoryTree = state.categoryTree
    const index = payload.info.index
    const init = {
      selected: -1,
      all: [],
      prefixCategories: []
    }
    if(index<3){
      categoryTree[index].selected = payload.info.cid
      categoryTree[index+1].selected = -1
      categoryTree[index+1].all = uniqueSort(payload.info.subCategories)
    }
    if(index==0){
      categoryTree[2] = init
      categoryTree[3] = init
    }
    if(index ==1){
      categoryTree[3] = init
    }
    return {categoryTree}
  },
  [GET_CATEGORY_VALUE_OPTIONS]: (payload) => ({ValueOptions: payload.ValueOptions}),
  [UPDATE_CATEGORY_VALUE_OPTIONS]: (payload) => ({ValueOptions: payload.ValueOptions}),
  [GET_VALUES_FOR_PROPERTY]: (payload) => ({propertyValues: payload.propertyValues}),
  [CLEAR_PROPERTY_VALUES]: (payload) => ({propertyValues: payload}),
  [DISPLAY_SET_PNAME]: (payload,state) => ({displayPname: assign({},state.displayPname,payload.displayPname)}),
  [DISPLAY_SELECT]: (payload,state) => ({displaySelected: assign({},state.displaySelected,payload.displaySelected)}),
  [ADD_TO_DISPLAYSET]: (payload,state) => ({DisplaySet: assign({},state.DisplaySet,payload.DisplaySet)}),
  [ADMIN_DISPLAY_SET_LIST]: (payload) => ({displaySetList: payload.displaySetList}),
  [ADMIN_DISPLAY_SET_GET]: (payload) => ({DisplaySet: payload.DisplaySet}),
  [UPDATE_RULE]: (payload,state) => ({rule: assign({},state.rule,payload.rule)})
})
export default merchandise