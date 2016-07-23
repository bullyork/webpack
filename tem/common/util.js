var imageUrl = function(qnBaseUrl,realUrl){
    if(/^(https?:)?\/\/.*/.test(realUrl)){
        return realUrl;
    }
    return qnBaseUrl+realUrl;
}
var objKeyCount = function(obj){
    var count = 0;
    for(var i in obj){
        count++;
    }
    return count;
}

var getSessionStorage = function(obj,alowEmpty) {
    let user = sessionStorage.getItem("loginInfo");
    if (user === null) {
        return {};
    }
    return JSON.parse(user);
}

var setSessionStorage = function(loginInfo) {
    sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
}

var utilObj = {
    ImageUrl:imageUrl,
    KeyCount:objKeyCount,
    getSessionStorage:getSessionStorage,
    setSessionStorage:setSessionStorage
}

export default utilObj;