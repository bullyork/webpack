import { combineReducers } from 'redux'
import {
	ADD,SAVE,LOAD_LIST,LOAD_DETAIL,STATUS_LOADING,STATUS_LOADING_SUCCESS,STATUS_LOADING_FAILURE,START_EDIT_KEYWORD,END_EDIT_KEYWORD,
	START_EDIT_CAMPAIGN,END_EDIT_CAMPAIGN,CHANGE_SORT
} from "./../actions/channel.js";
import { routerReducer } from 'react-router-redux'
const {assign} = Object;
import {moveArrayElementPosition} from "./../../../util/array.js"

import countryReducer from "./../../../reducer/country.js"
import qiniuReducer from "./../../../reducer/qiniu.js"
import dialogReducer from "./../../../reducer/dialog.js"

const channels = (state=[],action)=>{
	switch(action.type){
		case LOAD_LIST:
			switch(action.status){
				case STATUS_LOADING:
					return [];
				case STATUS_LOADING_SUCCESS:
					return [...action.channels];
			}
		case ADD:
			if(action.status === STATUS_LOADING_SUCCESS){
					return [...channels,action.channel];
			}
		case SAVE:
			if(action.status === STATUS_LOADING_SUCCESS){
				let index = state.findIndex((channel)=>{return channel.id === action.channel.id});
				if(index !== -1){
					return [
						...state.slice(0,index),
						action.channel,
						...state.slice(index+1)
					]
				}
			}
		case CHANGE_SORT:
			if(action.status === STATUS_LOADING_SUCCESS){
				if(action.flag){
					let prevIdx = state.findIndex(channel=>channel.id === action.prevKey);
					let nextIdx = state.findIndex(channel=>channel.id === action.nextKey);
					let fromIdx = state.findIndex(channel=>channel.id === action.currentKey);
					let toIndex = nextIdx;
					
					if(nextIdx === -1){
						toIndex = prevIdx;
					}else if(fromIdx < nextIdx){
						toIndex = nextIdx - 1;
					}

					return moveArrayElementPosition(state,fromIdx,toIndex);

				}else{
					return [...state]
				}
			}else if(action.status === STATUS_LOADING_FAILURE){
				return [...state]
			}
		default:
			return state;
	}
	return state;
}

const editingChannel = (state=null,action)=>{
	switch(action.type){
		case LOAD_DETAIL:
			switch(action.status){
				case STATUS_LOADING:
					return null;
				case STATUS_LOADING_SUCCESS:
					return assign({},{},action.channel);
			}
		case SAVE:
			switch(action.status){
				case STATUS_LOADING_SUCCESS:
					return assign({},state,action.channel);
			}
		default:
			return state;
	}
}

const editingKeywordIndex = (state=-1,action)=>{
	switch(action.type){
		case START_EDIT_KEYWORD:
			return action.index;
		case END_EDIT_KEYWORD:
			return -1;
		default:
			return state;
	}
}

const editingCampaignIndex = (state=-1,action)=>{
	switch(action.type){
		case START_EDIT_CAMPAIGN:
			return action.index;
		case END_EDIT_CAMPAIGN:
			return -1;
		default:
			return state;
	}
}

const isChannelSorting = (state=false,action)=>{
	switch(action.type){
		case CHANGE_SORT:
			switch(action.status){
				case STATUS_LOADING:
					return true;
				case STATUS_LOADING_FAILURE:
				case STATUS_LOADING_SUCCESS:
					return false;
			}
		default:
			return state;
	}
}

const channelReducer = combineReducers({
	editingChannel,
	channels,
	editingKeywordIndex,
	editingCampaignIndex,
	isChannelSorting,
	...countryReducer,
	qiniu:qiniuReducer,
	routing:routerReducer,
	dialog:dialogReducer,
})

export default channelReducer