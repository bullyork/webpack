import JsonRPC from "./../../../common/jsonrpcToWebapi.js"
import Config from "./../../../common/config.js"

var Qiniu = {
	uptoken:function(callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.GetUploadToken",
			{},
			callbacks
		);
	},
	qnBaseUrl:function(callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.GetBaseUrl",
			{},
			callbacks
		);
	}
}

module.exports = Qiniu