import { createReducer } from 'redux-action'

const assign = Object.assign

import {
  GET_CURRENT_TAB,
  CHANGE_CATALOGCODE,
  CHANGE_REBATE_VOUCHER,
  CHANGE_CASH_VOUCHER,
  CHANGE_PRIME_TRAIL_VOUCHER,
  CHANGE_REGISTER_VOUCHER,
  GET_STATS,
  GET_VOUCHER_USAGE,
  GET_VOUCHER_TOTAL_COUNT_LOG
} from '../action/voucher'

const defaultState = {
  currentTab: 'Generate',
  catalogCode: 'SG',
  rebateData: {baseForm:{}},
  cashData: {baseForm:{},mininumAmount:0},
  primeTrialData: {baseForm:{}},
  registerData: {baseForm:{},mininumAmount:0},
  rebateDataList: [],
  cashDataList: [],
  primeTrialDataList: [],
  registerDataList: [],
  voucherUsageList: [],
  voucherTotalCountLogs: []
}

const voucher = createReducer(defaultState, {
  [GET_CURRENT_TAB]: (payload) => ({currentTab: payload}),
  [CHANGE_CATALOGCODE]: (payload) => ({catalogCode: payload.catalogCode}),
  [CHANGE_REBATE_VOUCHER]: (payload,state) => ({rebateData:assign({},state.rebateData,payload.rebateData)}),
  [CHANGE_CASH_VOUCHER]: (payload,state) => ({cashData:assign({},state.cashData,payload.cashData)}),
  [CHANGE_PRIME_TRAIL_VOUCHER]:(payload,state) => ({primeTrialData:assign({},state.primeTrialData,payload.primeTrialData)}),
  [CHANGE_REGISTER_VOUCHER]:(payload,state) => ({registerData:assign({},state.registerData,payload.registerData)}),
  [GET_STATS]:(payload,state) => {
    switch (payload.voucherCategory) {
      case 0:
        return {
          rebateDataList:payload.statResults
        }
      case 1:
        return {
          cashDataList:payload.statResults
        }
      case 2:
        return {
          primeTrialDataList:payload.statResults
        }
      default:
        break;
    }
  },
  [GET_VOUCHER_USAGE]:(payload) =>({voucherUsageList:payload.voucherUsageList}),
  [GET_VOUCHER_TOTAL_COUNT_LOG]:(payload)=>({voucherTotalCountLogs:payload.voucherTotalCountLogs})
})
export default voucher