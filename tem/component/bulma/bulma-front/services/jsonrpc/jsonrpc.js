import {getJSONRPCApiAddress,getArea, getAPIAddress} from "./../../helpers/api.js";
import $ from "jquery"

var _id = 0;
var JsonRPCReal = {
    do: function(method, params) {
        return new Promise(function(resolve, reject) {
            _id++;
            var ajaxObject = {
                url: getJSONRPCApiAddress(),
                type: "POST",
                headers: {
                    "Content-Type": "text/plain;charset:utf-8",
                    "Platform": "Web",
                    "Area": getArea(),
                    "Version": "beta",
                },
                data: JSON.stringify({
                    "id": _id,
                    method: method,
                    params: params
                }),
                success: function(data) {
                    if(typeof data.error === "undefined" && ( typeof data["errors"] === "undefined" || data["errors"].length > 0 )){
                        resolve(data.result);
                    }else{
                        reject(data);
                    }
                },
                error: function(e) {
                    reject();
                },
                timeout: 30000,
                crossDomain: true,
                xhrFields:{
                    withCredentials:true
                }
            };
            try{
                $.ajax(ajaxObject);
            }catch(e){
                reject(e);
            }
        });
    }
}


export var WebApi = {
    do:function(URL, method, params){
        return new Promise(function(resolve, reject) {
            var ajaxObject = {
                url: URL + `/api/${method.replace(/\./g,'/')}`,
                type: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                dataType:"text",
                data: JSON.stringify(params),
                success: function(data) {
                    if(!data || typeof data === "undefined"){
                        reject(data);
                    }else{
                        resolve(data);
                    }
                },
                error: function(e) {
                    reject();
                },
                timeout: 30000,
                crossDomain: true,
                xhrFields:{
                    withCredentials:true
                }
            };

            try{
                $.ajax(ajaxObject);
            }catch(e){
                reject(e);
            }
        });
    }
}

export default JsonRPCReal


