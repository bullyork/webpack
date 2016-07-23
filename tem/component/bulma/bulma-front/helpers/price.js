export var formatPriceWithPoint = function(price,bit=2){
	if(typeof price === "string"){
		price = parseFloat(price);
	}
	var base = Math.pow(10,bit);
	return (Math.round(price*base)/base).toFixed(bit);
}

export const PRICE_SYMBOL_SG = "S$";
export const PRICE_SYMBOL_MY = "RM";
export const PRICE_SYMBOL_AU = "AU$";
export const PRICE_SYMBOL_ID = "Rp";
export const PRICE_SYMBOL_TH = "THB";

var getPriceSymbol = function(){
	let priceSymbol = "";
	if(typeof currentCountryCode !== "undefined"){
		switch(currentCountryCode.toUpperCase()){
			case "SG":
				priceSymbol = PRICE_SYMBOL_SG;
				break;
			case "MY":
				priceSymbol = PRICE_SYMBOL_MY;
				break;
			case "AU":
				priceSymbol = PRICE_SYMBOL_AU;
				break;
			case "ID":
				priceSymbol = PRICE_SYMBOL_ID;
				break;
			case "TH":
				priceSymbol = PRICE_SYMBOL_TH;
				break;
		}
	}
	return priceSymbol;
}


export var priceWithSymbol = function(price,bit=2){
	switch(currentCountryCode.toUpperCase()){
		case "ID":
    		return `${getPriceSymbol()} ${convertToIdWithDot(price)}` 
		case "TH":
			return `${getPriceSymbol()} ${convertWithComma(price)}`
	}
    return `${getPriceSymbol()} ${formatPriceWithPoint(price,2)}`
}


const convertToIdWithDot = function convertToIdWithDot(price){
    let result = "";
    let isMinus = false;
    price = price * 1;
    
    if (price >=0 && price <= 1000){
        return `${price}`;
    }

    if (price < 0) {
        price = Math.abs(price);
        isMinus = true;
    }
       
    price = Math.ceil(price / 1000);
    
    while (price > 1000){
        let priceTemp = Math.floor(price) % 1000;
        if (priceTemp < 10) {
            result = ".00" + priceTemp + result;
        } else if (priceTemp < 100) {
            result = ".0" + priceTemp + result;
        }else {
            result = "." + priceTemp + result;
        }
        price = price / 1000;
    }
    if (isMinus) {
        result = `-${Math.floor(price)}${result}.000`;
    }
    return `${Math.floor(price)}${result}.000`;
}

const convertWithComma = function convertWithComma(price) {
    var result = "";
    var isMinus = false;
    price = price * 1;
    if (price >= 0 && price <= 1000) {
        return formatPriceWithPoint(price);
    }
    if (price < 0) {
        price = Math.abs(price);
        isMinus = true;
    }
    var fraction = price % 1;
    while (price > 1000) {
        var priceTemp = Math.floor(price) % 1000;
        if (priceTemp < 10) {
            result = ",00" + priceTemp + result;
        } else if (priceTemp < 100) {
            result = ",0" + priceTemp + result;
        } else {
            result = "," + priceTemp + result;
        }
        price = price / 1000;
    }
    if (isMinus) {
        result = "-" + Math.floor(price) + result + "." + formatPriceWithPoint(fraction) * 100;
    } else {
        result = Math.floor(price) + result + "." + formatPriceWithPoint(fraction) * 100;
    }
    return result;
}