import WebApi from "../../../common/toastwebapi.js"
import Config from "../../../common/config.js"

var BulmaPageService = {
    GetIndex:function(offset, limit, platForm,countryCode) {
    	return WebApi.do(
    		"BulmaPage.GetIndex", 
    		{offset:offset,limit:limit,platForm:platForm,countryCode},
    		Config.API_BULMA
    	);
    },
    RemovePage:function(slug,platform,countryCode){
    	return WebApi.do(
    		"BulmaPage.RemovePage",
    		{slug,platform,countryCode},
    		Config.API_BULMA
    	)
    },
    GetPageDetailBySlug:function(slug,platform,countryCode){
        return WebApi.do(
            "BulmaPage.GetPageDetailBySlug",
            {slug,platform,countryCode},
            Config.API_BULMA
        )
    },
    PublishPage:function(slug,platform,countryCode){
        return WebApi.do(
            "BulmaPage.PublishPage",
            {slug,platform,countryCode},
            Config.API_BULMA
        )
    },
    UpdatePage:function(page){
        return WebApi.do(
            "BulmaPage.UpdatePage",
            {page},
            Config.API_BULMA
        )
    },
    NewPage:function(page){
        return WebApi.do(
            "BulmaPage.NewPage",
            {page},
            Config.API_BULMA
        )
    },
    ParsePage:function(slug){
        return WebApi.do(
            "BulmaPage.ParsePage",
            {slug},
            Config.API_BULMA
        )
    },
    PageReTitle:function(title,slug,platform,countryCode){
        return WebApi.do(
            "BulmaPage.PageReTitle",
            {title,slug,platform,countryCode},
            Config.API_BULMA
        )
    }
}

export default BulmaPageService
