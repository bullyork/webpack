import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/voucher'
function noop() {}

export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'
export const CHANGE_CATALOGCODE = 'CHANGE_CATALOGCODE'

export const ADD_REBATE_VOUCHER = 'ADD_REBATE_VOUCHER'
export const ADD_CASH_VOUCHER = 'ADD_CASH_VOUCHER'
export const ADD_PRIME_TRAIL_VOUCHER = 'ADD_PRIME_TRAIL_VOUCHER'
export const CHANGE_REBATE_VOUCHER = 'CHANGE_REBATE_VOUCHER'
export const CHANGE_CASH_VOUCHER = 'CHANGE_CASH_VOUCHER'
export const CHANGE_PRIME_TRAIL_VOUCHER = 'CHANGE_PRIME_TRAIL_VOUCHER'
export const CHANGE_REGISTER_VOUCHER = 'CHANGE_REGISTER_VOUCHER'
export const GET_STATS = 'GET_STATS'
export const GET_VOUCHER_USAGE = 'GET_VOUCHER_USAGE'

export const GET_VOUCHER_TOTAL_COUNT_LOG = 'GET_VOUCHER_TOTAL_COUNT_LOG'
export const UPDATE_VOUCHER_TOTAL_COUNT = 'UPDATE_VOUCHER_TOTAL_COUNT'
export const DELETE_VOUCHER = 'DELETE_VOUCHER'
export const ADD_REGISTER_VOUCHER = 'ADD_REGISTER_VOUCHER'

export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))
export const changeCatalogcode = createSyncAction(CHANGE_CATALOGCODE, (catalogCode)=>({catalogCode}))

export const addRebateVoucher = createAction(ADD_REBATE_VOUCHER, api.addRebateVoucher)
export const addCashVoucher = createAction(ADD_CASH_VOUCHER, api.addCashVoucher)
export const addPrimeTrailVoucher = createAction(ADD_PRIME_TRAIL_VOUCHER, api.addPrimeTrailVoucher)

export const changeRebateVoucher = createSyncAction(CHANGE_REBATE_VOUCHER, (rebateData)=>({rebateData}))
export const changeCashVoucher = createSyncAction(CHANGE_CASH_VOUCHER, (cashData)=>({cashData}))
export const changePrimeTrailVoucher = createSyncAction(CHANGE_PRIME_TRAIL_VOUCHER, (primeTrialData)=>({primeTrialData}))
export const changeRegisterVoucher = createSyncAction(CHANGE_REGISTER_VOUCHER, (registerData)=>({registerData}))

export const getStats = createAction(GET_STATS, api.getStats)
export const getVoucherUsage = createAction(GET_VOUCHER_USAGE,api.getVoucherUsage)

export const getVoucherTotalCountLog = createAction(GET_VOUCHER_TOTAL_COUNT_LOG,api.getVoucherTotalCountLog)
export const updateVoucherTotalCount = createAction(UPDATE_VOUCHER_TOTAL_COUNT,api.updateVoucherTotalCount)
export const deleteVoucher = createAction(DELETE_VOUCHER,api.deleteVoucher)
export const AdminGiveVoucher = createAction(DELETE_VOUCHER,api.AdminGiveVoucher)
export const addRegisterVoucher = createAction(ADD_REGISTER_VOUCHER, api.addRegisterVoucher)
