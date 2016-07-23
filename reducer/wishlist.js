import {
  CHANGE_COUNTRY_CODE,
  SETTING_DATA,
  CHANGE_STATUS,
  SELECTED_DATA,
  CHANGE_LIMIT,
  CHANGE_OFFSET,
  LIST_DATA,
  ACTIVITY_ID,
  ACTIVITY_DATA,
  CHANGE_TOTALCOUNT,
  DEFAULT_DATA,
  SEARCH_CONDITION,
  CURRENT_ACTIVITY
} from './../action/wishlist.js'

import { combineReducers } from 'redux'


var countryCode = (state="SG", actions)=>{
  switch(actions.type) {
    case CHANGE_COUNTRY_CODE:
      return actions.countryCode;
      break;

    default:
      return state;
      break;
  }
}

// i32 status;   //状态 0: 未配置  1: approved   2: reject
var status = (state=0, actions)=>{
  switch(actions.type) {
    case CHANGE_STATUS:
      return actions.status;
      break;

    default:
      return state;
      break;
  }
}

var settingData = (state={}, actions)=>{
  switch(actions.type) {
    case SETTING_DATA:
      return actions.settingData;
      break;

    default:
      return state;
      break;
  }
}


var listData = (state=[], actions)=>{
  switch(actions.type) {
    case LIST_DATA:
      return actions.listData;
      break;

    default:
      return state;
      break;
  }
}

var selectedData = (state=[], actions)=>{
  switch(actions.type) {
    case SELECTED_DATA:
      return actions.selectedData;
      break;
    default:
      return state;
      break;
  }
}

var listActivityData = (state=[], actions)=>{
  switch(actions.type) {
    case ACTIVITY_DATA:
      return actions.listActivityData;
      break;

    case DEFAULT_DATA:
    default:
      return state;
      break;
  }
}

var activityId = (state="", actions)=>{
  switch(actions.type) {
    case ACTIVITY_ID:
      return actions.activityId;
      break;
    default:
      return state;
      break;
  }
}

var limit = (state=10, actions)=>{
  switch(actions.type) {
    case CHANGE_LIMIT:
      return actions.limit;
      break;
    default:
      return state;
      break;
  }
}

var offset = (state=0, actions)=>{
  switch(actions.type) {
    case CHANGE_OFFSET:
      return actions.offset;
      break;
    default:
      return state;
      break;
  }
}

var totalCount = (state=0, actions)=>{
  switch(actions.type) {
    case CHANGE_TOTALCOUNT:
      return actions.totalCount;
      break;
    default:
      return state;
      break;
  }
}

var searchCondition = (state={}, actions)=>{
  switch(actions.type) {
    case SEARCH_CONDITION:
      return actions.searchCondition;
      break;

    default:
      return state;
      break;
  }
}


var currentActivity = (state={}, actions)=>{
  switch(actions.type) {
    case CURRENT_ACTIVITY:
      return actions.currentActivity;
      break;

    default:
      return state;
      break;
  }
}

export const wishlistReducer = {
  countryCode,
  settingData,
  selectedData,
  status,
  limit,
  offset,
  activityId,
  currentActivity,
  listData,
  totalCount,
  listActivityData,
  searchCondition
}

export default combineReducers(wishlistReducer)