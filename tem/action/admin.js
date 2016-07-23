import UserService from "./../models/User.js"

export const GET_MANAGEER = "GET_MANAGEER"
export const GET_ROLES = "GET_ROLES"

export var getManager = function(role){
	return (dispatch)=>{
		UserService.list(role).then((userList)=>{
			console.info(userList.data);
			dispatch(getManagerAction(userList.data));
		})
	}
}

export var getManagerAction = function(userList){
	return {type:GET_MANAGEER,userList}
}


export var deleteManager = function(name){
	return (dispatch)=>{
		UserService.remove(name).then((userList)=>{
			UserService.list("user").then((userList)=>{
				dispatch(getManagerAction(userList.data));
			})
		})
	}
}

export var deleteManagerAction = function(userList){
	return {type:GET_MANAGEER,userList}
}

export var getRoles = function(name){
	return (dispatch)=>{
		UserService.getRoles(name).then((roles)=>{
			dispatch(getRolesAction(roles.data));
		})
	}
}

export var getRolesAction = function(roles){
	return {type:GET_ROLES,roles}
}

export var setRoles = function(name,role){
	return (dispatch)=>{
		UserService.assignRole(name,role).then((roles)=>{
			console.info(roles);
			//dispatch(setRolesAction(roles.data));
		})
	}
}

export var setRolesAction = function(role) {
	return {}
}
