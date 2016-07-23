import JsonRPCAPI from "./jsonrpc.js";

export default {
	UserGetCustomerDefaultValues:function() {
		return JsonRPCAPI.do("User.UserGetCustomerDefaultValues",{})
	},
	GetCustomer:function() {
		return JsonRPCAPI.do("User.GetCustomer",{})
	},
	Login:function(nickName,password) {
		return JsonRPCAPI.do("User.Login",{nickName:nickName,password:password});
    }
}