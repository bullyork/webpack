export var getAPIAddress = function(){
	return detectedLocalhostReturn(`//webapi.${currentCountryCode.toLowerCase()}.65emall.net`,`//${replaceHostByKey("webapi")}`);
}

export var getJSONRPCApiAddress = function(){
	let code = currentCountryCode.toLowerCase();
	return detectedLocalhostReturn(`//dpns.${code}.65emall.net/${code}.ashx`,`//${replaceHostByKey("dpns")}/${code}.ashx`);
}

export var getArea = function(){
	return currentCountryCode || "SG";
}

var replaceHostByKey = function(key){
	var hostnames = location.hostname.split(".");
	if(location.hostname.indexOf("65daigou") > -1){
		hostnames[0] = key;
	}else{
		hostnames.unshift(key);
	}
	return hostnames.join(".");
}

var detectedLocalhostReturn = function(localAdderss,realAddress){
	if(location.hostname.indexOf("192.168") > -1||location.hostname.indexOf("localhost") > -1||location.hostname.indexOf("127.0") > -1){
		return localAdderss;
	}
	return realAddress;
}

export var AccountURL = function(){
	var devApi = '//www.65emall.net:8051';
	var lineApi = {
		"SG":"//dpns.ezbuy.sg",
		"MY":"//dpns.my.ezbuy.com",
		"AU":"//dpns.au.ezbuy.com"
	};

	if(location.hostname.indexOf("192.168") > -1||location.hostname.indexOf("localhost") > -1||location.hostname.indexOf("127.0") > -1 || location.hostname.indexOf("65emall.net") > -1){
		return devApi;
	}
	return lineApi[currentCountryCode];
}