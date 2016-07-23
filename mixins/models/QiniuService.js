import JsonRPC from "./../common/jsonrpc.js"
import Config from "./../common/config.js"

var QiniuJSONRPC = {
    uptoken:function(callbacks){
        JsonRPC.do(
            Config.API_URL,
            "Qiniu.GetUploadToken",
            {},
            callbacks
        );
    },
    BaseUrl:function(callbacks){
        JsonRPC.do(
            Config.API_URL,
            "Qiniu.GetBaseUrl",
            {},
            callbacks
        );
    }
}


export default QiniuJSONRPC