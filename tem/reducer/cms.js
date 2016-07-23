import {
  ADD,
  EDIT_EDIT,
  UPDATE_EDIT,
  UPDATE_HTML,
  REMOVE,
  SEARCH_EDIT,
  SEARCH_EDIT_ITEM,
  SEARCH_PRO_ITEM,
  PUBLISH_ITEM,
  REVERT_ITEM,
  LIST_EDIT_ITEMS,
  LIST_PRO_ITEMS,
  CHANGE_LANG,
  CHANGE_COUNTRYCODE,
  CHANGE_CTYPE,
  CHANGE_KEY,
  CHANGE_EDIT,
  CHANGE_EDIT_CONTENT
} from './../action/cms.js'

import { combineReducers } from 'redux'

var sidebarData = (state=null,actions)=>{
  switch(actions.type) {
    case SEARCH_EDIT:
      return actions.data;
      break;
    default:
      return state;
      break;
  }
};


var activeItem = (state=null,actions)=>{
  switch(actions.type) {
    case SEARCH_EDIT_ITEM:
      return actions.data;
      break;
    default:
      return state;
      break;
  }
}
var ctype = (state="",actions)=>{
  switch(actions.type) {
    case CHANGE_CTYPE:
      return actions.ctype;
      break;
    default:
      return state;
      break;
  }
}



var lang = (state="en",actions)=>{
  switch(actions.type) {
    case CHANGE_LANG:
      return actions.lang
      break;
    default:
      return state;
      break;
  }
}
var area = (state="SG",actions)=>{
  switch(actions.type) {
    case CHANGE_COUNTRYCODE:
      return actions.countryCode
      break;
    default:
      return state;
      break;
  }
}

var cmsKey = (state="",actions)=>{
  switch(actions.type) {
    case CHANGE_KEY:
      return actions.key;
      break;
    default:
      return state;
      break;
  }
}

var isEdit = (state=false, actions)=>{
  switch(actions.type) {
    case CHANGE_EDIT:
      return actions.edit;
      break;
    default:
      return state;
      break;
  }
}

var editContent = (state=null, actions)=>{
  switch(actions.type) {
    case CHANGE_EDIT_CONTENT:
      return actions.editContent;
      break;
    default:
      return state;
      break;
  }
}

export default combineReducers({
  sidebarData,
  ctype,
  cmsKey,
  activeItem,
  isEdit,
  editContent,
  area,
  lang
});