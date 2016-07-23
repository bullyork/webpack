import { combineReducers } from 'redux'

import {
	UPLOAD_TOKEN_LOADED,BASEURL_LOADED,START_LOAD_BASEURL,START_LOAD_UPLOAD_TOKEN
} from "./../action/qiniu.js"

const qiniuUptoken = function(uptoken=null,action){
	switch(action.type){
		case UPLOAD_TOKEN_LOADED:
			return action.token;
		default:
			return uptoken;
	}
}

const qiniuBaseUrl = function(baseUrl=null,action){
	switch(action.type){
		case BASEURL_LOADED:
			return action.url;
		default:
			return baseUrl;
	}
}

const isBaseUrlLoading = function(isBaseUrlLoading=false,action){
	switch(action.type){
		case START_LOAD_BASEURL:
			return true;
		case BASEURL_LOADED:
			return false;
		default:
			return isBaseUrlLoading
	}
}


const isTokenLoading = function(isTokenLoading=false,action){
	switch(action.type){
		case START_LOAD_UPLOAD_TOKEN:
			return true;
		case UPLOAD_TOKEN_LOADED:
			return false;
		default:
			return isTokenLoading;
	}
}

const qiniuReducer = combineReducers({
	qiniuUptoken,
	qiniuBaseUrl,
	isTokenLoading,
	isBaseUrlLoading,
})

export default qiniuReducer