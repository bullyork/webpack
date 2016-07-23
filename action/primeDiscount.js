import { createAction, createSyncAction } from 'redux-action'
import * as api from '../api/primeDiscount'
function noop() {}

export const GET_CURRENT_TAB = 'GET_CURRENT_TAB'
export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const getCurrentTab = createSyncAction(GET_CURRENT_TAB, (info) => (info))
export const getUsers = createAction(GET_USERS, api.userGetPrimeMembershipDiscountUserList)
export const addUser = createAction(ADD_USER, api.userAddPrimeMembershipDiscountUser)
export const deleteUser = createAction(DELETE_USER, api.userDeletePrimeMembershipDiscountUser)
export const updateUser = createAction(UPDATE_USER, api.userUpdatePrimeMembershipDiscountUser)