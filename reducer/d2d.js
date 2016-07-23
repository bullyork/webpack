import { createReducer } from 'redux-action'

import {
  GET_DRIVERS,
  EDIT_DRIVER,
  EDIT_AREA,
  EDIT_ZIPGROUP,
  DELETE_DRIVER,
  CANCEL_EDIT,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  GET_ZIPGROUPS,
  ADD_ZIPGROUP,
  UPDATE_ZIPGROUP,
  DELETE_ZIPGROUP,
  ADD_POSTCODE,
  DELETE_POSTCODE,
  UPDATE_POSTCODE,
  GET_POSTCODES,
  FIND_DELIVERY_JOBS,
  MOVE_MARKER
} from '../action/d2d'

const defaultState = {
  editingZipGroupId: '',
  editingDriver: {},
  markerPosition: {},
  editingDriverId: '',
  dialog: {
    addDriverDialog: false,
    addZipGroupDialog: false
  },
  areas: [{
    key: 1,
    code: 'Anson,Tanjong',
    area: '070000 080000'
  },{
    key: 2,
    code: 'Queen Town',
    area: '140000 150000 160000'
  },{
    key: 3,
    code: 'Telok Blangah, Harbourfront',
    area: '090000 100000'
  }],
  targetKeys: [1, 3],
  zipGroups:[],
  postCodes:[],
  drivers:[],
  jobs:[]
}

const d2d = createReducer(defaultState, {
  [GET_DRIVERS]: (payload, state) => (payload && payload.drivers ? {drivers: state.drivers.concat(payload.drivers)} : {drivers: state.drivers}),
  [EDIT_DRIVER]: (payload, state) => ({markerPosition:{lat: payload.latitude, lng: payload.longitude},editingDriver: Object.assign({}, state.editingDriver, payload)}),
  [EDIT_ZIPGROUP]: (payload) => ({editingZipGroupId: payload}),
  [ADD_ZIPGROUP]: (layload) => ({zipGroups: []}),
  [UPDATE_ZIPGROUP]: (payload) => ({zipGroups: []}),
  [DELETE_ZIPGROUP]: (payload) => ({zipGorups: []}),
  [EDIT_AREA]: (payload) => ({editingDriverId: payload}),
  [CANCEL_EDIT]: () => ({editingDriver: {}, editingZipGroupId: ''}),
  [OPEN_DIALOG]: (dialogKey, state) => {
    if (dialogKey === 'addDriverDialog') {
      return {markerPosition:{}, dialog: Object.assign({}, state.dialog, {[dialogKey]: true})}
    } else {
      return {dialog: Object.assign({}, state.dialog, {[dialogKey]: true})}
    }
  },
  [MOVE_MARKER]: (payload) => ({markerPosition: {lat: typeof payload.lat === 'function' ? payload.lat() : parseFloat(payload.lat), lng: typeof payload.lng === 'function' ?  payload.lng() : parseFloat(payload.lng)}}),
  [CLOSE_DIALOG]: (dialogKey, state) => ({dialog: Object.assign({}, state.dialog, {[dialogKey]: false, markerPosition:{}})}),
  [GET_ZIPGROUPS]: (payload, state) => (payload && payload.zipGroups ? {zipGroups: state.zipGroups.concat(payload.zipGroups)} : {zipGroups: state.zipGroups}),
  [GET_POSTCODES]: (payload, state) => ({postCodes: Object.assign({}, state.postCodes, payload)}),
  [FIND_DELIVERY_JOBS]: (payload, state) => (payload && payload.jobs ? {jobs: payload.jobs} : {jobs: []})
})
export default d2d