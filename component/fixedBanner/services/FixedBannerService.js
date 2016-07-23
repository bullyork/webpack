import WebApi from "./../../../common/toastwebapi.js"
import Config from "./../../../common/config.js"

var FixedBannerService = {
    Search:function(countryCode, typeId) {
        return WebApi.do(
            "FixedBanner.Search",
            {countryCode, typeId},
            Config.API_HOMEPAGE
        )
    },
    Update(image){
        return WebApi.do(
            "FixedBanner.Update",
            {image},
            Config.API_HOMEPAGE
        )
    },
    Add(image){
        return WebApi.do(
            "FixedBanner.Add",
            {image},
            Config.API_HOMEPAGE
        )
    },
    Delete(key, countryCode){
        return WebApi.do(
            "FixedBanner.Delete",
            {key, countryCode},
            Config.API_HOMEPAGE
        )
    }
}

export default FixedBannerService
