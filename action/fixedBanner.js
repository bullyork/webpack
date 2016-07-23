import FixedBannerService from "./../component/fixedBanner/services/FixedBannerService.js"

export const FIXEDBANNER_START_LOAD = "FIXEDBANNER_START_LOAD";
export const FIXEDBANNER_LOADED = "FIXEDBANNER_LOADED";

export const FIXEDBANNER_START_UPDATE = "FIXEDBANNER_START_UPDATE";
export const FIXEDBANNER_SAVED = "FIXEDBANNER_SAVED";
export const FIXEDBANNER_UPDATE_CANCEL = "FIXEDBANNER_UPDATE_CANCEL";

export const FIXEDBANNER_START_SAVE = "FIXEDBANNER_START_SAVE";

export const FIXEDBANNER_START_ADD = "FIXEDBANNER_START_ADD";
export const FIXEDBANNER_ADDED = "FIXEDBANNER_ADDED";
export const FIXEDBANNER_ADD_CANCEL = "FIXEDBANNER_ADD_CANCEL";

export const CHANGE_COUNTRY = "CHANGE_COUNTRY"

export const CHANGE_TYPE = "CHANGE_TYPE"

export function searchFixedBanner(key){
	return (dispatch,getState)=>{
		let {countryCode, typeId} = getState();
		dispatch({type:FIXEDBANNER_START_LOAD,key})

		return FixedBannerService.Search(countryCode, typeId).then((images)=>{
			dispatch({type:FIXEDBANNER_LOADED,images})
		})
	}
}

export function startUpdate(key){
	return {type:FIXEDBANNER_START_UPDATE,key};
}


export function doUpdate(image){
	return (dispatch,getState)=>{
		const {typeId} = getState();

		image.typeId = typeId;
		image.order = image.order ? image.order : 0;

		dispatch({type:FIXEDBANNER_START_SAVE,image});
		return FixedBannerService.Update(image).then((flag)=>{
			if(flag){
				dispatch({type:FIXEDBANNER_SAVED,image});
			}
			return flag;
		})
	}
}

export function cancelUpdate(){
	return {type:FIXEDBANNER_UPDATE_CANCEL};
}


export function startAdd(){
	return {type:FIXEDBANNER_START_ADD};
}


export function doAdd(image){
	return (dispatch,getState)=>{
		const {typeId} = getState();
		var order = 0;//暂时不做排序功能

		image.typeId = typeId;
		image.order = order;

		dispatch({type:FIXEDBANNER_START_SAVE,image});
		return FixedBannerService.Add(image).then((flag)=>{
			if(flag){
				dispatch({type:FIXEDBANNER_ADDED,image});
			}
			return flag;
		})
	}
}

export function doDelete(key, cb){
	return (dispatch, getState)=>{
		const {countryCode} = getState();

		var ok = confirm('Delete key: ' + key);
		if(!ok){
			return;
		}

		return FixedBannerService.Delete(key, countryCode).then((data)=>{
			if(data){
				dispatch(searchFixedBanner())
			}
			if(cb){
				cb(data);
			}
		})
	}
}

export function cancelAdd(){
	return {type:FIXEDBANNER_ADD_CANCEL};
}

export function changeCountry(countryCode){
	return (dispatch,getState)=>{
		dispatch({type:CHANGE_COUNTRY,countryCode})
		return dispatch(searchFixedBanner());
	}
}

export function changeType(typeId){
	return (dispatch,getState)=>{
		dispatch({type:CHANGE_TYPE,typeId})
		return dispatch(searchFixedBanner());
	}
}
