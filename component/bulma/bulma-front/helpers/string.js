export const isEmpty = function(value){
	return typeof value !== "string" || /^\s*$/.test(value);
}

export const fixedIntegerBitNumber = function(value,bit=2){
	if(typeof value === "number"){
		value = `${value}`;
	}
	let added = [];
	for(var i=0;i<bit - value.length;i++){
		added.push(0);
	}
	return `${added.join("")}${value}`
}