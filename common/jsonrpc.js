var JsonRPC = {
    _id:0,
    do:function(url,method,params,callback){
        if(method === "Product.GetPrimeProductDetail"){
            var paramsT = params;
        }else{
            var paramsT = new Array();
            paramsT.push(params);
        }
        $.ajax({
            url:url,
            type:"POST",
            headers:{"Content-Type":"application/json;charset:utf-8"},
            data:JSON.stringify({"id":this._id++,method:method,params:paramsT}),
            xhrFields: {
                withCredentials: false
            },
            success:function(data, textStatu){
                if(typeof data === "string"){
                    data = JSON.parse(data);
                }
                if(callback["success"]){
                    if(data["result"]!== undefined){
                        callback["success"](data);
                    }else{
                        callback["error"]&&callback["error"](data);
                    }
                }
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