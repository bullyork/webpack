import JsonRPC from "./../common/jsonrpc.js"
import Config from "./../common/config.js"

/*@flow*/
var RedPacket = {
    UserAddQRUser:function(userName:string,catalog:string,phoneNumber:string,amount:number,callback?:booleanCallback) {
		JsonRPC.do(
			Config.API_SHOPPINGGUIDE,
			"RedPacket.UserAddQRUser",{
				userName:userName,
				catalog:catalog,
				phoneNumber:phoneNumber,
				amount:amount,
			},
			callback
		);
    },
    UserUpdateQRUser:function(id:string,userName:string,catalog:string,phoneNumber:string,amount:number,callback?:booleanCallback) {
		JsonRPC.do(
			Config.API_SHOPPINGGUIDE,
			"RedPacket.UserUpdateQRUser",{
				id:id,
				userName:userName,
				catalog:catalog,
				phoneNumber:phoneNumber,
				amount:amount,
			},
			callback
		);
    },
    UserDeleteQRUser:function(id:string,callback?:booleanCallback) {
		JsonRPC.do(
			Config.API_SHOPPINGGUIDE,
			"RedPacket.UserDeleteQRUser",{
				id:id,
			},
			callback
		);
    },
    UserGetQRUserList:function(catalog:string,callback?:ArrayTRPCTQRUserCallback) {
		JsonRPC.do(
			Config.API_SHOPPINGGUIDE,
			"RedPacket.UserGetQRUserList",{
				catalog:catalog,
			},
			callback
		);
    },
}

module.exports = RedPacket