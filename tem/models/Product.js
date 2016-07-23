import JsonRPC from "../common/jsonrpcToWebapi.js"
import Config from "../common/config.js"

var Product = {
	list:function(collectionId,offset,limit,callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.GetProducts",
			{collectionId:collectionId,offset:offset,limit:limit},
			callbacks
		);
	},
	doSort:function(prevId,nextId,sortId,callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.ProductDoSort",
			{prevId:prevId,nextId:nextId,sortId:sortId},
			callbacks
		);
	},
	update:function(productId, name, url, price, picture,isRemove,weight,isPrime,transportType,callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.UpdateProduct",
			{productId:productId, name:name, url:url, price:price, picture:picture,isRemove:isRemove,weight:weight,isPrime,transportType},
			callbacks
		);
	},
	delete:function(productId,callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.DeleteProduct",
			{productId:productId},
			callbacks
		);
	},
	add:function(product,callbacks){
		JsonRPC.do(
			Config.API_URL,
			"FeatureCollection.AddProduct",
			{product:product},
			callbacks
		);
	}
}

module.exports = Product