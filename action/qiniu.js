import QiniuService from "./../models/QiniuService.js"

export const UPLOAD_TOKEN_LOADED = "UPLOAD_TOKEN_LOADED";
export const BASEURL_LOADED = "BASEURL_LOADED";

export const START_LOAD_UPLOAD_TOKEN = "START_LOAD_UPLOAD_TOKEN";
export const START_LOAD_BASEURL = "START_LOAD_BASEURL";


export const loadUploadTokenIfNeed = function(){
	return (dispatch,getState)=>{
		let {qiniuUptoken,isTokenLoading} = getState().qiniu;
		if(qiniuUptoken === null && isTokenLoading === false){
			dispatch({type:START_LOAD_UPLOAD_TOKEN})
			return new Promise((resolve,reject)=>{
				QiniuService.uptoken({
					success(data){
						resolve(data.result.token);
						dispatch({type:UPLOAD_TOKEN_LOADED,token:data.result.token});
					},
					error(){
						reject(new Error("Can not load uptoken"));
						dispatch({type:UPLOAD_TOKEN_LOADED,token:null});
					}
				})
			})
		}
		return new Promise((resolve,reject)=>{
			resolve(qiniuUptoken)
		})
	}
}

export const loadBaseUrlIfNeed = function(){
	return (dispatch,getState)=>{
		let {qiniuBaseUrl,isBaseUrlLoading} = getState().qiniu;
		if(qiniuBaseUrl === null && isBaseUrlLoading === false){
			dispatch({type:START_LOAD_BASEURL})
			return new Promise((resolve,reject)=>{
				QiniuService.BaseUrl({
					success(data){
						resolve(data.result.result)
						dispatch({type:BASEURL_LOADED,url:data.result.result})
					},
					error(){
						reject(new Error("Can not load baseurl"));
						dispatch({type:BASEURL_LOADED,url:null});
					}
				})
			})
		}
		return new Promise((resolve,reject)=>{
			resolve(qiniuBaseUrl)
		})
	}
}