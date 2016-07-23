import WebApi from "../common/toastwebapi.js"
import Config from "../common/config.js"

var QuickBuyService = {
    GetFlashSalesList:function(offset,limit,area) {
        return WebApi.do(
            "FlashSales.GetFlashSalesList", 
            {offset:offset,limit:limit,area:area},
            Config.FLASH_SALES
        );
    },
    UserGetFlashSalesSettingsListAdmin:function(offset,limit) {
    	return WebApi.do(
            "FlashSales.UserGetFlashSalesSettingsListAdmin", 
            {offset:offset,limit:limit},
            Config.FLASH_SALES
        );
    },
    UserDeleteFlashSalesProduct:function(settingId,productUrl){
        return WebApi.do(
            "FlashSales.UserDeleteFlashSalesProduct", 
            {settingId:settingId,productUrl:productUrl},
            Config.FLASH_SALES
        );
    },
    UserAddFlashSalesSetting:function(setting){
    	return WebApi.do(
            "FlashSales.UserAddFlashSalesSetting", 
            {setting:setting},
            Config.FLASH_SALES
        );
    },
    UserGetFlashSalesListAdmin:function(settingId,offset,limit){
    	return WebApi.do(
            "FlashSales.UserGetFlashSalesListAdmin", 
            {
            	settingId:settingId,
            	offset:offset,
            	limit:limit
            },
            Config.FLASH_SALES
            );
    },
    UserAddFlashSalesProduct:function(settingId,product){
    	return WebApi.do(
            "FlashSales.UserAddFlashSalesProduct", 
            {
            	settingId:settingId,
            	product:product
            },
            Config.FLASH_SALES
            );
    },
    SyncFlashSales:function(settingId){
        return WebApi.do(
            "FlashSales.SyncFlashSales", 
            {
                settingId:settingId,
            },
            Config.FLASH_SALES
            );
    },
    UserUpdateFlashSalesSetting:function(setting){
        return WebApi.do(
            "FlashSales.UserUpdateFlashSalesSetting", 
            {
                setting:setting,
            },
            Config.FLASH_SALES
            );
    },
    UserDeleteFlashSalesSetting:function(settingId){
        return WebApi.do(
            "FlashSales.UserDeleteFlashSalesSetting", 
            {
                settingId:settingId,
            },
            Config.FLASH_SALES
            );
    },
    UserUpdateFlashSalesProduct:function(settingId,product){
        return WebApi.do(
            "FlashSales.UserUpdateFlashSalesProduct",
            {settingId,product},
            Config.FLASH_SALES
        )
    }
}

export default QuickBuyService
