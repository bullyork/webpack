import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
const {assign} = Object;

import countryReducer from "../../../reducer/country.js"
import qiniuReducer from "../../../reducer/qiniu.js"
import dialogReducer from "../../../reducer/dialog.js"

import {GET_OPERATIONBANNER_LIST,ADD,SAVE,DELETE,START_EDIT_BANNER,END_EDIT_BANNER,LOAD_COLLECTIONS,SAVE_HOME_COLLECTIONS} from "../actions/newhomebanner.js";
import {STATUS_START_PROCESS,STATUS_PROCESS_SUCCESS,STATUS_PROCESS_FAILURE} from "./../../../action/constant.js";


const banners = (state=[],action)=>{
	switch(action.type){
		case GET_OPERATIONBANNER_LIST:
			switch(action.status){
				case STATUS_PROCESS_SUCCESS:
					return [...action.banners];
				case STATUS_START_PROCESS:
				case STATUS_PROCESS_FAILURE:
					return [];
			}
		case ADD:
			switch(action.status){
				case STATUS_PROCESS_SUCCESS:
					return [action.banner,...state];
			}
		case SAVE:
			switch(action.status){
				case STATUS_PROCESS_SUCCESS:
					let index = state.findIndex((banner)=>{return banner.id === action.banner.id});
					if(index !== -1){
						return [
							...state.slice(0,index),
							action.banner,
							...state.slice(index+1)
						]
					}
			}

		case DELETE:
			switch(action.status){
				case STATUS_PROCESS_SUCCESS:
					let index = state.findIndex((banner)=>{return banner.id === action.id});
					if(index !== -1){
						return [
							...state.slice(0,index),
							...state.slice(index+1)
						]
					}
			}
		default:
			return state;
	}
}

const editingBannerId = (state="",action)=>{
	switch(action.type){
		case START_EDIT_BANNER:
			return action.id;
		case END_EDIT_BANNER:
			return "";
		default:
			return state;
	}
}


const collections = (state=[],action)=>{
	switch(action.type){
		case LOAD_COLLECTIONS:
			switch(action.status){
				case STATUS_PROCESS_FAILURE:
				case STATUS_START_PROCESS:
					return [];
				case STATUS_PROCESS_SUCCESS:
					return [...action.collections];
			}
		case SAVE_HOME_COLLECTIONS:
			switch(action.status){
				case STATUS_PROCESS_SUCCESS:
					return [
						{isPrime:true,showTrending:action.primeTrendings},
						{isPrime:false,showTrending:action.unPrimeTrendings},
					];
			}
		default:
			return state;
	}
}


const reducer = combineReducers({
	dialog:dialogReducer,
	qiniu:qiniuReducer,
	...countryReducer,
	routing:routerReducer,
	banners,
	editingBannerId,
	collections,
})

export default reducer