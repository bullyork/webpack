import WebApi from "./toastwebapi.js"
import Config from "./config.js"

var UserService = {
    Login:function(username,password) {
        return WebApi.do(
            "Login.Login", 
            {username:username,password:password},
            Config.API_LOGIN
        );
    },
    list:function(role){
        return WebApi.do(
            "Login.GetUsers", 
            {role:role},
            Config.API_LOGIN
        ); 
    },
    create:function(username,password) {
      return WebApi.do(
        "Login.CreateUser", 
            {username:username,password:password},
            Config.API_LOGIN
        )
    },
    createSystem:function(system){
        return WebApi.do(
            "Login.CreateSystem", 
            {system:system},
            Config.API_LOGIN
            )
    },
    getSystems:function(){
        return WebApi.do(
            "Login.GetSystems", 
            {},
            Config.API_LOGIN
            )
    },
    assignSystemToUser:function(username,systems){
        return WebApi.do(
            "Login.AssignSystemsToUser", 
            {username:username,systems:systems},
            Config.API_LOGIN
            )
    },
    remove:function(username){
        return WebApi.do(
            "Login.Remove", 
            {username:username},
            Config.API_LOGIN
            )
    },
    assignRole:function(username,role){
        return WebApi.do(
            "Login.AssignRole", 
            {username:username,role:role},
            Config.API_LOGIN
            )
    },
    removeRole:function(username,role){
        return WebApi.do(
            "Login.RemoveRole", 
            {username:username,role:role},
            Config.API_LOGIN
            )
    },
    setPriority:function(username,system,priority){
        return WebApi.do(
            "Login.SetPriority", 
            {username:username,system:system,priority:priority},
            Config.API_LOGIN
            )
    },
    getRoles:function(){
        return WebApi.do(
            "Login.GetRoles", 
            {},
            Config.API_LOGIN
            )
    },
    logout:function(){
        return WebApi.do(
            "Login.Logout", 
            {},
            Config.API_LOGIN
            ) 
    },
    changePassword: function(username,password,newPassword){
        return WebApi.do(
            "Login.ChangePassword", 
            {username:username,password:password,newPassword:newPassword},
            Config.API_LOGIN
            ) 
    }
}

export default UserService
