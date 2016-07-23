export var getPathSearchObj = function(url){
    var obj = null, str = null,strArr = null;
   if(typeof url === "undefined" || url.trim() === "" || url[0] !== "?"){
        return obj;
    }else{
        obj = {};
        str = url.substring(1);
        strArr = str.split('&');
        for(var i=0; i< strArr.length; i++){
            var s = strArr[i];
            if(s.indexOf('=') !== -1){
                var prp = s.split('=')[0];
                var val = s.split('=')[1];
                obj[prp] = val;
            }
        }
        return obj;
    }
}

export var genProductDetail = function(url){
	return `/Shopping/EasyBuy?url=${encodeURIComponent(url)}`
}

export var genCategoryDetail = function(categoryId){
	if(typeof categoryId === "undefined"){
		return "/category"
	}
	return `/category/${categoryId}`
}

export var compatibleQiniuAndGeneralImage = function(imageUrl){
	if(/^(?:https?\:)?\/\//.test(imageUrl)){
		return imageUrl
	}
	return "http://7xiuv9.com5.z0.glb.clouddn.com/"+imageUrl;
}

export var getImgBucketUrl = function(imgUrl){
    return "http://d3hp955ol7sp5f.cloudfront.net/" + imgUrl;
}