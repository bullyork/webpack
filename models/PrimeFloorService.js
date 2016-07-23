import WebApi from "../common/toastwebapi.js"
import Config from "../common/config.js"

var PrimeFloorService = {
	primeList:function(){
        return WebApi.do(
            "PrimeFloor.ListCategoryFloors", 
            {},
            Config.API_PRIMEFLOOR
        ); 
    },
    AddFloorProduct:function(categoryId,product){
        return WebApi.do(
            "PrimeFloor.AddFloorProduct", 
            {
                categoryId:categoryId,
                product:product
            },
            Config.API_PRIMEFLOOR
        ); 
    },
    AddCategoryFloor:function(categoryId){
		return WebApi.do(
            "PrimeFloor.AddCategoryFloor", 
            {categoryId:categoryId},
            Config.API_PRIMEFLOOR
        ); 
    },
    GetCategoryList:function(){
        return WebApi.do(
            "PrimeFloor.ListCategorys", 
            {},
            Config.API_PRIMEFLOOR
        ); 
    },
    RemoveFloorProduct:function(productId){
        return WebApi.do(
            "PrimeFloor.RemoveFloorProduct", 
            {productId:productId},
            Config.API_PRIMEFLOOR
        ); 
    },
    UpdateFloorProduct:function(product){
        return WebApi.do(
            "PrimeFloor.UpdateFloorProduct", 
            {product:product},
            Config.API_PRIMEFLOOR
        ); 
    },
    PublishPrimeFloor:function(product){
        return WebApi.do(
            "PrimeFloor.PublishPrimeFloor", 
            {product:product},
            Config.API_PRIMEFLOOR
        ); 
    },
    RemoveCategoryFloor:function(categoryId){
        return WebApi.do(
            "PrimeFloor.RemoveCategoryFloor", 
            {categoryId:categoryId},
            Config.API_PRIMEFLOOR
        ); 
    },
    SortCategoryFloor:function(preId,nextId,sortId){
        return WebApi.do(
            "PrimeFloor.SortCategoryFloor", 
            {preId:preId,nextId:nextId,sortId:sortId},
            Config.API_PRIMEFLOOR
        ); 
    }
}

module.exports = PrimeFloorService