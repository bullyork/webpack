import {
	FIXEDBANNER_START_LOAD,FIXEDBANNER_LOADED,FIXEDBANNER_START_UPDATE,FIXEDBANNER_SAVED,FIXEDBANNER_UPDATE_CANCEL,
	FIXEDBANNER_START_SAVE,FIXEDBANNER_START_ADD,FIXEDBANNER_ADDED,FIXEDBANNER_ADD_CANCEL,CHANGE_COUNTRY,CHANGE_TYPE
} from "./../action/fixedBanner.js"
import { combineReducers } from 'redux'
import dialogReducer from "./dialog.js"
import qiniuReducer from "./qiniu.js"

const {assign} = Object;

// typeId
	// 2 prime banner
	// 4 register
	// 8 login

var editKey = (state=null,action)=>{
	switch(action.type){
		case FIXEDBANNER_START_UPDATE:
			return action.key;
		case FIXEDBANNER_UPDATE_CANCEL:
			return null;
		default:
			return state;
	}
}

var images = (state=[],action)=>{
	switch(action.type){
		case FIXEDBANNER_LOADED:
			return action.images;
		case FIXEDBANNER_SAVED:
			let index = state.findIndex(image=>image.key === action.image.key)
			if(index !== -1){
				return [
					...state.slice(0,index),
					assign({},{},action.image),
					...state.slice(index+1),
				];
			}
			return state;
		case FIXEDBANNER_ADDED:
			return [...state,assign({},{},action.image)];
		default:
			return state;
	}
}

var countryCode = (state="SG",action)=>{
	switch(action.type){
		case CHANGE_COUNTRY:
			return action.countryCode;
		default:
			return state;
	}
}


var typeId = (state=0, action)=>{
	switch(action.type){
		case CHANGE_TYPE:
			return action.typeId;
		default:
			return state;
	}
}

const fixedBannerReducer = combineReducers({
	editKey,
	images,
	countryCode,
	typeId,
	dialog:dialogReducer,
	qiniu:qiniuReducer
})

export default fixedBannerReducer

