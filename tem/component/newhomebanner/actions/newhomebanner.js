import {STATUS_START_PROCESS,STATUS_PROCESS_SUCCESS,STATUS_PROCESS_FAILURE} from "./../../../action/constant.js"

import {GetNewHomeBannerList,AddNewHomeBanner,UpdateNewHomeBanner,DeleteNewHomeBanner} from "./../services/AdminHomepageService.js"

import {OPERATION_BANNER,MARKETING_BANNER,HOT_PRODUCT_BANNER} from "./../constant.js";

import ChannelService from "./../../channel/services/ChannelService.js"

export const GET_OPERATIONBANNER_LIST = "GET_OPERATIONBANNER_LIST"

export const ADD = "ADD"

export const SAVE = "SAVE"

export const DELETE = "DELETE"

export const END_EDIT_BANNER = "END_EDIT_BANNER"

export const START_EDIT_BANNER = "START_EDIT_BANNER"


export const LOAD_COLLECTIONS = "LOAD_COLLECTIONS";
export const SAVE_HOME_COLLECTIONS = "SAVE_HOME_COLLECTIONS";

const {assign} = Object;

export const getNewHomeBannerList = (countryCode,bannerType,offset,limit)=>{
	return (dispatch,getState)=>{
		dispatch({type:GET_OPERATIONBANNER_LIST,status:STATUS_START_PROCESS});
		return GetNewHomeBannerList(countryCode,bannerType,offset,limit).then((banners)=>{
			banners = banners.map((banner)=>{
				return convertBannerIntToTime(banner)
			})
			dispatch({type:GET_OPERATIONBANNER_LIST,status:STATUS_PROCESS_SUCCESS,banners})
		},()=>{
			dispatch({type:GET_OPERATIONBANNER_LIST,status:STATUS_PROCESS_FAILURE})
		})
	}
}


export const doAdd = (banner)=>{
	return (dispatch,getState)=>{
		banner = convertBannerTimeToInt(banner);
		dispatch({type:ADD,status:STATUS_START_PROCESS});
		return AddNewHomeBanner(banner).then((id)=>{
			if(id === ""){
				dispatch({type:ADD,status:STATUS_PROCESS_FAILURE});
				return false;
			}else{
				dispatch({type:ADD,status:STATUS_PROCESS_SUCCESS,banner:assign({},convertBannerIntToTime(banner),{id})});
				return true;
			}
		},()=>{
			dispatch({type:ADD,status:STATUS_PROCESS_FAILURE});
			return false;
		})
	}
}



export const doSave = (banner)=>{
	return (dispatch,getState)=>{
		banner = convertBannerTimeToInt(banner);
		dispatch({type:SAVE,status:STATUS_START_PROCESS});
		return UpdateNewHomeBanner(banner).then((flag)=>{
			if(!flag){
				dispatch({type:SAVE,status:STATUS_PROCESS_FAILURE});
			}else{
				dispatch({type:SAVE,status:STATUS_PROCESS_SUCCESS,banner:convertBannerIntToTime(banner)});
			}
			return flag;
		},()=>{
			dispatch({type:SAVE,status:STATUS_PROCESS_FAILURE});
			return false;
		})
	}
}

export const doDelete = (id)=>{
	return (dispatch,getState)=>{
		dispatch({type:DELETE,status:STATUS_START_PROCESS});
		return DeleteNewHomeBanner(id).then((flag)=>{
			if(!flag){
				dispatch({type:DELETE,status:STATUS_PROCESS_FAILURE});
			}else{
				dispatch({type:DELETE,status:STATUS_PROCESS_SUCCESS,id});
			}
			return flag;
		},()=>{
			dispatch({type:DELETE,status:STATUS_PROCESS_FAILURE});
			return false;
		})
	}
}

export const startEditBanner = (id)=>{
	return {type:START_EDIT_BANNER,id}
}


export const endEditBanner = ()=>{
	return {type:END_EDIT_BANNER}
}

const convertBannerTimeToInt=(banner)=>{
	if(banner.bannerType !== OPERATION_BANNER){
		let start = new Date();
		let end = new Date();
		banner.startAt = start;
		end.setFullYear(end.getFullYear()+20);
		banner.endAt = end;
	}
	return assign({},banner,{
		startAt:Math.floor(banner.startAt.getTime()/1000),
		endAt:Math.floor(banner.endAt.getTime()/1000),
	})
}


const convertBannerIntToTime=(banner)=>{
	return assign({},banner,{
		startAt:new Date(banner.startAt*1000),
		endAt:new Date(banner.endAt*1000),
	})
}



export const loadCollections = ()=>{
	return (dispatch,getState)=>{
		dispatch({type:LOAD_COLLECTIONS,status:STATUS_START_PROCESS});

		let {country} = getState();

		return ChannelService.GetShowPageCollections(country).then((collections)=>{
			dispatch({type:LOAD_COLLECTIONS,status:STATUS_PROCESS_SUCCESS,collections});
		},()=>{
			dispatch({type:LOAD_COLLECTIONS,status:STATUS_PROCESS_FAILURE});
		})
	}
}

export const saveHomeCollections = (primeTrendings,unPrimeTrendings)=>{
	return (dispatch,getState)=>{
		dispatch({type:SAVE_HOME_COLLECTIONS,status:STATUS_START_PROCESS});

		let {country} = getState();

		return ChannelService.EditHomeCollections(country,primeTrendings,unPrimeTrendings).then((flag)=>{
			if(flag){
				dispatch({type:SAVE_HOME_COLLECTIONS,status:STATUS_PROCESS_SUCCESS,primeTrendings,unPrimeTrendings});
			}else{
				dispatch({type:SAVE_HOME_COLLECTIONS,status:STATUS_PROCESS_FAILURE});
			}
			return flag;
		},()=>{
			dispatch({type:SAVE_HOME_COLLECTIONS,status:STATUS_PROCESS_FAILURE});
			return false;
		})
	}
}
