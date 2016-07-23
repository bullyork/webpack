import WebApi from "./../../../common/toastwebapi.js"
import Config from "./../../../common/config.js"

var AdminProductService = {
    SearchByRefId:function(query) {
        return WebApi.do(
            "AdminProduct.SearchByRefId",
            {query},
            Config.API_ADMIN_PRODUCT
        );
    },
    GetDetail(refId){
        return WebApi.do(
            "AdminProduct.GetDetail",
            {refId},
            Config.API_ADMIN_PRODUCT
        )
    },
    UpdateDetail(detail){
        return WebApi.do(
            "AdminProduct.UpdateDetail",
            {detail},
            Config.API_ADMIN_PRODUCT
        )
    },
    UpdateSku(sku){
        return WebApi.do(
            "AdminProduct.UpdateSku",
            {sku},
            Config.API_ADMIN_PRODUCT
        )
    }
}

export default AdminProductService
