import AdminProductService from "./../component/product/services/AdminProductService.js"

export const PRODUCTS_START_LOAD = "PRODUCTS_START_LOAD"
export const PRODUCTS_LOADED = "PRODUCTS_LOADED"
export const EDIT_PRODUCT_LOADED = "EDIT_PRODUCT_LOADED"
export const EDIT_PRODUCT_SAVED = "EDIT_PRODUCT_SAVED"

export const START_LOAD_SKUINFO = "START_LOAD_SKUINFO"
export const SKU_INFO_LOADED = "SKU_INFO_LOADED"

export const SKU_SAVED = "SKU_SAVED"

export const searchProducts = function(refId){
	return (dispatch,getState)=>{
		dispatch({type:PRODUCTS_START_LOAD})
		return AdminProductService.SearchByRefId({refId:refId,offset:0,limit:40}).then((products)=>{
			dispatch({type:PRODUCTS_LOADED,products})
		})
	}
}

export const loadEditProduct = (refId)=>{
	return (dispatch,getState)=>{
		return AdminProductService.GetDetail(refId).then((product)=>{
			dispatch({type:EDIT_PRODUCT_LOADED,product})
		})
	}
}

export const saveProduct = (detail)=>{
	return (dispatch,getState)=>{
		return AdminProductService.UpdateDetail(detail).then((flag)=>{
			if(flag){
				dispatch({type:EDIT_PRODUCT_SAVED,detail});	
			}
		})
	}
}

export const loadSkuInfo = (refId)=>{
	return (dispatch,getState)=>{
		dispatch({type:START_LOAD_SKUINFO});
		return AdminProductService.GetDetail(refId).then((product)=>{
			if(typeof product.skus !== "undefined"){
				dispatch({type:SKU_INFO_LOADED,skuInfo:product.skus})
			}
		})
	}
}

export const saveSku = (sku)=>{
	return (dispatch,getState)=>{
		return AdminProductService.UpdateSku(sku).then((flag)=>{
			if(flag){
				dispatch({type:SKU_SAVED,sku})
			}
		})
	}
}
