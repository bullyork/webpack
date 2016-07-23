import {  message } from 'antd';
import SeedService from "./../models/seedService.js"

export const CATEGORY_LIST = "CATEGORY_LIST";
export const PRODUCTS_LIST = "PRODUCTS_LIST";
export const SET_BOOSTTYPE = "SET_BOOSTTYPE";
export const SET_CATEGORY = "SET_CATEGORY";

export var getCategorylist = function(pid){
	return (dispatch)=>{
		SeedService.ListCategorys(pid).then((categorys)=>{

			dispatch(getcategory(categorys));
		})
	}
}

var getcategory = function(categorys){
	return{
		type:"CATEGORY_LIST",categorys
	}
}

export var getProductByCid = function(cid,boostType,limit,offset){
	return (dispatch)=>{
		SeedService.ListProductByCid(cid,boostType,limit,offset).then((products)=>{
			dispatch(getProducts(products));
		})
	}
}

var getProducts = function(products){
	return{
		type:"PRODUCTS_LIST",products
	}
}

export var setBoostType = function(boostType){
	return{
		type:"SET_BOOSTTYPE",boostType
	}
}

export var setCategoryId = function(categoryId){
	return{
		type:"SET_CATEGORY",categoryId
	}
}



