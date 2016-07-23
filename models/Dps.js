import JsonRPC from "./../common/jsonrpc.js"
import Config from "./../common/config.js"

var Dps = {
    GetProductDetail: function(productUrl, callbacks) {
        JsonRPC.do(
            Config.API_DPS_URL,
            "Product.GetPrimeProductDetail", {
                productUrl:productUrl,
				purchaseSource:"",
            },
            callbacks
        );
    }
}

module.exports = Dps
