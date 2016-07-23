import { createReducer } from 'redux-action'

import { 
  GET_CATEGORY,
  GET_BANNER,
  GET_FLOOR,
  GET_POP_STATUS,
  CHANGE_COUNTRY,
  GET_CURRENT_TAB
 } from '../action/hpArrange.js'
const assign = Object.assign

const defaultState = {
  currentTab: 'banner',
  banner: [{id: '',banners: [],removed: ''}],
  collection: [{id: '',collections: [{
    campaign: {picture:'', linkAddress: ''},
    thirdLevelCategories: []
  }],removed: ''}],
  product: [],
  countryCode:"SG",
  popStatus: {
    info:'',
    inputList: [],
    index: 0,
    visible: false,
    dataTimePicker:false,
    k:'',
    imgType:'',
    action:'',
    upload: true,
    sort: 0
  }
}

const homepageArrange = createReducer(defaultState, {
  [GET_POP_STATUS]: (payload, state) => ({popStatus: assign({}, state.popStatus, payload.popStatus)}),
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [GET_CATEGORY]: (payload) => ({
    product: payload.products 
  }),
  [GET_BANNER]: (payload) => ({
    banner: payload.banners
  }),
  [GET_FLOOR]: (payload) => ({
    collection: payload.collections
  }),
  [CHANGE_COUNTRY]:countryCode=>countryCode
})

export default homepageArrange