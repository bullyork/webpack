const apiUrl = "/api";
var JsonRPC = {
    do:function(url,method,params,callback){
        $.ajax({
            url:apiUrl + "/" + method.replace(".", "/"),
            type:"POST",
            headers:{"Content-Type":"application/json;charset:utf-8"},
            data:JSON.stringify(params),
            xhrFields: {
                withCredentials: false
            },
            success:function(data, textStatu){
                if(typeof data === "string"){
                    data = JSON.parse(data);
                }
                callback["success"](data);
            },
            error:function(){
                callback["error"]&&callback["error"]();
            },
            complete:function(){
                callback["complete"]&&callback["complete"]();
            },
            timeout:30000,
            crossDomain:true
        });
    }
}

export default JsonRPC;