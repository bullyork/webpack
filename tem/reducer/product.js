import { combineReducers } from 'redux'

import {
	PRODUCTS_START_LOAD,PRODUCTS_LOADED,EDIT_PRODUCT_LOADED,EDIT_PRODUCT_SAVED,
	START_LOAD_SKUINFO,SKU_INFO_LOADED,SKU_SAVED
} from "./../action/product.js"

import qiniuReducer from "./qiniu.js"

var products = function(products=[],action){
	switch(action.type){
		case PRODUCTS_LOADED:
			return [...action.products];
		case EDIT_PRODUCT_SAVED:
			if(products.length > 0){
				let index = products.findIndex((product)=>{return product.refId === action.detail.refId});	
				return [
					...products.slice(0,index),
					Object.assign({},{},action.detail),
					...products.slice(index+1),
				]
			}
		default:
			return products;
	}
}

var productForEdit = (product=null,action)=>{
	switch(action.type){
		case EDIT_PRODUCT_LOADED:
			return Object.assign({},{},action.product);
		default:
			return product;
	}
}

var skuInfo = (skuInfo=[],action)=>{
	switch(action.type){
		case START_LOAD_SKUINFO:
			return [];
		case SKU_INFO_LOADED:
			return [...action.skuInfo];
		case SKU_SAVED:
			let index = skuInfo.findIndex((oneSku)=>{return oneSku.skuId === action.sku.skuId});
			return [
				...skuInfo.slice(0,index),
				Object.assign({},{},action.sku),
				...skuInfo.slice(index+1),
			];
		default:
			return skuInfo;
	}
}

var productReducer = combineReducers({
	products,
	productForEdit,
	skuInfo,
	qiniu:qiniuReducer,
});

export default productReducer;