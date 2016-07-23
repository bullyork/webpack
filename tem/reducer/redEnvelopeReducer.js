import {LOGOUT,SET_LIST,SET_COUNTRY} from "../action/redEnvelopeAction.js";
import { combineReducers } from 'redux'

const initialState = {
  OriginCode:"SG",
  isLogin:false,
  usersObj:[]
}

function tLogin(state=initialState,action){
  switch(action.type){
    case LOGOUT:
      let newUsersObj = [
        ...state.usersObj,
        action.text,
      ]
      return Object.assign({},state, {
        isLogin: true,
        usersObj:newUsersObj,
      })
      case SET_LIST:
        return Object.assign({},state, {
          isLogin: true,
          usersObj:action.text,
        })
      case SET_COUNTRY:
      return Object.assign({},state, {
          OriginCode:action.text,
        })
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  tLogin
})

export default rootReducer