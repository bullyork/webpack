import { createReducer } from 'redux-action'
import {
  SEARCH,
  CHANGE_BANNER
} from '../action/popBanner'

const assign = Object.assign

const defaultState = {
  popBanners:[],
  newBanner: {
    name: '',
    countryCode: 'SG',
    picture: '',
    url: '',
    startDate: '',
    endDate: ''
  }
}

const popBanner = createReducer(defaultState, {
  [SEARCH]: (payload) => ({popBanners:payload.popBanners}),
  [CHANGE_BANNER]: (payload,state) => ({newBanner:assign({},state.newBanner,payload.info)})
})

export default popBanner