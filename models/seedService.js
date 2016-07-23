import WebApi from "../common/toastwebapi.js"
import Config from "../common/config.js"

var SeedService = {
    ListCategorys:function(pid) {
        return WebApi.do(
            "BoostAdmin.ListCategorys", 
            {pid:pid},
            Config.API_SEED
        );
    },
    ListProductByCid:function(cid,boostType,limit,offset){
    	return WebApi.do(
            "BoostAdmin.ListProductByCid", 
            {
            	cid:cid,
            	boostType:boostType,
            	limit:limit,
            	offset:offset
            },
            Config.API_SEED
        );
    },
    DeleteBoostProduct:function(id){
    	return WebApi.do(
            "BoostAdmin.DeleteBoostProduct", 
            {
            	id:id
            },
            Config.API_SEED
        );
    },
    ReSortBoostProduct:function(cid){
    	return WebApi.do(
            "BoostAdmin.ReSortBoostProduct", 
            {
            	cid:cid
            },
            Config.API_SEED
        );
    },
    RemoveAllBoostProductByCid:function(cid,boostType){
    	return WebApi.do(
            "BoostAdmin.RemoveAllBoostProductByCid", 
            {
            	cid:cid,
            	boostType:boostType
            },
            Config.API_SEED
        );
    },
    AddBoostProduct:function(productUrl,cid){
    	return WebApi.do(
            "BoostAdmin.AddBoostProduct", 
            {
            	productUrl:productUrl,
            	cid:cid
            },
            Config.API_SEED
        );
    }
}

export default SeedService
