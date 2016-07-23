import QuickBuyService from "./../models/quickBuyService.js";
import ScrollApp from "./../common/scrollLoadMore.js";
import {  message } from 'antd';
import {STATUS_START_PROCESS,STATUS_PROCESS_SUCCESS,STATUS_PROCESS_FAILURE} from "./constant.js";


export const QUICKBUY_LIST = "QUICKBUY_LIST";
export const QUICKBUY_PRODUCT_DIALOG = "QUICKBUY_PRODUCT_DIALOG";
export const QUICKBUY_PRODUCT_INPUT = "QUICKBUY_PRODUCT_INPUT";
export const QUICKBUY_PRODUCT_ADD = "QUICKBUY_PRODUCT_ADD";
export const QUICKBUY_FlashSales_LIST = "QUICKBUY_FlashSales_LIST";

export const START_EDIT_PRODUCT = "START_EDIT_PRODUCT";
export const END_EDIT_PRODUCT = "END_EDIT_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export var getlist = function(settingId,offset,limit){
	return (dispatch)=>{
		QuickBuyService.UserGetFlashSalesListAdmin(settingId,offset,limit).then((flashSales)=>{
			ScrollApp.resetLoadState();
			dispatch(getflashSalesAction(flashSales));
		})
	}
}

export var clearList = function(){
	return (dispatch)=>{
		dispatch(getflashSalesAction([]));
	}
}

export var getflashSalesAction = function(flashSales){
	return {type:QUICKBUY_LIST,flashSales}
}

export var setProductDialgo = function(visible){
	return {
		type:QUICKBUY_PRODUCT_DIALOG,visible
	}
}

export var setInputvalue = function(keys,values){
	return {
		type:QUICKBUY_PRODUCT_INPUT,keys,values
	}
}

export var addProduct = function (settingId,product) {
	return (dispatch)=>{
		QuickBuyService.UserAddFlashSalesProduct(settingId,product).then((data)=>{
			message.success(data.message,3);
			if(data.message === "ok"){
				location.reload();
			}
		})
	}
}
var addProductAction = function(product) {
	return {
		type:QUICKBUY_PRODUCT_ADD,product
	}
}

export var getFlashSalesList = function(offset,limit) {
	return (dispatch)=>{
		QuickBuyService.UserGetFlashSalesSettingsListAdmin(0,100).then((FlashSalesList)=>{
			dispatch(getFlashSalesListAction(FlashSalesList));
		})
	}
}

var getFlashSalesListAction = function(flashSalesList) {
	return {
		type:QUICKBUY_FlashSales_LIST,flashSalesList
	}
}

export const startEditProduct = function(index){
	return {type:START_EDIT_PRODUCT,index}
}


export const endEditProduct = function(){
	return {type:END_EDIT_PRODUCT}
}

export const doSave = (settingId,product)=>{
	return (dispatch,getState)=>{
		dispatch({type:EDIT_PRODUCT,status:STATUS_START_PROCESS})
		return QuickBuyService.UserUpdateFlashSalesProduct(settingId,product).then((data)=>{
			dispatch({type:EDIT_PRODUCT,status:STATUS_PROCESS_SUCCESS,product:product});
			return true;
		}).catch((e)=>{
			dispatch({type:EDIT_PRODUCT,status:STATUS_PROCESS_FAILURE});
			return false;
		})
	}
}

